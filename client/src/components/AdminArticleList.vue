<template>
  <div class="article-list">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manage-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="280">
        </el-table-column>
        <el-table-column prop="tag" label="标签" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag">
          <template scope="scope">
            <el-tag :type="scope.row.tag === 'vue' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      tableData: [{
        date: '2016-05-02',
        name: 'javascript学习指南javascript学习指南',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: 'javascript'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: 'vue'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: 'javascript'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: 'vue'
      }]
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
    filterTag(value, row) {
      return row.tag === value
    },
    handleEdit() {
      this.$notify.info({
        title: '消息',
        message: '这是一条消息的提示消息'
      })
    }
  },
  components: {
    PageNav
  },
  created() {
    this.getAdminArticles()
  }
}
</script>

<style>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
