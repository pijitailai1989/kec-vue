<template>
  <div>
    <kec-page-header 
      :textArray="['物流流程','流程列表','结点管理']" 
      @click="tabsFunC"
      :nameComponent="{1:'ProcessList',2:'NodeManagement'}">
    </kec-page-header>
    <component :is="componentName"></component>
  </div>
</template>

<script>
import ProcessList from './components/processList'
import NodeManagement from './components/nodeManagement'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'logisticsProcess',
    props:[''],
    data () {
      return {
          componentName:'ProcessList'
             
      };
    },
    components:{
      ProcessList,
      NodeManagement,
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