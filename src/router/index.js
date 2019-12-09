import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/index'
import channelManagement from '@/pages/channels_and_products/channelManagement.vue'
import productManagement from '@/pages/channels_and_products/productManagement.vue'
import stateManagement from '@/pages/basic_information/stateManagement.vue'
import logisticsProcess from '@/pages/basic_information/logisticsProcess.vue'
import basicConfig from '@/pages/basic_configuration/basicConfig.vue'
import vendorsConfig from '@/pages/basic_configuration/vendorsConfig.vue'

Vue.use(Router)

const router = new Router({
 
  routes: [
    {
      path:'/',
      redirect:'/login'
    },{
      path:'/login',name:'login',
      component: login => require(['@/pages/login/index'],login)
    },{
      path: '/home',
      component: home => require(['@/pages/home/index'], home),
      children:[,{
                  path: '/channel-management',name:'channelManagement',
                  component: channelManagement   //渠道管理
                 },{
                   path: '/product-management',name:'productManagement',
                   component: productManagement   //产品管理
                 },{
                  path: '/state-management',name:'stateManagement',
                  component: stateManagement  //状态管理
                },{
                  path: '/logistics-process',name:'logisticsProcess',
                  component: logisticsProcess  //物流流程
                },{
                  path: '/basic-config',name:'basicConfig',
                  component: basicConfig  //基本配置
                },{
                  path: '/vendors-config',name:'vendorsConfig',
                  component: vendorsConfig  //供应商配置
                }
      ]
    }
  ]
})

export default router 
