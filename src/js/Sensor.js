import xhr from 'xhr'

let apiIP = '192.168.1.12';

export default {
  name: 'sensor',
  data () {
    return {
      auth: true,
      sensorMock: ""
    }
  },
  created () {
    this.fetchData(this);
  },
  methods: {
    fetchData: function (obj) {
      console.log(this.$route.params.id);
      xhr({
        body: {login: true},
        method: "GET",
        uri: "http://" + apiIP + ":3000/sensors/" + this.$route.params.id,
        headers: {
          "Content-Type": "application/json"
        }
      }, function (err, resp, body) {
        console.log(resp);
        if(err)
          console.log(err);
        else {
          obj.sensorMock = JSON.parse(body);
        }
      });
      /*xhr(apiURL, function (err, resp, body) {
        if (resp.statusCode == 200) {
          obj.sensorMock = JSON.parse(body);
        }
      });*/

    }

  }
}
