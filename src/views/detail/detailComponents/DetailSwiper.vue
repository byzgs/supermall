<template>
  <div id="detail-swiper">
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
        <img :src="item" alt="">
      </swiper-item> 
    </swiper>

  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  /* height: 300px; */
  width: 100%;
}
.detail-swiper img {
  width: 100%;
  height: 300px;
}
</style>