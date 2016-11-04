import 'highlight.js/styles/atom-one-light.css'
import Vue from 'vue'
import router from './router'
import store from './store/index'
import * as filters from './filters/index'
import modal from './mixins/modal.js'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// test
Vue.mixin({
  created: function () {
    if (!this.$root.MODAL) {
      modal(Vue, this.$root)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  data () {
    return {
      'MODAL': ''
    }
  },
  el: '#app',
  router,
  store,
  template: '<router-view></router-view>'
})
