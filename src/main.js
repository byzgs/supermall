import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import vueSwiper from 'vue-awesome-swiper';
// import 'assets/css/swiper-bundle.css';
// Vue.use(vueSwiper)

Vue.config.productionTip = false

//给事件总线赋值vue实例
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
