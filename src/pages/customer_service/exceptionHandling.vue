<template>
  <div>
    <kec-page-header 
      :textArray="['异常处理','异常列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'exceptionList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import exceptionList from './components/exceptionList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'exceptionHandling',
    props:[''],
    data () {
      return {
          componentName:'exceptionList'
             
      };
    },
    components:{
      exceptionList,
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