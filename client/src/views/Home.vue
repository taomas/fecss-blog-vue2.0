<template>
  <div class="home-container ly-row-flex">
    <AsideLeft></AsideLeft>
    <!-- <PageArticle></PageArticle> -->
  </div>
</template>

<script>
import AsideLeft from '../components/AsideLeft'
import PageArticle from '../components/PageArticle'

export default {
  name: 'home',
  components: {
    AsideLeft,
    PageArticle
  },
  ready () {
  }
}
</script>

<style>
@import '../assets/css/index';

.home-container {
  position: relative;
  width: 1120px;
  padding: 80px 0 30px;
  margin: 0 auto;
}
</style>
