<template>
  <div class="menu">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :background-color="backgroundColor"
      :text-color="textColor"
      >
      <template v-for="item in menuList">
        <template v-if="item.children">
           <el-submenu :index="item.id" :key="item.id">
             <template slot="title" style="color:#fff">
               <i :class="['fa',item.icon]"></i>
               <span class="menu-span">{{menu[item.title]}}</span>
             </template>
              <el-menu-item :style="{'color':routerPath===todo.path?activeColor:textColor}" :index="todo.id" v-for="todo of item.children" :key="todo.id" @click.native="RouterLinkTo(todo)">
                <i :class="['fa',todo.icon]"></i>
                <span slot="title">{{menu[todo.title]}}</span>
              </el-menu-item>
           </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :style="{'color':routerPath===item.path?activeColor:textColor}" :index="item.id" :key="item.id" @click.native="RouterLinkTo(item)">
            <i :class="['fa',item.icon]"></i>
            <span class="menu-span" slot="title">{{menu[item.title]}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>

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
         menuList:[{
             title:'C_A_P',
             children:[
                {
                  title:'C_M',
                  id:'1-1',
                  icon:'fa-camera-retro',
                  path:'/channel-management',
                  name:'channelManagement'
                },
                {
                  title:'P_M',
                  id:'1-2',
                  icon:'fa-camera-retro',
                  path:'/product-management',
                  name:'productManagement'
                }
             ],
             id:'1',
             icon:'fa-camera-retro',
             path:null
           },{
             title:'BASIC_INFO',
             children:[
                {
                  title:'STATE_M',
                  id:'2-1',
                  icon:'fa-camera-retro',
                  path:'/state-management',
                  name:'stateManagement'
                },{
                  title:'LOGISTICS_P',
                  id:'2-2',
                  icon:'fa-camera-retro',
                  path:'/logistics-process',
                  name:'logisticsProcess'
                },
             ],
             id:'2',
             icon:'fa-camera-retro',
             path:null
           },{
             title:'BASIC_CONFIG',
             children:[
                {
                  title:'BASIC_CONFIG',
                  id:'3-1',
                  icon:'fa-camera-retro',
                  path:'/basic-config',
                  name:'basicConfig'
                },
                {
                  title:'VENDORS_CONFIG',
                  id:'3-2',
                  icon:'fa-camera-retro',
                  path:'/vendors-config',
                  name:'vendorsConfig',
                  components:'selectVentors',
                  comName:'供应商列表'
                },
             ],
             id:'3',
             icon:'fa-camera-retro',
             path:null
           }
           
         ]
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
        RouterLinkTo(item) {
          const _this = this ;
          const path = _this.$route.path;
          if(path === item.path) return ;
          _this.$router.push({path:item.path})
          let data = {
             title:item.title,
             id:item.id,
             tableIndex:true,
             path:item.path
          }
          this.setTableTabs(data) ;
          this.setBreadcrumbArr(
            [{name:_this.menu[item.title],components:''},
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
              this.setBreadcrumbArr([{name:_this.menu[item.title],components:''},
                                     {name:item.comName,components:item.components}])
              return ;
            }
            el.children.forEach(item=>{
              if(item.path === _this.routerPath){
                item.tableIndex = true ;
                _this.setTableTabs(item) ;
                this.setBreadcrumbArr([{name:_this.menu[item.title],components:''},
                                       {name:item.comName,components:item.components}])
                return ;
              }
            })
          })
        }
    },
    mounted() {
      this.getPath()
    },
    watch: {
       '$route':'getPath'
    }

  }

</script>
<style lang='stylus' scoped>
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