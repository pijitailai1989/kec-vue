<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="客户基本信息">
          <template #input>
            <div class="row borders err">
                <div class="col-sm-12">
                    <kec-form crosswise text="公司名称" width="80px" star="star">
                      <template #input>
                        <el-input v-model="payload.companyName" class='v-check'
                                        v-checkParam="{required:true}" placeholder="" size="medium"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="VAT#" width="80px">
                    <template #input>
                      <el-input v-model="payload.vatNumber" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="联系人" width="80px">
                    <template #input>
                      <el-input v-model="payload.contactName" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="联系电话" width="80px">
                    <template #input>
                      <el-input v-model="payload.phone" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="Email" width="80px" star="star">
                      <template #input>
                        <el-input v-model="payload.email" placeholder="" class='v-check'
                                        v-checkParam="{required:true}" size="medium"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="币种" width="80px">
                    <template #input>
                      <el-select v-model="payload.currency" placeholder="" size="medium" style="width:100%">
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
                    <kec-form crosswise text="类型" width="80px" star="star">
                    <template #input>
                      <el-select v-model="payload.type" placeholder="" class='v-check'
                                        v-checkParam="{required:true}" size="medium" style="width:100%">
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
                <div class="col-sm-6">
                    <kec-form crosswise text="网站地址" width="80px">
                    <template #input>
                      <el-input v-model="payload.webSite" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="客户编码" width="80px" star="star">
                    <template #input>
                      <el-input-number v-model="payload.customerCode" class='v-check'
                                        v-checkParam="{required:true}"
                      :controls="false" :min="1" :max="999999" style="width:100%"
                      placeholder="" size="medium"></el-input-number>
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
                    <kec-form crosswise text="国家" width="80px" star="star">
                      <template #input>
                        <el-select v-model="payload.countryCode" class='v-check'
                                        v-checkParam="{required:true}" @change="changeCountryCode" filterable placeholder="" style="width:100%">
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
                               :disabled="!payload.countryCode" 
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
                        <el-input v-model="payload.state" placeholder="" style="width:100%"></el-input>
                      </template>
                      </kec-form>
                  </div>
                  <div class="col-sm-6">
                      <kec-form crosswise text="街道" width="80px">
                        <template #input>
                          <el-input v-model="payload.street" placeholder="" style="width:100%"></el-input>
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
                    <kec-form crosswise text="邮政编码" width="80px" star="star">
                    <template #input>
                      <el-input v-model="payload.postCode" class='v-check'
                                        v-checkParam="{required:true}" placeholder=""></el-input>
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
    <div class="col-sm-12 flexs kec-btn">
       <kec-button 
       v-checkSubmit
       :text="type==='addVisible'?'新增':'修改'" 
       icon="fa-floppy-o" 
       :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
       <!-- <kec-button 
       @click.native="clickConfirm" 
       :text="type==='addVisible'?'新增':'修改'" 
       icon="fa-floppy-o" 
       :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button> -->
       <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'unit',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
                 "companyName": "",
                 "vatNumber": "",
                 "contactName": "",
                 "phone": "",
                 "email": "",
                 "type":"",
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
                 "customerCode":""
                },
        types:{DIRECT:"直客", PEER:"同行"}
        
      }
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['currencyList','countryList','countryCodeList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('basic',['loadCustomerCreate','loadCustomerUpdate','loadQueryByCountryCode']),
      changeCountryCode(code){
          this.loadQueryByCountryCode([code])
          
      },
      closeData(){
        this.payload={
                 "companyName": "",
                 "vatNumber": "",
                 "contactName": "",
                 "phone": "",
                 "email": "",
                 "type":"",
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
                 "customerCode":""
        }
      },
      submit(){
          const _ = this ;
          _.clickConfirm()
        },
      clickConfirm() {
        const _this = this ;
        switch(_this.type){
          case 'addVisible':
                _this.loadCustomerCreate(_this.payload).then(success=>{
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
                _this.loadCustomerUpdate(_this.payload).then(success=>{
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
            const _ = this ;
            if(val){
                let info = JSON.parse(JSON.stringify(val) );
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
                      type,
                      customerCode:customer_code?customer_code:"",
                      countryCode:code,
                      subdivisionId:subdivision.id,
                      state,
                      city,
                      street,
                      addrLine,
                      postCode,
                      province 
                                
                    }
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