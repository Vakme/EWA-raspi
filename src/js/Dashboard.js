import { store } from './store';
import xhr from 'xhr'

let apiIP = '192.168.1.12';

export default {
  data () {
    return {
      sensors : []
    }
  },
  mqtt: {
    'echo/tuple': function(val) {
      //console.log("RECEIVED: " + val);
      if(this.sensors.length > 20)
        this.sensors = this.sensors.shift();
      this.sensors.push(JSON.parse(val.toString()));
      console.log(this.sensors[0])
    }
    },
  name: 'dashboard',
  /*watch: {
    store: function (val) {
      this.fetchData(this);
    }
  },*/
  created () {
    this.$mqtt.subscribe('echo/tuple', function (err, granted) {
      if(err)
        console.log('ERR ' + err);
      else
        console.log("GRANT " + granted.toString());
    });
  }
}
