<template>
  <kec-drag 
      boxWidth="960px" client
      v-show="dialogVisible">
     <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button 
            v-show="!disableds"
            v-checkSubmit
            :text="type==='addVisible'?'新建':'修改'" 
            icon="fa-floppy-o" 
            :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
            <!-- <kec-button 
            v-show="!disableds"
            @click.native="clickConfirm" 
            :text="type==='addVisible'?'新建':'修改'" 
            icon="fa-floppy-o" 
            :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button> -->
            <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <div class="row">
          
          <div class="col-sm-12">
              <kec-form text="协议属性">
                <template #input>
                     <div  class="col-sm-12 borders" style="margin-bottom:5px">
                        <!-- <div class="col-sm-8">
                            <kec-form text="协议编号" width="70px" crosswise>
                            <template #input>
                              <el-input v-model="payload.input" placeholder="" :disabled="type==='changeVisible'"></el-input>
                            </template>
                            </kec-form>
                        </div> -->
                        <div class="col-sm-8">
                            <kec-form text="客户" width="70px" star="star" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-select
                                      style="width:100%"
                                        class='v-check'
                                        v-checkParam="{required:true}"
                                        :disabled="disableds"
                                        v-model="payload.customerId"
                                        filterable
                                        placeholder="">
                                        <el-option
                                          v-for="(item,index) in customerList"
                                          :key="index+'-customer'"
                                          :label="item.companyName"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                </div>
                            </template>
                            </kec-form>
                        </div>
                        <div class="col-sm-4">
                            <kec-form text="结算货币" star="star" width="70px" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-select
                                      style="width:100%"
                                      :disabled="disableds"
                                       class='v-check'
                                        v-checkParam="{required:true}"
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
                            <kec-form text="运营主体" width="70px" star="star" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-select
                                      style="width:100%"
                                      :disabled="disableds"
                                       class='v-check'
                                        v-checkParam="{required:true}"
                                        v-model="payload.organizationId"
                                        filterable
                                        placeholder="">
                                        <el-option
                                          v-for="item in operationList"
                                          :key="item.id"
                                          :label="item.name"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                      
                                </div>
                            </template>
                            </kec-form>
                        </div>
                        
                        
                        <div class="col-sm-4">
                            <kec-form text="销售代表" width="70px" star="star" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-select
                                      style="width:100%"
                                      :disabled="disableds"
                                      class='v-check'
                                        v-checkParam="{required:true}"
                                        v-model="payload.salesmanId"
                                        filterable
                                        placeholder="">
                                        <el-option
                                          v-for="item in service['SALES']"
                                          :key="item.id"
                                          :label="item.name"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                                </div>
                            </template>
                            </kec-form>
                        </div>
                        <div class="col-sm-4">
                            <kec-form text="客服代表" width="70px" star="star" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-select
                                      style="width:100%"
                                      :disabled="disableds"
                                      class='v-check'
                                        v-checkParam="{required:true}"
                                        v-model="payload.servicerId"
                                        filterable
                                        placeholder="">
                                        <el-option
                                          v-for="item in service['CUSTOMER_SERVICE']"
                                          :key="item.id"
                                          :label="item.name"
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
                              <el-select v-model="payload.billCycle" :disabled="disableds" filterable placeholder="" style="width:100%">
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
                                    :disabled="disableds"
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
                            <kec-form text="生效日期" width="70px" star="star" crosswise>
                            <template #input>
                              <div class="flexs">
                                    <el-date-picker
                                    style="width:100%"
                                    :disabled="disableds"
                                    class='v-check'
                                        v-checkParam="{required:true}"
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
                                        placeholder="" :disabled="disableds"></el-input>
                                      </template>
                                      </kec-form>
                        </div>
                    </div>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
                        <kec-form text="属性及服务">
                        <template #input>
                          <div class="col-sm-12 borders"  style="padding:8px 0">
                              <div class="col-sm-3"><el-checkbox :disabled="disableds" v-model="payload.normalItem">普货</el-checkbox></div>
                              <div class="col-sm-3"><el-checkbox :disabled="disableds" v-model="payload.sensitiveItem">敏感货</el-checkbox></div>
                              <div class="col-sm-3"><el-checkbox :disabled="disableds" v-model="payload.stateTrack">货态跟踪</el-checkbox></div>
                              <div class="col-sm-3"><el-checkbox :disabled="disableds" v-model="payload.cod">COD</el-checkbox></div>
                          </div>
                        </template>
                        </kec-form>
          </div>
          
          <div class="col-sm-12" style="margin-top:5px">
              <kec-form text="产品筛选">
              <template #input>
                <div class="col-sm-12 borders">
                    
                    <div class="col-sm-3">
                        <kec-form text="起运地区/国家" width="100px" crosswise>
                        <template #input>
                          <div class="flexs">
                                <el-select
                                  style="width:100%"
                                  :disabled="disableds"
                                  clearable
                                    v-model="payload.shippingCountryCode"
                                    filterable
                                    placeholder="">
                                    <el-option
                            v-for="item in countryList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                          </el-option>
                                  </el-select>
                            </div>
                        </template>
                        </kec-form>
                    </div>
                    <div class="col-sm-3">
                        <kec-form text="目的地区/国家" width="100px" crosswise>
                        <template #input>
                          <div class="flexs">
                                <el-select
                                  style="width:100%"
                                  :disabled="disableds"
                                    v-model="payload.destinationCountryCode"
                                    filterable
                                    clearable
                                    placeholder="">
                                    <el-option
                            v-for="item in countryList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                          </el-option>
                                  </el-select>
                            </div>
                        </template>
                        </kec-form>
                    </div>
                    <div class="col-sm-2 flexs j-end">
                        <el-button @click.native="productFind(payload.shippingCountryCode,payload.destinationCountryCode)"
                        :disabled="disableds" plain type="success">查询</el-button>
                    </div>
                    <div class="col-sm-4">
                        <kec-form text="可用产品" width="70px" star="star" crosswise>
                        <template #input>
                          <div class="flexs">
                                <el-select
                                  style="width:100%"
                                  :disabled="disableds"
                                  class='v-check'
                                        v-checkParam="{required:true}"
                                    v-model="payload.productId"
                                    filterable
                                    placeholder="">
                                    <el-option
                                      v-for="item in productLists"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                            </div>
                        </template>
                        </kec-form>
                    </div>
                    
                </div>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12" style="margin-top:5px" v-show="type==='changeVisible'">
              <kec-form text="协议日志">
              <template #input>
                  <kec-table 
                  height="200"
                  :tableHeader="tableHeader" 
                  :tableData="list" 
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
          
          
        </div>
    
  </kec-drag>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton ,KecDialog,KecTable}  from '@/common/components'
import {formateDate} from '@/utils/fun'
  export default {
    name:'addException',
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
          salesmanId:null,
          servicerId:null,
          normalItem:false,
          sensitiveItem:false,
          stateTrack:false,
          cod:false,
          deliveryDay:null,
          shippingCountryCode:null,
          destinationCountryCode:null,
          organizationId:null
        },
        tableHeader:{
             type:{"title":'类型','slot':true},
             examineAction:{"title":'审核状态','slot':true,'sort':'ZH'},
             examineRemark:{"title":'审核意见','slot':false},
             createTime:{"title":'审核时间','slot':false},
             createUser:{"title":'审核人','slot':false}
           },
           list:[],
           letWidth:{
             
           },
        
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecTable,
        KecDialog
    },

    computed: {
      ...mapState('basic',['customerList','currencyList','countryList','service','operationList']),
      ...mapState('vendor',['cyclesList']),
      ...mapState('customer',['agreementQueryPage','SALES','SERVICE','productLists','examineList']),
      disableds(){
        const _ = this ;
        if(_.type === 'addVisible' || _.payload.examineStatus == 5 || _.payload.examineStatus == 1 ){
          return false ;
        }else{
          return true ;
        }
      }
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('customer',['loadPostAgreementCreate','loadGetFindAll','loadGetExamineLog','loadPutAgreementUpdate']),
      closeData(){
        this.payload={
            id:null,
            currency:null,
            billCycle:null,
            startPaymentDate:null,
            effectiveDate:null,
            productId:null,
            customerId:null,
            salesmanId:null,
            servicerId:null,
            normalItem:false,
            sensitiveItem:false,
            stateTrack:false,
            cod:false,
            deliveryDay:null,
            shippingCountryCode:null,
            organizationId:null,
          destinationCountryCode:null
        }
      },
      productFind(shippingCountryCode,destinationCountryCode){
         this.loadGetFindAll({destinationCountryCode,shippingCountryCode})
      },
      submit(){
          const _ = this ;
          _.clickConfirm()
        },
      clickConfirm() {
        const _this = this ;
        let { currency
              ,billCycle
              ,startPaymentDate
              ,effectiveDate
              ,productId
              ,customerId
              ,salesmanId
              ,servicerId
              ,normalItem
              ,sensitiveItem
              ,stateTrack
              ,cod
              ,id
              ,organizationId
              ,deliveryDay} = _this.payload ;
        let data = {}
        switch(_this.type){
          case 'addVisible':
                data = {
                  effectiveDate:effectiveDate && formateDate(effectiveDate),
                billCycle
                ,currency
                ,productId
                ,customerId
                ,salesmanId
                ,servicerId
                ,normalItem:normalItem?1:2
                ,sensitiveItem:sensitiveItem?1:2
                ,stateTrack:stateTrack?1:2
                ,cod:cod?1:2
                ,organizationId
                ,deliveryDay}
                _this.loadPostAgreementCreate(data).then(success=>{
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
                break;
          case 'changeVisible':
                data = {
                  startPaymentDate:startPaymentDate && formateDate(startPaymentDate),
                  effectiveDate:effectiveDate && formateDate(effectiveDate),
                billCycle
                ,currency
                ,productId
                ,customerId
                ,salesmanId
                ,servicerId
                ,normalItem:normalItem?1:2
                ,sensitiveItem:sensitiveItem?1:2
                ,stateTrack:stateTrack?1:2
                ,cod:cod?1:2
                ,organizationId
                ,id
                ,deliveryDay}
                _this.loadPutAgreementUpdate(data).then(success=>{
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
                break;
          default: 
                break;
        }
        
        
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
              ,examineStatus
              ,salesmanId
              ,servicerId,
              deliveryDay
              ,normalItem
              ,sensitiveItem
              ,stateTrack
              ,cod
              ,currency
              ,organizationId
              ,id
              } = payload ;

              this.payload = {
              currency:currency?currency:null
              ,billCycle
              ,startPaymentDate
              ,effectiveDate
              ,examineStatus
              ,productId
              ,customerId
              ,salesmanId
              ,servicerId
              ,normalItem:normalItem == 1 ? true :false
              ,sensitiveItem:sensitiveItem == 1 ? true :false
              ,stateTrack:stateTrack == 1 ? true :false
              ,cod:cod == 1 ? true :false
              ,deliveryDay
              ,organizationId
              ,id}
              this.loadGetExamineLog({agreementId:id}).then(success=>{
                  this.list = this.examineList ;
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