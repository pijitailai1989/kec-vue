<template>
  <div class="ventorsItem">
    <kec-tabs 
    style="margin-top:0" 
    :titleList="['基本信息','客户余额','号段分配']"
    @change="tabsFunc"
    >
        <template>
          <kec-scroll :numbers="209">
             <component v-bind:is="currentTabComponent"></component>
          </kec-scroll>
        </template>
    </kec-tabs>
  </div>
</template>

<script>
import customerInfo from './customerInfo'
import customerBalance from './customerBalance'
import codeAllocation from './codeAllocation'
import {KecForm ,KecTabs,KecScroll}  from '@/common/components'
  export default {
    name:'customerItem',
    props:{
        itemProps:Object
    },
    data () {
      return {
         currentTabComponent:'customerInfo',
         propsData:{}
      };
    },

    components: {
        KecTabs,
        KecForm,
        customerInfo,
        customerBalance,
        codeAllocation,
        KecScroll,
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        tabsFunc(index) {
            let arr = ['customerInfo','customerBalance','codeAllocation'] ;
            this.currentTabComponent = arr[index] ;
        }
    },

    watch: {
        
    }

  }

</script>
<style lang='stylus' scoped>
.ventorsItem  
  background #fff
  padding 1px
  
</style>