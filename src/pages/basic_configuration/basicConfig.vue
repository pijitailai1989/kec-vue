<template>
  <div>
    <kec-page-header 
      :textArray="['基本配置','收费单位维护','服务类型维护','国家地区','类型标签','标准货态配置','资源与权限','编码规则','收费项','服务分区']" 
      @click="tabsFunC"
      :indexs = indexs
      :nameComponent="{1:'chargeUnit',2:'serverType',3:'countryDistrict',
      4:'typeLabel',5:'cargoStatus',6:'sysAuthoritiesResources',7:'codeRule',8:'chargesItem',9:'servicePartition'}">
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
import servicePartition from './components/servicePartition'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'basicConfig',
    props:[''],
    data () {
      return {
          componentName:'chargeUnit',
          indexs:null
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
      codeRule,
      servicePartition
    },
    computed: {
      
    },
    methods: {
      tabsFunC(name) {
         this.componentName = name ;
      }
    },
    mounted() {
      let goUrl = JSON.parse( localStorage.getItem('goUrl') );

      goUrl && this.tabsFunC(goUrl.name) ;
      goUrl && (this.indexs = goUrl.index );

      
    },

  }

</script>
<style lang='stylus' scoped>

</style>