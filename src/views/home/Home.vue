<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommendView from "./childComps/HomeRecommendView"
import { getHomeMultidata } from "network/home";
export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      dKeywords: [],
      keywords: [],
    };
  },
  // mounted() {
  //   const mySwiper = new Swiper(".swiper01", {
  //     observer: true,
  //     autoplay: true,
  //     loop: true,
  //   });
  // },
  methods: {
    // _initSwiper() {
    //   var mySwiper = new Swiper('.swiper-container',{
    //     direction: 'horizontal',
    //     loop: true,
    //     pagination: {
    //       el: '.swiper-pageination',
    //     }
    //   })
    // }
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then((res) => {
      // console.log(res);
      // this.result = res;
      //这里的this时created的，
      // 用于存储res（否则会被垃圾回收机制在函数调用结束后回收）
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
      this.dKeywords = res.data.data.dKeyword.list;
      this.keywords = res.data.data.keywords.list;
    });
  },
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: var(--color-fff);
}

</style>