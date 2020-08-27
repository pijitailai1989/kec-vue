<template>
 <div>
    <!-- <div class="flexs kec-btn j-end btn-fun row">
      <div class="col-sm-12 flexs">
        <kec-form crosswise width="60px" text="订单编号">
          <template #input>
            <el-input v-model="orderNum" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
        <kec-form crosswise width="40px" text="日期">
          <template #input>
            <el-date-picker
              @change="changeTimesFunc"
              size="medium"
              align="center"
              v-model="tiems"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </template>
        </kec-form>
        <div style="margin-left:10px">
           <el-button size="medium" @click.native="searchFunc">查询</el-button>
        </div>
        
      </div>
    </div> -->
    <kec-scroll :numbers="179" class="list">
        <div class="flexs j-between">
            <div class="flexs" style="padding:5px">
                <el-input v-model="input" placeholder="请输入协议号或者客户名" v-focus size="small" clearable></el-input>
                <kec-button 
                text="搜索"
                background="#9822CB" 
                @click.native="mountFunc(20,1,input)"
                color="#fff"></kec-button>
            </div>
            <div class="flexs j-end" style="padding:5px">
                <kec-button 
                text="模板下载"
                background="#E04141" 
                @click.native="download"
                color="#fff"></kec-button>
                <kec-button 
                text="批量导入" icon="fa-plus" 
                background="#2D91D2" 
                @click.native="buttonFunc('batch',null)"
                color="#fff"></kec-button>
                <kec-button 
                text="新建协议" icon="fa-plus" 
                background="#ED6D01" 
                @click.native="buttonFunc('addVisible',null)"
                color="#fff"></kec-button>
                <kec-button-click 
                :disabled="selectIndex===null"
                text="修改协议" icon="fa-pencil" 
                background="#3B38C2" 
                @click="buttonFunc('changeVisible',selectItem)"
                color="#fff"></kec-button-click>
                <kec-button-click 
                :disabled="selectIndex===null || selectItem.examineStatus !== 1"
                text="协议审核" icon="fa-gavel" 
                background="#41A813" 
                @click="buttonFunc('contractApprove',selectItem)"
                color="#fff"></kec-button-click>
                
              
            </div>
        </div>
        
        <div class="kec-content">
            <kec-table 
            height="260px"
            :tableHeader="tableHeader" 
            :lastWidth="lastWidth" 
            :tableData="order_list" 
            :letWidth="letWidth"
            :selectIndex="selectIndex"
            @active-item="activeItem"
            @active-index="activeFunc">
                <template #operation>
                <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
                </template>
                <template v-slot:default="slotProps">
                {{slotProps.item}}
                </template>
                <template v-slot:typeTagSetName="slotProps">
                  <div class="flexs columns">
                    <el-tag class="pr" type="info" size="small" v-for="(name,i) of slotProps.item" :key="i">{{name}}</el-tag>
                  </div>
                </template>
                <template v-slot:processingTagSetName="slotProps">
                  <div class="flexs columns">
                    <el-tag class="pr" type="info" size="small" v-for="(name,i) of slotProps.item" :key="i">{{name}}</el-tag>
                  </div>
                </template>
            </kec-table>
        </div>
        <div class="flexs j-end" v-show="total">
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page.sync="PageNum"
                :page-size="PageSize"
                :total="total">
            </el-pagination>
        </div>
    </kec-scroll>
    <component :is="componentName" @close="closeFunc"  
    :dialogVisible="dialogVisible" :type="types" 
    :item="selectItems" :text="textItem"></component>
    
 </div>
  
</template>

<script>
import {formatDate} from '@/utils/fun'
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll ,KecForm,KecButtonClick}  from '@/common/components'
import KecContract from './addContract'  
import contractApprove from './contractApprove'  
import batchImport from './batchImport'
import axios from '@/http/config'
  export default {
    name:'contractList',
    props:[''],
    data () {
      return {
           visible:false,
           dialogVisible:false,
           addVisible:false,
           changeVisible:false,
           order_list:[],
           types:'',
           componentName:'KecContract',
           letWidth:{
             0:'140px',
             1:'90px',
             3:'60px',
             7:'90px',
             8:'80px',

           },
           lastWidth:'',
           tableHeader:{
             code:{"title":'服务协议号','slot':false},
             customerCode:{"title":'客户编号','slot':false,'sort':'OTHER'},
             customercompanyName:{"title":'客户名称','slot':false,'sort':'ZH'},
             customerType:{"title":'客户类','slot':false},
             managerName:{"title":'销售代表','slot':false},
            //  paymentPeriod:{"title":'账期','slot':false},
             servicerName:{"title":'客服代表','slot':false},
             productName:{"title":'服务产品','slot':false},
             effectiveDate:{"title":'生效日期','slot':false},
             examineStatusText:{"title":'状态','slot':false}
           },
           selectIndex:null,
           selectItem:null,
           selectItems:null,
           PageSize:20,
           PageNum:1,
           total:null,
           orderNum:null,
           beginDate:null,
           endDate:null,
           input:'',
           tiems:'',
           searchBool:false,
           textItem:'',
           list:[],

      };
    },

    components: {
        KecButton ,
        KecTable,
        KecScroll,
        KecForm,
        KecButtonClick,
        KecContract,
        contractApprove,
        batchImport
    },

    computed: {
      ...mapState('customer',['agreementQueryPage','SALES','SERVICE']),
      
      
    },

    beforeMount() {},

    mounted() {
      this.mountFunc(this.PageSize,this.PageNum)
      this.loadCustomerQueryAll({status:'ENABLED'})
      this.loadGetFindAll()
      // this.loadGetUsersByRoleCodeSALES()
      // this.loadGetUsersByRoleCodeSERVICE()
      this.loadCountryQueryAll()
      this.loadDictionaryCURRENCY()
      this.loadGetBillCycles()
      this.loadGetOperation()
      this.loadGetService()
    },

    methods: {
        ...mapActions('customer',['loadPostAgreementQueryPage','loadGetUsersByRoleCodeSALES','loadGetUsersByRoleCodeSERVICE','loadGetFindAll']),
        ...mapActions('basic',['loadCustomerQueryAll','loadCountryQueryAll','loadDictionaryCURRENCY','loadGetOperation','loadGetService']),
        ...mapActions('vendor',['loadGetBillCycles']),
        handleCurrentChange(page){
          this.PageNum = page ;
          this.mountFunc(this.PageSize,page)
        },
        searchFunc(){
          this.searchBool = true ;
          this.mountFunc(20,1)
        },
        download(){
            window.location.href = axios.defaults.baseURL+'/auth/download/agreement-example'
        },
        buttonFunc(types,item){
          this.types = types ;
          this.dialogVisible = true ;
          if(types === 'addVisible') {
            this.textItem = '新建协议'
            this.componentName = 'KecContract'
            this.selectItems = null
          }else if(types === 'changeVisible'){
            this.textItem = '修改协议'
            this.componentName = 'KecContract'
            this.selectItems = item
          }else if(types === 'contractApprove'){
            this.componentName = 'contractApprove'
            this.textItem = '协议审核'
            this.$nextTick(()=>{
               this.selectItems = item
            })
          }else{
            this.textItem = '批量导入'
            this.componentName = 'batchImport'
            this.selectItems = null
          }
            
        },
        mountFunc(pageSize,pageNumber,input){
          const _ = this ;
          let data = {pageSize,pageNumber,input}
          if(this.searchBool){
              this.beginDate && (data['beginDate'] = this.beginDate)
              this.endDate && (data['endDate'] = this.endDate)
              this.orderNum && (data['orderNum'] = this.orderNum)
          }
          
          _.loadPostAgreementQueryPage(data).then(success => {
            if(_.agreementQueryPage){
               let {content,totalElements} = _.agreementQueryPage;
                
               if(content && content.length){
                  _.order_list = content.map(item => {
                    let {
                      customer:{
                         id,type,customerCode,companyName
                      },
                      product,
                      examineStatus
                    } = item ;
                    
                    item['customerId'] = id
                    item['customerType'] = type == 'DIRECT' ? '直客' : '同行'
                    item['customerCode'] = customerCode
                    item['customercompanyName'] = companyName
                    item['productName'] = product['name']
                    item['productId'] = product['id']
                    if(examineStatus == 1){
                          item['examineStatusText'] = '待审核'
                    }else if(examineStatus == 3){
                          item['examineStatusText'] = '审核成功'
                    }else if(examineStatus == 5){
                          item['examineStatusText'] = '审核驳回'
                    }
                     


                    return item ;
                  }) ;
               }else{
                 _.order_list = []
               }
                _.total = totalElements ;
            }
            
          })
        },
        changeTimesFunc(val){
           if(val){
              this.beginDate = formatDate(val[0],'yyyy-MM-dd')
              this.endDate = formatDate(val[1],'yyyy-MM-dd')
           }else{
             this.beginDate = null
              this.endDate = null
           }
           
        },
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item ;
        },
        
        closeFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          this.selectItems = null ;
          this.componentName = 'KecContract'
          this.dialogVisible = false ;
          if(data.bool) {
            if(data.type === 'addVisible') this.PageNum = 1 ;
            this.mountFunc(this.PageSize,this.PageNum)
            this.loadGetFindAll()
          }
          if(data.type){
              this[data.type] = false ;
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
   padding 15px 15px 13px 15px
   margin-top 10px
 .list  
   margin-top 10px
 .kec-button   
   margin-left 10px       
 .kec-content  
   padding 1px
   .pr+.pr  
     margin-top 2px
</style>