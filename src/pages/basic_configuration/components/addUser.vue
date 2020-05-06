<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="创建用户">
          <template #input>
            <div class="row borders err">
                <div class="col-sm-12">
                    <kec-form crosswise text="用户名" width="70px">
                      <template #input>
                        <el-input v-model="payload.userName" placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                    <kec-form crosswise text="邮件" width="70px">
                    <template #input>
                      <el-input v-model="payload.email" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                    <kec-form crosswise text="关联客户" width="70px">
                    <template #input>
                      <el-select v-model="payload.customerCode" clearable filterable placeholder="" style="width:100%">
                        <el-option
                          v-for="item in customerInfoList"
                          :key="item.id"
                          :label="item.companyName"
                          :value="item.customer_code">
                        </el-option>
                      </el-select>
                    </template>
                    </kec-form>
                </div>
                
                <div class="col-sm-12">
                    <kec-form crosswise text="组织" width="70px">
                    <template #input>
                      <el-select v-model="payload.organizationId" @change="orgChange" filterable placeholder="" style="width:100%">
                        <el-option
                          v-for="item in organizationQueryList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </template>
                    </kec-form>
                </div>
                
                <div class="col-sm-12">
                    <kec-form crosswise text="主要角色" width="70px">
                      <template #input>
                        <el-select v-model="payload.mainRoleId" filterable placeholder="" style="width:100%">
                          <el-option
                            :disabled="!payload.organizationId"
                            v-for="item in queryByOrgList"
                            :key="item.id"
                            :label="item.shortName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                    <kec-form crosswise text="密码" width="70px">
                    <template #input>
                      <el-input v-model="payload.password"  type="password" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                    <kec-form crosswise text="超时" width="70px">
                    <template #input>
                      <el-input v-model="payload.tokenTimeout" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-12">
                    <kec-form crosswise>
                    <template #input>
                      <div class="col-sm-12 flexs j-center" style="padding:8px">
                           <el-switch
                              v-model="payload.isCanLogin"
                              active-color="#13ce66"
                              inactive-text="是否可登录界面"
                              inactive-color="#CCC">
                            </el-switch>
                      </div>
                       
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
       :text="type==='addVisible'?'新建':'修改'" 
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
    name:'addUser',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
                 "userName": "",
                 "password": "",
                 "email": "",
                 "organizationId": null,
                 "mainRoleId": null,
                 "tokenTimeout": "",
                 "customerCode":null,
                 "isCanLogin": true
                }
        
      }
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['organizationQueryList','queryByOrgList','customerInfoList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('basic',['loadCreateUser','loadQueryByOrgId',]),
      
      orgChange(id){
        this.payload.mainRoleId = null
        id && this.loadQueryByOrgId([id])
      },
      closeData(){
        this.payload={
                 "userName": "",
                 "password": "",
                 "email": "",
                 "organizationId": null,
                 "mainRoleId": null,
                 "tokenTimeout": "",
                 "customerCode":null,
                 "isCanLogin": true
        }
      },
      clickConfirm() {
        const _this = this ;
        if(!_this.payload.userName) return
        switch(_this.type){
          case 'addVisible':
                _this.loadCreateUser(_this.payload).then(success=>{
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