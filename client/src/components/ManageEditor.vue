<template>
  <div class="manage-editor">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.articleId ? '编辑' : '创建'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mavon-editor">
      <input type="text" class="article-title" placeholder="请输入文章名" v-model="title"/>
      <input type="text" class="article-tag" placeholder="请输入标签" v-model="tags"/>
      <div class="editor-content">
        <mavon-editor style="height: 100%"
        :value="source"
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
      tags: '',
      source: '',
      render: '',
      detail: {}
    }
  },
  computed: {
    ...mapGetters({
      startIndex: 'startIndex',
      articleList: 'articleList',
      manageArticles: 'manageArticles'
    }),
    articleId() {
      return this.$route.query.id || ''
    }
  },
  methods: {
    ...mapActions({
      xCreateArticle: 'createArticle',
      xGetArticleDetail: 'getArticleDetail',
      xEditArticle: 'editArticle'
    }),
    onSave(value, render) {
      let options = {
        title: this.title,
        tags: this.tags,
        source: value,
        render: render
      }
      this.$alert('是否确认发布', '确认发布', {
        confirmButtonText: '确定',
        callback: action => {
          if (this.articleId) {
            this.editArticle(options)
          } else {
            this.createArticle(options)
          }
        }
      })
    },
    editArticle(options) {
      this.xEditArticle({
        articleId: this.articleId,
        articleDetail: options
      }).then((res) => {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
        this.$router.push({name: 'home'})
      }).catch((message) => {
        this.$message.error(message)
      })
    },
    createArticle(options) {
      this.xCreateArticle(options)
        .then((res) => {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.$router.push({name: 'home'})
        }).catch((message) => {
          this.$message.error(message)
        })
    },
    getArticleDetail() {
      this.xGetArticleDetail({
        id: this.articleId
      }).then((res) => {
        this.detail = res.data
      }).catch((message) => {
        this.$message.error(message)
      })
    }
  },
  watch: {
    detail(newVal) {
      if (newVal) {
        this.title = newVal.title
        this.tags = newVal.tags
        this.source = newVal.source
        this.render = newVal.render
      }
    }
  },
  components: {
    mavonEditor
  },
  created() {
    this.$nextTick(() => {
      if (this.articleId) {
        this.getArticleDetail()
      }
    })
  }
}
</script>
<style lang="postcss" scoped>
.manage-editor {
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
