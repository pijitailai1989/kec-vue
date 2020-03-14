<template>
  <div>
    <kec-page-header 
      :textArray="['报价管理','报价列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'quoteList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import quoteList from './components/quoteList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'quoteManager',
    props:[''],
    data () {
      return {
          componentName:'quoteList'
             
      };
    },
    components:{
      quoteList,
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