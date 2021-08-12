<template>
  <div class="wrapper">
    <ul class="content">
      <button @click="btnclick">按钮</button>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
  </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: 'Category',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
   this.scroll = new BScroll('.wrapper',{
     //pribe:侦测 -->因为默认0不侦测 1不侦测 2之侦测手指滚动过程，不侦测关系
     // 3 --> 只要是滚动都侦测
     probeType: 3,
     //pullUpLoad做上拉加载更多要搞
     pullUpLoad: true
     //click设置里面的点击，默认关
   })

   this.scroll.on('scroll',(position) => {
    //  console.log(position);
   })
   this.scroll.on('pullingUp',() => {
     console.log('上拉加载更多');
     setTimeout(() => {
       //设置这个finishPullUp()才能再次加载更多，默认只能一次
       this.scroll.finishPullUp()
     },2000)
   })
  },
  methods: {
    btnclick() {
      console.log('点击了');
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>