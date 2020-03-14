<template>
    <kec-dialog 
      boxWidth="700px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">分配</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button @click.native="bindCodeFun(payload)" text="确定" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-sm-6">
              <kec-form crosswise text="编码" width="80px">
                <template #input>
                  <el-input v-model="payload.code" placeholder="" size="medium" disabled></el-input>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form crosswise text="可用数量" width="80px">
                <template #input>
                  <el-input v-model="payload.maxCopy" placeholder="" size="medium" disabled></el-input>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form crosswise text="编码构成" width="80px">
              <template #input>
                <el-input v-model="payload.codeStructure" placeholder="" size="medium" disabled></el-input>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form crosswise text="起始编码" width="80px">
              <template #input>
                <el-input v-model="payload.startCode" placeholder="" size="medium" disabled></el-input>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form crosswise text="分配数量" width="80px">
              <template #input>
                <el-input v-model="payload.numbers" placeholder="" size="medium" ></el-input>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form crosswise text="客户" width="80px">
                <template #input>
                  <el-select v-model="payload.customerId" placeholder="请选择" @change="selectCustomer" style="width:100%">
                                    <el-option
                                      v-for="item in customerList"
                                      :key="item.id"
                                      :label="item.companyName"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form crosswise text="产品" width="80px">
                <template #input>
                  <el-select v-model="payload.productId" placeholder="请选择" :disabled="!payload.customerId" style="width:100%">
                                    <el-option
                                      v-for="item in productByCustomerList"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                </template>
              </kec-form>
          </div>
          
          
          <div class="col-sm-6" style="padding:8px">
              <kec-form crosswise text="是否循环" width="80px">
              <template #input>
                <el-switch
                  style="display: block"
                  v-model="payload.isLoop"
                  active-color="#13ce66">
                </el-switch>
              </template>
              </kec-form>
          </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {KecButton , KecForm ,KecDialog}  from '@/common/components'
import { formatDate } from '@/utils/fun'
  export default {
    name:'allocation',
    props:{
      dialogVisible:Boolean,
      text:String,
      item:Object
    },
    data () {
      return {
         payload:{
            cursorStart:null,
            cursorEnd:null,
            productId:null,
            customerId:null,
            numbers:null,
            isLoop:false,
            maxCopy:null,
            codeStructure:null,
            code:null,
            id:null,
            startCode:null,
            startCursor:null
         }
          

      }
    },

    components: {
        KecButton,
        KecForm,
        KecDialog
    },

    computed: {
      ...mapState('basic',['productByCustomerList','customerList','codeRuleObJ']),
    },

    beforeMount() {},

    mounted() {
     
    },

    methods: {
        ...mapActions('basic',['loadBindRelation','loadCodeQuery','loadGetProductByCustomer']),
        cancel() {
            this.$emit('closeFunc',false)
            
        },
        selectCustomer(customerId){
           this.payload.productId = null ;
           this.loadGetProductByCustomer({customerId})
        },
        bindCodeFun(payload){
            let { id,cursorStart,cursorEnd,productId,customerId,isLoop,startCode,numbers,startCursor} = payload ;
             let data = {ruleId:id,
             cursorStart:parseInt(startCursor)+1,
             cursorEnd:parseInt(startCursor)+parseInt(numbers),
             productId,customerId,isLoop:isLoop?1:2}
                
                this.loadBindRelation(data).then(success=>{
                   this.$emit('closeFunc',true)
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
           
        },
        codeQueryFunc(id){
            this.loadCodeQuery([id]).then(success=>{
                 let {id,code,codeStructure,maxCopy,startCode,startCursor} = this.codeRuleObJ ;
                 this.payload = {
                      cursorStart:null,
                      cursorEnd:null,
                      ruleId:null,
                      numbers:null,
                      productId:null,
                      customerId:null,
                      isLoop:false,
                      startCursor,
                      maxCopy,
                      startCode,
                      codeStructure,
                      code,
                      id
                  }
             })
        }
    },

    watch: {
      item:{
        deep:true,
        handler:function(val){
          if(val){
            
             let data = JSON.parse( JSON.stringify(val) )
             
             let {id} = data ;
             this.codeQueryFunc(id)
          }
          
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .row >>> .is-cursor
   .el-input__inner
      cursor pointer !important
 .p2 
   padding 2px 0
 .active  
   background #Fff
   border-radius 3px
 .cur 
   cursor pointer
 .text 
   &.bold 
     font-weight 600  
 .back  
   background #eee
 .bor  
   border 1px solid #eee
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding 5px
   &.pro  
     height 99px   
     margin-bottom 4px
   &.err  
     min-height 40px
  .flx  
     flex 1
</style>