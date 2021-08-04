<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
    <feature-view /> 
    <tab-control :tittles="['流行','新款','精选']" class="tab-control" />
    <ol>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
      <li>'a'</li>
    </ol>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView"

import NavBar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl';

import { getHomeMultidata } from "network/home";
export default {
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: [],
      dKeywords: [],
      keywords: [],
    };
  },
  
  methods: {
    
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
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: var(--color-fff);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>