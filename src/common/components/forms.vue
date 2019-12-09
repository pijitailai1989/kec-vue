<template>
  <div class="forms">
      <label :class="[star==='star'?'star':'']">{{text}}</label>
      <div class=""><slot name="input"></slot></div>
  </div>
</template>

<script>

  export default {
    name:'forms',
    props:{
      text:String,
      star:String
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
    display inline-block;
    max-width 100%;
    color #747474
    margin-bottom 3px;
    font-weight 400;

</style>