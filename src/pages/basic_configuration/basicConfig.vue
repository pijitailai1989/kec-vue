<template>
  <div>
    <kec-page-header 
      :textArray="['基本配置','收费单位维护','服务类型维护','收费项维护','客户列表','供应商列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'chargeUnit',2:'serverType',3:'chargesItem',4:'customerList',5:'supplierList'}">
    </kec-page-header>
    <component :is="componentName" style="margin-top:10px"></component>
  </div>
</template>

<script>
import chargeUnit from './components/chargeUnit'
import chargesItem from './components/chargesItem'
import serverType from './components/serverType'
import customerList from './components/customerList'
import supplierList from './components/supplierList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'basicConfig',
    props:[''],
    data () {
      return {
          componentName:'chargeUnit'
             
      };
    },
    components:{
      chargeUnit,
      chargesItem,
      serverType,
      customerList,
      KecPageHeader,
      supplierList
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