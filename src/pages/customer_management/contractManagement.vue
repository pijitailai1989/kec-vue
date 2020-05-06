<template>
  <div>
    <kec-page-header 
      :textArray="['报价协议','协议列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'contractList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import contractList from './components/contractList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'contractManagement',
    props:[''],
    data () {
      return {
          componentName:'contractList'
             
      };
    },
    components:{
      contractList,
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