<template>
  <kec-scroll :numbers="179" class="flexs columns">
    <div class="flexs kec-btn a-center j-between" style="width:100%;"> 
      <div class="flexs a-center j-start">
           <div class="flexs a-center">
            <kec-form crosswise text="产品" width="70px">
                <template #input>
                  <el-select v-model="productId" size="medium" @change="changeProductId" 
                  filterable placeholder="" style="width:140px">
                    <el-option
                      v-for="item in productsList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
              <kec-form text="目的国" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="countryCode" 
                        @change="clickConfirms"
                        :disabled="!productId"
                        placeholder="" size="medium" style="width:140px">
                          <el-option
                            v-for="item in countryPartitionList.countryList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
                </kec-form>

                <kec-form crosswise text="分区" width="70px">
                  <template #input>
                    <el-select v-model="partitionId" 
                    :disabled="!productId"
                     size="medium" @change="changePartition" 
                     filterable placeholder="" style="width:140px">
                      <el-option
                        v-for="item in countryPartitionList.partitionList"
                        :key="item.id"
                        :label="item.partitionName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                </kec-form>
                <kec-form crosswise text="产品编码" width="70px">
                  <template #input>
                    <el-input v-model="productCode" 
                    :disabled="!productId"
                    placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              <kec-button-click @click="clickConfirms(vendorProductId)" text="查询"
               style="width:60px" :disabled="!productCode"
               background="#17A2B8" color="#fff"></kec-button-click>
          </div>
           
      </div>
      <div class="flexs a-center j-end">
          <kec-button-click  text="保存" style="width:60px" 
          :disabled="tabsIndex!=0 || !productId"
          @click="modificationFunc(payload)"
          background="#F18A34" color="#fff"></kec-button-click>
          <kec-button-click  text="新增报价" style="width:80px" 
          :disabled="!productId"
          @click="newQuoteFunc(payload)"
          background="#C92626" color="#fff"></kec-button-click>
      </div>
        
    </div>
    <div class="kec-content">
        <kec-tabs 
                :titleList="versionsText"
                @change="tabsFunc"
                >
                  <template>
                    <div >
                      <div class="row">
                        <div class="col-sm-12" style="margin-top:5px">
                          <div class="col-sm-3">
                             <kec-form crosswise text="产品 :" width="70px">
                              <template #input>
                                <div class="flexs a-center" style="height:36px">
                                    <span>{{payload.productName?payload.productName:'无'}}</span>
                                </div>
                              </template>
                             </kec-form>
                          </div>
                          <div class="col-sm-3">
                            <kec-form crosswise text="编号 :" width="50px">
                              <template #input>
                                <div class="flexs a-center" style="height:36px">
                                    <span>{{payload.quotationCode?payload.quotationCode:'无'}}</span>
                                </div>
                              </template>
                            </kec-form>
                            </div>
                          <div class="col-sm-6">
                            <kec-form crosswise text="描述" width="70px">
                              <template #input>
                                <div class="flexs a-center">
                                    <el-input v-model="payload.description" 
                                    :disabled="tabsIndex!=0"
                                    placeholder="" size="medium" style="width:100%"></el-input>
                                </div>
                              </template>
                            </kec-form>
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div class="col-sm-6">
                            <kec-form crosswise text="目的国" width="70px">
                              <template #input>
                                     <el-select v-model="payload.destinationCountryNameList" 
                                     :disabled="tabsIndex!=0"
                                      @change="clickConfirms" clearable multiple placeholder="" size="medium" style="width:100%">
                                        <el-option
                                          v-for="item in countryPartitionList.countryList"
                                          :key="item.code"
                                          :label="item.name"
                                          :value="item.code">
                                        </el-option>
                                      </el-select>
                              </template>
                            </kec-form>
                            </div>
                            <div class="col-sm-6">
                            <kec-form crosswise text="分区" width="70px">
                              <template #input>
                                     <el-select v-model="payload.partitionNameList" 
                                     :disabled="tabsIndex!=0"
                                      @change="clickConfirms" clearable multiple placeholder="" size="medium" style="width:100%">
                                        <el-option
                                          v-for="item in countryPartitionList.partitionList"
                                          :key="item.id"
                                          :label="item.partitionName"
                                          :value="item.id">
                                        </el-option>
                                      </el-select>
                              </template>
                            </kec-form>
                            </div>
                        </div>
                        </div>
                        <div class="posi">
                            <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
                              <div class="padd" style="width:59px">ID</div>
                              <div class="padd" style="width:120px">报价方式</div>
                              <div class="padd" style="width:100px">服务类型</div>
                              <div class="padd flx">收费项</div>
                              <div class="padd" style="width:100px">科目名称</div>
                              <div class="padd" style="width:100px">科目编号</div>
                              <div class="padd" style="width:100px">费率</div>
                              <div class="padd" style="width:100px">币种</div>
                              <div class="padd" style="width:100px">收费单位</div>
                              <div class="padd" style="width:100px">计收材计重</div>
                              <div class="padd" style="width:80px">材积因子</div>
                            </div>
                            <kec-scroll :numbers="356" style="border-bottom:1px solid #EBEEF5">
                              <el-table
                                ref="singleTable"
                                  class="scrollbar"
                                  :data="payload.productPrices"
                                  :header-cell-style="{
                                    fontWeight:'bold',
                                    height:'38px',
                                    color:'#000',
                                    padding:'0'
                                  }"
                                  highlight-current-row
                                  @current-change="changeSelectFunc"
                                  :cell-style="{
                                    borderRight:'1px solid #EBEEF5',
                                    padding:'6px 0'
                                  }"
                                  style="width:100%">
                                  <el-table-column
                                  prop="id"
                                  label="ID"
                                  width="60">
                                    
                                  </el-table-column>
                                  <el-table-column
                                  prop="offerType"
                                  label="报价方式"
                                  width="120">
                                  <template slot-scope="scope">
                                    <el-select v-model="scope.row.offerType"
                                    :disabled="tabsIndex!=0" placeholder="请选择" size="small">
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
                                      <el-input v-model="scope.row.unitPrice"
                                      :disabled="tabsIndex!=0" placeholder="" size="small"></el-input>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="currency"
                                  label="币种"
                                  width="100">
                                    <template slot-scope="scope">
                                      <el-select v-model="scope.row.currency"
                                      :disabled="tabsIndex!=0" placeholder="请选择" size="small">
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
                                  prop="unit"
                                  label="收费单位"
                                  width="100">
                                  </el-table-column>
                                  <el-table-column
                                  prop="volumeWeightFactory"
                                  width="100"
                                  label="计收材计重">
                                  </el-table-column>
                                  <el-table-column
                                    prop="status"
                                    width="80"
                                    label="材积因子">
                                      <template slot-scope="scope">
                                        <el-checkbox 
                                        :disabled="tabsIndex!=0"
                                        v-model="scope.row.volumeWeightStatus">{{
                                          scope.row.volumeWeightStatus?'是':'否'
                                          }}</el-checkbox>
                                      </template>
                                    </el-table-column>
                              </el-table>
                            </kec-scroll>
                        </div>
                    </div>
                  </template>
        </kec-tabs>
        
    </div>
    <component :is="componentName" 
    :dialogVisible="dialogVisible" 
    @close="cancelFunc" 
    :item="itemData"
    ></component>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll,KecTabs ,KecButtonClick,KecForm}  from '@/common/components'
import quoteDialog from './quoteDialog'
import {formateDate} from '@/utils/fun'
  export default {
    name:'quoteList',
    props:[''],
    data () {
      return {
           componentName:'quoteDialog',
           dialogVisible:false,
           countryCode:null,
           partitionId:null,
           productId:null,
           productCode:null,
           list:[28944],
           options:[
             {code:'ALL_DO',name:'包干'},   
             {code:'SEPARATE',name:'分项'}
           ],
           tabsIndex:0,
           payload:{
             description:'',
             destinationCountryNameList:[],
             partitionNameList:[],
             id:null,
             productId:null,
             productName:'',
             productPrices:[],
             quotationCode:''
           },
           examineStatusString:'',
           execDate:'',
           letWidth:{},
           versionsText:['无'],
           id:null,
           statementsData:{
             "content":[],
             "examineStatusString":"",
             "execDate":'',
             "partitionName":"",
             "id":null
           },
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
        quoteDialog
    },

    computed: {
      ...mapState('basic',['currencyList','productsList']),
      ...mapState('channels',['productPartitionsList','countryPartitionList']),
      ...mapState('home',['themeColor']),
      
      
    },

    beforeMount() {},

    mounted() {
      this.loadProducts()
      this.loadDictionaryCURRENCY()
    },

    methods: {
        ...mapActions('channels',['loadGetProductQuotation','loadGetCountryPartition',
        'loadPostProductQuotation','loadPutProductQuotation']),
        ...mapActions('basic',['loadProducts','loadDictionaryCURRENCY']),
        clickConfirms(vendorProductId,ids) {
        const _this = this ;
         _this.id = null ;
         _this.loadGetCostStatements([vendorProductId]).then(success=>{
           if(_this.statementsList.length){
              if(!ids){
                 let { content ,examineStatusString,execDate,partitionName,id} = _this.statementsList[0] ;
                 _this.statementsData = { content ,examineStatusString,execDate,partitionName,id} ;
                
                 _this.tabsIndex = 0
                 _this.id = id ;
                 _this.loadGetCostStatementsVersions([id]).then(succes=>{
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
            
            
        },
        newQuoteFunc(payload){
          this.dialogVisible = true
          this.itemData = payload ;
        },
        modificationFunc(payload){
             let{
               description,
             destinationCountryNameList,
             partitionNameList,
             id,
             productId,
             productName,
             productPrices,
             quotationCode
             } = payload ;
             let content = []
             if(productPrices.length>=1){
               productPrices.forEach(element => {
                 let obj = {
                    "id": element.id,
                    "unitPrice": element.unitPrice,
                    "currency": element.currency,
                    "offerType": element.offerType,
                    "volumeWeightStatus":element.volumeWeightStatus
                 }
                 content.push(obj)
               });
             }
             let data = {productId,id,description,
             destinationCountryIds:destinationCountryNameList,
             partitionIds:partitionNameList,content}
             this.loadPutProductQuotation(data).then(success=>{
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
        tabsFunc(index){
            const _ = this ;
            _.tabsIndex = index ;
            if(_.productPartitionsList.length) _.payload = _.productPartitionsList[index]
            
        },
        changeProductId(productId){
          const _ = this ;
          _.partitionId = null ;
          _.countryCode = null ;
          this.loadGetProductQuotation([productId]).then(success=>{
            if(_.productPartitionsList.length){
              _.versionsText = _.productPartitionsList.map(item=>{
               return item.productName ;
             })
             _.payload = _.productPartitionsList[0];
            }
             this.$message( {
                    message: success,
                    type: 'success'
                    });
          }).catch(error=>{
              this.$message( {
                    message: error,
                    type: 'error'
                    });
          })
          this.loadGetCountryPartition([productId])
          
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
        
        dislogFunC(text,bool,component,type) {
          this.textType = type ;
          this.textItem = text ;
          this.dialogVisible = bool ;
          this.componentName = component ;
        },
        cancelFunc(bool){
          this.dialogVisible = false ;
          this.itemData = null
          bool && this.changeProductId(this.productId)
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
      
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button   
   margin-left 10px
 .kec-btn  
   padding 5px        
 .kec-content  
   padding-top 5px
   background #EEEEEE
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
</style>