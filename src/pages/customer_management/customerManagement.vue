<template>
  <div>
    <div style="" class="breadcrub">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="cur" @click.native="componentNameFunc(item.components,index)" 
        v-for="(item,index) of breadcrumbArr" :key="index">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="componentName" style="margin-top:10px"></component>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import selectCustomer from './components/selectCustomer'
import customerItem from './components/customerItem'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'customerManagements',
    props:[''],
    data () {
      return {
          componentName:'selectCustomer'
      };
    },
    components:{
      KecPageHeader,
      selectCustomer,
      customerItem
    },
    computed: {
      ...mapState('basic',['ventorsId']),
      ...mapState('home',['breadcrumbArr']),
    },
    methods: {
      ...mapMutations('home',['delBreadcrumbArr']),
      componentNameFunc(components,index,item){
         
         if(index>=1){
           this.componentName = components ;
           this.delBreadcrumbArr(index) ;
         }
         
      }
    },
    watch: {
      breadcrumbArr(){
        let i = this.breadcrumbArr.length - 1 ;
       if(this.breadcrumbArr[0]['components'] === 'selectCustomer') {
        if(this.breadcrumbArr.length===1){
          this.componentName = 'selectCustomer';
        }else{
          this.componentName = this.breadcrumbArr[i]['components']
        }
       }
      },
      
    }


  }

</script>
<style lang='stylus' scoped>
.breadcrub
   padding 10px 5px
   background #fff
   .cur
     cursor pointer !important
</style>