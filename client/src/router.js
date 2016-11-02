import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './views/Home.vue'
import Tags from './views/Tags.vue'

import Archive from './components/Archive'
import ArticleList from './components/ArticleList'
import Article from './components/Article'
import TagsList from './components/TagsList'
import TagsContent from './components/TagsContent'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'home',
        component: ArticleList
      },
      {
        path: 'article/:id',
        name: 'article',
        component: Article
      },
      {
        path: 'archive',
        name: 'archive',
        component: Archive
      },
      {
        path: 'tags',
        name: 'tags',
        component: TagsList
      },
      {
        path: 'tags/:id',
        name: 'tagsContent',
        component: TagsContent
      }
    ]
  },
  {
    path: '/tags',
    name: 'tags',
    component: Tags
  }
]

export default new VueRouter({
  routes
})
