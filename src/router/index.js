import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/index'

const channelManagement  = ()=>import( '@/pages/channels_and_products/channelManagement.vue')
const productManagement  = ()=>import( '@/pages/channels_and_products/productManagement.vue')
const quoteManager       = ()=>import( '@/pages/channels_and_products/quoteManager.vue')
const stateManagement    = ()=>import( '@/pages/basic_information/stateManagement.vue')
const logisticsProcess   = ()=>import( '@/pages/basic_information/logisticsProcess.vue')
const basicConfig        = ()=>import( '@/pages/basic_configuration/basicConfig.vue')
const vendorsConfig      = ()=>import( '@/pages/vendor_management/vendorsConfig.vue')
const organizationConfig = ()=>import( '@/pages/basic_configuration/organizationConfig.vue')
const userConfig         = ()=>import( '@/pages/basic_configuration/userConfig.vue')
const revenueCostClass   = ()=>import( '@/pages/basic_configuration/revenueCostClass.vue')
const cargoGoodsClass    = ()=>import( '@/pages/basic_configuration/cargoGoodsClass.vue')
const customerManagement = ()=>import( '@/pages/customer_management/customerManagement.vue')
const orderManagement    = ()=>import( '@/pages/order_management/orderManagement.vue')
const exceptionHandling  = ()=>import( '@/pages/customer_service/exceptionHandling.vue')
const T_R                = ()=>import( '@/pages/customer_service/t_r.vue')
const fidleConfig        = ()=>import( '@/pages/fidle_configuration/fidleConfig.vue')
const contractManagement = ()=>import( '@/pages/customer_management/contractManagement.vue')
const exchangeTable      = ()=>import( '@/pages/customer_management/exchangeTable.vue')
const costTable          = ()=>import( '@/pages/vendor_management/costTable.vue')

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
                  path: '/quote-manager',name:'quoteManager',
                  component: quoteManager   //报价管理
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
                 },{
                  path: '/fidle-config',name:'fidleConfig',
                  component: fidleConfig  //额外字段配置
                 },{
                  path: '/contract-management',name:'contractManagement',
                  component: contractManagement  //合同管理
                 },{
                  path: '/exchange-table',name:'exchangeTable',
                  component: exchangeTable  //汇率表
                 },{
                  path: '/cost-table',name:'costTable',
                  component: costTable  //成本表
                 },
      ]
    }
  ]
})

export default router 
