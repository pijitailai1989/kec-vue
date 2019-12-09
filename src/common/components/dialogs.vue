<template>
  <div class="dialogs">
    <div class="box-content" :style="{width:boxWidth,top:boxTop}">
       <div class="tops" :style="{borderColor:themeColor.content_border_color}">
          <slot name="title"></slot>
       </div>
       <div class="centers">
          <slot></slot>
       </div>
       <div class="bottoms">
          <slot name="btn"></slot>
       </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name:'dialogs',
    props:{
        boxWidth:String,
        boxTop:String
    },
    data () {
      return {

      };
    },

    components: {},

    computed: {
      ...mapState('home',['themeColor']),
    },
    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='stylus' scoped>
 .dialogs 
   position fixed  
   left 0 
   top 0  
   width 100vw 
   height 100vh
   background rgba(0,0,0,.5)
   z-index 1000
   .box-content  
     position absolute
     left 0 
     right 0 
     margin 0 auto
     background #fff
     border-radius 5px
     .tops,.centers 
       padding 5px 10px
     .bottoms  
       padding 10px 15px
     .tops  
       border-bottom 1px solid 
</style>