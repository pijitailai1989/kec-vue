<template>
  <kec-scroll :numbers="179" class="flexs columns a-center">
    <div class="flexs kec-btn j-between a-center" style="width:100%"> 
      <div class="flexs a-center j-start">
           <div class="flexs a-center">
            <kec-form crosswise text="选择角色" width="80px">
                <template #input>
                  <el-select v-model="roleId" size="medium" clearable @change="changeRoleId(roleId)" filterable placeholder="" style="width:140px">
                    <el-option
                      v-for="item in userRoleLists"
                      :key="item.id"
                      :label="item.shortName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </kec-form>
              <kec-form text="过滤资源" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="routerPath" clearable @change="searchFunc(routerPath,permissionList)" placeholder="" size="medium" style="width:140px">
                          <el-option
                            v-for="item in routerPathList"
                            :key="item"
                            :label="item"
                            :value="item">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
                </kec-form>
              <!-- <kec-button @click.native="searchFunc(routerPath,permissionList)" text="过滤" style="width:60px"
               background="#17A2B8" color="#fff"></kec-button> -->
              <kec-button-click :disabled="!roleId" @click="clickConfirms(roleId,idsList)" text="更新" style="width:60px"
               background="#17A2B8" color="#fff"></kec-button-click>
          </div>
           
      </div>
      <div class="flexs a-center j-end">
          <kec-button text="添加" 
          @click.native="dislogFunC('添加资源',!dialogVisible,'addResources','add')" 
          icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
          <kec-button-click :disabled="itemObj?false:true" @click="dislogFunC('修改资源',!dialogVisible,'addResources','eqit')" text="修改" 
          icon="fa-floppy-o" background="#ED6D01" color="#fff"></kec-button-click>
      </div>
        
    </div>
    <div class="kec-content">
        <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
          <div class="padd" style="width:240px">模块</div>
          <div class="padd" style="width:200px">权限名称</div>
          <div class="padd flx">路径</div>
          <div class="padd" style="width:50px">分配</div>
          <div class="padd" style="width:49px">增</div>
          <div class="padd" style="width:50px">查</div>
          <div class="padd" style="width:50px">改</div>
          <div class="padd" style="width:50px">删</div>
        </div>
        <kec-scroll :numbers="234" style="border-bottom:1px solid #EBEEF5">
          <el-table
             ref="singleTable"
              class="scrollbar"
              :data="tableRole"
              :header-cell-style="{
                fontWeight:'bold',
                height:'38px',
                color:'#000',
                padding:'0'
              }"
              highlight-current-row
              @current-change="changeSelectFunc"
              :cell-style="{
                borderRight:'1px solid #EBEEF5',
                padding:'6px 0'
              }"
              style="width:100%">
              <el-table-column
              prop="moduleName"
              label="模块"
              width="240">
              </el-table-column>
              <el-table-column
              prop="diyModuleName"
              label="权限名称"
              width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.diyModuleName" disabled placeholder="" size="small"></el-input>
                </template>
              </el-table-column>
              <el-table-column
              prop="routerPathString"
              label="路径">
              </el-table-column>
              <el-table-column
              prop="role"
              label="分配"
              width="50">
                <template slot-scope="scope">
                  <el-checkbox 
                  @change="checkRole(scope.row.id,scope.row.role)"
                  v-model="scope.row.role" 
                  :disabled="!roleId"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
              prop="create"
              label="增"
              width="50">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.create" disabled></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
              prop="read"
              label="查"
              width="50"
              >
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.read" disabled></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
              prop="update"
              label="改"
              width="50">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.update" disabled></el-checkbox>
                </template>
              </el-table-column>
              
              <el-table-column
              prop="delete"
              label="删"
              width="49">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.delete" disabled></el-checkbox>
                </template>
              </el-table-column>
          </el-table>
        </kec-scroll>
    </div>
    <component :is="componentName" :dialogVisible="dialogVisible" @closeFunc="cancelFunc" :text="textItem" :types="textType" :item="itemObj"></component>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll ,KecButtonClick,KecForm}  from '@/common/components'
import addResources from './addResources' 
  export default {
    name:'sysAuthoritiesResources',
    props:[''],
    data () {
      return {
           visible:true,
           numbers:0,
           table:[],
           diyModuleName:'',
           dialogVisible:false,
           componentName:'addResources',
           textItem:'',
           textType:'',
           tableRole:[],
           roleId:null,
           idsList:[],
           routerPath:'',
           itemObj:null
      };
    },

    components: {
        KecButtonClick ,
        KecButton,
        KecTable,
        KecScroll,
        addResources,
        KecForm
    },

    computed: {
      ...mapState('basic',['permissionList','userRoleLists','routerPathList','permissionIds']),
      ...mapState('home',['themeColor']),
      filteredTableData: function(){
        return this.table
      }
      
    },

    beforeMount() {},

    mounted() {
      this.loadGetPermission().then(success=>{
        this.tableRole = this.permissionList
      })
      this.loadFindRouterPathList()
      this.loadGetUserRoleQueryAll()
    },

    methods: {
        ...mapActions('basic',['loadGetPermission','loadPutPermission','loadGetUserRoleQueryAll',
        'loadFindRouterPathList','loadGetPermissionRole','loadPostPermissionRole']),
        clickConfirms(roleId,permissionIds) {
        const _this = this ;
         _this.loadPostPermissionRole({roleId,permissionIds}).then(success=>{
            
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
        changeSelectFunc(obj){
           this.itemObj = obj ;
        },
        changeRoleId(roleId){
           if(roleId){
             this.loadGetPermissionRole({roleId})
             this.routerPath = ''
           }
        },
        searchFunc(routerPath,list){
          let result = [] ;
          const _ = this ;
          if( routerPath ){
            result = list.filter(word => {return word.routerPathString == routerPath});
          }else{
            result = list
          }

           _.tableRole = result ;
        },
        
        dislogFunC(text,bool,component,type) {
          this.textType = type ;
          this.textItem = text ;
          this.dialogVisible = bool ;
          this.componentName = component ;
        },
        cancelFunc(bool){
          this.dialogVisible = false ;
          this.$refs.singleTable.setCurrentRow();
          this.textItem = '' ;
          this.textType = ''
          this.itemObj = null ; 

          bool && ( this.roleId = null )
          bool && ( this.routerPath = '' )
          bool && ( this.loadGetPermission().then(success=>{
                    this.tableRole = this.permissionList
                  }) )
        },
        checkRole(id,bool){
          const _ = this ;
          if(bool){
            _.idsList.push(id)
          }else{
             let index = _.idsList.findIndex( item => item == id)
             _.idsList.splice(index,1)
          }
        }
        
    },

    watch: {
      permissionList:{
        deep:true,
        handler:function(val){
          const _ = this ;
          let arr = JSON.parse( JSON.stringify(val) ) ;
          // this.tableRole = arr ;
        }
      },
      permissionIds:{
        deep:true,
        handler:function(val){
          const _ = this ;
           if(val){
             _.idsList = JSON.parse( JSON.stringify(val) ) || [] ;
             _.tableRole = JSON.parse( JSON.stringify(_.permissionList) ) ;
           }
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button   
   margin-left 10px
 .kec-btn  
   padding 5px        
 .kec-content  
   width calc(100vw - 290px)
   padding 1px
   position relative
 .tableHeader 
   height 38px 
   width calc(100vw - 292px)
   border-radius 3px
   position absolute
   top 0  
   left 1px
   z-index 9
   div+div  
     border-left 1px solid #fff
   .padd 
     padding 0 0 0 10px
     height 38px 
     line-height 38px
     color #fff  
     font-weight bold   
   .flx 
     flex 1
     flex-grow 1
     min-width 100px
 @media screen and ( max-width: 1024px ) 
  .kec-content  
   width calc(100vw - 20px)
  .tableHeader 
   width calc(100vw - 22px)
</style>