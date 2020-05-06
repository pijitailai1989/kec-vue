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
const receivableBill     = ()=>import( '@/pages/customer_management/receivableBill.vue')
const costTable          = ()=>import( '@/pages/vendor_management/costTable.vue')
const copeBill          = ()=>import( '@/pages/vendor_management/copeBill.vue')

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
      meta : { authority: '/home' , keepAlive: false },
      children:[ 
                {
                  path: '/receivable-bill',name:'receivableBill',
                  meta : { authority: '/product/channel' , keepAlive: false },
                  component: receivableBill   //应收账单
                },
                {
                  path: '/cope-bill',name:'copeBill',
                  meta : { authority: '/product/channel' , keepAlive: false },
                  component: copeBill   //应付账单
                },
                 {
                  path: '/channel-management',name:'channelManagement',
                  meta : { authority: '/product/channel' , keepAlive: false },
                  component: channelManagement   //渠道管理
                 },{
                   path: '/product-management',name:'productManagement',
                   meta : { authority: '/product' , keepAlive: false },
                   component: productManagement   //产品管理
                 },{
                  path: '/quote-manager',name:'quoteManager',
                  meta : { authority: '/product/channel' , keepAlive: false },
                  component: quoteManager   //报价管理
                 },{
                   path: '/state-management',name:'stateManagement',
                   meta : { authority: '' , keepAlive: false },
                   component: stateManagement  //状态管理
                 },{
                   path: '/logistics-process',name:'logisticsProcess',
                   meta : { authority: '' , keepAlive: false },
                   component: logisticsProcess  //物流流程
                 },{
                   path: '/basic-config',name:'basicConfig',
                   meta : { authority: '/common/settings' , keepAlive: false },
                   component: basicConfig  //基本配置
                 },{
                   path: '/vendors-config',name:'vendorsConfig',
                   meta : { authority: '/business/vendor' , keepAlive: false },
                   component: vendorsConfig  //供应商配置
                 },{
                   path: '/organization-config',name:'organizationConfig',
                   meta : { authority: '/admin/settings' , keepAlive: false },
                   component: organizationConfig  //组织角色
                 },{
                  path: '/user-config',name:'userConfig',
                  meta : { authority: '/admin/user/auth' , keepAlive: false },
                  component: userConfig  //用户配置
                 },{
                   path: '/revenue-cost-class',name:'revenueCostClass',
                   meta : { authority: '/accounting/subject' , keepAlive: false },
                   component: revenueCostClass  //收益成本分类
                 },{
                   path: '/cargo-goods-class',name:'cargoGoodsClass',
                   meta : { authority: '/accounting/subject' , keepAlive: false },
                   component: cargoGoodsClass  //品类设置
                 },{
                  path: '/customer-management',name:'customerManagement',
                  meta : { authority: '/business/customer' , keepAlive: false },
                  component: customerManagement  //客户管理
                 },{
                  path: '/order-management',name:'orderManagement',
                  meta : { authority: '/business' , keepAlive: false },
                  component: orderManagement  //订单管理
                 },{
                  path: '/exception-handling',name:'exceptionHandling',
                  meta : { authority: '/business/customer/care' , keepAlive: false },
                  component: exceptionHandling  //订单管理
                 },{
                  path: '/t-r',name:'T_R',
                  meta : { authority: '/common/settings/standardState' , keepAlive: false },
                  component: T_R  //货态
                 },{
                  path: '/fidle-config',name:'fidleConfig',
                  meta : { authority: '/common/rule/code' , keepAlive: false },
                  component: fidleConfig  //额外字段配置
                 },{
                  path: '/contract-management',name:'contractManagement',
                  meta : { authority: '/business/agreement' , keepAlive: false },
                  component: contractManagement  //合同管理
                 },{
                  path: '/exchange-table',name:'exchangeTable',
                  meta : { authority: '/product/product-quotations' , keepAlive: false },
                  component: exchangeTable  //汇率表
                 },{
                  path: '/cost-table',name:'costTable',
                  meta : { authority: '/business/cost-statements' , keepAlive: false },
                  component: costTable  //成本表
                 },
      ]
    }
  ]
})

export default router 
