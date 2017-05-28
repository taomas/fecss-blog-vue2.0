// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import * as filters from './filters/index'
// import modal from './mixins/modal.js'

Vue.config.productionTip = false

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// Vue.mixin({
//   created: function () {
//     if (!this.$root.MODAL) {
//       modal(Vue, this.$root)
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
