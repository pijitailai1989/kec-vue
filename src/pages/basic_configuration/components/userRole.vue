<template>
  <div class="flexs columns a-center">
    <div class="flexs kec-btn j-between a-center" style="width:100%"> 
      <div class="flexs a-center">
           <kec-form crosswise text="组织部门" width="80px">
              <template #input>
                <el-select v-model="organizationId" size="medium" filterable placeholder="" style="width:100%">
                  <el-option
                    v-for="item in organizationQueryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </kec-form>
            <kec-form crosswise text="角色" width="80px">
                    <template #input>
                      <el-input v-model="roleName" placeholder="" size="medium"></el-input>
                    </template>
            </kec-form>
           <kec-button @click.native="searchFunc(organizationId,roleName,userRoleList)" text="搜索" style="width:100px"
           icon="fa-search" background="#17A2B8" color="#fff"></kec-button>
           
      </div>
    </div>
    <div class="kec-content">
        <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
          
          <div class="padd flx">部门</div>
          <div class="padd flx">角色</div>
          <div class="padd" style="width:100px">分配</div>
        </div>
        <kec-scroll :numbers="299" style="border-bottom:1px solid #EBEEF5">
          <el-table
              class="scrollbar"
              :data="table"
              :header-cell-style="{
                fontWeight:'bold',
                height:'38px',
                color:'#000',
                padding:'0'
              }"
              :cell-style="{
                borderRight:'1px solid #EBEEF5',
                padding:'6px 0'
              }"
              style="width:100%">
              <el-table-column
              prop="orgName"
              label="部门">
              </el-table-column>
              <el-table-column
              prop="shortName"
              label="角色">
              </el-table-column>
              <el-table-column
              prop="role"
              label="分配"
              width="99">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.role" @change="checkRole(scope.row.id,scope.row.role)"></el-checkbox>
                </template>
              </el-table-column>
          </el-table>
        </kec-scroll>
           <div class="col-sm-12 flexs j-end" style="padding:5px">
              <kec-button @click.native="clickConfirm(userId,roleIdList)" text="保存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
            </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll ,KecButtonClick,KecForm}  from '@/common/components'
  export default {
    name:'sysAuthoritiesResources',
    props:[''],
    data () {
      return {
           visible:true,
           numbers:0,
           table:[],
           diyModuleName:'',
           organizationId:null,
           roleName:null,
           roleIdList:[],
           numbers:0
      };
    },

    components: {
        KecButtonClick ,
        KecButton,
        KecForm,
        KecTable,
        KecScroll,
    },

    computed: {
      ...mapState('basic',['userRoleList','organizationQueryList','roleIds','userId']),
      ...mapState('home',['themeColor']),
      
    },

    beforeMount() {},

    mounted() {
      this.loadGetUserRoleQueryAll()
    },

    methods: {
        ...mapActions('basic',['loadRresetRole','loadGetUserRoleQueryAll']),
        ...mapMutations('basic',['selectRoleIds']),
        clickConfirm(id,roleIds) {
        const _this = this ;
         _this.loadRresetRole({id,roleIds}).then(success=>{
            this.selectRoleIds(roleIds)
            this.$message( {
             message: success,
             type: 'success'
            });
         }).catch(error=> {
            this.$message( {
             message: error,
             type: 'error'
            });
            this.searchFunc()
         })
         
        },
        searchFunc(organizationId,roleName,list){
          let result = [] ;
          const _ = this ;
          if(organizationId && roleName){
            result = list.filter(word => { return word.orgId == organizationId && word.shortName == roleName});
          }else if( organizationId && !roleName){
            result = list.filter(word => {return word.orgId == organizationId});
          }else if( !organizationId && roleName){
            result = list.filter(word => {return word.shortName == roleName});
          }else{
            result = list
          }
          this.table = _.roleFunc(result,_.roleIdList)
        },
        dislogFunC(text,bool,component) {
          this.textItem = text ;
          this.dialogVisible = bool ;
          this.componentName = component ;
        },
        cancelFunc(){
          this.dialogVisible = false ;
          this.textItem = '' ;
        },
        roleFunc(array,roleIds){
          let arr = array ;
          arr.forEach(el => {
            if(roleIds && roleIds.length){
              roleIds.forEach(item => {
                if(item == el.id){
                  el['role'] = true 
                }
              })
            }
          })
          return arr ;
        },
        checkRole(id,bool){
          const _ = this ;
          if(bool){
            _.roleIdList.push(id)
          }else{
             let index = _.roleIdList.findIndex( item => item == id)
             _.roleIdList.splice(index,1)
          }
        }
        
    },

    watch: {
      userRoleList:{
        deep:true,
        handler:function(val){
          const _ = this ;
          if(val){
            this.roleIdList = JSON.parse( JSON.stringify(_.roleIds) ) ;
            
            this.numbers ++
            if(this.numbers == 1){
              let arr = JSON.parse( JSON.stringify(val) )
              this.table = arr ;
            }
          }
          
        }
      },
      roleIds:{
        deep:true,
        handler:function(val){
          let arr = JSON.parse( JSON.stringify(val) )
          this.roleIdList = arr ;
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
   width calc(100vw - 300px)
   padding 1px
   position relative
 .tableHeader 
   height 38px 
   width calc(100vw - 302px)
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
   width calc(100vw - 30px)
  .tableHeader 
   width calc(100vw - 32px)
</style>