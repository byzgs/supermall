import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
//给事件总线赋值vue实例
Vue.prototype.$bus = new Vue()
//安装自定义的toast插件
Vue.use(toast)
Vue.config.productionTip = false
//解决移动端300ms延迟
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
//图片懒加载插件的引入 可以跟参数
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/lazyload.gif')
})
