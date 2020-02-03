<template>
  <div class="tabs" :style="{height:height}">
     <div class="flexs bg-title">
         <span 
           v-for="(item,index) in titleList" 
           :key="index"  
           @click="clickItem(index)"
           :style="{background:activeIndex===index?'#fff':''}"
           >{{item}}</span>
     </div>
     <slot></slot>
  </div>
</template>

<script>

  export default {
    name:'tabs',
    props:{
        height:String,
        titleList:Array,
        indexs:Number
    },
    data () {
      return {
         activeIndex:0
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
    },

    methods: {
        clickItem(index) {
            if(this.activeIndex !== index){
                this.activeIndex = index ;
                this.$emit('change',index)
            }
           
        }
    },

    watch: {
      indexs:{
        deep:true,
        handler:function(){
          this.activeIndex = 0
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .tabs  
   border-radius 4px    
   border 1px solid #DCDFE6
   .bg-title  
     background #eee
     span  
       padding 5px 15px
       cursor pointer
</style>