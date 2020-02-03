<template>
  <div class="row ">
    
    <kec-scroll :numbers="174" class="col-sm-12 createUser">
      
        <kec-form text="创建用户" bold="bold">
          <template #input>
            <div class="borders col-sm-12">
              <div class="col-sm-4 col-sm-offset-1">
                 <kec-form text="用户名">
                   <template #input>
                       <el-input v-model="payload.userName" placeholder=""></el-input>
                   </template>
                 </kec-form>
                 <kec-form text="密码">
                   <template #input>
                       <el-input type="password" v-model="payload.password" placeholder=""></el-input>
                   </template>
                 </kec-form>
              </div>
              <div class="col-sm-6  col-sm-offset-1">
                  <kec-form text="选择组织角色" bold="bold">
                    <template #input>
                      <kec-scroll :numbers="300" class="borders col-sm-12">
                        <div class="col-sm-10 col-sm-offset-1">
                          <el-tree accordion 
                              :data="organizationList" 
                              :props="defaultProps" 
                              node-key="id" 
                              show-checkbox
                              ref="tree"
                              @check-change="handleCheckChange">
                              <span class="custom-tree-node flexs a-center" style="width:100%;" slot-scope="{ node , data }">
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
                 <!-- <el-select v-model="id" @change="changeId" placeholder="请选择角色" style="width:100%;">
                   <el-option
                     v-for="item in options"
                     :key="item.id"
                     :label="item.label"
                     :value="item.id">
                   </el-option>
                 </el-select>
                 <kec-form text="已选择角色" style="margin-top:20px;">
                   <template #input>
                      <ul class="selectList" style="min-height:200px">
                          <li class="flexs j-between a-center"
                            v-for="(item,index) of selectArray"
                            :key="item.id"
                            >
                              <span>{{item.label}}</span>
                              <i @click="delItem(index)" class="fa fa-trash-o" aria-hidden="true"></i>
                          </li>
                      </ul>
                   </template>
                 </kec-form> -->
              </div>
              <div class="col-sm-6 flexs col-sm-offset-6 j-end" style="margin-top:20px">
                  <kec-button @click.native="clickUser" text="保存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
              </div>
            </div>
          </template>
        </kec-form>
    </kec-scroll>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton ,KecScroll }  from '@/common/components'
  export default {
    name:'createUser',
    props:[''],
    data () {
      return {
         defaultProps: {
          children: 'children',
          label: 'name',
         },
         payload:{
          "userName" : "",
          "password" : "",
          "rolesId" : [],
          "organizationId" : ""
        },
        selectArray:[]
      };
    },

    components: {
        KecForm,
        KecButton,
        KecScroll 
    },

    computed: {
      ...mapState('basic',['organizationList','organizationId']),
    },

    beforeMount() {},

    mounted() {},

    methods: {
      ...mapMutations('home',['delBreadcrumbArr']),
      ...mapActions('basic',['loadAuthCreateUser']),
        closeData(){
          this.payload = {
            "userName" : "",
            "password" : "",
            "rolesId" : [],
            "organizationId" : ""
          }
        },
        clickUser(){
          this.payload.organizationId = this.organizationId ;
           this.loadAuthCreateUser(this.payload).then(success=>{
                   this.closeData()
                   this.delBreadcrumbArr(1)
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
        changeId(id){
            let bool = this.selectArray.filter(item => item.id===id )
            let obj = this.options.find(item => item.id===id )
            bool.length === 0 && this.selectArray.push(obj)
        },
        delItem(index){
            this.selectArray.splice(index,1)
        },
        handleCheckChange(data, checked, indeterminate) {
          this.payload.rolesId = this.$refs.tree.getCheckedKeys() ;
        },
    },

    watch: {}

  }

</script>
<style lang='stylus' scoped>
.createUser  
  padding 5px
.borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding 10px  
.guding 
   width 15px     
   height 15px
   margin-right 10px
.selectList  
   padding 2px    
   border 1px solid #DCDFE6
   border-radius 4px
   cursor pointer
   li 
     &:hover 
       background #eee
     padding 5px 10px
</style>