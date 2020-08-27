<template>
  <div class="badges flexs">
    <slot></slot>
    <span v-show="value" :style="{background:color}">{{numbers}}</span>
  </div>
</template>

<script>

  export default {
    name:'KecBadge',
    props:{
        value:Number,
        color:String
    },
    data () {
      return {
         
      };
    },

    components: {},

    computed: {
        numbers(){
            if(this.value>99){
               return 99 + '+' ;
            }else{
               return this.value
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
 .badges+.badges  
   margin-left 20px 
 .badges  
   position relative
   cursor pointer
   span  
    position absolute 
    right -8px  
    bottom -8px 
    width 20px         
    height 20px    
    border-radius 50%
    line-height 20px    
    text-align center  
    color #fff  
    font-size 12px
</style>