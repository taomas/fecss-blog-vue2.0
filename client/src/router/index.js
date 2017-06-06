import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Manage from '../pages/Manage.vue'

import Archive from '../components/Archive'
import ArticleList from '../components/ArticleList'
import Article from '../components/Article'
import TagsList from '../components/TagsList'
import TagsContent from '../components/TagsContent'
import ManageList from '../components/ManageList.vue'
import ManageEditor from '../components/ManageEditor.vue'

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
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/manage/',
    name: 'manage',
    component: Manage,
    children: [
      {
        path: 'list',
        name: 'manageList',
        component: ManageList
      },
      {
        path: 'editor',
        name: 'manageEditor',
        component: ManageEditor
      }
    ]
  }
]

export default new Router({
  routes
})
