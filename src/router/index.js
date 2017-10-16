import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import Sensor from '@/components/Sensor'

import VueMqtt from 'vue-mqtt'

Vue.use(VueMqtt, 'ws://192.168.1.10:3001/', {clientId: 'WebClient-' + parseInt(Math.random() * 100000)})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      components: {
        main: Dashboard,
        sidebar: Sidebar
      }
    },
    {
      path: '/sensor/:id',
      name: 'Sensor',
      components: {
        main: Sensor,
        sidebar: Sidebar
      }
    }
  ]
})
