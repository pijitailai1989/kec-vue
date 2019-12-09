<template>
  <div>
    <kec-page-header 
      :textArray="['产品管理','产品列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'ProductList'}">
    </kec-page-header>
    <component :is="componentName"></component>
  </div>
</template>

<script>
import ProductList from './components/productList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'stateManagement',
    props:[''],
    data () {
      return {
          componentName:'ProductList'
             
      };
    },
    components:{
      ProductList,
      KecPageHeader
    },
    computed: {
      
    },
    methods: {
      tabsFunC(name) {
         this.componentName = name ;
      }
    }

  }

</script>
<style lang='stylus' scoped>

</style>