<template>
  <div>
    <kec-page-header 
      :textArray="['应收账单','账单列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'exchangeList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import billList from './components/billList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'receivableBill',
    props:[''],
    data () {
      return {
          componentName:'billList'
             
      };
    },
    components:{
      billList,
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