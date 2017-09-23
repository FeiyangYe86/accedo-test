import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods: {
    /**
     * Redirect to homepage after exited full screen mode
     */
    handleFullScreenChange () {
      if (window.document.webkitFullscreenElement == null) {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('webkitfullscreenchange', this.handleFullScreenChange)
      /* Register all error handlers here */
      window.addEventListener('error', function (e) {
        console.log(e)
      })
    })
  }
})
