import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'

Vue.use(Vuex)

let state = {
}

let mutations = {
  [types.GET_ARTICLE_DETAIL] (state, articleDetail) {
    state.articleDetail = articleDetail
  }
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
