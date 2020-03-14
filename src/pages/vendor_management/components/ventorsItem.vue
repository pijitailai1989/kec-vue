<template>
  <div class="ventorsItem">
    <kec-tabs 
    style="margin-top:0" 
    :titleList="['基本信息','工作日历','货态配置','供应商产品']"
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
import ventorsInfo from './ventorsInfo'
import serversRate from './serversRate'
import supplierWorkday from './supplierWorkday'
import vendorProduct from './vendorProduct'
import cargoConfig from './cargoConfig'
import servicePartition from './servicePartition'
import {KecForm ,KecTabs,KecScroll}  from '@/common/components'
  export default {
    name:'ventorsItem',
    props:{
        itemProps:Object
    },
    data () {
      return {
         currentTabComponent:'ventorsInfo',
         propsData:{}
      };
    },

    components: {
        KecTabs,
        KecForm,
        ventorsInfo,
        servicePartition,
        KecScroll,
        supplierWorkday,
        cargoConfig,
        vendorProduct
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        tabsFunc(index) {
            let arr = ['ventorsInfo','supplierWorkday','cargoConfig','vendorProduct'] ;
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