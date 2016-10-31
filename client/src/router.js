import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './views/App.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  }
]

export default new VueRouter({
  routes
})
