<template>
  <kec-scroll :numbers="179" class="flexs columns">
    <div class="flexs kec-btn a-center j-between" style="width:100%;"> 
      <div class="flexs a-center j-start">
           <div class="flexs a-center">
            <kec-form crosswise text="产品" width="40px">
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
              <kec-form text="目的国" crosswise width="60px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="countryCode" 
                        @change="selectQuotoFunc('destination')"
                        :disabled="!productId" clearable
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

                <kec-form crosswise text="分区" width="40px">
                  <template #input>
                    <el-select v-model="partitionId" 
                    :disabled="!productId" clearable
                     size="medium" @change="selectQuotoFunc('partition')"
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
                    placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
              <kec-button-click @click="clickConfirms(productCode)" text="查询"
               style="width:60px" :disabled="!productCode"
               background="#17A2B8" color="#fff"></kec-button-click>
          </div>
           
      </div>
      <div class="flexs a-center j-end">
          <kec-button-click  text="保存" style="width:60px" 
          :disabled="!productId"
          @click="modificationFunc(payload)"
          background="#F18A34" color="#fff"></kec-button-click>
          <kec-button-click  text="新增报价表" style="width:80px" 
          :disabled="!productId"
          @click="newQuoteFunc(productId)"
          background="#C92626" color="#fff"></kec-button-click>
      </div>
        
    </div>
    <div class="kec-content">
        <kec-tabs 
                :titleList="versionsText"
                @changeItem="tabsFunc"
                variate
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
                          <div class="col-sm-2">
                            <kec-form crosswise text="编号 :" width="50px">
                              <template #input>
                                <div class="flexs a-center" style="height:36px">
                                    <span>{{payload.quotationCode?payload.quotationCode:'无'}}</span>
                                </div>
                              </template>
                            </kec-form>
                            </div>
                          <div class="col-sm-7">
                            <kec-form crosswise text="描述" width="70px">
                              <template #input>
                                <div class="flexs a-center">
                                    <el-input v-model="payload.description" 
                                    placeholder="" size="medium" style="width:100%"></el-input>
                                </div>
                              </template>
                            </kec-form>
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div class="col-sm-5">
                            <kec-form crosswise text="目的国" width="70px">
                              <template #input>
                                     <el-select v-model="payload.destinationCountryNameList" 
                                       clearable multiple placeholder="" size="medium"
                                        style="width:100%">
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
                            <div class="col-sm-7">
                            <kec-form crosswise text="分区" width="70px">
                              <template #input>
                                     <el-select v-model="payload.partitionNameList" 
                                      clearable multiple placeholder="" size="medium" style="width:100%">
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
                            <div class="col-sm-5">
                                <kec-form text="服务类型" crosswise width="70px">
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
                            <div class="col-sm-5">
                                <kec-form text="收费科目" crosswise width="70px">
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
                              :disabled="chargeItemIds.length==0 || !payload.quotationCode"
                               @click.native="addItem(payload.id,chargeItemIds,payload.productId,payload.quotationCode)"
                               >添加报价项</el-button>
                            </div>
                        </div>
                        </div>
                        <div class="posi">
                            <!-- <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
                              <div class="padd" style="width:98px">计价方式</div>
                              <div class="padd" style="width:100px">服务类型</div>
                              <div class="padd flx">科目项名称</div>
                              <div class="padd" style="width:100px">科目编号</div>
                              
                              <div class="padd" style="width:100px">费率</div>
                              <div class="padd" style="width:100px">最低收费</div>
                              <div class="padd" style="width:100px">币种</div>
                              <div class="padd" style="width:100px">单位乘数</div>
                              <div class="padd" style="width:80px">收费单位</div>
                              <div class="padd" style="width:70px">计材重</div>
                              <div class="padd" style="width:100px">材积因子</div>
                              <div class="padd" style="width:100px">计抛比</div>
                              <div class="padd" style="width:140px">操作</div>
                              
                            </div> -->
                            <kec-scroll :numbers="396" style="border-bottom:1px solid #EBEEF5">
                              <el-table
                                ref="singleTable"
                                  class="scrollbar"
                                  :data="payload.productPrices"
                                  :header-cell-style="{
                                    background:themeColor.content_border_color,
                                    borderRight:'1px solid #FFF',
                                    fontWeight:'bold',
                                    height:'38px',
                                    color:'#fff',
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
                                  prop="offerType"
                                  label="报价方式"
                                  width="100">
                                  <template slot-scope="scope">
                                    <el-select v-model="scope.row.offerType"
                                    placeholder="请选择" size="small">
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
                                  prop="ledgerSubjectName"
                                  label="科目项名称">
                                  </el-table-column>
                                  <el-table-column
                                  prop="ledgerSubjectNumber"
                                  label="科目编号"
                                  width="100">
                                  </el-table-column>
                                  
                                  <el-table-column
                                  label="费率"
                                  width="100"
                                  >
                                  <template slot-scope="scope">
                                      <el-input-number v-model="scope.row.unitPrice"
                                       v-show="scope.row.offerType==='ALL_DO'"
                                       style="width:100%"
                                       :controls="false" size="small"
                                      :min="0.00"></el-input-number>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="lowestPrice"
                                  label="最低收费"
                                  width="100"
                                  >
                                  <template slot-scope="scope">
                                      <el-input-number v-model="scope.row.lowestPrice"
                                       style="width:100%"
                                       :controls="false" size="small"
                                      :min="0.00"></el-input-number>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="currency"
                                  label="币种"
                                  width="100">
                                    <template slot-scope="scope">
                                      <el-select v-model="scope.row.currency" placeholder="请选择" size="small">
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
                                       :controls="false" size="small"></el-input-number>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="unit"
                                  label="收费单位"
                                  width="80">
                                  </el-table-column>
                                  <el-table-column
                                    prop="status"
                                    width="70"
                                    label="计材重">
                                      <template slot-scope="scope">
                                        <el-checkbox 
                                        v-model="scope.row.volumeWeightStatus">{{
                                          scope.row.volumeWeightStatus?'是':'否'
                                          }}</el-checkbox>
                                      </template>
                                    </el-table-column>
                                  <el-table-column
                                  prop="volumeWeightFactory"
                                  width="100"
                                  label="材积因子">
                                  <template slot-scope="scope">
                                      <el-input-number v-model="scope.row.volumeWeightFactory"
                                       style="width:100%"
                                       :controls="false" size="small"
                                      :min="1"></el-input-number>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="countLightGoodsRatio"
                                  width="100"
                                  label="计抛比">
                                  <template slot-scope="scope">
                                      
                                      <el-input-number v-model="scope.row.countLightGoodsRatio"
                                       style="width:100%"
                                       :controls="false" size="small"
                                      :min="1"></el-input-number>
                                      
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  width="140"
                                  fixed="right"
                                  label="操作">
                                  <template slot-scope="scope">
                                     <div class="flexs">
                                       
                                      <el-button size="mini" v-if="scope.row.offerType==='ECHELON'"
                                      type="warning"
                                      @click.native="dislogFunC('编辑阶梯报价',true,'ladderQuotation',scope.row)"
                                      >编辑</el-button>
                                      <el-button size="mini" v-else
                                      type="warning"
                                      @click.native="dislogFunC('编辑单一报价',true,'onlyQuotation',scope.row)"
                                      >编辑</el-button>
                                      
                                   <kec-del-popover content="确定要删除?" 
                                   @click="delFunc"
                                   :date="{
                                     priceId:scope.row.id,
                                     productId:payload.productId,
                                     quotationCode:payload.quotationCode
                                   }"></kec-del-popover>
                                      </div>
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
    :text="textItem"
    ></component>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll,KecTabs ,KecButtonClick,KecForm,KecDelPopover}  from '@/common/components'
import quoteDialog from './quoteDialog'
import ladderQuotation from './ladderQuotation'
import onlyQuotation from './onlyQuotation'
import {formateDate} from '@/utils/fun'
  export default {
    name:'quoteList',
    props:[''],
    data () {
      return {
           componentName:'quoteDialog',
           dialogVisible:false,
           visible:true,
           countryCode:null,
           partitionId:null,
           productId:null,
           productCode:null,
           list:[28944],
           serverType:null,
           chargeItemIds:[],
           options:[
             {code:'ALL_DO',name:'单一'},   
             {code:'ECHELON',name:'阶梯'}
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
           itemData:null,
           textItem:''
      };
    },

    components: {
        KecButtonClick ,
        KecButton,
        KecTable,
        KecScroll,
        KecForm,
        KecTabs,
        quoteDialog,
        ladderQuotation,
        onlyQuotation,
        KecDelPopover
    },

    computed: {
      ...mapState('basic',['currencyList','productsList','serverList']),
      ...mapState('channels',['productPartitionsList','countryPartitionList','chargeItemsList','productPartitionsItem']),
      ...mapState('home',['themeColor']),
      
      
    },

    beforeMount() {},

    mounted() {
      this.loadProducts()
      this.loadGetTags({pageSize:10000,pageNumber:1})
      this.loadDictionaryCURRENCY()
      this.loadGetQueryLevelTwo()
      this.loadEnumsTagTypes()
      this.loadQueryServerTypes()

    },

    methods: {
        ...mapActions('channels',['loadGetProductQuotation','loadGetCountryPartition',
        'loadPostProductQuotation','loadPutProductQuotation','loadPostProductPricesPrice','loadGetProductQuotationId',
        'loadDeleteProductPricesPrice','loadGetChargeItems']),
        ...mapActions('order',['loadGetQueryLevelTwo']),
        ...mapActions('basic',['loadProducts','loadDictionaryCURRENCY','loadGetTags','loadEnumsTagTypes','loadQueryServerTypes']),
        addItem(quotationId,chargeItemIds,productId,quotationCode){
          let data = {quotationId,chargeItemIds}
          this.loadPostProductPricesPrice(data).then(success=>{
                    this.changeProductId(productId,quotationCode) ;
                    
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
          this.loadGetChargeItems([code,true])
        },
        delFunc(date){
          let {priceId,productId,quotationCode} =date ;
          this.popoverId = ''
          let data = {priceId}
          this.loadDeleteProductPricesPrice({data}).then(success=>{
                    this.changeProductId(productId,quotationCode) ;
                    
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
        clickConfirms(code) {
        const _ = this ;
         _.countryCode = null
         _.partitionId = null
         _.loadGetProductQuotation(['code',code]).then(success=>{
           
           if(_.productPartitionsList.length){
              _.versionsText = _.productPartitionsList.map(item=>{
               return item.quotationCode ;
             })
             let {id} = _.productPartitionsList[0]
             _.loadGetProductQuotationId([id]).then(success => {
                _.payload = _.productPartitionsItem;
             })
             
            }else{
              _.payload = {
                          description:'',
                          destinationCountryNameList:[],
                          partitionNameList:[],
                          id:null,
                          productId:null,
                          productName:'',
                          productPrices:[],
                          quotationCode:''
                        };
              _.versionsText = ['无']
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
        selectQuotoFunc(type){
           const _ = this ;
           let arr = []
           if(_.productPartitionsList.length>0){
              if(_.partitionId&&_.countryCode){
                   arr = _.productPartitionsList.filter(item=>{
                    return item.destinationCountryNameList.indexOf(_.countryCode)!=-1 && item.partitionNameList.indexOf(_.partitionId)!=-1
                  })
              }else if(!_.partitionId&&_.countryCode){
                   arr = _.productPartitionsList.filter(item=>{
                    return item.destinationCountryNameList.indexOf(_.countryCode)!=-1
                  })
              }else if(_.partitionId&&!_.countryCode){
                  arr = _.productPartitionsList.filter(item=>{
                    return item.partitionNameList.indexOf(_.partitionId)!=-1
                  })
              }else{
                  arr = _.productPartitionsList
              }
              
           }
           if(arr && arr.length){
             let {id} = arr[0]
             _.loadGetProductQuotationId([id]).then(success => {
                _.payload = _.productPartitionsItem;
             })
             _.versionsText = arr.map(item=>{
               return item.quotationCode ;
             })
           }else{
             _.payload = [] 
             _.versionsText = ['无']
           }
           
        },
        newQuoteFunc(productId){
          this.componentName = 'quoteDialog'
          this.dialogVisible = true
          this.itemData = {productId} ;
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
                    "unitRate": element.unitRate,
                    "currency": element.currency,
                    "offerType": element.offerType,
                    "volumeWeightStatus":element.volumeWeightStatus,
                    "volumeWeightFactory":element.volumeWeightFactory,
                    "lowestPrice":element.lowestPrice,
                    "countLightGoodsRatio":element.countLightGoodsRatio
                 }
                 content.push(obj)
               });
             }
             let data = {productId,id,description,
             destinationCountryIds:destinationCountryNameList,
             partitionIds:partitionNameList,content}
             this.loadPutProductQuotation(data).then(success=>{
                    this.changeProductId(productId,quotationCode) ;
                    
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
        tabsFunc(code){
            const _ = this ;
            _.serverType = null
            _.chargeItemIds = []
            if(_.productPartitionsList.length){

              let {id} = _.productPartitionsList.find(item=>{
                return code == item.quotationCode ;
              })
              _.loadGetProductQuotationId([id]).then(success => {
                    _.payload = _.productPartitionsItem;
              })
            }
        },
        changeProductId(productId,quotationCode){
          const _ = this ;
           _.serverType = null
           _.chargeItemIds = []
          _.partitionId = null ;
          _.countryCode = null ;
          this.loadGetProductQuotation([productId]).then(success=>{
            if(_.productPartitionsList.length){
              _.versionsText = _.productPartitionsList.map(item=>{
               return item.quotationCode ;
             })
             if(quotationCode){
               this.tabsFunc(quotationCode)
             }else{
               
               let {id} = _.productPartitionsList[0]
                _.loadGetProductQuotationId([id]).then(success => {
                    _.payload = _.productPartitionsItem;
                })
             }
             
            }else{
              _.payload = {
                          description:'',
                          destinationCountryNameList:[],
                          partitionNameList:[],
                          id:null,
                          productId:null,
                          productName:'',
                          productPrices:[],
                          quotationCode:''
                        };
              _.versionsText = ['无']
            }
            //  this.$message( {
            //         message: success,
            //         type: 'success'
            //         });
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
          this.itemData = null
          bool && this.changeProductId(this.payload.productId)
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