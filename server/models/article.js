import ArticleModel from '../schema/article'

class Article {
  constructor () {
    this.model = ArticleModel
  }
  save (opts) {
    opts.createTime = new Date().toLocaleString().split(' ')[0]
    this.entity = new ArticleModel(opts)
    return this.entity.save(opts)
  }
  query (opts) {
    return this.model.find(opts)
    .sort({ _id: -1 })
    .exec()
  }
  queryAll () {
    return this.model.find({})
    .sort({ _id: -1 })
    .exec()
  }
  queryById (id) {
    return this.model.findById(id)
  }
  remove (id, fn) {
    return this.model.findById(id).then((doc) => {
      if (!doc) {
        return fn(null, false)
      }
      return doc.remove()
    })
  }
}

module.exports = Article
