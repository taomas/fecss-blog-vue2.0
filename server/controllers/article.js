const Article = require('../models/article')
const article = new Article()
const SUCCESS_CODE = 1000000
const ERROR_CODE = 100010

const filterArticles = (articles, start, limit) => {
  const startIndex = start * limit,
    endIndex = (start + 1) * limit;
  let result = []
  articles.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      result.push(item)
    }
  })
  return result
}

const getAllArticles = async(ctx, next) => {
  const query = ctx.request.query
  const limit = query.limit || 10000
  const start = query.start || 0
  let articleList = await article.query({})
  if (articleList) {
    articleList = articleList.filter((item, index) => {
      if (index > start && index < start + limit) {
        return item
      }
    })
    ctx.body = {
      data: articleList,
      statuscode: SUCCESS_CODE,
      message: '请求成功'
    }
  }
}

const getArticleById = async(ctx, next) => {
  const hrefs = ctx.request.href.split('/')
  const articleId = hrefs[hrefs.length - 1]
  const articleDetail = await article.queryById(articleId)
  if (articleDetail) {
    ctx.body = {
      data: articleDetail,
      statuscode: SUCCESS_CODE,
      message: '请求成功'
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
      statuscode: ERROR_CODE,
      message: errormsg
    }
  } else {
    const data = await article.save(opts)
    if (data) {
      result = {
        data: data,
        statuscode: SUCCESS_CODE,
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
      Object.assign(doc, articleDetail) // 修改doc
      return doc.save()
    })

    if (data) {
      ctx.body = {
        data: data,
        statuscode: SUCCESS_CODE,
        message: '文章更新成功'
      }
    }
}

const deleteArticle = async(ctx, next) => {
  const id = ctx.request.body.id
  const data = await article.remove(id)
  if (data) {
    ctx.body = {
      data: data,
      statuscode: SUCCESS_CODE,
      message: '文章删除成功'
    }
  }
}

const getArchiveList = async(ctx, next) => {
  let articleList = await article.query({})
  if (articleList) {
    articleList = articleList.map((item) => {
      let newEle = {
        _id: item._id,
        createTime: item.createTime,
        title: item.title
      }
      return newEle
    })
    ctx.body = {
      success: true,
      articles: articleList
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
      success: true,
      tagsList: tagsList
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
      success: true,
      tags: tags,
      tagsContent: tagsContent
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
