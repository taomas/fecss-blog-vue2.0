import cookies from 'js-cookie'
import api from '../api'
// import * as types from './mutation-types'

const SUCCESS_CODE = 1000000

export const getArticleDetail = (ctx, opts) => {
  return api.getArticleDetail(opts).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getArticleList = (ctx, opts) => {
  return api.getArticleList(opts).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getArchiveArticles = (ctx) => {
  return api.getArchiveArticles().then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getTagsList = (ctx) => {
  return api.getTagsList().then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getTagsContent = (ctx, tags) => {
  return api.getTagsContent(tags).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getManageArticles = (ctx, opts) => {
  return api.getManageArticles(opts).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getNewArticles = (ctx) => {
  return api.getArticleList({
    start: 0,
    limit: 5
  }).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const createArticle = (ctx, opts) => {
  return api.createArticle(opts).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body.data)
    } else {
      return Promise.reject(res.body.message)
    }
  })
}

export const editArticle = (ctx, opts) => {
  return api.editArticle(opts).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const removeArticleById = (ctx, opts) => {
  return api.removeArticleById(opts).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const userLogin = (ctx, opts) => {
  return api.userLogin(opts).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      let data = res.body.data
      cookies.set('token', data.token, { expires: 7 })
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const userRegister = (ctx, opts) => {
  return api.userRegister(opts).then(function(res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
