<template>
  <div>
    <!-- 122112 -->
    <kec-page-header
      :textArray="['订单管理','订单列表']"
      @click="tabsFunC"
      :nameComponent="{1:'customerList'}">
    </kec-page-header>
    <component :is="componentName" class="content"></component>
  </div>
</template>

<script>
import orderList from './components/orderList'
import {KecPageHeader}  from '@/common/components'
  export default {
    name:'orderManagement',
    props:[''],
    data () {
      return {
          componentName:'orderList'

      };
    },
    components:{
      orderList,
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
