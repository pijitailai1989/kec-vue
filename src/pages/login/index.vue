<template>
  <div class="login">
    <div :style="{background:themeColor.header_background_color}">
      <login-header></login-header>
    </div>
    <div class="content">
      <login-login></login-login>
    </div>
    <div class="copyright" :style="{background:themeColor.copy_background_color}">
       <span :style="{color:themeColor.copy_text_color}">@ 2019 Kerry Logistics Network Limited. All Rights Reserved</span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import loginHeader from './components/header'
import loginLogin from './components/login'
  export default {
    name:'login',
    props:[''],
    components:{
      loginHeader,
      loginLogin
    },
    data () {
      return {

      };
    },
    computed: {
      ...mapState('home',['themeColor']),
    },
    methods: {
    },
  

  }

</script>
<style lang='stylus' scoped>
 .login 
   min-width 100vw
   min-height 100vh
   background url("~@/assets/images/bj.jpg") no-repeat 
   background-size cover
   .content
     width 100%
     height calc( 100vh - 110px )
     background rgba(0,0,0,.4)
     position relative
   .copyright 
     width 100%
     height 40px
     line-height 40px 
     text-align center
     opacity .5
     z-index 2
</style>