import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/index'
import channelManagement from '@/pages/channels_and_products/channelManagement.vue'
import productManagement from '@/pages/channels_and_products/productManagement.vue'
import stateManagement from '@/pages/basic_information/stateManagement.vue'
import logisticsProcess from '@/pages/basic_information/logisticsProcess.vue'
import basicConfig from '@/pages/basic_configuration/basicConfig.vue'
import vendorsConfig from '@/pages/basic_configuration/vendorsConfig.vue'
import organizationConfig from '@/pages/basic_configuration/organizationConfig.vue'
import userConfig from '@/pages/basic_configuration/userConfig.vue'
import revenueCostClass from '@/pages/basic_configuration/revenueCostClass.vue'
import cargoGoodsClass from '@/pages/basic_configuration/cargoGoodsClass.vue'
import customerManagement from '@/pages/customer_management/customerManagement.vue'
import orderManagement from '@/pages/order_management/orderManagement.vue'
import exceptionHandling from '@/pages/customer_service/exceptionHandling.vue'
import T_R from '@/pages/customer_service/t_r.vue'

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
      children:[ 
                 {
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
                 },{
                   path: '/organization-config',name:'organizationConfig',
                   component: organizationConfig  //组织角色
                 },{
                  path: '/user-config',name:'userConfig',
                  component: userConfig  //用户配置
                 },{
                   path: '/revenue-cost-class',name:'revenueCostClass',
                   component: revenueCostClass  //收益成本分类
                 },{
                   path: '/cargo-goods-class',name:'cargoGoodsClass',
                   component: cargoGoodsClass  //收益成本分类
                 },{
                  path: '/customer-management',name:'customerManagement',
                  component: customerManagement  //客户管理
                 },{
                  path: '/order-management',name:'orderManagement',
                  component: orderManagement  //订单管理
                 },{
                  path: '/exception-handling',name:'exceptionHandling',
                  component: exceptionHandling  //订单管理
                 },{
                  path: '/t-r',name:'T_R',
                  component: T_R  //货态
                 },
      ]
    }
  ]
})

export default router 
