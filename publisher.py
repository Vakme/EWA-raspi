
import socket
from struct import *
import json
from collections import defaultdict
from random import random

import paho.mqtt.client as mqtt
import time as time


def on_connect(mqttc, obj, flags, rc):
    #print("rc: " + str(rc))
    pass

def on_message(mqttc, obj, msg):
    #print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))
    pass

def on_publish(mqttc, obj, mid):
    #print("mid: " + str(mid))
    pass


def on_subscribe(mqttc, obj, mid, granted_qos):
    #print("Subscribed: " + str(mid) + " " + str(granted_qos))
    pass

def on_log(mqttc, obj, level, string):
    #print(string)
    pass

mqttc = mqtt.Client()
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe

mqttc.connect("192.168.1.10", 1883, 60)

mqttc.loop_start()

UDP_IP = "0.0.0.0"
UDP_PORT = 1000

global sock
sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
sock.bind((UDP_IP, UDP_PORT))

import json
from pprint import pprint

def jsonParser(jsonEl):
    arr = []

    for el in jsonEl['measures']:
        if len(el) != 1 or \
                        type(jsonEl['timestamp']) is not int or \
                        type(list(el.values())[0]) is not float:
            raise TypeError('unproper measure format')
        k, v = el.popitem()
        arr.append({
            'measure_id': k,
            'value': v
        })
    return {
        "timestamp": jsonEl['timestamp'],
        "sensor": jsonEl['sensor'],
        "measures": arr
    }

def handleMqttPublish(parsedInfo):
    #print("tuple")
    print (parsedInfo)
    (rc, mid) = mqttc.publish("tuple", str(jsonParser(parsedInfo["json"])).replace("u'", "'").replace("'", "\""), qos=2)
    pass


def sendACK(parsedInfo):
    data = pack("IIB",0xA7B6C5D4,parsedInfo["messageID"],0)

    global sock
    sock.sendto(data, parsedInfo["address"])

def handlePublishPackage(data,parsedInfo):

    topicLen,=unpack("B",data[0:1])
    print (data[topicLen+1:])

    parsedInfo["topicLen"]=topicLen
    parsedInfo["topic"],=unpack("{}s".format(topicLen),data[1:topicLen+1])
    parsedInfo["json"] = json.loads(data[topicLen+1:])
    sendACK(parsedInfo)
    handleMqttPublish(parsedInfo)
    #print (parsedInfo)

def handleNewPackage(data,parsedInfo):
    magicNumber,messageID,packageType =unpack("IIB",data[0:9])

    if magicNumber!=0xA7B6C5D4:
        raise RuntimeException("Magic number not equal to 0xA7B6C5D4")

    parsedInfo["messageID"]=messageID
    parsedInfo["packageType"]=packageType

    if packageType == 1:
        handlePublishPackage(data[9:],parsedInfo)
    else:
        raise RuntimeException("Package Type not supported")


print ("run")

while True:
    try:
        data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
        # cut
        parsedInfo = {"address":addr}
        handleNewPackage(data,parsedInfo)
    except Exception as msg:
        print (msg)
