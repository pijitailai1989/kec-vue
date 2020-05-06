<template>
  <div class="scrolls scrollbar" :style="{height:maxHeightVal}">
     <slot></slot>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name:'scrolls',
    props:{
        numbers:[Number,String]
    },
    data () {
      return {

      };
    },

    components: {},

    computed: {
        ...mapState('home',['tabsShow']),
        maxHeightVal: function(){
          const _ = this ;
          let types = typeof(_.numbers) ;
          if(types == 'string'){
            return _.numbers +'px'
          }else{
            if(_.tabsShow === 'show'){
              return `calc( 100vh - 44px - ${_.numbers}px )` ;
            }else{
              return `calc( 100vh - ${_.numbers}px )`
            }
          }
      }
    },

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='stylus' scoped>
.scrolls   
  overflow-y scroll  
  background:#fff
</style>