<template>
  <div class="sorts flexs a-center">
     <slot></slot>
     <i class="fa fa-sort" @click="sortFunc(sortType)"></i>
  </div>
</template>

<script>

  export default {
    name:'sorts',
    props:{
        sortType:{
        type:Object,
        default:{}
      }
    },
    data () {
      return {
        
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
       
    },

    methods: {
        sortFunc(type){
           this.$emit('clickSort',type)
       }
    },

    watch: {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .sorts  
   position relative
   i  
    position absolute
    right 4px  
    cursor pointer
    &:hover 
      font-size 16px
      right 3px 
</style>