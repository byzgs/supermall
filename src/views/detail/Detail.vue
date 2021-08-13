<template>
  <div id="detail">
   <detail-nav-bar class="detail-nav" @titleClick='titleClick'/>
   <scroll class="content" ref="detailscroll">
     <detail-swiper :top-images='topImages'/>
     <detail-base-info :goods='goods'/>
     <detail-shop-info :shop='shop'/>
     <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'/>
     <detail-param-info :paramInfo='paramInfo'/>
     <detail-comment-info :commentInfo='commentInfo'/>
     <goods-list :goods='recommends'/>
   </scroll>
  </div>
</template>

<script>
import DetailNavBar from './detailComponents/DetailNavBar'
import DetailSwiper from './detailComponents/DetailSwiper'
import DetailBaseInfo from './detailComponents/DetailBaseInfo'
import DetailShopInfo from './detailComponents/DetailShopInfo'
import DetailGoodsInfo from './detailComponents/DetailGoodsInfo'
import DetailParamInfo from './detailComponents/DetailParamInfo'
import DetailCommentInfo from './detailComponents/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail,GoodsInfo,Shop,GoodsParam,getRecommend } from 'network/detail'
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
      themeTopYs: [0,1000,2000,3000]
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  methods: {
    //监听底下图片加载完了，给scroll高度
    imageLoad() {
      this.$refs.detailscroll.refesh()
    },
    titleClick(index) {
      this.$refs.detailscroll.scrollTo(0, -this.themeTopYs[index],200)
    }
  },
  // created() {
  // // this.$refs.detailScroll.refesh()
  //   //保存传入的iid
  //   this.iid = this.$route.params.iid
  //   //根据iid请求详情数据
  //   getDetail(this.iid).then(res => {
  //     const data = res.data.result

  //     //1.获取顶部的图片轮播数据
  //     this.topImages = data.itemInfo.topImages

  //     //2.获取商品信息！
  //     this.goods = 
  //       new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
  //     // console.log(res.data);
  //     // console.log(this.topImages);
  //     // console.log(this.iid);
  //     // console.log(this.goods);

  //     //3.创建店铺信息
  //     this.shop = new Shop(data.shopInfo)
  //     // console.log(this.shop);

  //     //4.获取商品详细信息
  //     this.detailInfo = data.detailInfo

  //     //5.获取参数信息
  //     this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

  //     //6.取出评论信息
  //     if(data.rate.cRate !== 0) {
  //       this.commentInfo = data.rate.list[0]
  //     }
  //   })
  //   //请求推荐数据
  //   getRecommend().then(res => {
  //     this.recommends = res.data.data.list
  //     // console.log(this.recommends);
  //   })
  // },
  mounted() {
    //1.监听item中图片加载完成并且refresh重新设置可滚动高度
    let debounceRefresh = debounce(this.$refs.detailscroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      debounceRefresh();
    });
  },
  activated() {
    // this.$refs.detailScroll.refesh()
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.data.result

      //1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      //2.获取商品信息！
      this.goods = 
        new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      // console.log(res.data);
      // console.log(this.topImages);
      // console.log(this.iid);
      // console.log(this.goods);

      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo)
      // console.log(this.shop);

      //4.获取商品详细信息
      this.detailInfo = data.detailInfo

      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6.取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list
      // console.log(this.recommends);
    })
  },
  deactived() {
    this.iid = null
    console.log('不活跃了');
  },
  destroyed() {
    this.iid = null
    console.log('销毁了');
  }
  ,
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
  height: calc(100% - 44px);
}

</style>