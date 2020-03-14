<template>
  <kec-scroll :numbers="179" class="flexs columns a-center">
    <div class="flexs kec-btn j-between a-center" style="width:100%"> 
      <div class="flexs a-center j-start">
           <div class="flexs a-center">
            <kec-form crosswise text="客户" width="80px">
                <template #input>
                  <el-select v-model="vendorId" size="medium" clearable @change="changeVendorId"
                   filterable placeholder="" style="width:300px">
                    <el-option
                      v-for="item in customerList"
                      :key="item.id"
                      :label="item.companyName"
                      :value="item.companyName">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
              <kec-form text="服务合同号" crosswise width="90px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="vendorProductId" :disabled="!vendorId" clearable  placeholder="" size="medium" style="width:140px">
                          <el-option
                            v-for="item in agreementList"
                            :key="item.id"
                            :label="item.code"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
                </kec-form>
              
              <kec-button-click :disabled="!vendorProductId" @click="clickConfirms(vendorProductId)" text="查询" style="width:60px"
               background="#17A2B8" color="#fff"></kec-button-click>
          </div>
           
      </div>
      <div class="flexs a-center j-end">
          <kec-button-click  text="更新" style="width:60px" @click="modificationFunc(list,vendorProductId)"
               background="#F18A34" color="#fff"></kec-button-click>
      </div>
        
    </div>
    <div class="kec-content">
        <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
          <div class="padd" style="width:120px">报价方式</div>
          <div class="padd" style="width:100px">服务类型</div>
          <div class="padd flx">收费项</div>
          <div class="padd" style="width:100px">科目名称</div>
          <div class="padd" style="width:100px">科目编号</div>
          <div class="padd" style="width:100px">费率</div>
          <div class="padd" style="width:160px">币种</div>
          <div class="padd" style="width:100px">收费单位</div>
          <div class="padd" style="width:160px">生效日期</div>
        </div>
        <kec-scroll :numbers="234" style="border-bottom:1px solid #EBEEF5">
          <el-table
             ref="singleTable"
              class="scrollbar"
              :data="list"
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
              <el-table-column
              prop="execDate"
              label="生效日期"
              width="160">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.execDate"
                    type="date"
                    style="width:140px"
                    value-format="yyyy-MM-dd"
                    size="small"
                    placeholder="选择日期">
                  </el-date-picker>
                </template>
              </el-table-column>
          </el-table>
        </kec-scroll>
    </div>
   
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll ,KecButtonClick,KecForm}  from '@/common/components'
import {formatDate} from '@/utils/fun'
  export default {
    name:'exchangeList',
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
           agreementList:[]
      };
    },

    components: {
        KecButtonClick ,
        KecButton,
        KecTable,
        KecScroll,
        KecForm
    },

    computed: {
      ...mapState('basic',['customerList','currencyList']),
      ...mapState('customer',['agreementQueryPage','quotationsList']),
      ...mapState('home',['themeColor']),
      
      
    },

    beforeMount() {},

    mounted() {
      this.loadCustomerQueryAll()
      this.loadDictionaryCURRENCY()
    },

    methods: {
        
        ...mapActions('customer',['loadPostAgreementQueryPage','loadGetProductQuotations','loadPutProductQuotations']),
        ...mapActions('basic',['loadCustomerQueryAll','loadDictionaryCURRENCY']),
        clickConfirms(vendorProductId) {
        const _this = this ;
         _this.loadGetProductQuotations([vendorProductId]).then(success=>{
            this.list = this.quotationsList ;
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
        modificationFunc(arr,agreementId){

           if(arr && arr.length){
             let list = arr.map(item =>{
               let {id,unitPrice,currency,execDate,offerType} = item ;

               let data = { execDate,id,unitPrice:parseFloat(unitPrice),currency,offerType }
               return data
             })
             this.loadPutProductQuotations({updateList:list,agreementId}).then(success=>{
                    this.clickConfirms([this.vendorProductId])
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
        changeVendorId(customerName){
          this.vendorProductId = null
          this.loadPostAgreementQueryPage({
            customerName,pageSize:1000,pageNumber:1
          }).then(success=>{
              let {content,totalElements} = this.agreementQueryPage
              this.agreementList = content.length>=1 ? content : []
          })
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
   padding 1px
   position relative
 .tableHeader 
   height 38px 
   width calc(100vw - 292px)
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
   width calc(100vw - 22px)
</style>