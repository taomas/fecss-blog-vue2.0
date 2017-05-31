<template>
  <div class="admin-editor">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mavon-editor">
      <input type="text" class="article-title" placeholder="请输入文章名" v-model="title"/>
      <input type="text" class="article-tag" placeholder="请输入标签" v-model="tags"/>
      <div class="editor-content">
        <mavon-editor style="height: 100%"
        :scrollStyle="true"
        @save="onSave"></mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'editor',
  data() {
    return {
      title: '',
      tags: ''
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
    ...mapActions(['createArticle']),
    onSave(value, render) {
      let options = {
        title: this.title,
        tags: this.tags,
        source: value,
        render: render
      }
      this.saveArticle(options)
      console.log(value, render)
    },
    saveArticle(options) {
      this.createArticle(options)
    }
  },
  components: {
    mavonEditor
  }
}
</script>
<style lang="postcss" scoped>
.admin-editor {
  margin: auto;
  width: 100%;
  height: 100%;
  .breadcrumb {
    margin-bottom: 20px;
  }
  .mavon-editor {
    width: 100%;
    height: 90%;
    .article-title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      font-size: 16px;
      margin-bottom: 10px;
      outline: none;
    }
    .article-tag {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      font-size: 16px;
      margin-bottom: 10px;
      outline: none;
    }
    .editor-content {
      width: 100%;
      height: 90%;
    }
  }
}

</style>
