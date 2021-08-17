<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{cartLength}})
      </div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list :cart-list="cartList"/>
    <!-- 底部汇总 -->
    <bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import BottomBar from './childComps/BottomBar'

//导入mapGetters辅助函数
import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    //vuex 辅助函数mapGetters两种语法 --> 1.如果不改名，就用数组
    ...mapGetters(['cartLength','cartList']),
    //                       --> 2.如果要改名，就用对象
    /*
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
    */
  }
};
</script>

<style scoped>
  .cart {
    height: 100vh;
    /* position: relative; */
  }
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>