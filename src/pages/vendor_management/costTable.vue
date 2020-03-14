<template>
  <div>
    <kec-page-header 
      :textArray="['成本费率表','成本列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'costList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import costList from './components/costList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'costTable',
    props:[''],
    data () {
      return {
          componentName:'costList'
             
      };
    },
    components:{
      costList,
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
.content  
  margin-top 10px
</style>