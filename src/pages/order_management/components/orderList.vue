<template>
 <div>
    <div class="flexs kec-btn btn-fun a-center">
      <kec-form crosswise text="产品" width="50px">
        <template #input>
          <el-select v-model="productCode" clearable size="medium" filterable placeholder="" style="width:100px">
            <el-option
              v-for="item in productBriefList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </template>
      </kec-form>
      <kec-form crosswise text="订单状态" width="80px">
        <template #input>
          <el-select v-model="stateId" clearable size="medium" filterable placeholder="" style="width:100px">
            <el-option
              v-for="item in levelTwoList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
      </kec-form>
      <kec-form crosswise text="客户" width="50px">
        <template #input>
          <el-select v-model="customerId" clearable size="medium" filterable placeholder="" style="width:100px">
            <el-option
              v-for="item in customerBriefList"
              :key="item.id"
              :label="item.companyName"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
      </kec-form>
      <kec-form crosswise text="日期" width="50px">
        <template #input>
          <el-date-picker
            v-model="times"
            type="daterange"
            range-separator="~"
            @change="changeTime"
             style="width:220px"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </template>
      </kec-form>
      <el-button size="medium" style="margin:0 0 4px 5px"  @click.native="funcSearch(productCode,stateId,customerId,startDate,endDate)">查询</el-button>
    </div>
    <kec-scroll :numbers="259" class="list">
        <div class="flexs kec-btn j-end a-center">
         <el-dropdown @command="selectCommand">
            
            <span class="el-dropdown-link">
              模板导出<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="single">单行订单模板</el-dropdown-item>
              <el-dropdown-item command="multiple">多行订单模板</el-dropdown-item>
            </el-dropdown-menu>
         </el-dropdown>
         <kec-button-click 
         text="订单导入" icon="fa-file-excel-o" background="#67c23a" @click="eqitFunc('importEexDialog')" color="#fff"></kec-button-click>
         <kec-button-click :disabled="selectIndex===null" 
         text="修改订单" icon="fa-pencil" @click="eqitFunc('orderDialog')" background="#17A2B8" color="#fff"></kec-button-click>
        </div>
        <div class="kec-content">
            <kec-table 
            height="221px"
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
                <template v-slot:a="slotProps">
                <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
                <span>{{slotProps.item}}</span>
                </template>
            </kec-table>
        </div>
        <div class="flexs j-end">
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page.sync="PageNum"
                :page-size="PageSize"
                :total="total">
            </el-pagination>
        </div>
        <component :is="componentName" 
        :item="selectItem" 
        :dialogVisible="dialogVisible"
         @closeFunc="cancelFunc" 
         :text="textItem"></component>
    </kec-scroll>
    
 </div>
  
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll ,KecForm,KecButtonClick}  from '@/common/components'
import orderDialog from './orderDialog'
import importEexDialog from './importEexDialog'
import { formatDate } from '@/utils/fun'
import axios from '@/http/config'
  export default {
    name:'orderList',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           order_list:[],
           letWidth:{
           },
           lastWidth:'',
           tableHeader:{
             orderNum:{"title":'订单跟踪号','slot':false},
             channelCode:{"title":'产品编码','slot':false},
             salePlatform:{"title":'客户参考号','slot':false},
             id:{"title":'预报时间','slot':false},
             serviceType:{"title":'客户','slot':false}
           },
           selectIndex:null,
           selectItem:null,
           PageSize:10,
           PageNum:1,
           total:null,
           stateId:null,
           productCode:null,
           customerId:null,
           componentName:'orderDialog',
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
        orderDialog,
        importEexDialog
    },

    computed: {
      ...mapState('order',['orderList','levelTwoList','productBriefList','customerBriefList'])
    },

    beforeMount() {},

    mounted() {
      this.mountFunc(this.PageSize,this.PageNum)
      this.loadGetQueryLevelTwo()
      this.loadGetProductBrief()
      this.loadGetCustomerBrief()
    },

    methods: {
        ...mapActions('order',['loadGetOrders','loadGetQueryLevelTwo','loadGetProductBrief','loadGetCustomerBrief']),
        ...mapMutations('order',['setOrderInfo']),
        handleCurrentChange(page){
          this.PageNum = page ;
          this.mountFunc(this.PageSize,page)
        },
        selectCommand(type){
          let url = axios.defaults.baseURL ;
          let hrefStr = ''
          switch(type) {
            case 'single': 
                  hrefStr = '/file/order/download/simpleTemplate'
                  break;
            case 'multiple':
                  hrefStr = '/file/order/download/multiTemplate'
                  break;
            default:
                  break;
          }

          window.location.href = url + hrefStr ;
        },
        funcSearch(productCode,stateId,customerId,startDate,endDate){
          this.mountFunc(this.PageSize,1,productCode,stateId,customerId,startDate,endDate)
        },
        changeTime(tiem){
           this.startDate = formatDate( tiem[0],'yyyy-MM-dd')
           this.endDate = formatDate(tiem[1],'yyyy-MM-dd')
        },
        mountFunc(size,num,productCode,stateId,customerId,startDate,endDate){
          const _ = this ;
          let data = {
            pageSize:size,
            pageNumber:num
          }
          customerId && ( data['customerId'] = customerId )
          productCode && ( data['productCode'] = productCode )
          stateId && ( data['stateId'] = stateId )
          startDate && ( data['startDate'] = startDate )
          endDate && ( data['endDate'] = endDate )
          _.loadGetOrders(data).then(success => {
            let {content,totalElements} = _.orderList;
            _.order_list = content ;
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
          this.componentName = 'orderDialog'
          data && this.mountFunc(this.PageSize,1)
        },
        eqitFunc(str){
           this.componentName = str ; 
           if(str === 'orderDialog'){
              this.setOrderInfo(this.selectItem)
              this.textItem = '修改订单'
           }else{
              this.textItem = '订单导入'
              this.setOrderInfo(null)
           }
           this.dialogVisible = true
           
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