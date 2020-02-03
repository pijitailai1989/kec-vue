<template>
  <div class="trees">
    <div v-for="(item,index) in propsData" :key="index">
        <div>
            <i @click="clickIndexFunc(index,'minus')" v-if="item.children && item.status" class="fa cur fa-minus-square-o" aria-hidden="true"></i>
            <i @click="clickIndexFunc(index,'plus')" v-else-if="item.children && !item.status" class="fa cur fa-plus-square-o" aria-hidden="true"></i>
            <i v-else class="fa cur fa-square-o" aria-hidden="true"></i>
            <span>{{item.name}}</span>
        </div>
        <div v-if="item.children && item.status" class="trees-children">
           <trees :propsData="item.children"></trees>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    name:'trees',
    props:{
        propsData: Array
    },
    data () {
      return {
         clickIndex:[]
      };
    },

    components: {},

    computed: {},

    beforeMount() {
        
    },
    
    mounted() {},

    methods: {
        clickIndexFunc(index,type){
          if(type==='plus'){
              
          }else{
              
          }

        }
    },

    watch: {
        
    }

  }

</script>
<style lang='stylus' scoped>
.trees  
  padding 4px
.cur 
  cursor pointer
.trees-children  
  padding-left 10px
</style>