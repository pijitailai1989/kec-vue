<template>
  <div class="row ventorsInfo" @click="closeIdFunc">
    
    <div class="col-sm-6">
      
        <kec-form text="组织架构与角色" bold="bold">
          <template #input>
            <kec-scroll :numbers="257" class="borders col-sm-12">
              <div class="col-sm-10 col-sm-offset-1">
                 <el-tree accordion 
                    :data="organizationList" 
                    :props="defaultProps" 
                     node-key="id" 
                    @node-click="handleNodeClick">
                    <span class="custom-tree-node flexs a-center" style="width:100%;" slot-scope="{ node , data }" @contextmenu="contextmenuFunc($event,data.id,data.type,data.name)">
                       <span class="flexs a-center j-center guding">
                           <i class="fa fa-sitemap" style="color:#1AAF6F" v-if="data.type==='ORG'" aria-hidden="true"></i>
                           <i class="fa fa-users" style="color:#527CC7" v-else-if="data.type==='ROLE'" aria-hidden="true"></i>
                           <i class="fa fa-user" style="color:#EA7D3C" v-else aria-hidden="true"></i>
                       </span>
                       <span v-if="data.type==='ORG'" style="height:20px;line-height:22px;color:#1AAF6F">{{node.label}}</span>      
                       <span v-else-if="data.type==='ROLE'" style="height:20px;line-height:22px;color:#527CC7">{{node.label}}</span>      
                       <span v-else aria-hidden="true" style="height:20px;line-height:22px;color:#EA7D3C">{{node.label}}</span>      
                    </span>
                 </el-tree>
              </div>
              
            </kec-scroll>
          </template>
        </kec-form>
        
    </div>
    <div class="col-sm-6" v-show="typeString">
        <kec-form :text="typeText" bold="bold">
         <template #input>
           <div class="borders col-sm-12">
                <div class="col-sm-10 col-sm-offset-1"  
                v-show=" (typeString === 'organization' && parentName )  || typeString === 'newRole' ">
                    <kec-form text="上级组织">
                      <template #input>
                        <el-input v-model="parentName" disabled placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1">
                    <kec-form text="名称">
                      <template #input>
                        <el-input v-model="payload.name" placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1" v-show=" typeString === 'newRole' || typeString === 'ROLE' ">
                    <kec-form text="角色编码">
                      <template #input>
                        <el-input v-model="payload.roleCode" placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                
                <div class="col-sm-10 col-sm-offset-1" v-show=" typeString === 'organization' || typeString === 'ORG' ">
                    <kec-form text="组织类型">
                    <template #input>
                      
                      <el-select v-model="payload.orgType" placeholder="" style="width:100%">
                        <el-option
                          v-for="item in options"
                          :key="item.code"
                          :label="item.text"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1">
                    <kec-form text="描述">
                    <template #input>
                      <el-input v-model="payload.description" placeholder=""></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1" v-show=" typeString === 'organization' || typeString === 'ORG' ">
                    <kec-form text="地址">
                    <template #input>
                      <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="payload.address"
                        show-word-limit
                      >
                      </el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="flexs col-sm-10 col-sm-offset-1 mar">
                 <kec-button @click.native="clickConfirm(typeString)" text="保存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
                </div>
           </div>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <div class="flexs col-sm-8 col-sm-offset-1 mar">
             <kec-button
             @click.native="clickTypeFunc(true,'organization',true)" 
             text="新建根组织" icon="fa-eraser" background="#6C757D" color="#fff"></kec-button>
             <kec-button :disabled=" typeString !== 'ORG' " 
             @click.native="clickTypeFunc( typeString === 'ORG' ,'organization')" 
             text="新建组织结点" icon="fa-plus-square-o" background="#ED6D01" color="#fff"></kec-button>
             <kec-button :disabled="typeString !== 'ORG'" 
             @click.native="clickTypeFunc(typeString === 'ORG','newRole')" 
             text="添加角色" icon="fa-plus-square-o" background="#ED6D01" color="#fff"></kec-button>
        </div>
        <!-- <div class="flexs col-sm-5 col-sm-offset-1 mar"> -->
                <!-- <kec-button
                @click.native="pageTo('createUser','创建用户')" 
                text="创建用户" icon="fa-user-o" background="" color="#333"></kec-button> -->
                <!-- <kec-button
                @click.native="pageTo('rolePrivilege','角色权限')" 
                text="角色权限" icon="fa-users" background="" color="#333"></kec-button> -->
        <!-- </div> -->
    </div>
    <kec-button-no class="contextmenu"
                v-if="idType ==='ORG'"
                id="myMenu"
                @click.native="pageTo('createUser','创建用户')" 
                text="创建用户" icon="fa-user" background="#eee" color="#333"></kec-button-no>
    <kec-button-no  class="contextmenu"
                v-else
                id="myMenu"
                @click.native="pageTo('rolePrivilege','角色权限')" 
                text="角色权限" icon="fa-users" background="#eee" color="#333"></kec-button-no>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton ,KecScroll,KecButtonNo }  from '@/common/components'
  export default {
    name:'organizationalRole',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        typeString:null,
        parentName:null,
        typeText:'',
        payload:{
           "name":"", 
           "parentId":null ,
           "address":"", 
           "description":"" ,
           "id":null,
           "orgId":null,
           "orgType":null,
           "roleCode":null
        },
        idType:null,
        options:[
          {code:'OPERATION',text:'运营主体'},
          {code:'CUSTOMER',text:'客户'},
          {code:'VENDOR',text:'供应商'},
        ]
        
      }
    },

    components: {
        KecForm ,
        KecButton,
        KecScroll,
        KecButtonNo
    },

    computed: {
      ...mapState('basic',['organizationList']),
      

    },

    beforeMount() {},

    mounted() {
       this.loadOrganizationQueryParent()
       this.closeData()
    },

    methods: {
      ...mapMutations('home',['pushBreadcrumbArr']),
      ...mapMutations('basic',['setOrganizationId','setRoleObj']),
      ...mapActions('basic',[
      'loadOrganizationQueryParent',
      'loadOrganizationCreate',
      'loadOrganizationUpdate',
      'loadRoleCreate',
      'loadRoleUpdate'
      ]),
      closeIdFunc(){
        const el = document.getElementById("myMenu");
          if(el) el.style.display = 'none';
      },
      contextmenuFunc(event,id,type,name){
        return ;
        event.preventDefault();
        event.stopPropagation()
        this.closeIdFunc()
        this.idType = type
        if(type==='ORG'){
          
          const el = document.getElementById("myMenu");
          el.style.display = 'flex';
          el.style.top = event.clientY + 'px';
          el.style.left = event.clientX + 10 + 'px';
          
          this.setOrganizationId(id)
        }else if(type === 'ROLE'){
          const el = document.getElementById("myMenu");
          el.style.display = 'flex';
          el.style.top = event.clientY + 'px';
          el.style.left = event.clientX + 'px';
          let data = { id, name }
          this.setRoleObj(data)
        }

      },
      handleNodeClick(data){
        console.log(data,'data')
        this.closeIdFunc()
         this.closeData()
         this.payload = {
            "name":data.name, 
            "parentId":data.id ,
            "address":data.address, 
            "description":data.description ,
            "id":data.id,
            "orgId":data.id,
            "orgType":data.orgType?data.orgType:null,
            "roleCode":data.roleCode
         } ;
         this.parentName = data.name ;
         if(data.type==='ORG'){
            this.typeText = '编辑组织';
            this.typeString = 'ORG' ;
         }else if(data.type==='ROLE'){
            this.typeText = '编辑角色';
            this.typeString = 'ROLE' ;
         }
         
      },
      closeData(){
        this.typeString = null
        this.typeText = '' ; 
        this.parentName = null
        this.payload = {
           "name":"", 
           "parentId":null ,
           "address":"", 
           "description":"" ,
           "id":null,
           "orgId":null,
           "roleCode":null,
           "orgType":null
        }
      },
      clickConfirm(type){
        let {name,parentId,address,description,id,orgId,roleCode,orgType} = this.payload ;
        let data = {}
        if(type==='organization'){
           data = { name,parentId,address,description,orgType}
           this.loadOrganizationCreate(data).then(success=>{
                   this.loadOrganizationQueryParent()
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
        }else if(type==='ORG'){
          data = {name,address,description,id,orgType}
           this.loadOrganizationUpdate(data).then(success=>{
                   this.loadOrganizationQueryParent()
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
        }else if(type === 'newRole'){
          data = {name,description,orgId,roleCode}
           this.loadRoleCreate(data).then(success=>{
                   this.loadOrganizationQueryParent()
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
        }else if(type === 'ROLE'){
           data = {name,description,id,roleCode}
           this.loadRoleUpdate(data).then(success=>{
                   this.loadOrganizationQueryParent()
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
        }
         
      },
      clickTypeFunc(bool,type,boolean){
         if(!bool) return ;
         if(boolean) this.closeData()
         this.typeString = type ;
         this.payload["name"] = ""
         this.payload["address"] = ""
         this.payload["description"] = "" 
         this.payload["orgType"] = null
         this.payload["roleCode"] = null
         switch(type){
            case 'organization':
              this.typeText = '新建组织';
              break;
            case 'newRole':
              this.typeText = '新建角色';
              break;
            default:
              break;
         }
      },
      pageTo(str,name){
        this.pushBreadcrumbArr({name:name,components:str})
      }  
    },

    watch: {
      
      
    },
    destroyed(){
    }

  }

</script>
<style lang='stylus' scoped>
 .contextmenu  
   position fixed
   display none
 .row  
   padding 10px
 .ventorsInfo 
   background #fff
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 20px
 .mar  
   margin-top 10px
 .guding 
   width 15px     
   height 15px
   margin-right 10px
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding 10px
   &.pro  
     height 99px   
     margin-bottom 4px
   &.err  
     min-height 40px
</style>