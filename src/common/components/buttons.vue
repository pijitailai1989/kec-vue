<template>
  <div :class="[disabled?'disabled':'']" class="kec-button flexs a-center j-center" :style="{'background':background,'font-size':font,'color':color}">
      <i v-if="icon" :class="['fa',icon]" ></i>
      <span v-if="text">{{text}}</span>
  </div>
</template>

<script>

  export default {
    name:'KecButton',
    props:{
        icon:String,
        text:String,
        color:String,
        font:String,
        background:String,
        disabled:Boolean
    },
    data () {
      return {

      };
    },

  }

</script>
<style lang='stylus' scoped>
 .kec-button   
   padding 0 8px 
   height 30px 
   border-radius 3px 
   cursor pointer 
   box-shadow 1px 1px 2px #ccc  
   &:hover  
     opacity .8 
   span,i
     padding 3px
     white-space nowrap
   &.disabled 
     cursor not-allowed
     opacity 0.6

</style>