// import highlight from 'highlight.js'

export const articleDetail = state => state.articleDetail
export const newArticles = state => state.newArticles
export const modelMessage = state => state.modelMessage
export const errorMessage = state => state.errorMessage
export const startIndex = state => state.startIndex
export const maxIndex = state => state.maxIndex
export const adminArticles = state => state.adminArticles
export const archiveArticles = state => state.archiveArticles
export const tagsList = state => state.tagsList
export const tagsContent = state => state.tagsContent
export const editArticle = state => state.editArticle
export const showLoading = state => state.showLoading

export const articleList = (state) => {
  let articleList = state.articleList
  if (articleList.length > 0) {
    articleList.forEach((item) => {
      item.substrArticle = (item.markedArticle + '').split('</p>')[0].substring(0, 80) + '...</p>'
    })
  }
  return articleList
}

// export const articleDetail = (state) => {
//   let articleDetail = state.articleDetail
//   // console.log($(articleDetail.markedArticle).find('pre'))
//   return articleDetail
// }
