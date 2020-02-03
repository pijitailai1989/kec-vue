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
import organizationalRole from './components/organizationalRole'
import createUser from './components/createUser'
import rolePrivilege from './components/rolePrivilege'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'userConfig',
    props:[''],
    data () {
      return {
          componentName:'organizationalRole'
      };
    },
    components:{
      KecPageHeader,
      createUser,
      rolePrivilege,
      organizationalRole
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
        if(this.breadcrumbArr[0]['components'] === 'organizationalRole') {
           if(this.breadcrumbArr.length===1){
             this.componentName = 'organizationalRole';
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