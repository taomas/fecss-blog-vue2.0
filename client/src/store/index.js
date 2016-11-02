import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'

Vue.use(Vuex)

let state = {
  articleDetail: {},
  articleList: [],
  newArticles: [],
  modelMessage: '',
  errorMessage: '',
  startIndex: 0,
  maxIndex: 0,
  adminArticles: [],
  archiveArticles: [],
  tagsList: [],
  tagsContent: [],
  editArticle: {},
  showLoading: false
}

let mutations = {
  [types.GET_ARTICLE_DETAIL] (state, articleDetail) {
    state.articleDetail = articleDetail
  },
  [types.GET_ARTICLE_LIST] (state, articleList) {
    state.articleList = articleList
  },
  [types.GET_ARCHIVE_ARTICLES] (state, archiveArticles) {
    state.archiveArticles = archiveArticles
  },
  [types.GET_TAGS_LIST] (state, tagsList) {
    state.tagsList = tagsList
  },
  [types.GET_TAGS_CONTENT] (state, tagsContent) {
    state.tagsContent = tagsContent
  },
  [types.SHOW_SUCCESS_MESSAGE] (state, message) {
    console.log(message)
    state.modelMessage = message
  },
  [types.SHOW_ERROR_MESSAGE] (state, message) {
    state.errorMessage = message
  },
  [types.GET_NEW_ARTICLES] (state, articleList) {
    state.newArticles = articleList
  },
  [types.GET_ADMIN_ARTICLES] (state, adminArticles) {
    state.adminArticles = adminArticles.articleList
  },
  [types.UPDATE_EDIT_ARTICLE] (state, editArticle) {
    state.editArticle = editArticle
  },
  [types.TOOGLE_LOADING] (state, showLoading) {
    state.showLoading = showLoading
  }
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
