<template>
 <div>
    <div class="flexs kec-btn btn-fun a-center">
      <kec-form crosswise text="供应商" width="60px">
        <template #input>
          <el-select v-model="payload.vendorId" size="medium" clearable filterable placeholder="">
                    <el-option
                      v-for="item in supplierList"
                      :key="item.id"
                      :label="item.companyName"
                      :value="item.id">
                    </el-option>
                  </el-select>
        </template>
      </kec-form>
      <kec-form crosswise text="状态" width="40px">
        <template #input>
          <el-select v-model="payload.billStatus" clearable size="medium" filterable placeholder="" style="width:100px">
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.text"
              :value="item.code">
            </el-option>
          </el-select>
        </template>
      </kec-form>
      <kec-form crosswise text="账单日" width="60px">
        <template #input>
          
          <el-date-picker
          @change="changeTime"
          style="width:260px"
          size="medium"
          v-model="times"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        </template>
      </kec-form>
      <kec-form crosswise text="账单周期" width="70px">
        <template #input>
         <el-select v-model="payload.billCycle" clearable size="medium" filterable placeholder="" style="width:100px">
            <el-option
                          v-for="item in cyclesList"
                          :key="item.code"
                          :label="item.text"
                          :value="item.code">
                          </el-option>
                      </el-select>
        </template>
      </kec-form>
      <kec-form crosswise text="生成方式" width="70px">
        <template #input>
         <el-select v-model="payload.sourceType" clearable size="medium" filterable placeholder="" style="width:120px">
            <el-option
                          v-for="item in typeList"
                          :key="item.code"
                          :label="item.text"
                          :value="item.code">
                          </el-option>
                      </el-select>
        </template>
      </kec-form>
      <el-button size="medium" style="margin:0 0 4px 5px"
       type="success"
      @click.native="mountFunc(payload)">查询</el-button>
      <el-button size="medium" style="margin:0 0 4px 5px" type="primary"
      @click.native="eqitFunc('billDialog')">手动创建</el-button>
    </div>
    <kec-scroll :numbers="239" class="list">
        <div class="kec-content">
            <kec-table 
            height="279px"
            :tableHeader="tableHeader" 
            :lastWidth="lastWidth" 
            :tableData="order_list" 
            :letWidth="letWidth"
            :lastText="lastText"
            :selectIndex="selectIndex"
            @active-item="activeItem"
            @active-index="activeFunc">
                <template v-slot:operation="slotProps">
                  <i class="fa fa-download fa-lg" aria-hidden="true"
                  style="color:#16B6D2"
                  @click="urlFunc(slotProps.item.id)" plain></i>
                </template>
                <template v-slot:default="slotProps">
                {{slotProps.item}}
                </template>
                <template v-slot:a="slotProps">
                <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
                <span>{{slotProps.item}}</span>
                </template>
            </kec-table>
        </div>
        <div class="flexs j-end" v-show="order_list.length">
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page.sync="payload.pageNumber"
                :page-size="payload.pageSize"
                :total="total">
            </el-pagination>
        </div>
    </kec-scroll>
    <component :is="componentName"
        :dialogVisible="dialogVisible"
         @closeFunc="cancelFunc" 
         :text="textItem"></component>
 </div>
  
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll ,KecForm,KecButtonClick}  from '@/common/components'
import { formateDate , isNumber ,toMoney} from '@/utils/fun'
import billDialog from './billDialog'
import axios from '@/http/config'
  export default {
    name:'billList',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           order_list:[],
           letWidth:{
             2:'200px'
           },
           lastWidth:'100px',
           lastText:'明细下载',
           tableHeader:{
             execTime:{"title":'账期首日','slot':false,'sort':'ZH'},
             billCycle:{"title":'账单周期','slot':false},
             createTime:{"title":'账单生成时间','slot':false},
             number:{"title":'数量/件','slot':false},
             weight:{"title":'重量','slot':false},
             billStatus:{"title":'状态','slot':false,'sort':'ZH'},
             reportAmount:{"title":'借方','slot':false},
             dealAmount:{"title":'贷方','slot':false},
             currency:{"title":'货币','slot':false},
             billAge:{"title":'账龄','slot':false,'sort':'1-9'}
           },
           payload:{
             pageSize:15,
             pageNumber:1,
             vendorId:null,
             billStatus:null,
             billCycle:null,
             sourceType:null,
             beginDate:'',
             endDate:''
           },
           typeList:[
             {code:0,text:'系统作业'},
             {code:1,text:'手工生成'}
           ],
           statusList:[
             {code:0,text:'计算中'},
             {code:1,text:'已生成'},
             {code:2,text:'已确认'},
             {code:3,text:'已付款'}
           ],
           selectIndex:null,
           selectItem:null,
           PageSize:12,
           PageNum:1,
           total:null,
           stateId:null,
           customerId:null,
           productCode:null,
           vendorId:null,
           orderNum:'',
           referenceNumber:'',
           componentName:'billDialog',
           selectItem:null,
           dialogVisible:false,
           textItem:'',
           times:null,
           startDate:null,
           endDate:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecScroll,
        KecForm,
        KecButtonClick,
        billDialog
    },

    computed: {
      ...mapState('basic',['supplierList']),
      ...mapState('vendor',['cyclesList','billList','billItems'])
    },

    beforeMount() {},

    mounted() {
      this.loadVendorGetVendors()
      this.loadGetBillCycles()
      this.handleCurrentChange(1)
    },

    methods: {
        ...mapActions('basic',['loadVendorGetVendors']),
        ...mapActions('vendor',['loadGetBillCycles','loadGetApBills','loadGetApBillsItems']),
        handleCurrentChange(page){
          this.payload.pageNumber = page ;
          this.mountFunc(this.payload)
        },
        clearFunc(){
          this.payload = {
             pageSize:15,
             pageNumber:1,
             vendorId:null,
             billStatus:'',
             billCycle:'',
             sourceType:'',
             beginDate:'',
             endDate:''
           }
        },
        selectCommand(type){
          let url = axios.defaults.baseURL ;
          let hrefStr = ''
          switch(type) {
            case 'single': 
                  hrefStr = '/auth/file/order/download/simpleTemplate'
                  break;
            case 'multiple':
                  hrefStr = '/auth/file/order/download/multiTemplate'
                  break;
            default:
                  break;
          }

          window.location.href = url + hrefStr ;
        },
        changeTime(tiem){
          if(tiem){
            this.payload.beginDate = formateDate( tiem[0])
            this.payload.endDate = formateDate(tiem[1])
          }else{
            this.payload.beginDate = ''
            this.payload.endDate = ''
          }
           
        },
        mountFunc(payload){
          let {pageSize,
             pageNumber,
             vendorId,
             billStatus,
             billCycle,
             sourceType,
             beginDate,
             endDate} = payload ;
          const _ = this ;
          let data = {pageSize, pageNumber}
             vendorId && ( data['vendorId'] = vendorId)
             isNumber(billStatus) && ( data['billStatus'] = billStatus)
             isNumber(billCycle) && ( data['billCycle'] = billCycle)
             isNumber(sourceType) && ( data['sourceType'] = sourceType)
             beginDate && ( data['beginDate'] = beginDate)
             endDate && ( data['endDate'] = endDate)
          _.loadGetApBills(data).then(success => {
            let {content,totalElements} = _.billList;
            
            _.order_list = content.map(item=>{
              _.$set(item,'reportAmount',toMoney(item['reportAmount']) )
              _.$set(item,'dealAmount',toMoney(item['dealAmount']) )
              return item ;
            }) ;
            _.total = totalElements ;
          })
        },
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item ;
        },
        cancelFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          this.dialogVisible = false
          this.clearFunc()
          data && this.mountFunc(this.payload)
        },
        eqitFunc(str){
           this.componentName = str ; 
           this.textItem = '生成账单'
           this.dialogVisible = true
           
        },
        urlFunc(id){
          let url = axios.defaults.baseURL ;
          this.loadGetApBillsItems().then(success=>{
            if(this.billItems){
                window.location.href = `${url}/auth/download/bill?apBillId=${id}&token=${this.billItems}`;
            }
            
          })
             
        },
        delFunc(){
          let {length} = this.order_list ;
          if(this.selectIndex!==null) {
            this.loadDeleteOrders({data:{id:this.selectItem.id}}).then(success=> {
                   this.selectIndex = null ;
                   if(length == 1){
                     this.payload.pageNumber >=2 && this.payload.pageNumber -- ;
                   }
                   this.mountFunc(this.payload)
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                  this.selectIndex = null ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
          } 
        }
        
    },

    watch: {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .btn-fun  
   background #fff
   border-radius 4px
   padding 15px
   margin-top 10px
 .list  
   margin-top 10px
 .kec-button   
   margin-left 10px       
 .kec-content  
   padding 1px
 .kec-btn  
   padding 5px

 .el-dropdown-link 
    cursor pointer
    color #409EFF
  
  .el-icon-arrow-down 
    font-size 12px
  
</style>