<template>
  <div class="menuTops flexs a-center j-between menu">
    <div class="lefts flexs">
       <kec-badge :value="991" color="#EB842D">
         <i class="fa font fa-envelope-open"></i>
       </kec-badge>
       <kec-badge :value="99" color="#DC3545">
         <i class="fa font fa-exclamation-triangle"></i>
       </kec-badge>
       <kec-badge>
         <i class="fa font fa-download"></i>
       </kec-badge>
    </div>
    <div class="rights" @click="clickShowFunc(tabsShow)">
       <i v-show="tabsShow=='show'" class="fa fa-angle-double-left fa-2x"></i>
       <i v-show="tabsShow=='hide'" class="fa fa-angle-double-right fa-2x"></i>
    </div>
    
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {KecBadge}  from '@/common/components'
  export default {
    name:'menuTop',
    props:[''],
    data () {
      return {

      };
    },

    components: {
        KecBadge
    },

    computed: {
        ...mapState('home',['tabsShow']),
    },

    beforeMount() {},

    mounted() {},

    methods: {
        ...mapMutations('home',['setTabsShow']),
        clickShowFunc(bool) {
            switch(bool){
                case 'show': 
                  localStorage.setItem('tabsShow','hide')
                  this.setTabsShow('hide');
                  break;
                default :
                  localStorage.setItem('tabsShow','show')
                  this.setTabsShow('show');
                  break;
            }
            
        }
    },

    watch: {}

  }

</script>
<style lang='stylus' scoped>
 .menuTops 
   height 44px   
   border-bottom 1px solid #fff
   color #fff
   .rights 
     padding 0 10px         
     cursor pointer
     
   .lefts  
     padding 0 10px  
     i  
       font-size 22px
</style>