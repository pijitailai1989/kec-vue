<template>
    <kec-dialog 
      boxWidth="400px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button @click.native="bindCodeFun(payload)" text="确定" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          
          <div class="col-sm-12">
              <kec-form crosswise text="客户" width="80px">
                <template #input>
                  <el-select v-model="payload.customerId"
                  @change="changeCompanyId" size="medium" filterable placeholder="" style="width:100%">
                    <el-option
                      v-for="(item,i) in customerList"
                      :key="i+'companyId'"
                      :label="item.companyName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form crosswise text="服务协议号" width="80px">
                <template #input>
                  <el-select v-model="payload.vendorId" size="medium" 
                  :disabled="!payload.customerId"
                  clearable filterable placeholder="" style="width:100%">
                    <el-option
                      v-for="item in agreementLists"
                      :key="item.id"
                      :label="item.code"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form crosswise text="账期首日" width="80px">
                <template #input>
                  <el-date-picker
                   style="width:100%"
                    v-model="payload.execTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form crosswise text="账单周期" width="80px">
                <template #input>
                  <el-select v-model="payload.billCycle" filterable placeholder="" style="width:100%">
                        <el-option
                          v-for="item in cyclesList"
                          :key="item.code"
                          :label="item.text"
                          :value="item.code">
                        </el-option>
                      </el-select>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form crosswise text="账单编号" width="80px">
              <template #input>
                <el-input v-model="payload.apBillCode" placeholder="" size="medium" ></el-input>
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
import { formateDate } from '@/utils/fun'
  export default {
    name:'billDialog',
    props:{
      dialogVisible:Boolean,
      text:String,
      item:Object
    },
    data () {
      return {
         payload:{
            "customerId":null,
            "vendorId": null,
            "execTime": "",
            "billCycle": null,
            "apBillCode": ""
         },
         agreementLists:[],
          

      }
    },

    components: {
        KecButton,
        KecForm,
        KecDialog
    },

    computed: {
      ...mapState('basic',['customerList']),
      ...mapState('vendor',['cyclesList']),
      ...mapState('customer',['agreementQueryPage']),
    },

    beforeMount() {},

    mounted() {
     
    },

    methods: {
        ...mapActions('vendor',['loadPostArBills']),
        ...mapActions('customer',['loadPostAgreementQueryPage']),
        cancel() {
            this.$emit('closeFunc',false)
            this.clearFun()
        },
        changeCompanyId(id){
          let {companyName} = this.customerList.find(item => { return item.id == id })
          this.loadPostAgreementQueryPage({
            customerName:companyName,pageSize:1000,pageNumber:1
          }).then(success=>{
              let {content,totalElements} = this.agreementQueryPage
              this.agreementLists = content.length>=1 ? content : []
          })
        },
        clearFun(){
            this.payload = {
            "customerId":null,
            "vendorId": null,
            "execTime": "",
            "billCycle": null,
            "apBillCode": ""
         }
         this.agreementLists=[]

        },
        bindCodeFun(payload){
            let { vendorId ,execTime,billCycle,apBillCode,customerId} = payload ;
             let data = {
               vendorId ,billCycle,
               execTime:execTime?formateDate(execTime):''
               ,apBillCode,customerId
             }
                
                this.loadPostArBills(data).then(success=>{
                   this.$emit('closeFunc',true)
                   this.clearFun()
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
           
        }
    },

    watch: {
      item:{
        deep:true,
        handler:function(val){
          
          
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