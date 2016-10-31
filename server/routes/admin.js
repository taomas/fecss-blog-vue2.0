const router = require('koa-router')()
const article = require('../controllers/article')

router.get('/', article.getAllArticles)
  .post('/create', article.createArticle)
  .post('/delete', article.deleteArticle)
  .post('/edit', article.editArticle)

module.exports = router;
