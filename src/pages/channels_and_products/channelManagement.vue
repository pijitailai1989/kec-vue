<template>
  <div>
    <kec-page-header 
      :textArray="['资源组合','资源组合列表']" 
      @click="tabsFunC"
      :nameComponent="{1:'ChannelList'}">
    </kec-page-header>
    <component :is="componentName">
    </component>
    
  </div>
</template>

<script>
import ChannelList from './components/channelList'
import {KecPageHeader,KecDrag}  from '@/common/components'
  export default {
    name:'stateManagement',
    props:[''],
    data () {
      return {
          componentName:'ChannelList'
             
      };
    },
    components:{
      ChannelList,
      KecPageHeader,
      KecDrag
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