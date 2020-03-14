<template>
  <kec-scroll :numbers="179" class="flexs columns">
    <div class="flexs kec-btn a-center j-between" style="width:100%"> 
      <div class="flexs a-center j-start">
           <div class="flexs a-center">
            <kec-form crosswise text="供应商" width="80px">
                <template #input>
                  <el-select v-model="vendorId" size="medium" clearable @change="changeVendorId" filterable placeholder="" style="width:140px">
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
                        :disabled="!vendorId" clearable  placeholder="" size="medium" style="width:140px">
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

                <kec-form crosswise text="服务分区" width="80px">
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
                </kec-form>
              
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
                >
                  <template>
                    <div>
                        <div class="flexs" style="padding:5px">
                            <kec-form crosswise text="有效日期" width="80px" v-show="tabsIndex==0">
                              <template #input>
                                     <el-date-picker
                                        v-model="statementsData.execDate"
                                        type="date"
                                        size="medium"
                                        placeholder="选择日期">
                                      </el-date-picker>
                              </template>
                            </kec-form>
                            <kec-form crosswise text="有效日期" width="80px" v-show="tabsIndex!=0">
                              <template #input>
                                     <el-date-picker
                                        v-model="execDate"
                                        disabled=""
                                        type="date"
                                        size="medium"
                                        placeholder="选择日期">
                                      </el-date-picker>
                              </template>
                            </kec-form>
                            <kec-form crosswise text="状态 :" width="80px" v-show="tabsIndex==0">
                              <template #input>
                                <div class="flexs a-center" style="height:90%">
                                    <span>{{statementsData.examineStatusString?statementsData.examineStatusString:'无'}}</span>
                                </div>
                              </template>
                            </kec-form>
                            <kec-form crosswise text="状态 :" width="80px" v-show="tabsIndex!=0">
                              <template #input>
                                <div class="flexs a-center" style="height:90%">
                                    <span>{{examineStatusString?examineStatusString:'无'}}</span>
                                </div>
                              </template>
                            </kec-form>
                        </div>
                        <div class="posi" v-show="tabsIndex==0">
                            <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
                              <div class="padd" style="width:59px">ID</div>
                              <div class="padd" style="width:120px">报价方式</div>
                              <div class="padd" style="width:100px">服务类型</div>
                              <div class="padd flx">收费项</div>
                              <div class="padd" style="width:100px">科目名称</div>
                              <div class="padd" style="width:100px">科目编号</div>
                              <div class="padd" style="width:100px">费率</div>
                              <div class="padd" style="width:160px">币种</div>
                              <div class="padd" style="width:100px">收费单位</div>
                            </div>
                            <kec-scroll :numbers="318" style="border-bottom:1px solid #EBEEF5">
                              <el-table
                                ref="singleTable"
                                  class="scrollbar"
                                  :data="statementsData.content"
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
                                    <el-select v-model="scope.row.offerType" placeholder="请选择" size="small">
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
                                      <el-input v-model="scope.row.unitPrice" placeholder="" size="small"></el-input>
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                  prop="currency"
                                  label="币种"
                                  width="160">
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
                                  prop="unit"
                                  label="收费单位"
                                  width="100">
                                  </el-table-column>
                              </el-table>
                            </kec-scroll>
                        </div>
                        <div class="posi" v-show="tabsIndex!=0">
                           <kec-table 
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
                        </div>
                    </div>
                  </template>
        </kec-tabs>
        
    </div>
   
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll,KecTabs ,KecButtonClick,KecForm}  from '@/common/components'
import {formateDate} from '@/utils/fun'
  export default {
    name:'costList',
    props:[''],
    data () {
      return {
           vendorId:null,
           vendorProductId:null,
           list:[],
           options:[
             {code:'ALL_DO',name:'包干'},   
             {code:'SEPARATE',name:'分项'}
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
           letWidth:{},
           versionsText:['当前成本价'],
           id:null,
           statementsData:{
             "content":[],
             "examineStatusString":"",
             "execDate":'',
             "partitionName":"",
             "id":null
           }
      };
    },

    components: {
        KecButtonClick ,
        KecButton,
        KecTable,
        KecScroll,
        KecForm,
        KecTabs
    },

    computed: {
      ...mapState('basic',['supplierList','currencyList']),
      ...mapState('vendor',['vendorProductList','statementsList','versionstList','versionstTwoList']),
      ...mapState('home',['themeColor']),
      
      
    },

    beforeMount() {},

    mounted() {
      this.loadVendorGetVendors()
      this.loadDictionaryCURRENCY()
    },

    methods: {
        ...mapActions('vendor',['loadGetVendorProducts','loadGetCostStatements',
        'loadPutCostStatements','loadGetCostStatementsVersions','loadPutRecall','loadPutEexamine','loadPutSubmit',
        'loadGetCostStatementsVersionsTwo']),
        ...mapActions('basic',['loadVendorGetVendors','loadDictionaryCURRENCY']),
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
            const _this = this ;
            _this.statementsData = _this.statementsList.find(item=> { return id == item.id })

            _this.loadGetCostStatementsVersions([id]).then(succes=>{
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
           let {execDate,content,id} = statementsData ;
           if(vendorProductId && statementsData){
             
             let contents = content.map(item =>{
               let {id,unitPrice,currency,offerType} = item ;

               let data = {id,unitPrice:parseFloat(unitPrice),currency,offerType }
               return data
             })
             let date = {vendorProductId,execDate:formateDate(execDate),content:contents,id}
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
                let { content ,examineStatusString,execDate,partitionName,id} = this.versionstTwoList ;
                this.list = content ;

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
        
        dislogFunC(text,bool,component,type) {
          this.textType = type ;
          this.textItem = text ;
          this.dialogVisible = bool ;
          this.componentName = component ;
        },
        cancelFunc(bool){
          this.dialogVisible = false ;
          this.$refs.singleTable.setCurrentRow();
          this.textItem = '' ;
          this.textType = ''
          this.itemObj = null ; 

          bool && ( this.roleId = null )
          bool && ( this.routerPath = '' )
          bool && ( this.loadGetPermission().then(success=>{
                    this.tableRole = this.permissionList
                  }) )
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
   margin-left 10px
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
</style>