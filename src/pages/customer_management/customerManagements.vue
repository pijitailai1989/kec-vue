<template>
  <div>
    <kec-page-header
      :textArray="['客户管理','客户列表']"
      @click="tabsFunC"
      :nameComponent="{1:'customerList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import customerList from './components/customerList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'customerManagement',
    props:[''],
    data () {
      return {
          componentName:'customerList'

      };
    },
    components:{
      customerList,
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
