import cookies from 'js-cookie'
import api from '../api'
import * as types from './mutation-types'

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
  api.getArchiveArticles().then(function(res) {
    ctx.commit(types.GET_ARCHIVE_ARTICLES, res.body.articles)
  })
}

export const getTagsList = (ctx) => {
  api.getTagsList().then(function(res) {
    ctx.commit(types.GET_TAGS_LIST, res.body.tagsList)
  })
}

export const getTagsContent = (ctx, tags) => {
  api.getTagsContent(tags).then(function(res) {
    ctx.commit(types.GET_TAGS_CONTENT, res.body.tagsContent)
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
  api.getArticleList({
    start: 0,
    limit: 5
  }).then(function(res) {
    ctx.commit(types.GET_NEW_ARTICLES, res.body.articleList)
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
    if (res.body.success) {
      ctx.commit(types.SHOW_SUCCESS_MESSAGE, res.body.message)
    } else {
      ctx.commit(types.SHOW_ERROR_MESSAGE, res.body.message)
    }
  })
}
