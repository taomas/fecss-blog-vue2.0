const Article = require('../models/article')
const article = new Article()

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
  const limit = query && query.limit,
    start = query && query.start;
  let articleList = await article.query({})
  if (articleList) {
    articleList = filterArticles(articleList, start, limit)
    ctx.body = {
      success: true,
      articleList: articleList
    }
  }
}

const getArticleById = async(ctx, next) => {
  const hrefs = ctx.request.href.split('/')
  const articleId = decodeURIComponent(hrefs[hrefs.length - 1])
  const articleDetail = await article.queryById(articleId)
  ctx.body = {
    success: true,
    article: articleDetail
  }
}

const createArticle = async(ctx, next) => {
  const opts = ctx.request.body
  const result = await article.save(opts)
  if (result) {
    ctx.body = {
      success: true,
      result: result
    }
  }
}

const editArticle = async(ctx, next) => {
    const opts = ctx.request.body
    const articleId = opts.articleId
    const articleDetail = opts.articleDetail
    const result = await article.queryById(articleId).then(function (doc) {
      Object.assign(doc, articleDetail) // 修改doc
      return doc.save()
    })

    if (result) {
      ctx.body = {
        success: true,
        result: result
      }
    }
}

const deleteArticle = async(ctx, next) => {
  const id = ctx.request.body.id
  const result = article.remove(id)
  if (result) {
    ctx.body = {
      success: true,
      result: result
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
