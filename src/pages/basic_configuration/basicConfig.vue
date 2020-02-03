<template>
  <div>
    <kec-page-header 
      :textArray="['基本配置','收费单位维护','服务类型维护','收费项维护','国家地区','类型标签','标准货态配置','资源与权限','编码规则']" 
      @click="tabsFunC"
      :nameComponent="{1:'chargeUnit',2:'serverType',3:'chargesItem',4:'countryDistrict',
      5:'typeLabel',6:'cargoStatus',7:'sysAuthoritiesResources',8:'codeRule'}">
    </kec-page-header>
    <component :is="componentName" style="margin-top:10px"></component>
  </div>
</template>

<script>
import chargeUnit from './components/chargeUnit'
import cargoStatus from './components/cargoStatus'
import chargesItem from './components/chargesItem'
import serverType from './components/serverType'
import countryDistrict from './components/countryDistrict'
import typeLabel from './components/typeLabel'
import sysAuthoritiesResources from './components/sysAuthoritiesResources'
import codeRule from './components/codeRule'
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
      KecPageHeader,
      typeLabel,
      cargoStatus,
      countryDistrict,
      sysAuthoritiesResources,
      codeRule
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