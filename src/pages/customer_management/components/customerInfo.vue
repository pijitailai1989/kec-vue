<template>
  <div class="row ventorsInfo">
    
    <div class="col-sm-12">
        <kec-form text="供应商基本信息">
          <template #input>
            <div class="col-sm-12 borders err">
                <div class="col-sm-12" style="margin-top:5px">
                    <kec-form crosswise text="公司名称" width="80px">
                      <template #input>
                        <el-input v-model="payload.companyName" placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="VAT#" width="80px">
                    <template #input>
                      <el-input v-model="payload.vatNumber" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="联系人" width="80px">
                    <template #input>
                      <el-input v-model="payload.contactName" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="联系电话" width="80px">
                    <template #input>
                      <el-input v-model="payload.phone" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="Email" width="80px">
                      <template #input>
                        <el-input v-model="payload.email" placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="币种" width="80px">
                    <template #input>
                      <el-select v-model="payload.currency" filterable placeholder="" style="width:100%">
                        <el-option
                          v-for="item in currencyList"
                          :key="item.id"
                          :label="item.code"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="网站地址" width="80px">
                    <template #input>
                      <el-input v-model="payload.webSite" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="客户编码" width="80px">
                    <template #input>
                      <el-input-number v-model="payload.customerCode" 
                      :controls="false" :min="1" :max="999999" style="width:100%"
                      placeholder="" size="medium"></el-input-number>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="类型" width="80px">
                    <template #input>
                      <el-select v-model="payload.type" placeholder="" size="medium" style="width:100%">
                        <el-option
                          v-for="(item,key) in types"
                          :key="key"
                          :label="item"
                          :value="key">
                        </el-option>
                      </el-select>
                    </template>
                    </kec-form>
                </div>
                
                
            </div>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="地址信息">
         <template #input>
           <div class="row borders err">
                <div class="col-sm-6">
                    <kec-form crosswise text="国家" width="80px">
                      <template #input>
                        <el-select v-model="payload.countryCode" @change="changeCountryCode" filterable placeholder="" style="width:100%">
                          <el-option
                            v-for="item in countryList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="行政区域" width="80px">
                    <template #input>
                      <el-select v-model="payload.subdivisionId" 
                              filterable
                              placeholder="" style="width:100%" size="medium">
                        <el-option
                          v-for="item in countryCodeList"
                          :key="item.id"
                          :label="item.name  + '-' +item.subdivision"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                  <div class="col-sm-6">
                      <kec-form crosswise text="洲" width="80px">
                      <template #input>
                        <el-input v-model="payload.state" placeholder=""></el-input>
                      </template>
                      </kec-form>
                  </div>
                  <div class="col-sm-6">
                      <kec-form crosswise text="街道" width="80px">
                        <template #input>
                          <el-input v-model="payload.street" placeholder=""></el-input>
                        </template>
                      </kec-form>
                  </div>

                </div>
                
                <div class="col-sm-6">
                    <kec-form crosswise text="城市" width="80px">
                    <template #input>
                      <el-input v-model="payload.city" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="邮政编码" width="80px">
                    <template #input>
                      <el-input v-model="payload.postCode" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                    <kec-form crosswise text="详细地址" width="80px">
                    <template #input>
                      <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="payload.addrLine"
                        show-word-limit
                      >
                      </el-input>
                    </template>
                    </kec-form>
                </div>
            </div>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12 flexs j-end" style="padding:5px">
      <kec-button @click.native="clickConfirm" text="保存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
    </div>
    
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton ,KecScroll }  from '@/common/components'
  export default {
    name:'customerInfo',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
                 "id":null,
                 "companyName": "",
                 "vatNumber": "",
                 "contactName": "",
                 "phone": "",
                 "email": "",
                 "webSite": "",
                 "currency":"",
                 "countryCode": "",
                 "subdivisionId":null,
                 "state": "",
                 "city": "",
                 "street": "",
                 "addrLine": "",
                 "postCode": "",
                 "province": "",
                 "type":null,
                 "customerCode":""
                 
                },
                types:{DIRECT:"直客", PEER:"同行"}
        
      }
    },

    components: {
        KecForm ,
        KecButton,
        KecScroll
    },

    computed: {
      ...mapState('basic',['ventorsInfo','currencyList','countryCodeList','countryList','vendorTypeList']),
    },

    beforeMount() {},

    mounted() {
      this.assignmentFunc(this.ventorsInfo)
    },

    methods: {
      ...mapActions('basic',['loadCustomerCreate','loadCustomerUpdate','loadQueryByCountryCode']),
      ...mapMutations('basic',['selectVentorsId','setVentorsInfo']),
      changeCountryCode(code){
          this.loadQueryByCountryCode([code])
          
      },
      closeData(){
        this.payload={
                 "id":null,
                 "companyName": "",
                 "vatNumber": "",
                 "contactName": "",
                 "phone": "",
                 "email": "",
                 "webSite": "",
                 "currency":"",
                 "countryCode": "",
                 "subdivisionId":null,
                 "state": "",
                 "city": "",
                 "street": "",
                 "addrLine": "",
                 "postCode": "",
                 "province": "",
                 "type":null,
                 "customerCode":""
        }
      },
      clickConfirm() {
        const _this = this ;
        if(!_this.payload.companyName) return
        
        _this.loadCustomerUpdate(_this.payload).then(success=>{
            this.setVentorsInfo(_this.payload)
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
      assignmentFunc(val){
        
        const _ = this ;
        let info = JSON.parse(JSON.stringify(val) ) ;

        let {
          id,
          companyName,
          vatNumber,
          contactName,
          phone,
          email,
          webSite,
          currency,
          type,
          customer_code,
          address:{
                  country:{code},
                  subdivision,
                  state,
                  city,
                  street,
                  addrLine,
                  postCode,
                  province
                  }
        } = info ;
        code && this.loadQueryByCountryCode([code]) ;
        _.payload = {
           id,
           companyName,
           vatNumber,
           contactName,
           phone,
           email,
           webSite,
           currency,
           countryCode:code,
           type,
           customerCode:customer_code?customer_code:"",
           subdivisionId:subdivision?subdivision.id:null,
           state,
           city,
           street,
           addrLine,
           postCode,
           province 
                     
        }
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