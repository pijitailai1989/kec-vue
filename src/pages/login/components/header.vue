<template>
  <div class="headers">
    <div class="flexs a-center lefts j-center">
        <i class="imgs"><img src="@/assets/images/logo.png" alt=""></i>
    </div>
  </div>
</template>

<script>

  export default {
    name:'loginHeader',
    data () {
      return {

      };
    }

  }

</script>
<style lang='stylus' scoped>
@import '~css/stylus.styl'
 .headers 
   height $headerHeight 
   box-shadow 0 2px 3px #999
   .lefts  
     height $headerHeight
     width 270px
     .imgs  
       height 50px
       img  
         height 100%
</style>