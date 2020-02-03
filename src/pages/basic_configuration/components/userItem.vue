<template>
  <div class="userItem">
    <kec-tabs 
    style="margin-top:0" 
    :titleList="['用户资料','角色与权限']"
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
import userInfo from './userInfo'
import userRole from './userRole'
import {KecForm ,KecTabs,KecScroll}  from '@/common/components'
  export default {
    name:'userItems',
    props:{
        itemProps:Object
    },
    data () {
      return {
         currentTabComponent:'userInfo',
         propsData:{}
      };
    },

    components: {
        KecTabs,
        KecForm,
        userInfo,
        KecScroll,
        userRole
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        tabsFunc(index) {
            let arr = ['userInfo','userRole'] ;
            this.currentTabComponent = arr[index] ;
        }
    },

    watch: {
        
    }

  }

</script>
<style lang='stylus' scoped>
.userItem  
  background #fff
  padding 1px
  
</style>