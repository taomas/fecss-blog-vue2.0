<template>
  <div class="archive-container ly-col-14">
    <h1 class="archive-head-title">分类</h1>
    <transition name="fadeIn"
      v-show="showLoading === false">
      <section class="archive-wrap">
        <div class="archive">
          <template v-for="(value, key) in archives">
            <h2 class="archive-year">{{key}}</h2>
            <ul class="archive-list">
              <li class="archive-item" v-for="item in value">
                <span class="post-time">{{item.createTime}}</span>
                <router-link class="post-title-link"
                  :to="{name: 'page', params: {id: item._id}}">
                    {{item.title}}
                  </router-link>
              </li>
            </ul>
          </template>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      archiveArticles: 'archiveArticles',
      showLoading: 'showLoading'
    }),
    archives () {
      let archiveArticles = this.archiveArticles
      let ans = {}
      for (let i in archiveArticles) {
        let time = archiveArticles[i].createTime.split('-')[0]
        if (!ans.hasOwnProperty(time)) {
          ans[time] = [archiveArticles[i]]
        } else {
          ans[time].push(archiveArticles[i])
        }
      }
      return ans
    }
  },
  methods: {
    ...mapActions(['getArchiveArticles'])
  },
  created () {
    this.getArchiveArticles()
  }
}
</script>

<style scoped>
@import '../assets/css/animate.css';
.archive-container {
  box-sizing: border-box;
  min-height: 435px;
  margin-left: 30px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.12);
}

.archive-head-title {
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

.archive-wrap {
  padding: 0 30px 30px 30px;
}

.archive {
  border-left: 2px solid #42b983;
  .archive-year {
    position: relative;
    padding-left: 10px;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 12px;
      width: 10px;
      height: 10px;
      margin-left: -6px;
      background: #42b983;
      border-radius: 50%;
      border: 1px solid #fff;
    }
  }
  .archive-list {
  }
  .archive-item {
    position: relative;
    padding: 10px 0;
    border-bottom: 1px dashed #ccc;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 20px;
      width: 6px;
      height: 6px;
      margin-left: -4px;
      background: #42b983;
      border-radius: 50%;
      border: 1px solid #fff;
      transition: all 0.3s;
    }
    &:hover {
      &::before {
        background: #11a763;
      }
      & {
        border-bottom: 1px dashed #aaa;
      }
    }
    .post-time {
      position: absolute;
      left: 26px;
      top: 12px;
      font-size: 14px;
    }
    .post-title-link {
      display: block;
      font-size: 16px;
      margin-left: 140px;
      color: #42b983;
    }
  }
}
</style>
