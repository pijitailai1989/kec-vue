<template>
  <kec-dialog 
      boxWidth="1020px"
      boxTop="1vh"
      v-if="dialogVisible">
     <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button 
            @click.native="clickConfirm(3,payload.id,examineRemark)" 
            text="同意" 
            icon="fa-floppy-o" 
            background="#ED6D01" color="#fff"></kec-button>
            <kec-button 
            @click.native="clickConfirm(5,payload.id,examineRemark)" 
            text="驳回" 
            icon="fa-floppy-o" 
            background="#17A2B8" color="#fff"></kec-button>
            <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      
      <kec-scroll :numbers="260" class="row">
          
          <div class="col-sm-12">
              <kec-form text="协议属性" >
                <template #input>
                     <div  class="col-sm-12 borders" style="margin-bottom:5px">
                        <div class="col-sm-4">
                            <kec-form text="协议编号" width="70px" crosswise>
                            <template #input>
                              <el-input v-model="payload.code" placeholder="" disabled></el-input>
                            </template>
                            </kec-form>
                        </div>
                        <div class="col-sm-4">
                            <kec-form text="客户" width="70px" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-select
                                      style="width:100%"
                                        disabled
                                        v-model="payload.customerId"
                                        filterable
                                        placeholder="">
                                        <el-option
                                          v-for="item in customerList"
                                          :key="item.id"
                                          :label="item.companyName"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                </div>
                            </template>
                            </kec-form>
                        </div>
                        <div class="col-sm-4">
                            <kec-form text="结算货币" width="70px" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-select
                                      style="width:100%"
                                      disabled
                                        v-model="payload.currency"
                                        filterable
                                        placeholder="">
                                        <el-option
                                          v-for="item in currencyList"
                                          :key="item.id"
                                          :label="item.code"
                                          :value="item.code">
                                        </el-option>
                                      </el-select>
                                      
                                </div>
                            </template>
                            </kec-form>
                        </div>
                        
                        
                        <div class="col-sm-4">
                            <kec-form text="销售代表" width="70px" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-select
                                      style="width:100%"
                                      disabled
                                        v-model="payload.managerId"
                                        filterable
                                        placeholder="">
                                        <el-option
                                          v-for="item in SALES"
                                          :key="item.id"
                                          :label="item.userName"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                </div>
                            </template>
                            </kec-form>
                        </div>
                        <div class="col-sm-4">
                            <kec-form text="客服代表" width="70px" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-select
                                      style="width:100%"
                                      disabled
                                        v-model="payload.servicerId"
                                        filterable
                                        placeholder="">
                                        <el-option
                                          v-for="item in SERVICE"
                                          :key="item.id"
                                          :label="item.userName"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                </div>
                            </template>
                            </kec-form>
                        </div>

                        <div class="col-sm-4">
                            <kec-form text="账单周期" width="70px" crosswise>
                            <template #input>
                              <el-select v-model="payload.billCycle" disabled filterable placeholder="" style="width:100%">
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
                        <!-- <div class="col-sm-4">
                            <kec-form text="初始账单日" width="70px" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-date-picker
                                    disabled
                                    style="width:100%"
                                      v-model="payload.startPaymentDate"
                                      type="date"
                                      placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </template>
                            </kec-form>
                        </div> -->
                        <div class="col-sm-4">
                            <kec-form text="生效日期" width="70px" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-date-picker
                                    style="width:100%"
                                    disabled
                                      v-model="payload.effectiveDate"
                                      type="date"
                                      placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </template>
                            </kec-form>
                        </div>
                         <div class="col-sm-4">
                                      <kec-form text="时效要求" width="70px" crosswise>
                                      <template #input>
                                        <el-input v-model="payload.deliveryDay"
                                        placeholder="" disabled></el-input>
                                      </template>
                                      </kec-form>
                        </div>
                    </div>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="货物属性及服务内容">
              <template #input>
                <div class="col-sm-12 borders"  style="padding:8px 0">
                    <div class="col-sm-3"><el-checkbox disabled v-model="payload.normalItem">普货</el-checkbox></div>
                    <div class="col-sm-3"><el-checkbox disabled v-model="payload.sensitiveItem">敏感货</el-checkbox></div>
                    <div class="col-sm-3"><el-checkbox disabled v-model="payload.stateTrack">货态跟踪</el-checkbox></div>
                    <div class="col-sm-3"><el-checkbox disabled v-model="payload.cod">COD</el-checkbox></div>
                </div>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12" style="margin-top:5px">
              <kec-form text="报价收费表">
              <template #input>
                  <kec-table 
                  :tableHeader="tableHeader"
                  height="150"
                  :tableData="list" 
                  :letWidth="letWidth">
                      <template v-slot:default="slotProps">
                      {{slotProps.item}}
                      </template>
                      <template v-slot:offerType="slotProps">
                        {{slotProps.item==='SEPARATE'?'分项':'包干'}}
                      </template>
                  </kec-table>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="成本费率表">
              <template #input>
                  <kec-table 
                  :tableHeader="tableHeader" 
                  height="150"
                  :tableData="lists" 
                  :letWidth="letWidth">
                      <template v-slot:default="slotProps">
                      {{slotProps.item}}
                      </template>
                      <template v-slot:offerType="slotProps">
                        {{slotProps.item==='SEPARATE'?'分项':'包干'}}
                      </template>
                  </kec-table>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="协议日志">
              <template #input>
                  <kec-table 
                  :tableHeader="tableHeader1"
                  height="100" 
                  :tableData="listes" 
                  :letWidth="letWidth">
                      <template v-slot:default="slotProps">
                      {{slotProps.item}}
                      </template>
                      <template v-slot:type="slotProps">
                        {{slotProps.item==='first'?'协议初审':'协议复审'}}
                      </template>
                      <template v-slot:examineAction="slotProps">
                        {{slotProps.item== 3 ?'审核成功':'审核驳回'}}
                      </template>
                  </kec-table>
              </template>
              </kec-form>
          </div>

        </kec-scroll>
        <div class="row">
            <div class="col-sm-12" style="box-shadow: 0px 0px 4px #ccc;border-radius:5px">
                <kec-form text="审批意见">
                <template #input>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="examineRemark"
                    :autosize="{ minRows: 3, maxRows: 4}"
                    show-word-limit
                  >
                  </el-input>
                </template>
                </kec-form>
            </div>
        </div>
  </kec-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton ,KecDialog,KecTable,KecScroll}  from '@/common/components'
import {formatDate} from '@/utils/fun'
  export default {
    name:'contractApprove',
    props:{
      type:String,
      item:Object,
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
        payload:{
          id:null,
          currency:null,
          billCycle:null,
          startPaymentDate:null,
          effectiveDate:null,
          productId:null,
          customerId:null,
          managerId:null,
          servicerId:null,
          normalItem:false,
          sensitiveItem:false,
          stateTrack:false,
          cod:false,
          deliveryDay:null,
          shippingCountryCode:null,
          destinationCountryCode:null,
          code:null
        },
        tableHeader:{
             offerType:{"title":'报价方式','slot':true},'sort':'ZH',
             serviceType:{"title":'服务类型','slot':false,'sort':'ZH'},
             chargeItemName:{"title":'收费项','slot':false},
             ledgerSubjectName:{"title":'科目名称','slot':false,'sort':'ZH'},
             ledgerSubjectNumber:{"title":'科目编号','slot':false},
             unitPrice:{"title":'费率','slot':false},
             currency:{"title":'币种','slot':false},
             unit:{"title":'收费单位','slot':false},
             execDate:{"title":'生效日期','slot':false}
           },
           list:[],
           lists:[],
           tableHeader1:{
             type:{"title":'类型','slot':true},
             examineAction:{"title":'审核状态','slot':true,'sort':'ZH'},
             examineRemark:{"title":'审核意见','slot':false},
             createTime:{"title":'审核时间','slot':false},
             createUser:{"title":'审核人','slot':false}
           },
           listes:[],
           letWidth:{
             
           },
           examineRemark:null,
           examineFlag:null,
           agreementId:null
        
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecDialog,
        KecTable,
        KecScroll
    },

    computed: {
      ...mapState('basic',['customerList','currencyList','countryList']),
      ...mapState('vendor',['cyclesList']),
      ...mapState('customer',['agreementQueryPage','SALES','SERVICE','productLists','quotationsList','costByProductList','examineList']),
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('customer',['loadPostAgreementCreate','loadGetProductQuotations','loadGetCostByProduct',
      'loadGetFindAll','loadPutAgreementfirstExamine','loadGetExamineLog']),
      closeData(){
        this.payload={
            id:null,
            currency:null,
            billCycle:null,
            startPaymentDate:null,
            effectiveDate:null,
            productId:null,
            customerId:null,
            managerId:null,
            servicerId:null,
            normalItem:false,
            sensitiveItem:false,
            stateTrack:false,
            cod:false,
            deliveryDay:null,
            shippingCountryCode:null,
          destinationCountryCode:null,
          code:null
        }
      },
      productFind(shippingCountryCode,destinationCountryCode){
         this.loadGetFindAll({destinationCountryCode,shippingCountryCode})
      },
      clickConfirm(examineFlag,agreementId,examineRemark) {
        const _this = this ;
                let data = {agreementId,examineFlag,examineRemark}
                _this.loadPutAgreementfirstExamine(data).then(success=>{
                   this.$emit('close',{type:this.type,bool:true})
                   this.closeData()
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
      clickClose() {
        this.$emit('close',{type:this.type,bool:false})
        this.closeData()
      }
    },

    watch: {
      item:{
          deep:true,
          handler:function(val){
            if(val){
              let payload = JSON.parse(JSON.stringify(val) );
              let {customerId,productId,billCycle
              ,startPaymentDate
              ,effectiveDate
              ,managerId
              ,servicerId,
              deliveryDay
              ,normalItem
              ,sensitiveItem
              ,stateTrack
              ,cod
              ,id
              ,currency
              ,code
              } = payload ;

              this.payload = {
              currency:currency?currency:null
              ,billCycle
              ,startPaymentDate
              ,effectiveDate
              ,productId
              ,customerId
              ,managerId
              ,servicerId
              ,id
              ,normalItem:normalItem == 1 ? true :false
              ,sensitiveItem:sensitiveItem == 1 ? true :false
              ,stateTrack:stateTrack == 1 ? true :false
              ,cod:cod == 1 ? true :false
              ,deliveryDay
              ,code}
              this.loadGetProductQuotations([id]).then(success=>{
                  this.list = this.quotationsList ;
              }).catch(error=> {
                  this.$message( {
                  message: error,
                  type: 'error'
                  });
              })
              this.loadGetCostByProduct({id:productId}).then(success=>{
                  this.lists = this.costByProductList ;
              }).catch(error=> {
                  this.$message( {
                  message: error,
                  type: 'error'
                  });
              })
              this.loadGetExamineLog({agreementId:id}).then(success=>{
                  this.listes = this.examineList ;
              })
            }else{
              this.closeData()
            }
          }
      }
      
    }

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
   margin-left 10px

 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding-top 4px
   &.pro  
     height 99px  
     margin-bottom 4px
   &.err  
     min-height 40px
</style>