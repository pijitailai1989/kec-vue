<template>
  <div class="forms" :class="[crosswise?'flexs':'']">
      <label 
       :class="[star==='star'?'star':'',crosswise?'a-center j-end':'']" 
       :style="{fontWeight:bold,display:crosswise?'flex':'',width:crosswise?width:''}" v-show="text">{{text}}</label>
      <div style="flex:1"><slot name="input"></slot></div>
  </div>
</template>

<script>

  export default {
    name:'forms',
    props:{
      text:String,
      bold:String,
      star:String,
      crosswise:{
        type:Boolean,
        default:false
      },
      width:{
        type:String,
        default:'30%'
      }
    },
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='stylus' scoped>
 .forms 
   margin-bottom 4px
   label 
    display inline-block
    max-width 100%
    color #747474
    margin-right 10px
    margin-bottom 3px
    font-weight 400

</style>