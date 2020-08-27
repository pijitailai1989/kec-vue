<template>
  <div class="title">
    <span 
    v-for="(item,index) in textArray"
    :key="index"
    @click="clickPath(index)"
    :style="{
        'border-bottom':index===indexActive?'1px solid'+themeColor.content_border_color:'',
        'cursor':index===indexActive || index===0?'auto':'pointer'
        }">
      {{item}}
    </span>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name:'KecPageHeader',
    props:{
        textArray:Array,
        nameComponent:Object,
        indexs:Number
    },
    data () {
      return {
         indexActive:1
      };
    },

    components: {},

    computed: {
        ...mapState('home',['themeColor']),
    },

    beforeMount() {},

    mounted() {},

    methods: {
      clickPath(index) {
        const _ = this ;
        if(index ===0 || index === _.indexActive) return ;
        _.indexActive = index ;
        _.$emit('click',_.nameComponent[index]) ;
      }
    },

    watch: {
      indexs(val){
         if(val){
           this.indexActive = val 
         }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .title 
   padding 8px
   background #fff
   border-radius 4px
   span  
     padding 5px 1px
     margin 0 5px
     &:first-child  
       font-size 16px
       font-weight bold
       cursor auto
       padding 5px 6px 5px 0
       border-right 2px solid #BABAC0
    
     
</style>