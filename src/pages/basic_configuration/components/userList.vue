<template>
  <kec-scroll :numbers="175">
    <div class="flexs kec-btn j-between a-center"> 
      <div class="flexs a-center">
           <el-input v-model="userName" placeholder="" size="medium"></el-input>
           
           <kec-button @click.native="searchFunc(userName)" text="搜索" style="width:100px"
           icon="fa-search" background="#17A2B8" color="#fff"></kec-button>
           
      </div>
      <div class="flexs kec-btn j-end">
        <el-popover
          placement="left-start"
          width="400"
          v-model="addVisible"
          trigger="click">
          <kec-user @close="closeFunc" type="addVisible"></kec-user>
          <kec-button slot="reference" text="新建用户" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
        </el-popover>
        <kec-button-click
          @click="eqitVentorFunc"
          :disabled="selectIndex===null" 
          slot="reference" text="编辑用户" 
          icon="fa-pencil" background="#17A2B8" 
          color="#fff"></kec-button-click>
        <el-popover
          placement="left-start"
          width="160"
          :disabled="selectIndex===null"
          v-model="visible">
          <p>确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click.native="delFunc">确定</el-button>
          </div>
          <kec-button slot="reference"
            :disabled="selectIndex===null" text="删除用户" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
        </el-popover>
      </div>
    </div>
    
    <div class="kec-content">
          <kec-table 
           height="260px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="usersList" 
           :letWidth="letWidth"
           :selectIndex="selectIndex"
           @active-item="activeItem"
           @active-index="activeFunc">
            <template #operation>
              <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
            </template>
            <template v-slot:default="slotProps">
              {{slotProps.item}}
            </template>
            <template v-slot:a="slotProps">
              <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
              <span>{{slotProps.item}}</span>
            </template>
          </kec-table>
    </div>
    <div class="flexs j-end" v-show="total">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="PageNum"
        :page-size="PageSize"
        :total="total">
      </el-pagination>
    </div>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable,KecScroll,KecButtonClick }  from '@/common/components'
import KecUser from './addUser' 
  export default {
    name:'userList',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           letWidth:{
             1:'150px',
             2:'150px',
             4:'80px',
             5:'160px',
           },
           lastWidth:'',
           tableHeader:{
             userName:{"title":'用户名','slot':false,'sort':'ZH'},
             organizationShortName:{"title":'组织部门','slot':false,'sort':'ZH'},
             mainRoleShortName:{"title":'部门角色','slot':false,'sort':'ZH'},
             email:{"title":'邮件','slot':false},
             loginStatus:{"title":'界面登录','slot':false,'sort':'ZH'},
             createTime:{"title":'创建时间','slot':false},
             
           },
           selectIndex:null,
           selectItem:null,
           usersList:[],
           PageSize:20,
           PageNum:1,
           userName:'',
           total:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecUser,
        KecButtonClick,
        KecScroll
    },

    computed: {
      ...mapState('basic',['getUsers']),
    },

    beforeMount() {},

    mounted() {
      this.loadOrganizationQueryAll()
      this.loadGetCustomerInfo()
      this.mountFunc(20,1)
    },

    methods: {
        ...mapActions('basic',['loadGetUsers','loadOrganizationQueryAll','loadDeleteUser','loadGetCustomerInfo']),
        ...mapMutations('basic',['setUserInfo','selectUserId','selectMainRoleId','selectRoleIds']),
        ...mapMutations('home',['pushBreadcrumbArr']),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item
        },
        searchFunc(name){
          this.mountFunc(20,1,name)
        },
        handleCurrentChange(page){
          this.PageNum = page ;
          this.mountFunc(this.PageSize,page)
        },
        mountFunc(size,num,name){
          const _ = this ;
          let data = {
            pageSize:size,
            pageNumber:num
          }
          name && (data.userName = name)
          _.loadGetUsers(data).then(success => {
            let {content,totalElements} = _.getUsers;
            if(content && content.length){
               _.usersList = content.map(item=>{
                 item['loginStatus'] = item['isCanLogin'] ? '允许' : '禁止'
                 return item ;
               })
            }else{
               _.usersList = [] ;
            }
            

            _.total = totalElements ;
          })
        },
        closeFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          if(data.bool) {
            this.mountFunc(this.PageSize,this.PageNum)
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          let {length} = this.usersList ;
          if(this.selectIndex!==null) {
            this.loadDeleteUser(this.selectItem.id).then(success=>{
                   this.selectIndex = null ;
                   if(length == 1){
                     this.PageNum >=2 && this.PageNum -- ;
                   }
                   this.mountFunc(this.PageSize,this.PageNum)
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                },error=>{
                  this.selectIndex = null ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
          } 
        },
        eqitVentorFunc(){
          let item = this.selectItem ;
          this.setUserInfo(item)
          this.selectUserId(item.id)
          this.selectMainRoleId(item.mainRoleId)
          this.selectRoleIds(item.roleIds)
          this.pushBreadcrumbArr({name:'用户配置',components:'userItem'})
        }
    },

    watch: {}

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