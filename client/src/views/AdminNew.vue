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
          <router-link :to="{name: 'adminArticleList'}" :class="{'active': routerName === 'adminArticleList'}">
            <i class="el-icon-document"></i>
            文章
          </router-link>
        </li>
        <li class="menu-item">
          <router-link :to="{name: 'adminEditor'}" :class="{'active': routerName === '123'}">
            <i class="el-icon-edit"></i>
            编辑
          </router-link>
        </li>
        <li class="menu-item">
          <router-link :to="{name: 'adminEditor'}" :class="{'active': routerName === 'adminEditor'}">
            <i class="el-icon-plus"></i>
            创建
          </router-link>
        </li>
      </ul>
      <div class="manage-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    routerName() {
      return this.$route.name
    }
  },
  methods: {
  },
  components: {
  },
  created() {
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
        a {
          display: block;
          width: 100%;
          height: 100%;
          color: #486a6a;
          &.active {
            color: #00d1b2;
          }
        }
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
      overflow: scroll;
      .breadcrumb {
        margin-bottom: 20px;
      }
    }
  }
}
</style>

