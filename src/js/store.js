import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sensordata: []
  },
  mutations: {
    add (state, elem) {
      state.sensordata.push(elem)
    }
  },
  getters: {
    returnData (state, getters) {
      return state.sensordata
    }
  }
})
