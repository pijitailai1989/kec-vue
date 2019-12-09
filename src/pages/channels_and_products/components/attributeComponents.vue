<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="col-sm-9">
        <kec-form text="報價編碼">
         <template #input>
           <el-input v-model="input" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-3">
        <div class="col-sm-11">
           <kec-form text="最大折扣(無需审批)">
             <template #input>
               <el-input v-model="input" placeholder="" size="medium"></el-input>
             </template>
           </kec-form>
        </div>
        <div class="col-sm-1 ggs">g</div>
      </div>
    </div>
    <div class="col-sm-12">
      <div class="col-sm-9">
        <kec-form text="中文名稱">
         <template #input>
           <el-input v-model="input" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-3">
        <div class="col-sm-11">
           <kec-form text="最大折扣(銷售經理审批)">
             <template #input>
               <el-input v-model="input" placeholder="" size="medium"></el-input>
             </template>
           </kec-form>
        </div>
        <div class="col-sm-1 ggs">g</div>
      </div>
    </div>
    <div class="col-sm-12">
      <div class="col-sm-9">
        <kec-form text="英文名稱">
         <template #input>
           <el-input v-model="input" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-3">
        <div class="col-sm-11">
           <kec-form text="最大折扣(產品审批)">
             <template #input>
               <el-input v-model="input" placeholder="" size="medium"></el-input>
             </template>
           </kec-form>
        </div>
        <div class="col-sm-1 ggs">g</div>
      </div>
    </div>
    <div class="col-sm-12">
        <kec-form text="审批">
          <template #input>
             <div class="col-sm-12 borders">
                <kec-switch icon="fa-toggle-on fa-lg" text="銷售經理审批"></kec-switch>
                <kec-switch icon="fa-toggle-on fa-lg" text="產品审批"></kec-switch>
             </div>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
      <kec-form text="備註">
        <template #input>
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6}"
            placeholder="请输入内容"
            v-model="input">
          </el-input>
        </template>
      </kec-form>
    </div>
    <div class="col-sm-12 flexs j-end">
           <kec-button :disabled="true" text="储存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
    </div>
  </div>
</template>

<script>
import {KecForm, KecButton ,KecSwitch }  from '@/common/components'
  export default {
    name:'attribute',
    props:[''],
    data () {
      return {
        input:''
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecSwitch
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        cancel() {
            this.$emit('closeFunc',false)
        },
    },

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
   margin-left 20px
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
</style>