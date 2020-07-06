<template>
  <div>
    <kec-page-header 
      :textArray="['费用录入','录入列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'entryList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import entryList from './components/entryList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'costEntry',
    props:[''],
    data () {
      return {
          componentName:'entryList'
             
      };
    },
    components:{
      entryList,
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