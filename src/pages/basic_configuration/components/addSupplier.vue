<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="供应商基本信息">
          <template #input>
            <div class="row borders err">
                <div class="col-sm-6">
                    <kec-form text="公司名称">
                      <template #input>
                        <el-input v-model="payload.companyName" placeholder="" size="mini"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="VAT#">
                    <template #input>
                      <el-input v-model="payload.vatNumber" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="联系人">
                    <template #input>
                      <el-input v-model="payload.contactName" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="联系电话">
                    <template #input>
                      <el-input v-model="payload.phone" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="Email">
                      <template #input>
                        <el-input v-model="payload.email" placeholder="" size="mini"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="币种">
                    <template #input>
                      <el-select v-model="payload.currency" placeholder="" size="mini" style="width:100%">
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
                    <kec-form text="类型">
                    <template #input>
                      <el-input v-model="payload.type" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="网站地址">
                    <template #input>
                      <el-input v-model="payload.webSite" placeholder="" size="mini"></el-input>
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
                    <kec-form text="国家">
                      <template #input>
                        <el-input v-model="payload.address.country" placeholder="" size="mini"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="省市">
                    <template #input>
                      <el-input v-model="payload.address.province" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="辖区">
                    <template #input>
                      <el-input v-model="payload.address.district" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="洲">
                    <template #input>
                      <el-input v-model="payload.address.state" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="街道">
                      <template #input>
                        <el-input v-model="payload.address.street" placeholder="" size="mini"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="邮政编码">
                    <template #input>
                      <el-input v-model="payload.address.postCode" placeholder="" size="mini"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                    <kec-form text="详细地址">
                    <template #input>
                      <el-input
                          size="mini"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="payload.address.addrLine"
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
       @click.native="clickConfirm" 
       :text="type==='addVisible'?'新增':'修改'" 
       icon="fa-floppy-o" 
       :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
       <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'addSupplier',
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
                 "locale": "",
                 "type": "",
                 "webSite": "",
                 "currency":"",
                 "address":{
                           "country": "",
                           "state": "",
                           "city": "",
                           "district": "",
                           "street": "",
                           "countryCode": "",
                           "addrLine": "",
                           "postCode": "",
                           "province": "" 
                           }
                }
        
      }
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['currencyList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('basic',['loadVendorPostVendor','loadVendorPutVendor']),
      closeData(){
        this.payload={
                 
                 "companyName": "",
                 "vatNumber": "",
                 "contactName": "",
                 "phone": "",
                 "email": "",
                 "locale": "",
                 "type": "",
                 "webSite": "",
                 "currency":"",
                 "address":{
                           "country": "",
                           "state": "",
                           "city": "",
                           "district": "",
                           "street": "",
                           "countryCode": "",
                           "addrLine": "",
                           "postCode": "",
                           "province": "" 
                           },
        }
      },
      clickConfirm() {
        const _this = this ;
        console.log(_this.payload,'_this.payload')
        if(!_this.payload.companyName) return
        switch(_this.type){
          case 'addVisible':
                _this.loadVendorPostVendor(_this.payload).then(success=>{
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
                _this.loadVendorPutVendor(_this.payload).then(success=>{
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
            this.payload = JSON.parse(JSON.stringify(val) );
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