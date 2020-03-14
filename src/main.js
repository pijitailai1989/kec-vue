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
import { Input , Select,Option ,Button ,Checkbox,Table,Tabs,TabPane,
  TableColumn,Popover,Radio,RadioGroup,Tooltip,Dropdown,DropdownMenu,DropdownItem,Tag,
  Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,Tree,Message,Pagination,DatePicker,Switch
} from "element-ui";
import i18n from './i18n/i18n'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'default-passive-events'
import VueCookies from 'vue-cookies'
import {checkParam , checkSubmit} from './directive'
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Option)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Popover)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(DatePicker)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tree)
Vue.use(Pagination)
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}
Vue.use(Message)

Vue.config.productionTip = false
/* eslint-disable no-new */
// Vue.use(VueCookies)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
