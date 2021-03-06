// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

/*
router.beforeEach(function (transition) {
if (transition.to.auth) {
    transition.redirect('/login')
  } else {
   transition.next()
  }
  TODO: FIX loading!
})
*/
