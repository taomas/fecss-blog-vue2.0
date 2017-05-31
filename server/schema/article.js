const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  tags: String,
  source: String,
  render: String,
  createTime: String
});

module.exports = mongoose.model('Article', articleSchema);
