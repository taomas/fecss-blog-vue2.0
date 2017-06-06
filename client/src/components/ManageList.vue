<template>
  <div class="article-list">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manage-table">
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="createTime" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="title" label="文章名" width="280">
        </el-table-column>
        <el-table-column prop="tags" label="标签" :filters="filterTags" :filter-method="filterTag">
          <template scope="scope">
            <el-tag close-transition>{{scope.row.tags}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PageNav :start="start"></PageNav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageNav from './PageNav'
export default {
  data() {
    return {
      start: 0,
      limit: 5,
      articleList: []
    }
  },
  computed: {
    ...mapGetters({
      startIndex: 'startIndex',
      manageArticles: 'manageArticles'
    }),
    tags() {
      let tags = []
      this.articleList.forEach((item) => {
        if (tags.indexOf(item.tags) === -1) {
          tags.push(item.tags)
        }
      })
      return tags
    },
    filterTags() {
      return this.tags.map((v) => {
        return {
          text: v,
          value: v
        }
      })
    }
  },
  methods: {
    ...mapActions({
      xGetManageArticles: 'getManageArticles',
      xRemoveArticleById: 'removeArticleById'
    }),
    filterTag(value, row) {
      return row.tags === value
    },
    handleEdit(id) {
      this.$router.push({name: 'manageEditor', query: {id: id}})
    },
    getManageArticles() {
      this.xGetManageArticles().then((res) => {
        this.articleList = res.data.list
      }).catch((res) => {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      })
    },
    handleDelete(id) {
      this.$alert('是否确认删除', '确认发布', {
        confirmButtonText: '确定',
        callback: action => {
          this.deleteArticle(id)
        }
      })
    },
    deleteArticle(id) {
      this.xRemoveArticleById({
        id: id
      }).then((res) => {
        this.$message({
          message: '文章删除成功',
          type: 'success'
        })
        this.getManageArticles()
      }).catch((res) => {
        this.$message.error(res.message)
      })
    }
  },
  components: {
    PageNav
  },
  created() {
    this.getManageArticles()
  }
}
</script>

<style>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
