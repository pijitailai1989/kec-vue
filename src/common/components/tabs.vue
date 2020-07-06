<template>
  <div class="tabs" :style="{height:height}">
     
     <div class="flexs nowrap scrollbar a-center" ref="scroll">
         <div v-show="content>scroll" class="posi left flexs a-center j-center"><i class="fa fa-caret-left " @click="clickLeft" aria-hidden="true"></i></div>
         <div v-show="content>scroll" class="posi right flexs a-center j-center"><i class="fa fa-caret-right" @click="clickRight" aria-hidden="true"></i></div>
         <div class="flexs bg-title content" ref="content">
         <span 
           v-for="(item,index) in titleList" 
           :key="index"  
           @click="clickItem(index,item)"
           :style="{
             background:activeIndex===index?'#fff':'',
             color:activeIndex===index?themeColor.content_border_color:'#000',
             fontWeight:activeIndex===index?600:400
             }"
           class="marl"
           v-show="item">{{item}}</span>
           </div>
     </div>
     <slot></slot>
  </div>
</template>
<script>
import {mapState} from 'vuex'
  export default {
    name:'tabs',
    props:{
        height:String,
        titleList:Array,
        indexs:Number,
        variate:Boolean
    },
    data () {
      return {
         activeIndex:0,
         index:10,
         scroll:0,
         content:0
      };
    },

    components: {},

    computed: {
      ...mapState('home',['themeColor']),
    },

    beforeMount() {},

    mounted() {
    },
    updated() {
      this.scroll = this.$refs.scroll.clientWidth ;
      this.content = this.$refs.content.clientWidth ;
    },
    methods: {
        clickItem(index,item) {
            if(this.activeIndex !== index){
                this.activeIndex = index ;
                this.$emit('change',index)
                this.$emit('changeItem',item)
            }
           
        },
        clickLeft(){
          this.getMove(true)
        },
        clickRight(){
          this.getMove(false)
        },
        getMove(bool,index){
          let scroll = this.$refs.scroll ;
          let scrollWidth = this.$refs.scroll.clientWidth ;
          let content = this.$refs.content ;
          let a=scroll.scrollLeft;
              a=parseInt(a);
          if(index == 0){
            scroll.scrollLeft = index ; 
            return 
          }
          if(bool){
             scroll.scrollLeft=a-scrollWidth
          }else{
             scroll.scrollLeft=a+scrollWidth
          }

          
        }
    },

    watch: {
      indexs:{
        deep:true,
        handler:function(){
          this.activeIndex = 0
        }
      },
      titleList:{
        deep:true,
        handler:function(val,old){
         if(this.variate && val.length != old.length){
            this.activeIndex = 0 
            this.getMove(true,0)
         } 
        }
      },
    }

  }

</script>
<style lang='stylus' scoped>
 .tabs  
   border-radius 4px  
   position relative 
   background #fff 
   border 1px solid #dcdfe6
   .bg-title  
     span 
       padding 5px 15px
       cursor pointer
     span:first-child 
       padding 5px 15px 5px 20px
     span:last-child 
       padding 5px 20px 5px 15px
   .nowrap 
     white-space nowrap
     overflow-x auto
     background #f5f7fa
     .marl
       border-right:1px solid #DCDFE6
     .posi  
       background #f5f7fa 
       cursor pointer
       position absolute
       height 30px
       width 16px
      .left  
        left 0
      .right   
        right 0
     .fa-caret-left 
         font-size 16px
         &:hover 
           font-size 18px
           color #999
     .fa-caret-right 
         font-size 16px
         right 3px
         &:hover 
           font-size 18px
           color #999
</style>