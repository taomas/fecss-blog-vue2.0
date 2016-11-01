<template>
  <div class="tags-container ly-col-14">
    <h1 class="tags-head-title">标签</h1>
    <div class="tags-wrap"
      transition="fadeIn"
      v-show="showLoading === false">
      <h2 class="tags-title">目前共计{{tagsList.length}}个标签</h2>
      <div class="tags">
        <ul class="tags-list ly-row-flex">
          <li class="tags-item"
            v-for="item in tagsList">
            <router-link :to="{name: 'tagsContent', params: {id: item}}">
              {{item}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      tagsList: 'tagsList',
      showLoading: 'showLoading'
    })
  },
  methods: {
    ...mapActions(['getTagsList'])
  },
  created () {
    this.getTagsList()
  }
}
</script>

<style scoped>
@import '../assets/css/animate.css';
.tags-container {
  min-height: 435px;
  margin-left: 30px;
  border-radius: 5px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.12);
  background: #fff;
  .tags-head-title {
    box-sizing: border-box;
    width: 100%;
    height: 55px;
    line-height: 55px;
    font-size: 16px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.4);
    padding: 0 30px;
    margin: 0;
    border-bottom: 1px solid #eee;
  }
  .tags-title {
    text-align: center;
  }
  .tags {
    box-sizing: border-box;
    padding: 30px;
    .tags-list {
      .tags-item {
        margin-right: 30px;
        text-decoration: underline;
        cursor: pointer;
        a {
          color: #000;
        }
      }
    }
  }
}
</style>
