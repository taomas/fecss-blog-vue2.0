<template>
  <div class="home-container ly-row-flex">
    <AsideLeft></AsideLeft>
    <router-view></router-view>
    <AsideRight></AsideRight>
    <Prograssbar></Prograssbar>
  </div>
</template>

<script>
import AsideLeft from '../components/AsideLeft'
import AsideRight from '../components/AsideRight'
import Prograssbar from '../components/Prograssbar'

export default {
  name: 'home',
  components: {
    AsideLeft,
    AsideRight,
    Prograssbar
  }
}
</script>

<style>
@import '../assets/css/index';
@import '../assets/css/marked';

.home-container {
  position: relative;
  width: 1120px;
  padding: 80px 0 30px;
  margin: 0 auto;
}
</style>
