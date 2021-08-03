<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" >
        <img
          slot="item-icon"
          src="~assets/img/tabbarimg/storefill.png"
          alt=""
        />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbarimg/storefill_active.png"
          alt=""
        />
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/category" >
        <img slot="item-icon" src="~assets/img/tabbarimg/all.png" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbarimg/all_active.png"
          alt=""
        />
        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/cart" >
        <img
          slot="item-icon"
          src="~assets/img/tabbarimg/cart-Empty.png"
          alt=""
        />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbarimg/cart-Empty_active.png"
          alt=""
        />
        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/profile" >
        <img
          slot="item-icon"
          src="~assets/img/tabbarimg/bussiness-man.png"
          alt=""
        />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbarimg/bussinessman_active.png"
          alt=""
        />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>