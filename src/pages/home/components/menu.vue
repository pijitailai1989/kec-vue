<template>
  <div class="menu scrollbar">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :background-color="backgroundColor"
      :text-color="textColor"
      @select="selectFun">
      <template v-for="item in menuList">
        <template v-if="item.children">
           <el-submenu :index="item.id" :key="item.id" v-show="item.authorityText in isShowMenu">
             <template slot="title" style="color:#fff">
               <i :class="['fa',item.icon]"></i>
               <span class="menu-span">{{menu[item.title]}}</span>
             </template>
              <el-menu-item :style="{'color':routerPath===todo.path?activeColor:textColor}"
              :index="todo.id" v-for="todo of item.children" :key="todo.id"
              v-show="todo.authorityText in isShowMenu"
               >
                <i :class="['fa',todo.icon]"></i>
                <span slot="title">{{menu[todo.title]}}</span>
              </el-menu-item>
           </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :style="{'color':routerPath===item.path?activeColor:textColor}"
          :index="item.id" :key="item.id" v-show="item.authorityText in isShowMenu">
            <i :class="['fa',item.icon]"></i>
            <span class="menu-span" slot="title">{{menu[item.title]}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {KecScroll }  from '@/common/components'
import {mapState,mapMutations} from 'vuex'
  export default {
    name:'HomeMenu',
    props:{
      textColor:String,
      backgroundColor:String,
      activeColor:String
    },
    data () {
      return {
         routerPath:'',
         menuList:[           {
           title:'BASIC_CONFIG',
           authorityText:'/node/commonSetting',
           children:[
             {
               title:'BASIC_CONFIG',
               authorityText:'/common/settings',
               id:'3-1',
               icon:'fa-camera-retro',
               path:'/basic-config',
               name:'basicConfig'
             },
             {
               title:'ORG_CONFIG',
               authorityText:'/admin/settings',
               id:'3-2',
               icon:'fa-camera-retro',
               path:'/organization-config',
               name:'organizationConfig',
               components:'organizationalRole',
               comName:'组织管理'
             },{
               title:'USER_CONFIG',
               authorityText:'/admin/user/auth',
               id:'3-3',
               icon:'fa-camera-retro',
               path:'/user-config',
               name:'userConfig',
               components:'userList',
               comName:'用户列表'
             },{
               title:'REVENUE_COST',
               authorityText:'/accounting/subject',
               id:'3-4',
               icon:'fa-camera-retro',
               path:'/revenue-cost-class',
               name:'revenueCostClass',
               components:'subjectsClass',
               comName:'科目设置'
             },{
               title:'CARGO_GOODS',
               authorityText:'/accounting/subject',
               id:'3-5',
               icon:'fa-camera-retro',
               path:'/cargo-goods-class',
               name:'cargoGoodsClass',
               components:'goodsClass',
               comName:'品类设置'
             }
           ],
           id:'3',
           icon:'fa-camera-retro',
           path:null
         },{
             title:'C_A_P',
             authorityText:'/node/productAndChannel',
             children:[

                {
                  title:'P_M',
                  authorityText:'/product',
                  id:'1-2',
                  icon:'fa-camera-retro',
                  path:'/product-management',
                  name:'productManagement'
                },
               {
                 title:'C_M',
                 authorityText:'/product/channel',
                 id:'1-1',
                 icon:'fa-camera-retro',
                 path:'/channel-management',
                 name:'channelManagement'
               },
               {
                 title:'Q_M',
                 authorityText:'/product/channel',
                 id:'1-3',
                 icon:'fa-camera-retro',
                 path:'/quote-manager',
                 name:'quoteManager'
               }
             ],
             id:'1',
             icon:'fa-camera-retro',
             path:null
           },
          //  {
          //    title:'BASIC_INFO',
          //    children:[
          //       {
          //         title:'STATE_M',
          //         id:'2-1',
          //         icon:'fa-camera-retro',
          //         path:'/state-management',
          //         name:'stateManagement'
          //       },{
          //         title:'LOGISTICS_P',
          //         id:'2-2',
          //         icon:'fa-camera-retro',
          //         path:'/logistics-process',
          //         name:'logisticsProcess'
          //       },
          //    ],
          //    id:'2',
          //    icon:'fa-camera-retro',
          //    path:null
          //  },
{
             title:'CUSTOMER_MANAGEMENT',
             authorityText:'/node/customer',
             children:[
                {
                  title:'CUSTOMER_LIST',
                  authorityText:'/business/customer',
                  id:'5-1',
                  icon:'fa-camera-retro',
                  path:'/customer-management',
                  name:'customerManagement',
                  components:'selectCustomer',
                  comName:'客户列表'
                },
                {
                  title:'CONTRACT_MANAGEMENT',
                  authorityText:'/business/agreement',
                  id:'5-2',
                  icon:'fa-camera-retro',
                  path:'/contract-management',
                  name:'contractManagement',
                },{
                  title:'EXCHANGE_TABLE',
                  authorityText:'/product/product-quotations',
                  id:'5-3',
                  icon:'fa-camera-retro',
                  path:'/exchange-table',
                  name:'exchangeTable',
                },
                {
                  title:'RECE_BILL',
                  authorityText:'/product/product-quotations',
                  id:'5-4',
                  icon:'fa-camera-retro',
                  path:'/receivable-bill',
                  name:'receivableBill',
                }
             ],
             id:'5',
             icon:'fa-camera-retro',
             path:null
           },{
             title:'ORDER_MANAGEMENT',
             authorityText:'/node/order',
             children:[
               {
                 title:'ORDER_LIST',
                 authorityText:'/business',
                 id:'4-1',
                 icon:'fa-camera-retro',
                 path:'/order-management',
                 name:'orderManagement'
               }
             ],
             id:'4',
             icon:'fa-camera-retro',
             path:null
           },{
             title:'CUSTOMER_SERVICE',
             authorityText:'/node/customerService',
             children:[
                {
                  title:'EX_HANDLING',
                  authorityText:'/business/customer/care',
                  id:'6-1',
                  icon:'fa-camera-retro',
                  path:'/exception-handling',
                  name:'exceptionHandling'
                },
                {
                  title:'T_R',
                  authorityText:'/common/settings/standardState',
                  id:'6-2',
                  icon:'fa-camera-retro',
                  path:'/t-r',
                  name:'T_R'
                }
             ],
             id:'6',
             icon:'fa-camera-retro',
             path:null
           },{
             title:'FINANCIAL_MANAGEMENT',
             authorityText:'',
             children:[
                {
                  title:'BILL_RECEIVABLER',
                  authorityText:'',
                  id:'7-1',
                  icon:'fa-camera-retro',
                  path:'/channel-management',
                  name:'channelManagement'
                },{
                  title:'BILL_PAYABLE',
                  authorityText:'',
                  id:'7-2',
                  icon:'fa-camera-retro',
                  path:'/channel-management',
                  name:'channelManagement'
                }
             ],
             id:'7',
             icon:'fa-camera-retro',
             path:null
           },{
             title:'VENDORS_MANAGEMENT',
             authorityText:'/node/vendor',
             children:[
                {
                  title:'VENDORS_CONFIG',
                  authorityText:'/business/vendor',
                  id:'8-1',
                  icon:'fa-camera-retro',
                  path:'/vendors-config',
                  name:'vendorsConfig',
                  components:'selectVentors',
                  comName:'供应商列表'
                },{
                  title:'COST_TABLE',
                  authorityText:'/business/cost-statements',
                  id:'8-2',
                  icon:'fa-camera-retro',
                  path:'/cost-table',
                  name:'costTable',
                },{
                  title:'COPE_BILL',
                  authorityText:'/product/product-quotations',
                  id:'8-3',
                  icon:'fa-camera-retro',
                  path:'/cope-bill',
                  name:'copeBill',
                },{
                  title:'COPE_F',
                  authorityText:'/product/product-quotations',
                  id:'8-4',
                  icon:'fa-camera-retro',
                  path:'/home',
                  name:'copeBill',
                },{
                  title:'COPE_L',
                  authorityText:'/product/product-quotations',
                  id:'8-5',
                  icon:'fa-camera-retro',
                  path:'/cost-entry',
                  name:'costEntry',
                }
             ],
             id:'8',
             icon:'fa-camera-retro',
             path:null
           },{
             title:'FIDLE_CONFIG',
             authorityText:'/node/interfaceConfig',
             children:[
                {
                  title:'FIDLE_LIST',
                  authorityText:'/common/rule/code',
                  id:'9-1',
                  icon:'fa-camera-retro',
                  path:'/fidle-config',
                  name:'fidleConfig'
                },
             ],
             id:'9',
             icon:'fa-camera-retro',
             path:null
           }

         ],
         isShowMenu:{}
      };
    },
    computed: {
      ...mapState('home',['iconType']),
      menu(){
        return this.$t('menu')
      }
    },
    methods: {
      ...mapMutations('home',['setTableTabs','setBreadcrumbArr']),
        selectFun(index,indexPath){
            const _this = this ;
            const id = indexPath[0]
            let {children} = _this.menuList.find(item => { return id == item.id })
            let item = children.find(todo => { return index == todo.id })
            item && _this.routerLinkTo(item)
        },
        routerLinkTo(item) {
          const _this = this ;
          const path = _this.$route.path;
          _this.$router.push({path:item.path})
          if(path == item.path) return ;
          let data = {
             title:item.title,
             id:item.id,
             tableIndex:true,
             path:item.path
          }
          this.setTableTabs(data) ;
          this.setBreadcrumbArr(
            [{name:_this.menu[item.title],components:item.components},
             {name:item.comName,components:item.components}]
            )
        },
        getPath() {
          const _this = this ;
          _this.routerPath = _this.$route.path ;
          _this.setTableTabs() ;
          _this.menuList.forEach(el=>{
            if(el.path === _this.routerPath && el.path){
              el.tableIndex = true ;
              _this.setTableTabs(el) ;
              this.setBreadcrumbArr([{name:_this.menu[item.title],components:item.components},
                                     {name:item.comName,components:item.components}])
              return ;
            }
            el.children.forEach(item=>{
              if(item.path === _this.routerPath){
                item.tableIndex = true ;
                _this.setTableTabs(item) ;
                this.setBreadcrumbArr([{name:_this.menu[item.title],components:item.components},
                                       {name:item.comName,components:item.components}])
                return ;
              }
            })
          })
        },

    },
    mounted() {
      this.getPath()
      let isShowMenu = JSON.parse( sessionStorage.getItem('isShowMenu') )
      isShowMenu && ( this.isShowMenu = isShowMenu )
    },
    watch: {
       '$route':'getPath',

    },

  }

</script>
<style lang='stylus' scoped>
 .menu
   height calc(100vh - 115px)
   overflow-y scroll
 .menu >>> .el-menu

   width 270px
   border-right none
   .el-submenu__icon-arrow
     -webkit-transition: -webkit-transform .1s !important
     transition: -webkit-transform .1s !important
     transition: transform .1s !important
     transition: transform .1s
     -webkit-transform .1s !important
     transition: transform .1s
     -webkit-transform .1s !important
     padding 2px 0
   .el-submenu__title
    -webkit-transition: border-color .1s,background-color .1s,color .1s
    transition: border-color .1s,background-color .1s,color .1s
    -webkit-box-sizing: border-box
    box-sizing: border-box
    i
      color #fff !important

   .el-submenu__title , .el-submenu .el-menu-item
     height 45px !important
     line-height 45px !important


 .menu-span
   padding 0 30px 0 5px
   max-height 180px



</style>
