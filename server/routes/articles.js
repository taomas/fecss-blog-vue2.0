const router = require('koa-router')()
const article = require('../controllers/article')

router.get('articles', article.getAllArticles)
  .get('article/:id', article.getArticleById)
  .get('archive', article.getArchiveList)
  .get('tags', article.getTagsList)
  .get('tags/:id', article.getTagsContent)

module.exports = router
