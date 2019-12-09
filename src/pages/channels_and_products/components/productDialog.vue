<template>
    <kec-dialog 
      boxWidth="1260px"
      boxTop="12vh"
      v-if="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">新增产品</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button v-checkSubmit :disabled="true" text="储存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
              <div class="col-sm-6">
                <kec-form text="產品代碼" star="star">
                  <template #input>
                    <el-input class='v-check' v-checkParam="{required:true,regex:'^[A-Za-z]+$'}" v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="產品類別">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="中文名稱">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="物流流程">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="英文名稱">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-6">
                <kec-form text="入庫渠道">
                 <template #input>
                   <el-input v-model="input" placeholder="" size="medium"></el-input>
                 </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="出庫渠道組合">
                  <template #input>
                    <el-input v-model="input" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              </div>
              <div class="col-sm-12">
                <kec-form text="備註">
                  <template #input>
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 10, maxRows: 10}"
                      placeholder="请输入内容"
                      v-model="input">
                    </el-input>
                  </template>
                </kec-form>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6">
              <kec-tabs 
                height="474px" 
                style="margin-top:23px" 
                :titleList="['屬性','回郵地址']"
                @change="tabsFunc"
                >
                  <template>
                      <component v-bind:is="currentTabComponent"></component>
                  </template>
                </kec-tabs>
          </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {KecButton , KecForm ,KecDialog ,KecTabs}  from '@/common/components'
import KecAddress from './addressComponents'
  export default {
    name:'channelDialog',
    props:{
      dialogVisible:Boolean
    },
    data () {
      return {
         input:'',
         currentTabComponent:''
      };
    },

    components: {
        KecButton,
        KecForm,
        KecDialog,
        KecTabs,
        KecAddress
    },

    computed: {},

    beforeMount() {},

    mounted() {
    },

    methods: {
        submit() {
          console.log('submit')
        },
        cancel() {
            this.$emit('closeFunc',false)
        },
        tabsFunc(index) {
            let arr = ['','KecAddress'] ;
            this.currentTabComponent = arr[index] ;
        }
    },

    watch: {
      dialogVisible( newVal , oldVal ) {
        if(!newVal) this.currentTabComponent = '' ;
      }
    },
    destroyed() {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .row >>> .is-cursor
   .el-input__inner
      cursor pointer !important
</style>