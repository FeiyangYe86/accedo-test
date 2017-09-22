import Vue from 'vue'
import App from './App'
import router from './router'

// Import all components
import './components'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
