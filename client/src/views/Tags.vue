<template>
  <div class="home-container ly-row-flex">
    <AsideLeft></AsideLeft>
    <TagsList></TagsList>
    <AsideRight></AsideRight>
  </div>
</template>

<script>
import AsideLeft from '../components/AsideLeft'
import AsideRight from '../components/AsideRight'
import TagsList from '../components/TagsList'

export default {
  name: 'home',
  components: {
    AsideLeft,
    AsideRight,
    TagsList
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
