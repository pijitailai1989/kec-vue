<template>
  <div>
    <kec-page-header 
      :textArray="['报价汇率表','报价列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'exchangeList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import exchangeList from './components/exchangeList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'exchangeTable',
    props:[''],
    data () {
      return {
          componentName:'exchangeList'
             
      };
    },
    components:{
      exchangeList,
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