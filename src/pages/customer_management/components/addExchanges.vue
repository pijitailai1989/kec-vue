<template>
  <kec-dialog 
      boxWidth="450px"
      boxTop="12vh"
      v-if="dialogVisible">
     <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button 
            @click.native="clickConfirm" 
            :text="type==='addVisible'?'关联':'修改'" 
            icon="fa-floppy-o" 
            :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
            <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <div class="row">
          
          <div class="col-sm-12" v-show="type=='addVisible'">
              <kec-form crosswise text="客户" width="90px">
                <template #input>
                  <el-select v-model="payload.companyId" size="medium"
                   @change="changeCompanyId"
                   filterable placeholder="" style="width:100%">
                    <el-option
                      v-for="item in customerList"
                      :key="item.id"
                      :label="item.companyName"
                      :value="item.companyName">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12" v-show="type!='addVisible'">
              <kec-form crosswise text="客户" width="90px">
                <template #input>
                  <el-input v-model="payload.customerName" placeholder="" size="medium"
                  disabled
                   style="width:100%"></el-input>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12" v-show="type=='addVisible'">
              <kec-form text="服务合同号" crosswise width="90px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="payload.agreementId" 
                        @change="changeAgreementId"
                        :disabled="!payload.companyId" placeholder=""
                         size="medium" style="width:100%">
                          <el-option
                            v-for="item in agreementLists"
                            :key="item.id"
                            :label="item.code +' ( '+item.productName+' ) '"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
                </kec-form>
          </div>
          <div class="col-sm-12" v-show="type!='addVisible'">
              <kec-form crosswise text="服务合同号" width="90px">
                <template #input>
                  <el-input v-model="payload.agreementCode" placeholder="" size="medium"
                  disabled
                   style="width:100%"></el-input>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12" v-show="type=='addVisible'">
              <kec-form crosswise text="报价表编码" width="90px">
                <template #input>
                  <el-select v-model="payload.productQuotationId" size="medium"
                   style="width:100%"
                    :disabled="!payload.agreementId"
                  filterable placeholder="">
                    <el-option
                      v-for="item in productPartitionsList"
                      :key="item.id"
                      :label="item.quotationCode"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12" v-show="type!='addVisible'">
              <kec-form crosswise text="报价表编码" width="90px">
                <template #input>
                  <el-input v-model="payload.productQuotationCode" placeholder="" size="medium"
                  disabled
                   style="width:100%"></el-input>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="关联编码" crosswise width="90px">
              <template #input>
                <el-input v-model="payload.quotationCode" placeholder="" size="medium" style="width:100%"></el-input>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="生效日期" crosswise width="90px">
              <template #input>
                <el-date-picker
                 style="width:100%"
                  v-model="payload.execDate"
                  type="date"
                   size="medium"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="描述" crosswise width="90px">
              <template #input>
                <el-input type="textarea" v-model="payload.description" placeholder="" size="medium"></el-input>
              </template>
              </kec-form>
          </div>
        </div>
    
  </kec-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton ,KecDialog}  from '@/common/components'
import {formateDate} from '@/utils/fun'
  export default {
    name:'addFidle',
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
           "companyId":null,
           "agreementId":null,
           "quotationCode": "",
           "description": "",
           "execDate": "",
           "productId":null,
           "productQuotationId": null,
           "customerName":'',
           "productQuotationCode":'',
           "agreementCode":''
        },
        agreementLists:[]
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecDialog
    },

    computed: {
      ...mapState('basic',['customerList','productsList']),
      ...mapState('vendor',['vendorProductList']),
      ...mapState('customer',['agreementQueryPage']),
      ...mapState('channels',['productPartitionsList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('customer',['loadPostAgreementQueryPage','loadPostAgreementQuotations','loadPutAgreementQuotations']),
      ...mapActions('channels',['loadGetProductQuotation']),
      closeData(){
        this.payload={
          "id":null,
            "companyId":null,
           "agreementId":null,
           "quotationCode": "",
           "description": "",
           "execDate": "",
           "productId":null,
           "productQuotationId": null,
           "customerName":'',
           "productQuotationCode":'',
           "agreementCode":''
        
        }
      },
      changeCompanyId(customerName){
          
          this.payload.agreementId = null
          this.loadPostAgreementQueryPage({
            customerName,pageSize:1000,pageNumber:1
          }).then(success=>{
              let {content,totalElements} = this.agreementQueryPage
              if(content.length){
                this.agreementLists = content.map(item=>{ 
                  item['productId'] = item['product']['id']
                  item['productName'] = item['product']['name']
                  return item ;
                })
              }else{
                  this.agreementLists = []
              }
              
          })
        },
        changeAgreementId(agreementId){
          this.payload.productId = null
           let data = this.agreementLists.find(item=>{
             return agreementId == item.id
           })
           this.loadGetProductQuotation([data.productId])
        },
      clickConfirm() {
        const _this = this ;
        let { companyId,
           agreementId,
           quotationCode,
           description,
           execDate,
           productId,
           productQuotationId,
           id} = _this.payload ;
        let data = {}
        switch(_this.type){
          case 'addVisible':
                data = {
           agreementId,
           quotationCode,
           description,
           execDate:formateDate(execDate),
           productQuotationId}
                _this.loadPostAgreementQuotations(data).then(success=>{
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
               data = {id,
           quotationCode,
           description,
           execDate:formateDate(execDate)}
                _this.loadPutAgreementQuotations(data).then(success=>{
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
              let payload = JSON.parse(JSON.stringify(val) );
              let {id,description,execDate,quotationCode,customerName,agreementCode,productQuotationCode} = payload ;

              this.payload = {
                id,description,execDate,quotationCode,customerName,productQuotationCode,agreementCode
              }
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
</style>