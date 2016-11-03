<template>
  <div class="admin">
    <AdminNav></AdminNav>
    <div class="admin-content">
      <ul class="admin-table-head ly-row-flex">
        <li class="table-head-title">标题</li>
        <li class="table-head-time">日期</li>
        <li class="table-head-operate">选项</li>
      </ul>
      <ul class="admin-table-content">
        <li class="admin-table-item ly-row-flex"
          v-for="article in adminArticles">
          <div class="table-content-title">
            <router-link :to="{name: 'article', params: {id: article._id}}">
              {{article.title}}
            </router-link>
          </div>
          <div class="table-content-time">
            {{article.createTime}}
          </div>
          <div class="table-content-operate">
            <router-link :to="{name: 'edit', params: {id: article._id}}">
              <i class="icon-edit ion-edit">
              </i>
            </router-link>
            <i class="icon-delete ion-trash-a"
              @click="evtRemoveArticle(article._id)"
            ></i>
          </div>
        </li>
      </ul>
      <PageNav :start="start"></PageNav>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AdminNav from '../components/AdminNav'
import PageNav from '../components/PageNav'

export default {
  data () {
    return {
      start: 0,
      limit: 5
    }
  },
  computed: {
    ...mapGetters({
      startIndex: 'startIndex',
      articleList: 'articleList',
      adminArticles: 'adminArticles'
    })
  },
  methods: {
    ...mapActions(['getAdminArticles', 'removeArticleById']),
    evtToggleNext () {
      this.start++
      const opts = {
        start: this.start,
        limit: this.limit
      }
      this.getAdminArticles(opts)
    },
    evtTogglePre () {
      this.start--
      const opts = {
        start: this.start,
        limit: this.limit
      }
      this.getAdminArticles(opts)
    },
    evtRemoveArticle (articleId) {
      // this.$Modal.create('提示', '无删除文章权限！', () => {})
      this.$Modal.create('提示', '确认删除该文章！', () => {
        const opts = {
          id: articleId
        }
        this.removeArticleById(opts).then(() => {
          this.$Modal.create('提示', '删除文章成功', () => {
            this.getAdminArticles({
              start: this.startIndex,
              limit: 5
            })
          })
        })
      })
    }
  },
  created () {
    this.getAdminArticles({
      start: 0,
      limit: 5
    })
  },
  components: {
    AdminNav,
    PageNav
  }
}
</script>

<style scoped>
@import '../assets/css/ionicicon';

.admin-content {
  width: 70%;
  height: auto;
  margin: 0 auto;
  padding-top: 80px;
}

.admin-table-head {
  box-sizing: border-box;
  padding: 15px 30px;
  border: 1px solid #ccc;
  .table-head-title {
    width: 50%;
    text-align: left;
  }
  .table-head-time {
    width: 25%;
    text-align: center;
  }
  .table-head-operate {
    width: 25%;
    text-align: right;
  }
}

.admin-table-content {
  box-sizing: border-box;
  margin-bottom: 30px;
  .admin-table-item {
    position: relative;
    padding: 15px 30px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    &:nth-child(2n) {
      background: #f5f5f5;
    }
    &:nth-child(2n+1) {
      background: #fff;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 0;
      background: #42b983;
      transition: all 0.4s ease-in;
    }
    &:hover {
      border-bottom: 0;
      &:after {
        width: 100%;
      }
    }
  }
  .table-content-title {
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    cursor: pointer;
    a {
      color: #333;
    }
  }
  .table-content-time {
    width: 25%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  .table-content-operate {
    width: 25%;
    font-size: 18px;
    text-align: right;
    .icon-edit {
      margin-right: 15px;
      color: #444;
      cursor: pointer;
    }
    .icon-delete {
      color: #444;
      cursor: pointer;
    }
  }
}
</style>
