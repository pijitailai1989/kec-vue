<template>
  <div>
    <div style="" class="breadcrub">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="cur" @click.native="componentNameFunc(item.components,index)" 
        v-for="(item,index) of breadcrumbArr" 
        :key="index">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="componentName" style="margin-top:10px"></component>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import goodsClass from './components/goodsClass'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'cargoGoodsClass',
    props:[''],
    data () {
      return {
          componentName:'goodsClass'
      };
    },
    components:{
      KecPageHeader,
      goodsClass
    },
    computed: {
      ...mapState('basic',['ventorsId']),
      ...mapState('home',['breadcrumbArr']),
    },
    mounted(){
      this.loadChargeUnits()
    },
    methods: {
      ...mapMutations('home',['delBreadcrumbArr']),
      ...mapActions('basic',['loadChargeUnits']),
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
        if(this.breadcrumbArr[0]['components'] === 'goodsClass') {
           if(this.breadcrumbArr.length===1){
             this.componentName = 'goodsClass';
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