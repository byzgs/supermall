import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import vueSwiper from 'vue-awesome-swiper';
// import 'assets/css/swiper-bundle.css';
// Vue.use(vueSwiper)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
