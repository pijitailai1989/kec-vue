<template>
  <div class="col-sm-12 switchs flexs a-center">
    <i v-if="icon" :class="['fa',icon]" ></i>
    <span v-if="text" class="texts">{{text}}</span>
    <slot name="values"></slot>
  </div>
</template>

<script>

  export default {
    name:'KecSwitch',
    props:{
        icon:String,
        text:String
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
 .switchs  
   padding 5px
   .texts  
     padding 0 8px
</style>