<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="col-sm-5">
        <kec-form text="臨界重量">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input> 
          </template>
        </kec-form>
      </div>
      <div class="col-sm-1 ggs">g</div>
    </div>
    <div class="col-sm-12">
      <div class="col-sm-5">
        <kec-form text="小貨重量單位">
         <template #input>
           <el-input v-model="input" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-1 ggs">g</div>
      <div class="col-sm-5">
        <kec-form text="大貨重量單位">
          <template #input>
            <el-input v-model="input" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-1 ggs">g</div>
    </div>
    <div class="col-sm-12 flexs kec-btn">
       <kec-button :disabled="true" text="储存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
       <kec-button text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
    </div>
  </div>
</template>

<script>
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'weights',
    props:[''],
    data () {
      return {
        input:''
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='stylus' scoped>
 .row  
   padding 5px
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 50px
</style>