<template>
  <kec-scroll :numbers="179" class="flexs columns">
    <div class="flexs kec-btn a-center j-between" style="width:100%"> 
      <div class="flexs a-center j-start">
           <div class="flexs a-center">
            <kec-form crosswise text="供应商" width="80px">
                <template #input>
                  <el-select v-model="vendorId" size="medium" @change="changeVendorId" 
                  filterable placeholder="" style="width:140px">
                    <el-option
                      v-for="item in supplierList"
                      :key="item.id"
                      :label="item.companyName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
              <kec-form text="供应商产品" crosswise width="90px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="vendorProductId" 
                        @change="clickConfirms"
                        :disabled="!vendorId" placeholder="" size="medium" style="width:140px">
                          <el-option
                            v-for="item in vendorProductList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
                </kec-form>

                <!-- <kec-form crosswise text="服务分区" width="80px">
                  <template #input>
                    <el-select v-model="id" disabled
                     size="medium" 
                     @change="changePartition" filterable placeholder="" style="width:140px">
                      <el-option
                        v-for="item in statementsList"
                        :key="item.id"
                        :label="item.partitionName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                </kec-form> -->
              
              <!-- <kec-button-click :disabled="!vendorProductId" @click="clickConfirms(vendorProductId)" text="查询" style="width:60px"
               background="#17A2B8" color="#fff"></kec-button-click> -->
          </div>
           
      </div>
      <div class="flexs a-center j-end">
          <kec-button-click  text="保存" style="width:60px" 
          :disabled="!statementsData.id || tabsIndex!=0"
          @click="modificationFunc(vendorProductId,statementsData)"
               background="#F18A34" color="#fff"></kec-button-click>
          <kec-button-click  text="提交" style="width:60px" 
          :disabled="!statementsData.id || tabsIndex!=0"
          @click="loadPutFunc('loadPutSubmit',statementsData.id)"
               background="#33B838" color="#fff"></kec-button-click>
          <kec-button-click  text="审核" style="width:60px" 
          :disabled="!statementsData.id || tabsIndex!=0"
          @click="loadPutFunc('loadPutEexamine',statementsData.id)"
               background="#4951D0" color="#fff"></kec-button-click>
          <kec-button-click  text="撤回" style="width:60px" 
          :disabled="!statementsData.id || tabsIndex!=0"
          @click="loadPutFunc('loadPutRecall',statementsData.id)"
               background="#CE3E2B" color="#fff"></kec-button-click>
      </div>
        
    </div>
    <div class="kec-content">
        <kec-tabs 
                :titleList="versionsText"
                @change="tabsFunc"
                variate
                >
                  <template>
                    <div>
                        <div class="row" style="padding:5px 0">
                          <div class="col-sm-3">
                            <kec-form crosswise text="生效日期" width="80px" v-show="tabsIndex==0">
                              <template #input>
                                     <el-date-picker
                                        v-model="statementsData.execDate"
                                        type="date"
                                        size="medium"
                                        style="width:100%"
                                        placeholder="选择日期">
                                      </el-date-picker>
                              </template>
                            </kec-form>
                            <kec-form crosswise text="生效日期" width="80px" v-show="tabsIndex!=0">
                              <template #input>
                                     <el-date-picker
                                        v-model="execDate"
                                        disabled
                                        type="date"
                                        style="width:100%"
                                        size="medium"
                                        placeholder="选择日期">
                                      </el-date-picker>
                              </template>
                            </kec-form>
                            </div>
                            <div class="col-sm-3 flexs a-center" style="height:36px">
                            <kec-form crosswise text="状态 :" width="80px" v-show="tabsIndex==0">
                              <template #input>
                                <div class="flexs a-center">
                                    <span>{{statementsData.examineStatusString?statementsData.examineStatusString:'无'}}</span>
                                </div>
                              </template>
                            </kec-form>
                            <kec-form crosswise text="状态 :" width="80px" v-show="tabsIndex!=0">
                              <template #input>
                                <div class="flexs a-center">
                                    <span>{{examineStatusString?examineStatusString:'无'}}</span>
                                </div>
                              </template>
                            </kec-form>
                            </div>
                            <div class="col-sm-6">
                            <kec-form crosswise text="分区方案" width="70px">
                              <template #input>
                                     <el-select v-model="statementsData.schemaIds" filterable
                                      clearable multiple placeholder="" size="medium" style="width:100%">
                                        <el-option
                                        v-for="item in schemasList"
                                        :key="item.id"
                                        :label="item.schemaName"
                                        :value="item.id">
                                        </el-option>
                                      </el-select>
                              </template>
                            </kec-form>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3">
                                <kec-form text="服务类型" crosswise width="80px">
                                  <template #input>
                                    <el-select v-model="serverType" placeholder="" size="medium"
                                    @change="changeServer"
                                     style="width:100%">
                                      <el-option
                                        v-for="item in serverList"
                                        :key="item.code"
                                        :label="item.text"
                                        :value="item.code">
                                      </el-option>
                                    </el-select>
                                  </template>
                                </kec-form>
                            </div>
                            <div class="col-sm-7">
                                <kec-form text="应付科目" crosswise width="80px">
                                  <template #input>
                                    <el-select v-model="chargeItemIds"
                                    clearable multiple placeholder="" 
                                    size="medium" style="width:100%">
                                      <el-option
                                        v-for="item in chargeItemsList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                      </el-option>
                                    </el-select>
                                  </template>
                                </kec-form>
                            </div>
                            <div class="col-sm-2 flexs j-end" >
                              <el-button type="success"  size="medium"
                              :disabled="chargeItemIds.length==0 || !statementsData.id || tabsIndex!=0"
                               @click.native="addItem(statementsData.id,chargeItemIds,vendorProductId)"
                               >添加成本项</el-button>
                            </div>
                        </div>
                        <div class="posi">
                            <!-- <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
                              <div class="padd" style="width:120px">报价方式</div>
                              <div class="padd" style="width:100px">服务类型</div>
                              <div class="padd flx">收费项</div>
                              <div class="padd" style="width:100px">科目名称</div>
                              <div class="padd" style="width:100px">科目编号</div>
                              <div class="padd" style="width:100px">费率</div>
                              
                              <div class="padd" style="width:100px">币种</div>
                              
                              <div class="padd" style="width:100px">单位乘数</div>
                              <div class="padd" style="width:100px">收费单位</div>
                              <div class="padd" style="width:100px">材积因子</div>
                              <div class="padd" style="width:100px">计收材计重</div>
                              <div class="padd" style="width:80px">操作</div>
                            </div> -->
                            <kec-scroll :numbers="356" style="border-bottom:1px solid #EBEEF5">
                              <el-table
                                ref="singleTable"
                                  class="scrollbar"
                                  :data="statementsData.content"
                                  :header-cell-style="{
                                    background:themeColor.content_border_color,
                                    borderRight:'1px solid #FFF',
                                    fontWeight:'bold',
                                    height:'38px',
                                    color:'#FFF',
                                    padding:'0'
                                  }"
                                  :max-height="tableHeight"
                                  highlight-current-row
                                  @current-change="changeSelectFunc"
                                  :cell-style="{
                                    borderRight:'1px solid #EBEEF5',
                                    padding:'4px 0'
                                  }"
                                  style="width:100%">
                                  <el-table-column
                                  label="序号"
                                  width="50">
                                  <template slot-scope="scope">
                                     <div class="flexs j-center">
                                       <span>{{statementsData.content.length - scope.$index}}</span>
                                     </div>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="offerType"
                                  label="报价方式"
                                  width="100">
                                  <template slot-scope="scope">
                                    <el-select v-model="scope.row.offerType" :disabled="tabsIndex!=0" placeholder="请选择" size="mini">
                                        <el-option
                                          v-for="item in options"
                                          :key="item.code"
                                          :label="item.name"
                                          :value="item.code">
                                        </el-option>
                                      </el-select>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="serviceType"
                                  label="服务类型"
                                  width="100">
                                    
                                  </el-table-column>
                                  <el-table-column
                                  prop="standardStateName"
                                  label="货态">
                                  </el-table-column>
                                  <el-table-column
                                  prop="tagName"
                                  label="适用标签"
                                  width="110">
                                    <template slot-scope="scope">
                                      <el-popover
                                        v-show="scope.row.tagName.length>0"
                                        placement="right"
                                        width="300"
                                        trigger="hover">
                                        <div>
                                          <el-tag class="pr" type="info" size="mini" 
                                          v-for="(name,i) of scope.row.tagName" 
                                          :key="i">{{name}}</el-tag>
                                        </div>
                                        <el-tag class="pr ell" type="info" slot="reference" size="mini">
                                          {{scope.row.tagName[0]}}
                                        </el-tag>
                                      </el-popover>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="chargeItemName"
                                  label="收费项">
                                  </el-table-column>
                                  <el-table-column
                                  prop="ledgerSubjectName"
                                  label="科目名称"
                                  width="100">
                                  </el-table-column>
                                  <el-table-column
                                  prop="ledgerSubjectNumber"
                                  label="科目编号"
                                  width="100">
                                  </el-table-column>
                                  <el-table-column
                                  prop="unitPrice"
                                  label="费率"
                                  width="100"
                                  >
                                  <template slot-scope="scope">
                                      <el-input-number v-model="scope.row.unitPrice"
                                      :disabled="tabsIndex!=0"
                                       style="width:100%"
                                       :controls="false" size="mini"
                                      :min="0.00"></el-input-number>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="currency"
                                  label="币种"
                                  width="100">
                                    <template slot-scope="scope">
                                      <el-select v-model="scope.row.currency" :disabled="tabsIndex!=0" placeholder="请选择" size="mini">
                                        <el-option
                                          v-for="item in currencyList"
                                          :key="item.id"
                                          :label="item.code"
                                          :value="item.code">
                                        </el-option>
                                      </el-select>
                                    </template>
                                  </el-table-column>
                                  
                                  <el-table-column
                                  prop="unitRate"
                                  label="单位乘数"
                                  width="100"
                                  >
                                  <template slot-scope="scope">
                                      <el-input-number v-model="scope.row.unitRate"
                                       style="width:100%"
                                       :disabled="tabsIndex!=0"
                                       :controls="false" size="mini"></el-input-number>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="unit"
                                  label="收费单位"
                                  width="100">
                                  </el-table-column>
                                  <el-table-column
                                  prop="volumeWeightFactory"
                                  width="100"
                                  label="材积因子">
                                  <template slot-scope="scope">
                                      <el-input-number v-model="scope.row.volumeWeightFactory"
                                       style="width:100%"
                                       :disabled="tabsIndex!=0"
                                       :controls="false" size="mini"
                                      :min="1"></el-input-number>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                    prop="status"
                                    width="100"
                                    label="计收材计重">
                                      <template slot-scope="scope">
                                           
                                           <el-checkbox 
                                            :disabled="tabsIndex!=0"
                                            v-model="scope.row.volumeWeightStatus">{{
                                              scope.row.volumeWeightStatus?'是':'否'
                                              }}</el-checkbox>
                                        
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                  :width="tabsIndex!=0?80:140"
                                  fixed="right"
                                  label="操作">
                                  <template slot-scope="scope">
                                     <div class="flexs">
                                        <el-button size="mini" v-if="scope.row.offerType==='ECHELON'"
                                        type="warning"
                                        @click.native="dislogFunC('编辑阶梯报价',true,'ladderQuotation',scope.row)"
                                        >{{tabsIndex==0?'编辑':'查看'}}</el-button>
                                        <el-button size="mini" v-else
                                        type="warning"
                                        @click.native="dislogFunC('编辑单一报价',true,'onlyQuotation',scope.row)"
                                        >{{tabsIndex==0?'编辑':'查看'}}</el-button>
                                      <kec-del-popover content="确定要删除?" 
                                      v-show="tabsIndex==0"
                                   @click="delFunc"
                                   :date="{priceId:scope.row.id,
                                   productId:vendorProductId}"></kec-del-popover>
                                      </div>
                                    </template>
                                  </el-table-column>
                              </el-table>
                            </kec-scroll>
                        </div>
                        <!-- <div class="posi" v-show="tabsIndex!=0">
                           <kec-table 
                            height="300px"
                            :tableHeader="tableHeader"
                            :tableData="list" 
                            :letWidth="letWidth">
                                <template v-slot:default="slotProps">
                                {{slotProps.item}}
                                </template>
                                <template v-slot:offerType="slotProps">
                                  {{slotProps.item==='SEPARATE'?'分项':'包干'}}
                                </template>
                            </kec-table>
                        </div> -->
                    </div>
                  </template>
        </kec-tabs>
        
    </div>
    <component :is="componentName" 
    :dialogVisible="dialogVisible" 
    @close="cancelFunc" 
    :item="itemData"
    :text="textItem"
    :tabsIndex="tabsIndex"
    ></component>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll,KecTabs ,KecButtonClick,KecForm,KecDelPopover}  from '@/common/components'
import ladderQuotation from './ladderQuotation'
import onlyQuotation from './onlyQuotation'
import {formateDate,getClientHeight} from '@/utils/fun'
  export default {
    name:'costList',
    props:[''],
    data () {
      return {
           vendorId:null,
           vendorProductId:null,
           list:[],
           popoverId:'',
           visible:true,
           options:[
             {code:'ALL_DO',name:'单一'},   
             {code:'ECHELON',name:'阶梯'}
           ],
           tabsIndex:0,
           tableHeader:{
             id:{"title":'ID','slot':false},
             offerType:{"title":'报价方式','slot':true},
             serviceType:{"title":'服务类型','slot':false},
             chargeItemName:{"title":'收费项','slot':false},
             ledgerSubjectName:{"title":'科目名称','slot':false},
             ledgerSubjectNumber:{"title":'科目编号','slot':false},
             unitPrice:{"title":'费率','slot':false},
             currency:{"title":'币种','slot':false},
             unit:{"title":'收费单位','slot':false}
           },
           
           list:[],
           examineStatusString:'',
           execDate:'',
           schemaIds:[],
           letWidth:{},
           versionsText:['当前成本价'],
           componentName:'',
           dialogVisible:false,
           textItem:'',
           id:null,
           statementsData:{
             "content":[],
             "examineStatusString":"",
             "execDate":'',
             "partitionName":"",
             "schemaIds":[],
             "id":null
           },
           serverType:null,
           chargeItemIds:[],
           itemData:null
      };
    },

    components: {
        KecButtonClick ,
        KecButton,
        KecTable,
        KecScroll,
        KecForm,
        KecTabs,
        KecDelPopover,
        ladderQuotation,
        onlyQuotation
    },

    computed: {
      ...mapState('basic',['supplierList','currencyList','serverList']),
      ...mapState('vendor',['vendorProductList','statementsList','versionstList','versionstTwoList','schemasList']),
      ...mapState('home',['themeColor','tabsShow']),
      ...mapState('channels',['chargeItemsList']),
      tableHeight: function(){
        let that = this ;
        if(that.tabsShow === 'show'){
           return getClientHeight() - 400
        }else{
           return getClientHeight() - 360
        }
      }
      
    },

    beforeMount() {},

    mounted() {
      this.loadVendorGetVendors()
      this.loadDictionaryCURRENCY()
      this.loadQueryServerTypes()
      this.loadGetQueryLevelTwo()
      this.loadEnumsTagTypes()
      this.loadGetPartitionSchemasAll({partitionType:"vendor"})
      // this.loadGetTags({pageSize:10000,pageNumber:1})
    },

    methods: {
        ...mapActions('vendor',['loadGetVendorProducts','loadGetCostStatements','loadGetPartitionSchemasAll',
        'loadPutCostStatements','loadGetCostStatementsVersions','loadPutRecall','loadPutEexamine','loadPutSubmit',
        'loadGetCostStatementsVersionsTwo','loadPostCostStatementsPrice','loadDeleteCostStatementsPrice']),
        ...mapActions('basic',['loadVendorGetVendors','loadDictionaryCURRENCY','loadQueryServerTypes','loadGetTags','loadEnumsTagTypes']),
        ...mapActions('channels',['loadGetChargeItems']),
        ...mapActions('order',['loadGetQueryLevelTwo']),
        ...mapMutations('basic',['filterTags']),
        addItem(quotationId,chargeItemIds,productId){
          let data = {quotationId,chargeItemIds}
          this.loadPostCostStatementsPrice(data).then(success=>{
                    this.clickConfirms(productId) ;
                    
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
        changeServer(code){
          this.chargeItemIds = [] ;
          this.loadGetChargeItems([code,false])
        },
        delFunc(date){
          let {priceId,productId} =date
          this.popoverId = ''
          let data = {priceId}
          this.loadDeleteCostStatementsPrice({data}).then(success=>{
                    this.clickConfirms(productId) ;
                    
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
        clickConfirms(vendorProductId,ids) {
        const _this = this ;
         _this.id = null ;
         _this.serverType = null
         _this.chargeItemIds = []
         
         _this.loadGetCostStatements([vendorProductId]).then(success=>{
           if(_this.statementsList.length){
              if(!ids){
                 let { content ,examineStatusString,execDate,partitionName,id,schemaIds} = _this.statementsList[0] ;
                 _this.statementsData = { content ,examineStatusString,execDate,partitionName,id,schemaIds} ;
                 
                 _this.tabsIndex = 0
                 _this.id = id ;
                 _this.loadGetCostStatementsVersions([id]).then(succes=>{
                   _this.loadGetTags({pageSize:10000,pageNumber:1}).then(success=>{
                      _this.filterTags(_this.statementsData.schemaIds)
                    })
                    let arr = []
                    arr = _this.versionstList.map(item=>{
                        return item.name
                    })
                    _this.versionsText = ['当前成本价',...arr]
                  })
              }else{
                 _this.changePartition(ids)
                 _this.id = ids ;
              }
              
              

           }else{
              this.statementsData = {
                "content":[],
                "examineStatusString":"",
                "execDate":'',
                "partitionName":"",
                "schemaIds":[],
                "id":null
              }
           }
           
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
        changePartition(id){
            const _this = this ;
            _this.statementsData = _this.statementsList.find(item=> { return id == item.id })

            _this.loadGetCostStatementsVersions([id]).then(succes=>{
               _this.loadGetTags({pageSize:10000,pageNumber:1}).then(success=>{
                      _this.filterTags(_this.statementsData.schemaIds)
                    })
                let arr = []
                arr = _this.versionstList.map(item=>{
                    return item.name
                })
                _this.versionsText = ['当前成本价',...arr]
            })
            
        },
        loadPutFunc(funName,id){
            this[funName]([id]).then(success=>{
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
        modificationFunc(vendorProductId,statementsData){
           let {execDate,content,id,schemaIds} = statementsData ;
           if(vendorProductId && statementsData){
             
             let contents = content.map(item =>{
               let {id,unitPrice,currency,offerType,volumeWeightStatus,volumeWeightFactory,unitRate} = item ;

               let data = {id,unitPrice:parseFloat(unitPrice),currency,offerType,volumeWeightStatus,volumeWeightFactory,unitRate}
               return data
             })
             let date = {vendorProductId,execDate:formateDate(execDate),content:contents,id,schemaIds}
             this.loadPutCostStatements(date).then(success=>{
                    this.clickConfirms([this.vendorProductId],id)
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
        tabsFunc(index){
            this.tabsIndex = index ;
            
            if(index>=1){
              let i = index - 1 ;
              let {code} = this.versionstList[i] ;
              this.loadGetCostStatementsVersionsTwo([this.id,code]).then(success => {
                let { content ,examineStatusString,execDate,partitionName,id,schemaIds} = this.versionstTwoList ;
                this.list = content ;
                this.schemaIds = schemaIds ;
                this.examineStatusString = examineStatusString ;
                this.execDate = execDate ;

              })
              
            }
           
        },
        changeVendorId(ventorsId){
          this.vendorProductId = null
          this.id = null ;
          this.statementsData = {
             "content":[],
             "examineStatusString":"",
             "execDate":'',
             "partitionName":"",
             "schemaIds":[],
             "id":null
           }
          this.loadGetVendorProducts([ventorsId])
          
        },
        changeSelectFunc(obj){
           this.itemObj = obj ;
        },
        changeRoleId(roleId){
           if(roleId){
             this.loadGetPermissionRole({roleId})
             this.routerPath = ''
           }
        },
        searchFunc(routerPath,list){
          let result = [] ;
          const _ = this ;
          if( routerPath ){
            result = list.filter(word => {return word.routerPathString == routerPath});
          }else{
            result = list
          }

           _.tableRole = result ;
        },
        
        dislogFunC(text,bool,component,item) {
          this.$nextTick(()=>{
             this.itemData = item ;
          })
          this.textItem = text ;
          this.dialogVisible = bool ;
          this.componentName = component ;
        },
        cancelFunc(bool){
          this.dialogVisible = false ;
          this.$refs.singleTable.setCurrentRow();
          this.textItem = '' ;
          this.itemData = null ;
          this.itemObj = null ; 
          bool && this.clickConfirms(this.vendorProductId)
          bool && ( this.roleId = null )
          bool && ( this.routerPath = '' )
        },
        checkRole(id,bool){
          const _ = this ;
          if(bool){
            _.idsList.push(id)
          }else{
             let index = _.idsList.findIndex( item => item == id)
             _.idsList.splice(index,1)
          }
        }
        
    },

    watch: {
      permissionList:{
        deep:true,
        handler:function(val){
          const _ = this ;
          let arr = JSON.parse( JSON.stringify(val) ) ;
          // this.tableRole = arr ;
        }
      },
      permissionIds:{
        deep:true,
        handler:function(val){
          const _ = this ;
           if(val){
             _.idsList = JSON.parse( JSON.stringify(val) ) || [] ;
             _.tableRole = JSON.parse( JSON.stringify(_.permissionList) ) ;
           }
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button   
   margin-left 5px
 .kec-btn  
   padding 5px        
 .kec-content  
   width calc(100vw - 290px)
   .posi
     position relative
     margin-bottom 5px
 .tableHeader 
   height 38px 
   width calc(100vw - 294px)
   border-radius 3px
   position absolute
   top 0  
   left 1px
   z-index 9
   div+div  
     border-left 1px solid #fff
   .padd 
     padding 0 0 0 10px
     height 38px 
     line-height 38px
     color #fff  
     font-weight bold   
   .flx 
     flex 1
     flex-grow 1
     min-width 100px
 @media screen and ( max-width: 1024px ) 
  .kec-content  
   width calc(100vw - 20px)
  .tableHeader 
   width calc(100vw - 24px)

 .pr+.pr
    margin-left 5px  
    margin-bottom 5px
 .ell 
    width 80px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    cursor pointer
</style>