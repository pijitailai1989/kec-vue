// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import './assets/css/animate.css'
import './assets/iconfonts/iconfont.css'
import './assets/font-awesome/css/font-awesome.min.css'
import store from './vuex/store'
import Element from 'element-ui'
import i18n from './i18n/i18n'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueCookies from 'vue-cookies'
import {checkParam , checkSubmit} from './directive'


Vue.config.productionTip = false
Vue.use(Element);
/* eslint-disable no-new */
Vue.use(VueCookies)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
