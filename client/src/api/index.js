import Vue from 'vue'
import VueResource from 'vue-resource'
// import store from '../store/index'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  // store.commit('TOOGLE_LOADING', true)
  next((response) => {
    // store.commit('TOOGLE_LOADING', false)
    if (response.status === 401) {
      window.location.hash = '#!/login'
    }
  })
})

const API_ROOT = 'http://127.0.0.1:3000'
const apiResource = Vue.resource(API_ROOT + '{/id}{/controller}')
const articleResource = Vue.resource(API_ROOT + '/articles{/id}{/controller}')
const usersResource = Vue.resource(API_ROOT + '/users{/id}')
const adminResource = Vue.resource(API_ROOT + '/admin{/id}')

export default {
  getArticleDetail (id) {
    return articleResource.get({id: id})
  },
  getArticleList (opts) {
    return articleResource.get({id: '', ...opts})
  },
  getArchiveArticles () {
    return apiResource.get({id: 'archive'})
  },
  getTagsList (opts) {
    return apiResource.get({id: 'tags', ...opts})
  },
  getTagsContent (tags) {
    return apiResource.get({id: 'tags', 'controller': tags})
  },
  removeArticleById (opts) {
    return adminResource.save({id: 'delete'}, opts)
  },
  userLogin (opts) {
    return usersResource.save({id: 'login'}, opts)
  },
  userRegister (opts) {
    return usersResource.save({id: 'register'}, opts)
  },
  getAdminArticles (opts) {
    return adminResource.get({id: '', ...opts})
  },
  createArticle (opts) {
    return adminResource.save({id: 'create'}, opts)
  },
  editArticle (opts) {
    return adminResource.save({id: 'edit'}, opts)
  }
}
