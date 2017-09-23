import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import History from '@/pages/History.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/video/:id',
      name: 'Video',
      component: Home
    }
  ]
})
