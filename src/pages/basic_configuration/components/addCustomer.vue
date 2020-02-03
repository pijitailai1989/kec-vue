<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="客户基本信息">
          <template #input>
            <div class="row borders err">
                <div class="col-sm-6">
                    <kec-form crosswise text="公司名称" width="80px">
                      <template #input>
                        <el-input v-model="payload.company_name" placeholder="" size="medium"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="VAT#" width="80px">
                    <template #input>
                      <el-input v-model="payload.vat_number" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="联系人" width="80px">
                    <template #input>
                      <el-input v-model="payload.contact_name" placeholder="" size="medium"></el-input>
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
                    <kec-form crosswise text="Email" width="80px">
                      <template #input>
                        <el-input v-model="payload.email" placeholder="" size="medium"></el-input>
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
                    <kec-form crosswise text="类型" width="80px">
                    <template #input>
                      <el-input v-model="payload.type" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="网站地址" width="80px">
                    <template #input>
                      <el-input v-model="payload.web_site" placeholder="" size="medium"></el-input>
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
                        <el-input v-model="payload.address.country" placeholder="" size="medium"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="省市" width="80px">
                    <template #input>
                      <el-input v-model="payload.address.province" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="辖区" width="80px">
                    <template #input>
                      <el-input v-model="payload.address.district" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="洲" width="80px">
                    <template #input>
                      <el-input v-model="payload.address.state" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="街道" width="80px">
                      <template #input>
                        <el-input v-model="payload.address.street" placeholder="" size="medium"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="邮政编码" width="80px">
                    <template #input>
                      <el-input v-model="payload.address.post_code" placeholder="" size="medium"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                    <kec-form crosswise text="详细地址" width="80px">
                    <template #input>
                      <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="payload.address.addr_line"
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
                 "company_name": "",
                  "vat_number": "",
                  "contact_name": "",
                  "phone": "",
                  "email": "",
                  "type": "",
                  "web_site": "",
                  "address": {
                    "country": "",
                    "state": "",
                    "city": "",
                    "district": "",
                    "street": "",
                    "country_code": "",
                    "addr_line": "",
                    "post_code": "",
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
      ...mapActions('basic',['loadCustomerCreate','loadCustomerUpdate']),
      closeData(){
        this.payload={
                 "company_name": "",
                  "vat_number": "",
                  "contact_name": "",
                  "phone": "",
                  "email": "",
                  "type": "",
                  "web_site": "",
                  "address": {
                    "country": "",
                    "state": "",
                    "city": "",
                    "district": "",
                    "street": "",
                    "country_code": "",
                    "addr_line": "",
                    "post_code": "",
                    "province": ""
                  }
        }
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
            if(val) this.payload = JSON.parse(JSON.stringify(val) );
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