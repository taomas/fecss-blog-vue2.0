<template>
  <div class="article-container ly-col-14">
    <article class="article-wrap">
      <h1 class="article-head-title">{{article.title}}</h1>
      <ul class="article-nav-list">
        <li class="article-nav-item">
          <i class="icon-calendar ion-clock"></i>
          {{article.createTime}}
        </li>
      </ul>
      <p class="article-content markdown-body"
        v-html="article.render">
      </p>
    </article>
  </div>
</template>

<script>
import PageNav from './PageNav'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      article: {}
    }
  },
  computed: {
    ...mapGetters({
      articleDetail: 'articleDetail'
    }),
    articleId () {
      return this.$route.params.id
    }
  },
  watch: {
    articleId() {
      this.getArticleDetail()
    }
  },
  methods: {
    ...mapActions({
      xGetArticleDetail: 'getArticleDetail'
    }),
    getArticleDetail() {
      this.xGetArticleDetail({
        id: this.articleId
      }).then((res) => {
        this.article = res.data.detail
      })
    }
  },
  components: {
    'page-nav': PageNav
  },
  created () {
    this.getArticleDetail()
  }
}
</script>

<style scoped>
.article-container {
  box-sizing: border-box;
  margin-left: 30px;
  min-height: 435px;
  padding: 30px 20px;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
}

.article-wrap {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 30px;
  transition: all 0.3s;
  word-break: break-all;
}

.transition-show {
  opacity: 1;
}

.article-head-title {
  font-size: 36px;
  line-height: 42px;
  font-weight: 400;
  margin: 0 0 15px 0;
}

.article-nav-list {
  margin-bottom: 30px;
}

.article-nav-item {
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
}

.article-content {
  margin: 0;
  font-size: 14px;
  line-height: 20pt;
}

</style>
