<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        :tittles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control-hidden" v-show="isTabFixed"
      />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :tittles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
export default {
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      dKeywords: [],
      keywords: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      scrollPositionY: 0,
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /*
    事件监听相关方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //点tabbar2不滚动
        if(this.$refs.tabControl2.currentIndex != index) {
          this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 0);
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
        // this.isTabFixed = this.isTabFixed
        
        
      
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      //1.判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000;
      //2.决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      //加载更多
      this.getHomeGoods(this.currentType);
      //手动加一个加载后重新计算可滚动区域的高度，
      //避免网速慢图片加载不出来，设置高度出错
      this.$refs.scroll.refresh();
    },
    swiperImageLoad() {
      
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      
    },

    /*
    网络请求相关方法
     */
    getHomeMultidata() {
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

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        //完成了上拉加载更多之后要重置
        this.$refs.scroll.finishPullUp();
      });
    },
    //防抖函数！封装在了utils.js里，如果没封装，用的时候this.debounce
    // debounce(func, delay) {
    //   let timer = null
    //   return function(...args) {
    //     if(timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this,args)
    //     },delay)
    //   }
    // },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //1.监听item中图片加载完成并且refresh重新设置可滚动高度
    let debounceRefresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      debounceRefresh();
    });
    //2.获取tabControl的offsetTop
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    // console.log(this.tabOffsetTop);
  },
  activated() {
    this.saveY = 0 ? 0 :this.$refs.scroll.scrollTo(0, this.saveY, 1)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    //2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',)
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: var(--color-fff);
  /* position: fixed;
  top: 0;
  left: 0;*/
  /* z-index: 99;  */
}
.tab-control-hidden {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>