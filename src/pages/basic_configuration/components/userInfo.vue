<template>
  <div class="row ventorsInfo">
    
    <div class="col-sm-12">
        <kec-form text="编辑用户信息">
          <template #input>
            <div class="row borders err">
                <div class="col-sm-6">
                    <kec-form crosswise text="用户名" width="80px">
                      <template #input>
                        <el-input v-model="payload.userName" placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="邮件" width="80px">
                    <template #input>
                      <el-input v-model="payload.email" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="组织" width="80px">
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
                <div class="col-sm-6">
                    <kec-form crosswise text="关联客户" width="80px">
                    <template #input>
                      <el-select v-model="payload.customerCode" filterable placeholder="" style="width:100%">
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
                <div class="col-sm-6">
                    <kec-form crosswise text="类型" width="80px">
                    <template #input>
                      <div class="col-sm-12 borders flexs" style="padding:8px">
                           <el-switch
                              v-model="payload.canLogin"
                              active-color="#13ce66"
                              inactive-text="可登录用户界面"
                              inactive-color="#ccc">
                            </el-switch>
                      </div>
                       
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="主要角色" width="80px">
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
                <div class="col-sm-6">
                    <kec-form crosswise text="密码" width="80px">
                      <template #input>
                        <el-input v-model="payload.password"  type="password" placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="超时" width="80px">
                    <template #input>
                      <el-input v-model="payload.tokenTimeout" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="创建时间" width="80px">
                    <template #input>
                      <el-input disabled v-model="payload.webSite" placeholder=""></el-input>
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
    name:'userInfo',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
                 "id":null,
                 "userName": "",
                 "password": "",
                 "email": "",
                 "organizationId": null,
                 "mainRoleId": null,
                 "tokenTimeout": "",
                 "customerCode":null,
                 "canLogin": false
                }
        
      }
    },

    components: {
        KecForm ,
        KecButton,
        KecScroll
    },

    computed: {
      ...mapState('basic',['organizationQueryList','queryByOrgList','userInfo','customerInfoList']),
    },

    beforeMount() {},

    mounted() {
      this.assignmentFunc(this.userInfo)
    },

    methods: {
      ...mapActions('basic',['loadUpdateUser','loadQueryByOrgId']),
      ...mapMutations('basic',['setUserInfo','selectUserId','selectMainRoleId']),
      orgChange(id){
        this.payload.mainRoleId = null
        this.loadQueryByOrgId([id])
      },
      closeData(){
        this.payload={
                 "id":null,
                 "userName": "",
                 "password": "",
                 "email": "",
                 "organizationId": null,
                 "mainRoleId": null,
                 "tokenTimeout": "",
                 "customerCode":null,
                 "canLogin": false
        }
      },
      clickConfirm() {
        const _this = this ;
        if(!_this.payload.userName) return
        let {userName,id,email,mainRoleId,organizationId,tokenTimeout,customerCode,canLogin} = _this.payload
        let data = {userName,id,email,mainRoleId,organizationId,tokenTimeout,customerCode,canLogin}
        _this.loadUpdateUser(data).then(success=>{
            this.setUserInfo(_this.payload)
            this.selectMainRoleId(mainRoleId)
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
          createTime
          ,email
          ,id
          ,mainRoleId
          ,mainRoleName
          ,organizationId
          ,organizationName
          ,tokenTimeout
          ,userName
          ,canLogin
          ,customerCode
        } = info ;
        organizationId && this.loadQueryByOrgId([organizationId]) ;
        _.payload = {
           createTime
          ,email
          ,id
          ,mainRoleId
          ,mainRoleName
          ,organizationId
          ,organizationName
          ,tokenTimeout
          ,userName
          ,canLogin:canLogin?canLogin:null
          ,customerCode:customerCode?customerCode:null

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