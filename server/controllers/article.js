import _ from 'lodash'
import * as config from '../config/config.js'
import Article from '../models/article'
const article = new Article()

const filterArticles = (articles, start, limit) => {
  const startIndex = start * limit,
    endIndex = (start + 1) * limit;
  return articles.slice(startIndex, endIndex)
}

const getAllArticles = async(ctx, next) => {
  const query = ctx.request.query
  const limit = query.limit || 10000
  const start = query.start || 0
  let articleList = await article.query({})
  if (articleList) {
    ctx.body = {
      data: {
        list: articleList.slice(start, start + limit)
      },
      statuscode: config.SUCCESS_CODE,
      message: config.REQUEST_SUCCESS
    }
  } else {
    ctx.body = {
      data: {},
      statuscode: config.ERROR_CODE,
      message: config.REQUEST_FAIL
    }
  }
}

const getArticleById = async(ctx, next) => {
  const hrefs = ctx.request.href.split('/')
  const articleId = hrefs[hrefs.length - 1]
  const articleDetail = await article.queryById(articleId)
  if (articleDetail) {
    ctx.body = {
      data: {
        detail: articleDetail
      },
      statuscode: config.SUCCESS_CODE,
      message: config.REQUEST_SUCCESS
    }
  }
}

const createArticle = async(ctx, next) => {
  const opts = ctx.request.body
  let result = {}
  let errormsg = ''
  if (!opts.title) {
    errormsg = '文章名不能为空'
  } else if (!opts.tags) {
    errormsg = '标签不能为空'
  } else if (!opts.source || opts.source.length <= 300) {
    errormsg = '文章内容不能为少于300字'
  }

  if (errormsg) {
    result = {
      data: {},
      statuscode: config.ERROR_CODE,
      message: errormsg
    }
  } else {
    const data = await article.save(opts)
    if (data) {
      result = {
        data: {},
        statuscode: config.SUCCESS_CODE,
        message: '文章创建成功'
      }
    }
  }
  ctx.body = result
}

const editArticle = async(ctx, next) => {
    const opts = ctx.request.body
    const articleId = opts.articleId
    const articleDetail = opts.articleDetail
    const data = await article.queryById(articleId).then(function (doc) {
      _.assignIn(doc, articleDetail)
      return doc.save()
    })
    if (data) {
      ctx.body = {
        data: {},
        statuscode: config.SUCCESS_CODE,
        message: '文章更新成功'
      }
    }
}

const deleteArticle = async(ctx, next) => {
  const id = ctx.request.body.id
  const data = await article.remove(id)
  if (data) {
    ctx.body = {
      data: {},
      statuscode: config.SUCCESS_CODE,
      message: '文章删除成功'
    }
  }
}

const getArchiveList = async(ctx, next) => {
  let articleList = await article.query({})
  if (articleList) {
    articleList = articleList.map((item) => {
      console.log(item)
      let newEle = {
        id: item._id,
        createTime: item.createTime,
        title: item.title
      }
      return newEle
    })
    ctx.body = {
      data: {
        list: articleList
      },
      statuscode: config.SUCCESS_CODE,
      message: '获取分类成功'
    }
  }
}

const getTagsList = async(ctx, next) => {
  let tagsList = []
  let articleList = await article.query({})
  if (articleList) {
    articleList.forEach((item) => {
      if (!tagsList.includes(item.tags)) {
        tagsList.push(item.tags)
      }
    })
    ctx.body = {
      data: {
        list: tagsList
      },
      statuscode: config.SUCCESS_CODE,
      message: '文章删除成功'
    }
  }
}

const getTagsContent = async(ctx, next) => {
  const hrefs = ctx.request.href.split('/')
  const tags = decodeURIComponent(hrefs[hrefs.length - 1])
  const tagsContent = await article.query({
    tags: tags
  })
  if (tagsContent) {
    ctx.body = {
      data: {
        list: tags,
        content: tagsContent
      },
      statuscode: config.SUCCESS_CODE,
      message: '文章删除成功'
    }
  }
}

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  deleteArticle,
  editArticle,
  getArchiveList,
  getTagsList,
  getTagsContent
}
