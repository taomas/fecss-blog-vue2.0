import Vue from 'vue'
import VueResource from 'vue-resource'
import cookie from 'js-cookie'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  const token = cookie.get('token') || ''
  Vue.http.headers.common['token'] = token
  next((response) => {
    if (response.body.statuscode === 100011) {
      cookie.remove('token')
      window.location.hash = '#/login'
    }
  })
})

const API_ROOT = 'http://127.0.0.1:3000'
const apiResource = Vue.resource(API_ROOT + '{/id}{/controller}')
const articleResource = Vue.resource(API_ROOT + '/articles{/id}{/controller}')
const usersResource = Vue.resource(API_ROOT + '/users{/id}')
const manageResource = Vue.resource(API_ROOT + '/manage{/id}')

export default {
  getArticleDetail (opts) {
    return articleResource.get({id: opts.id})
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
    return manageResource.save({id: 'delete'}, opts)
  },
  userLogin (opts) {
    return usersResource.save({id: 'login'}, opts)
  },
  userRegister (opts) {
    return usersResource.save({id: 'register'}, opts)
  },
  getManageArticles (opts) {
    return manageResource.get({id: '', ...opts})
  },
  createArticle (opts) {
    return manageResource.save({id: 'create'}, opts)
  },
  editArticle (opts) {
    return manageResource.save({id: 'edit'}, opts)
  }
}
