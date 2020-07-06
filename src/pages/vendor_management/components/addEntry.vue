<template>
  <kec-dialog 
      boxWidth="750px"
      boxTop="12vh"
      v-if="dialogVisible">
     <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button 
            @click.native="clickConfirm" 
            :text="type==='addVisible'?'添加':'修改'" 
            icon="fa-floppy-o" 
            :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
            <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <div class="row">
          <div class="col-sm-6">
              <kec-form text="供应商" crosswise width="70px">
              <template #input>
                <div class="flexs">
                      <el-select
                        style="width:100%"
                          v-model="payload.vendorId"
                          filterable
                           size="medium"
                          placeholder="">
                          <el-option
                            v-for="item in supplierList"
                            :key="item.id"
                            :label="item.companyName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                  </div>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form text="录入日期" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-date-picker
                          style="width:100%"
                           size="medium"
                          v-model="payload.execDate"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                    </div>
                  </template>
                </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form text="单据类型" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="payload.expenseNumberType" filterable placeholder="" size="medium" style="width:100%">
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
          </div>
          <div class="col-sm-6">
            <kec-form text="单据号码" crosswise width="70px">
              <template #input>
                <div class="flexs a-center">
                    <el-input v-model="payload.expenseNumber" placeholder="单据号码" size="medium"></el-input>
                </div>
              </template>
            </kec-form>
          </div>
          <div class="col-sm-12 borders">
            <div class="col-sm-12">
              <el-table
                :data="payload.unamortizedExpenseItems"
                height="250"
                :cell-style="{ padding:'3px 0' }"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="科目项名称">
                  <template slot-scope="scope">
                      <el-select v-model="scope.row.chargeItemID" filterable placeholder="" @change="changeItem(scope.row.chargeItemID,scope.$index)" size="mini">
                          <el-option
                            v-for="item in chargeItemsList"
                            :key="item.id"
                            :label="item.ledgerSubjectName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="科目项编号">
                  <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.chargeItemCode" disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="费用总额">
                  <template slot-scope="scope">
                      <el-input-number v-model="scope.row.amount" style="width:100%" :controls="false" size="mini"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="费用币种"
                  width="100">
                  <template slot-scope="scope">
                      <el-select v-model="scope.row.currency" filterable placeholder="" size="mini">
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
                  prop="address"
                  label="备注">
                  <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.expenseName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="删除"
                  width="60">
                  <template slot-scope="scope">
                      <i class="fa fa-minus-circle cur fa-lg" 
                      @click="itemsRow(true,scope.$index)"
                      style="color:#C50A2E" aria-hidden="true"></i>
                  </template>
                </el-table-column>
              </el-table>
                          

            </div>
            <div class="col-sm-12" style="margin:5px 0">
                <kec-button 
                  text="添加科目项" icon="fa-plus" 
                  @click.native="itemsRow(false)"
                  background="#17A2B8" 
                  color="#fff"></kec-button>
            </div>
            
          </div>
          
        </div>
    
  </kec-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton ,KecDialog}  from '@/common/components'
import {formateDate} from '@/utils/fun'
  export default {
    name:'addEntry',
    props:{
      type:String,
      item:Object,
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
        payload:{
          "id":null,
          "vendorId": null,
          "expenseNumber": "",
          "expenseNumberType": null,
          "execDate": "",
          "unamortizedExpenseItems": [
              {
                  "expenseName": "",
                  "amount": null, 
                  "currency": "",
                  "chargeItemID": null,
                  "chargeItemCode": null
              }
          ] 
        },
        
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecDialog
    },

    computed: {
      ...mapState('vendor',['vendorProductList','expenseType']),
      ...mapState('basic',['supplierList','currencyList','chargeItemsList']),
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('vendor',['loadPostExpenses','loadPutExpenses']),
      closeData(){
        this.payload={
          "id":null,
          "vendorId": null,
          "expenseNumber": "",
          "expenseNumberType": null,
          "execDate": "",
          "unamortizedExpenseItems": [
              {
                  "expenseName": "",
                  "amount": null, 
                  "currency": "",
                  "chargeItemID": null,
                  "chargeItemCode": null
              }
          ] 
        }
      },
      changeItem(id,index){
        
        const _ = this ;
        let item = _.chargeItemsList.find(item => {
          return item.id === id
        })
        _.payload.unamortizedExpenseItems[index]['chargeItemCode'] = item?item.ledgerSubjectNumber:null
      },
      itemsRow(type,index){
        const _ = this ;
        if(type){
          _.payload.unamortizedExpenseItems.splice(index,1)
        }else{
          let data = {
                  "expenseName": "",
                  "amount": null, 
                  "currency": "",
                  "chargeItemID": null,
                  "chargeItemCode": null
              }
          _.payload.unamortizedExpenseItems.push(data)
        }
      },
      clickConfirm() {
        const _this = this ;
        let {id,vendorId,expenseNumber,expenseNumberType,execDate,unamortizedExpenseItems} = _this.payload ;
        let list = []
        let data = {}
        switch(_this.type){
          case 'addVisible':
             list = unamortizedExpenseItems.map(item => {
                let da = {
                        "expenseName": item.expenseName,
                        "amount": item.amount, 
                        "currency": item.currency,
                        "chargeItemID": item.chargeItemID
                    }
                return da
              })
                data = {vendorId,expenseNumber,expenseNumberType,execDate:execDate && formateDate(execDate),unamortizedExpenseItems:list}
                _this.loadPostExpenses(data).then(success=>{
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
               list = unamortizedExpenseItems.map(item => {
                let da = {
                        "id":item.id,
                        "expenseName": item.expenseName,
                        "amount": item.amount, 
                        "currency": item.currency,
                        "chargeItemID": item.chargeItemID
                    }
                return da
              })
               data = {vendorId,expenseNumber,expenseNumberType,execDate:execDate && formateDate(execDate),unamortizedExpenseItems:list,id}
                _this.loadPutExpenses(data).then(success=>{
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
              const _ = this ;
              let payload = JSON.parse(JSON.stringify(val) );
              let data = {
                  "expenseName": "",
                  "amount": null, 
                  "currency": "",
                  "chargeItemID": null,
                  "chargeItemCode": null
              }
              let {id,vendorId,expenseNumber,expenseNumberType,execDate,unamortizedExpenseItems} = payload
              if(unamortizedExpenseItems.length === 0){
                unamortizedExpenseItems.push(data)
              }else{
                unamortizedExpenseItems.forEach( item => {
                          let items = _.chargeItemsList.find(todo => {
                            return todo.id === item.chargeItemID
                          })
                          item['chargeItemCode'] = items?items.ledgerSubjectNumber:null
                          
                        })
                
              }
              this.payload = {id,vendorId,expenseNumber,expenseNumberType,execDate,unamortizedExpenseItems}
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
 .cur 
    cursor pointer
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