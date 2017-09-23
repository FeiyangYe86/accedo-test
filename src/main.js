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
  components: { App },
  methods: {
    handleFullScreenChange () {
      let fullscreenElm = window.document.webkitFullscreenElement
      console.log(fullscreenElm)
      if (fullscreenElm == null) {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('webkitfullscreenchange', this.handleFullScreenChange)
    })
  }
})
