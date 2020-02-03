<template>
  <transition name="kec">
  <div class="workstatus flexs a-center j-center" >
      <!-- <span class="status" :style="{background:colors}">{{status}}</span> -->
      <slot></slot>
  </div>
  </transition>
</template>

<script>

  export default {
    name:'workstatus',
    props:{
        statusText:Number
    },
    data () {
      return {
          
      };
    },

    components: {},

    computed: {
      status() {
         switch(this.statusText){
           case 0:
             return '班';
           case 1:
             return '休';
         }
      },
      colors() {
         switch(this.statusText){
           case 0:
             return '#1FA474';
           case 1:
             return '#7D7A7A';
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
 .workstatus 
   position relative   
   font-size 13px
   .status  
     position absolute
     font-weight 400
     left 0 
     top 0
     font-size 12px !important
     width 12px    
     height 12px    
     line-height 12px      
     text-align  center
     color #fff
</style>