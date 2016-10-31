import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '../store/index'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  store.commit('TOOGLE_LOADING', true)
  next((response) => {
    store.commit('TOOGLE_LOADING', false)
  })
})

let baseUrl = 'http://127.0.0.1:3001/api'
let apiResource = Vue.resource(baseUrl + '{/id}')

export default {
  getInTheaters: (opts) => {
    return apiResource.get({id: 'in_theaters', ...opts})
  }
}
