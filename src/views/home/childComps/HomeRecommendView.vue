<template>
  <div class="home-recommend-view">
    <div v-for="(item,index) in recommends" :key="index" class="home-recommend-view-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="home-recommend-view-item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name:"HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },

}
</script>

<style>
.home-recommend-view {
  display: flex;
  width: 100%;
  font-size: 12px;
  justify-content: space-evenly;
  padding: 10px 0 30px;
  border-bottom: 8px solid #eee;
}
.home-recommend-view-item {
  /* flex: 1; */
  text-align: center;
}
.home-recommend-view-item img {
  width: 90%;
}
.home-recommend-view-item-text {
  text-align: center;
}
</style>