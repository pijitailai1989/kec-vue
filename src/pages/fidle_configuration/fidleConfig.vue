<template>
  <div>
    <kec-page-header 
      :textArray="['额外字段配置','额外字段列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'fidleList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import fidleList from './components/fidleList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'fidleConfig',
    props:[''],
    data () {
      return {
          componentName:'fidleList'
             
      };
    },
    components:{
      fidleList,
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