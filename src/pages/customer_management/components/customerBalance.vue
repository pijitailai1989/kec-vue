<template>
  <div class="row ventorsInfo">
    
    <div class="col-sm-12">
        <kec-form text="账户详情">
          <template #input>
            <div class="row borders err">
                <div class="col-sm-6">
                    <kec-form crosswise text="现金金额" width="80px">
                      <template #input>
                        <el-input v-model="payload.amount" disabled placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="币种" width="80px">
                    <template #input>
                      <el-input v-model="payload.currency" placeholder="" disabled></el-input>
                    </template>
                    </kec-form>
                </div>
                <!-- <div class="col-sm-6">
                    <kec-form crosswise text="亏欠金额" width="80px">
                    <template #input>
                      <el-input  placeholder="" disabled></el-input>
                    </template>
                    </kec-form>
                </div> -->
                <div class="col-sm-6">
                    <kec-form crosswise text="累计新增" width="80px">
                    <template #input>
                      <el-input v-model="payload.amountAddUp" placeholder="" disabled></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="累计消费" width="80px">
                      <template #input>
                        <el-input v-model="payload.amountSpendUp" placeholder="" disabled></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="状态" width="80px">
                    <template #input>
                      <el-input v-model="payload.status" placeholder="" disabled></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="操作" width="80px">
                    <template #input>
                      <div style="margin-top:5px">
                         <kec-button text="充值" @click.native="payFunc" background="#F18A33" color="#fff"></kec-button>
                      </div>
                    </template>
                    </kec-form>
                </div>
            </div>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="操作日志">
         <template #input>
           <div class="row borders err">
                <div class="col-sm-12">
                   <kec-table 
                    height="430px"
                    :tableHeader="tableHeader" 
                    :lastWidth="lastWidth" 
                    :tableData="amountList" 
                    :letWidth="letWidth"
                    :selectIndex="selectIndex">
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
            </div>
         </template>
        </kec-form>
    </div>
    <component 
      :is="'payDialog'" 
      :dialogVisible="dialogVisible" 
      @closeFunc="cancelFunc"></component>
    
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import payDialog from './payDialog'
import {KecForm, KecButton ,KecScroll,KecTable }  from '@/common/components'
  export default {
    name:'customerBalance',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        dialogVisible:false,
        payload:{
                 currency:'',
                 amount:null,
                 amountAddUp:null,
                 amountSpendUp:null,
                 status:''
                },
                letWidth:{
                  4:'160px'
                },
                lastWidth:'',
                tableHeader:{
                transactionNo:{"title":'交易号','slot':false},
                type:{"title":'类型','slot':false},
                amount:{"title":'金额','slot':false},
                userName:{"title":'创建人','slot':false},
                createTime:{"title":'创建时间','slot':false}
                },
                selectIndex:null,
                selectItem:null,
                amountList:[]
        
      }
    },

    components: {
        KecForm ,
        KecButton,
        KecScroll,
        KecTable,
        payDialog
    },

    computed: {
      ...mapState('basic',['ventorsId']),
      ...mapState('customer',['queryAccount'])
    },
    beforeMount() {},

    mounted() {
      this.loadFunc()
      
    },

    methods: {
      ...mapActions('customer',['loadGetQueryAccount']),
      loadFunc(){
        const _this = this ;
        this.loadGetQueryAccount({id:_this.ventorsId})
        .then( success=>{
          let {currency,amount,amountAddUp,amountSpendUp,status,logs} = this.queryAccount ;
          this.amountList = logs ;
          this.amountList.forEach(el=>{
            if(el.transactionType=='INV'){
                el.type = '充值'
            }else if(el.transactionType=='SPE'){
                el.type = '消费'
            }else if(el.transactionType=='TRA'){
                el.type = '转账'
            }
          })
          this.payload = {
                  currency,
                  amount,
                  amountAddUp,
                  amountSpendUp,
                  status
                  }
        } )
      },
      cancelFunc(propsBool) {
         propsBool && this.loadFunc()
         this.dialogVisible = false ;
         this.selectIndex = null ;
         this.selectItem = null ;
        },
        payFunc(){
          this.dialogVisible = true
        }
    },

    watch: { }

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
   margin-left 100px
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   &.pro  
     height 99px   
     margin-bottom 4px
   &.err  
     min-height 40px
</style>