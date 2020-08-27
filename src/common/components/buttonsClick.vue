<template>
  <div :class="[disabled?'disabled':'',loading?'disabled':'']" @click="clickButton(disabled,loading)" class="kec-button flexs a-center j-center" :style="{'background':background,'font-size':font,'color':color}">
      <i v-if="loading" class="el-icon-loading"></i>
      <i v-else v-show="icon" :class="['fa',icon]" ></i>
      <span v-if="loading">loading</span>
      <span v-else v-show="text">{{text}}</span>
      
  </div>
</template>

<script>

  export default {
    name:'KecButtonClick',
    props:{
        icon:String,
        text:String,
        color:String,
        font:String,
        background:String,
        disabled:Boolean,
        loading:Boolean,
    },
    data () {
      return {

      };
    },
    methods:{
      clickButton(bool,loading){
        !bool && !loading && this.$emit('click',bool) 
      }
    }

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