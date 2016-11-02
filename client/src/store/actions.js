import cookies from 'js-cookie'
import api from '../api'
import * as types from './mutation-types'

export const getArticleDetail = (ctx, opts) => {
  api.getArticleDetail(opts).then(function (res) {
    ctx.commit(types.GET_ARTICLE_DETAIL, res.body.article)
  })
}

export const getArticleList = (ctx, opts) => {
  api.getArticleList(opts).then(function (res) {
    if (res.body.success) {
      ctx.commit(types.GET_ARTICLE_LIST, res.body.articleList)
    }
  })
}

export const getArchiveArticles = (ctx) => {
  api.getArchiveArticles().then(function (res) {
    ctx.commit(types.GET_ARCHIVE_ARTICLES, res.body.articles)
  })
}

export const getTagsList = (ctx) => {
  api.getTagsList().then(function (res) {
    ctx.commit(types.GET_TAGS_LIST, res.body.tagsList)
  })
}

export const getTagsContent = (ctx, tags) => {
  api.getTagsContent(tags).then(function (res) {
    ctx.commit(types.GET_TAGS_CONTENT, res.body.tagsContent)
  })
}

export const getAdminArticles = ({dispatch}, opts) => {
  api.getAdminArticles(opts).then(function (res) {
    dispatch(types.GET_ADMIN_ARTICLES, res.body)
  })
}

export const getNewArticles = (ctx) => {
  api.getArticleList({
    start: 0,
    limit: 5
  }).then(function (res) {
    ctx.commit(types.GET_NEW_ARTICLES, res.body.articleList)
  })
}

export const createArticle = ({dispatch}, opts) => {
  return api.createArticle(opts).then(function (res) {
    if (res.body.success) {
      dispatch(types.SHOW_MESSAGE, res.body.message)
    } else {
      dispatch(types.SHOW_ERROR_MESSAGE, res.body.message)
    }
  })
}

export const editArticle = ({dispatch}, opts) => {
  api.editArticle(opts).then(function (res) {
    if (res.body.success) {
      dispatch(types.SHOW_MESSAGE, res.body.message)
    } else {
      dispatch(types.SHOW_ERROR_MESSAGE, res.body.message)
    }
  })
}

export const removeArticleById = ({dispatch}, opts) => {
  return api.removeArticleById(opts).then(function (res) {
    if (res.body.success) {
      dispatch(types.SHOW_MESSAGE, res.body.message)
    } else {
      dispatch(types.SHOW_ERROR_MESSAGE, res.body.message)
    }
  })
}

export const distoryModelMessage = ({dispatch}) => {
  dispatch(types.SHOW_MESSAGE, '')
}

export const userLogin = ({dispatch}, opts) => {
  return api.userLogin(opts).then(function (res) {
    if (res.body.success) {
      cookies.set('token', res.body.token, { expires: 7 })
      dispatch(types.SHOW_MESSAGE, res.body.message)
    } else {
      dispatch(types.SHOW_ERROR_MESSAGE, res.body.message)
    }
  })
}

export const userRegister = ({dispatch}, opts) => {
  return api.userRegister(opts).then(function (res) {
    if (res.body.success) {
      dispatch(types.SHOW_MESSAGE, res.body.message)
    } else {
      dispatch(types.SHOW_ERROR_MESSAGE, res.body.message)
    }
  })
}

export const showErrorMessage = ({dispatch}, message) => {
  dispatch(types.SHOW_ERROR_MESSAGE, message)
}
