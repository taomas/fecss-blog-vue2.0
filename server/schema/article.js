import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  title: String,
  tags: String,
  source: String,
  render: String,
  createTime: String,
  date: { type: Date, default: Date.now }
})

export default mongoose.model('Article', articleSchema);
