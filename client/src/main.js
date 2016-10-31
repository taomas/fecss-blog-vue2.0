import Vue from 'vue'
import router from './router'
import store from './store/index'
import * as filters from './filters/index'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<router-view></router-view>'
})
