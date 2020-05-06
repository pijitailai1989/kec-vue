<template>
  <kec-scroll :numbers="179">
    <div class="flexs kec-btn j-between a-center" style="width:100%"> 
      <div class="flexs a-center j-start">
           <div class="flexs a-center">
            <kec-form crosswise text="客户" width="80px">
                <template #input>
                  <el-select v-model="companyId" size="medium" clearable @change="changeCompanyId"
                   filterable placeholder="" style="width:200px">
                    <el-option
                      v-for="item in customerList"
                      :key="item.id"
                      :label="item.companyName"
                      :value="item.companyName">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
              <kec-form text="产品服务协议" crosswise width="100px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="agreementId" :disabled="!companyId" clearable  placeholder="" size="medium" style="width:140px">
                          <el-option
                            v-for="item in agreementLists"
                            :key="item.id"
                            :label="item.code"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
                </kec-form>
              
              <kec-button-click text="查询" 
               @click="queryFunc(agreementId)"
              style="width:60px"
              :disabled="!agreementId"
               background="#17A2B8" color="#fff"></kec-button-click>
              
          </div>
           
      </div>
      <div class="flexs kec-btn j-end" ref="box">
          <kec-button 
          text="设定产品执行费率" icon="fa-plus" 
          background="#ED6D01" 
          @click.native="buttonFunc('addVisible',null)"
          color="#fff"></kec-button> 
          <kec-button-click
          :disabled="selectIndex==null"
          text="修改客户报价" icon="fa-pencil" 
          background="#17A2B8" 
          @click="buttonFunc('changeVisible',selectItem)"
          color="#fff"></kec-button-click>
      </div>
        
    </div>
    
    <div class="kec-content">
          <kec-table 
           height="221px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="agreementList" 
           :letWidth="letWidth"
           :selectIndex="selectIndex"
           @active-item="activeItem"
           @active-index="activeFunc">
            <template #operation>
              <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
            </template>
            <template v-slot:productQuotationVO="slotProps">
              {{slotProps.item.quotationCode}}
            </template>
            <template v-slot:default="slotProps">
              <span>{{slotProps.item}}</span>
            </template>
          </kec-table>
    </div>
    <component :is="'addExchanges'" @close="closeFunc"  
    :dialogVisible="dialogVisible" :type="types" 
    :item="selectItems" :text="textItem"></component>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll,KecButtonClick,KecForm }  from '@/common/components'
import addExchanges from './addExchanges' 
  export default {
    name:'exchangeList',
    props:[''],
    data () {
      return {
           serviceTypeId:null,
           companyId:null,
           agreementId:null,
           vendorList:[],
           visible:false,
           addVisible:false,
           changeVisible:false,
           dialogVisible:false,
           agreementLists:[],
           letWidth:{
               0:'50px'
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'ID','slot':false},
             customerName:{"title":'客户','slot':false},
             productName:{"title":'产品名称','slot':false},
             productQuotationCode:{"title":'报价表编码','slot':false,'sort':'ZH'},
             description:{"title":'描述','slot':false},
             execDate:{"title":'生效日期','slot':false,'sort':'ZH'},
             quotationCode:{"title":'报价编码','slot':false,'sort':'ZH'},
             status:{"title":'状态','slot':false,'sort':'ZH'}
             
           },
           selectIndex:null,
           selectItem:null,
           selectItems:null,
           textItem:'',
           types:''
      };
    },

    components: {
        KecButton ,
        KecTable,
        addExchanges,
        KecScroll,
        KecForm,
        KecButtonClick
    },

    computed: {
      ...mapState('basic',['customerList']),
      ...mapState('customer',['agreementQueryPage','agreementList']),
      ...mapState('home',['themeColor']),
    },

    beforeMount() {},

    mounted() {
      this.loadCustomerQueryAll()
      this.loadProducts()
    },

    methods: {
        ...mapActions('customer',['loadGetAgreementQuotations','loadPostAgreementQueryPage']),
        ...mapActions('basic',['loadCustomerQueryAll','loadProducts']),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item ;
        },
        changeCompanyId(customerName){
          this.agreementId = null
          this.loadPostAgreementQueryPage({
            customerName,pageSize:1000,pageNumber:1
          }).then(success=>{
              let {content,totalElements} = this.agreementQueryPage
              this.agreementLists = content.length>=1 ? content : []
          })
        },
        queryFunc(agreementId){
          this.loadGetAgreementQuotations([agreementId])
        },
        buttonFunc(type,item){
          if(type === 'addVisible'){
             this.textItem = '设定产品执行费率'
          }else{
             this.textItem = '修改客户报价'
          }
           this.selectItems = item ;
           this.types= type ;
           this.dialogVisible = true
        },
        closeFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          this.selectItems = null ;
          this.dialogVisible = false
          if(data.bool) {
            this.loadGetAgreementQuotations([this.agreementId])
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