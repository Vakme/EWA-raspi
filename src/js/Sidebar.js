import xhr from 'xhr'
import { store } from './store';

let apiIP = '192.168.1.12';


export default {
  name: 'main-sidebar',
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
      xhr({
        body: {login: true},
        method: "GET",
        uri: "http://"+ apiIP +":3000/sidebar",
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
    }

  }
}
