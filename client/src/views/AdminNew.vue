<template>
  <div class="admin-container">
    <div class="header ly-row-flex flex-space-between">
      <h1 class="title">后台管理系统</h1>
      <div class="user-wrap ly-row-flex flex-start flex-middle">
        <img class="user-avatar" src="../assets/image/avatar.jpg"></img>
        <span class="user-name">admin</span>
      </div>
    </div>
    <div class="main ly-row-flex flex-start">
      <ul class="menu-list ly-col-flex flex-start">
        <li class="menu-item">
          <i class="el-icon-document"></i>
          文章</li>
        <li class="menu-item">
          <i class="el-icon-edit"></i>
          编辑</li>
        <li class="menu-item">
          <i class="el-icon-plus"></i>
          创建</li>
      </ul>
      <div class="manage-content">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    filterTag(value, row) {
      return row.tag === value
    }
  }
}
</script>

<style lang="postcss">
@import '../assets/css/index';

.admin-container {
  width: 100%;
  height: 100%;
  background: #fff;
  .header {
    width: 100%;
    height: 70px;
    font-size: 22px;
    background: #00d1b2;
    .title {
      width: 250px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      margin: 0;
      font-size: 22px;
      color: #fff;
    }
    .user-wrap {
      width: 120px;
      height: 70px;
      .user-avatar {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 100%;
        cursor: pointer;
      }
      .user-name {
        margin-left: 10px;
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .main {
    width: 100%;
    height: calc(100% - 70px);
    .menu-list {
      width: 250px;
      height: 100%;
      border-right: 1px solid #ccc;
      background: #fff;
      .menu-item {
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        padding: 0 20px;
        line-height: 56px;
        font-size: 14px;
        color: #486a6a;
        cursor: pointer;
        i {
          margin-right: 10px;
        }
        &:hover {
          background: #d1e5e5;
        }
      }
    }
    .manage-content {
      box-sizing: border-box;
      width: calc(100% - 250px);
      height: 100%;
      padding: 20px 40px;
      .breadcrumb {
        margin-bottom: 20px;
      }
    }
  }
}
</style>

