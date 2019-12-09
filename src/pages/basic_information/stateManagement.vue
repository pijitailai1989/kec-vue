<template>
  <div>
    <kec-page-header 
      :textArray="['状态管理','状态列表','异常状态']" 
      @click="tabsFunC"
      :nameComponent="{1:'StateList',2:'ErrorState'}">
    </kec-page-header>
    <component :is="componentName"></component>
  </div>
</template>

<script>
import StateList from './components/stateList'
import ErrorState from './components/errorState'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'stateManagement',
    props:[''],
    data () {
      return {
          componentName:'StateList'
             
      };
    },
    components:{
      ErrorState,
      StateList,
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