<template>
  <div class="scrolls scrollbar" :style="{height:tabsShow=='show'?`calc( 100vh - 44px - ${numbers}px )`:`calc( 100vh - ${numbers}px )`}">
     <slot></slot>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name:'scrolls',
    props:{
        numbers:Number
    },
    data () {
      return {

      };
    },

    components: {},

    computed: {
        ...mapState('home',['tabsShow']),
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