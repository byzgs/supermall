<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      ref="detailNavBar"
      @titleClick="titleClick"
    />
    <scroll
      class="content"
      ref="detailscroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top
      @click.native="backClick"
      v-show="isShowBackTop"
      style="bottom: 58px"
    />
  </div>
</template>

<script>
import DetailNavBar from "./detailComponents/DetailNavBar";
import DetailSwiper from "./detailComponents/DetailSwiper";
import DetailBaseInfo from "./detailComponents/DetailBaseInfo";
import DetailShopInfo from "./detailComponents/DetailShopInfo";
import DetailGoodsInfo from "./detailComponents/DetailGoodsInfo";
import DetailParamInfo from "./detailComponents/DetailParamInfo";
import DetailCommentInfo from "./detailComponents/DetailCommentInfo";
import DetailBottomBar from "./detailComponents/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      detailNavBarIndex: 0,
      isShowBackTop: false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
  },
  methods: {
    //监听底下图片加载完了，给scroll高度
    imageLoad() {
      this.$refs.detailscroll.refresh();

      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    //监听滚动 --> 根据滚动的事件
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.detailNavBarIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.detailNavBarIndex = i;
          this.$refs.detailNavBar.currentIndex = this.detailNavBarIndex;
        }
      }

      //判断是否显示backTop
      if (positionY >= 1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
      // console.log(this.detailNavBarIndex);
    },
    //点击了标题 --> 标题事件
    titleClick(index) {
      this.$refs.detailscroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    //回到顶部  --> 取巧了，等同于点击了第一个标题
    backClick() {
      this.titleClick(0);
    },
    //加入购物车
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.count = 1;
      // product.value = true;
      //2.将商品添加购物车里
      //--> 搭配mutations,commit
      // this.$store.commit('addCart',product)
      this.$store.dispatch("addCart", product).then(res => {
        console.log(res);
      })
    },
  },
  mounted() {
    //1.监听item中图片加载完成并且refresh重新设置可滚动高度
    let debounceRefresh = debounce(this.$refs.detailscroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      debounceRefresh();
    });
  },
  activated() {
    // this.$refs.detailScroll.refresh()
    //保存传入的iid
    this.iid = this.$route.params.iid;
    //根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.data.result;

      //0.确保一进来在最上面
      this.$refs.detailscroll.scrollTo(0, 0, 0);
      //1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息！
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(res.data);
      // console.log(this.topImages);
      // console.log(this.iid);
      // console.log(this.goods);

      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo);
      // console.log(this.shop);

      //4.获取商品详细信息
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(() => {
      //   //图片还没加载完 offsettop不包含图片
      //   //值不对
      //   if(this.themeTopYs != []) {
      //     this.themeTopYs = []
      //   }
      //     this.themeTopYs.push(0);
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      //   console.log(this.themeTopYs);
      // })
    });
    //请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
      // console.log(this.recommends);
    });
  },
  deactived() {
    this.iid = null;
    console.log("不活跃了");
  },
  destroyed() {
    this.iid = null;
    console.log("销毁了");
  },
  // deactivated() {
  //   // 返回了要重置
  //   this.iid = null
  //   // console.log(this.iid);
  // }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 58px);
}
</style>