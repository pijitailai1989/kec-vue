<template>
  <kec-scroll :numbers="179">
    <div class="flexs kec-btn j-between a-center" style="width:100%"> 
      <div class="flexs a-center j-start">
           <div class="flexs a-center">
              <kec-form crosswise text="录入月份" width="70px">
                <template #input>
                  <el-date-picker
                    style="width:120px"
                    size="medium"
                    v-model="date"
                    type="month"
                    placeholder="选择月份">
                  </el-date-picker>
                </template>
              </kec-form>
              <kec-form crosswise text="供应商" width="50px">
                <template #input>
                  <el-select
                    v-model="vendorId"
                    style="width:160px"
                    filterable
                    clearable
                    size="medium"
                    placeholder="">
                    <el-option
                      v-for="item in supplierList"
                      :key="item.id"
                      :label="item.companyName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
              <kec-form text="单据类型" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="expenseNumberType" clearable filterable placeholder="" size="medium" style="width:120px">
                          <el-option
                            v-for="item in expenseType"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
              </kec-form>
              <kec-button-click text="查询" 
              :disabled="showClick"
               @click="queryFunc(date,vendorId,expenseNumberType)"
              style="width:60px"
               background="#17A2B8" color="#fff"></kec-button-click>
          </div>
           
      </div>
      <div class="flexs kec-btn j-end" ref="box">
          <kec-button 
          text="添加录入" icon="fa-plus" 
          background="#ED6D01" 
          @click.native="buttonFunc('addVisible',null)"
          color="#fff"></kec-button>
          <kec-button-click
          text="修改录入" icon="fa-pencil" 
          background="#17A2B8" 
          :disabled="selectItem===null"
          @click="buttonFunc('changeVisible',selectItem)"
          color="#fff"></kec-button-click>
        <!-- <el-popover
          placement="left-start"
          width="160"
          :disabled="selectIndex===null"
          v-model="visible">
          <p>确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click.native="delFunc">确定</el-button>
          </div>
          <kec-button slot="reference"
            :disabled="selectIndex===null" text="删除字段" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
        </el-popover> -->
      </div>
        
    </div>
    
    <div class="kec-content">
          <kec-table 
           height="221px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="expenseList" 
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
          </kec-table>
    </div>
    <component :is="'addEntry'" @close="closeFunc"  
    :dialogVisible="dialogVisible" :type="types" 
    :item="selectItems" :text="textItem"></component>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll,KecButtonClick,KecForm }  from '@/common/components'
import addEntry from './addEntry' 
import {toMoney,formateDate} from '@/utils/fun'
  export default {
    name:'entryList',
    props:[''],
    data () {
      return {
           serviceTypeId:null,
           vendorId:null,
           date:'',
           expenseNumberType:null,
           vendorList:[],
           visible:false,
           addVisible:false,
           changeVisible:false,
           dialogVisible:false,
           letWidth:{
               0:'100px',
               4:'120px'
           },
           lastWidth:'',
           tableHeader:{
             execDate:{"title":'录入日期','slot':false,'sort':'ZH'},
             expenseNumber:{"title":'单据号码','slot':false,'sort':'ZH'},
             expenseNumberTypeText:{"title":'单据类型','slot':false,'sort':'ZH'},
             vendorName:{"title":'供应商','slot':false,'sort':'ZH'},
             countMoney:{"title":'费用总额','slot':false}
           },
           selectIndex:null,
           selectItem:null,
           selectItems:null,
           textItem:'',
           types:'',
           expenseList:[]
      };
    },

    components: {
        KecButton ,
        KecTable,
        addEntry,
        KecScroll,
        KecForm,
        KecButtonClick
    },

    computed: {
      ...mapState('vendor',['expensesList','expenseType']),
      ...mapState('basic',['vendorsList','serverList','supplierList']),
      showClick: function(){
         const _ = this ;
         if(parseInt(_.expenseNumberType)>=0||parseInt(_.vendorId)>=0||_.date){
           return false ;
         }else{
           return true ;
         }
      }
    },

    beforeMount() {},

    mounted() {
      this.mountFun()
      this.loadGetExpenseNumberType()
      this.loadVendorGetVendors()
      this.loadDictionaryCURRENCY()
      let data = {
        pageSize:10000,
        pageNumber:1
      }
      this.loadGetChargeItem(data).then(success => {
        this.filterItem(false)
      })
    },

    methods: {
        ...mapActions('fidle',['loadGetLastMileExtraInfos','loadDeleltLastMileExtraInfos']),
        ...mapMutations('basic',['filterItem']),
        ...mapActions('vendor',['loadGetVendorProducts','loadGetExpenses','loadGetExpenseNumberType']),
        ...mapActions('basic',['loadVendorGetVendors','loadDictionaryCURRENCY','loadGetChargeItem']),
        mountFun(data){
          const _ = this ;
          this.loadGetExpenses(data).then(success=>{
            _.expenseList = _.expensesList.map(item=>{
              _.$set(item,'countMoney',toMoney(item['countMoney']) )
              return item ;
            }) ;
          })
          
        },
        
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item ;
        },
        buttonFunc(type,item){
          if(type === 'addVisible'){
             this.textItem = '添加费用录入'
          }else{
             this.textItem = '修改费用录入'
          }
           this.selectItems = item ;
           this.types= type ;
           this.dialogVisible = true
        },
        selectServerType(code){
          this.vendorId = null
          this.loadGetVendorsByServiceType(['getVendorsByServiceType',code]).then(success=>{
            let {serviceId,vendors} = this.vendorsList ;
            this.vendorList = vendors ;
          })
        },
        queryFunc(date,vendorId,expenseNumberType){
          let data = {}
          date && ( data['date'] = date?formateDate(date):'' )
          parseInt(vendorId)>=0 && ( data['vendorId'] = vendorId )
          parseInt(expenseNumberType)>=0 && ( data['expenseNumberType'] = expenseNumberType )
          this.mountFun(data)
        },
        closeFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          this.selectItems = null ;
          this.dialogVisible = false
          if(data.bool) {
            this.mountFun()
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          if(this.selectIndex!==null) {
            this.loadDeleltLastMileExtraInfos({data:{id:this.selectItem.id}}).then(success=> {
                   this.selectIndex = null ;
                   this.loadGetLastMileExtraInfos({vendorId:this.vendorId})
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
 .kec-button   
   margin-left 10px
 .kec-btn  
   padding 5px        
 .kec-content  
   padding 1px
</style>