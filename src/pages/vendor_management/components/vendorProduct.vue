<template>
  <kec-scroll :numbers="209" class="flexs columns a-center">
    <div class="flexs kec-btn j-between a-center" style="width:100%"> 
      <div class="flexs a-center j-start">
           <!-- <div class="flexs a-center">
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
              <kec-button-click :disabled="!roleId" @click="clickConfirms(roleId,idsList)" text="更新" style="width:60px"
               background="#17A2B8" color="#fff"></kec-button-click>
          </div> -->
           
      </div>
      <div class="flexs a-center j-end">
          <kec-button text="新建产品" 
          @click.native="dislogFunC('新建产品',!dialogVisible,'addProduct','add')" 
          icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
          <kec-button-click :disabled="itemObj?false:true" 
          @click="dislogFunC('编辑产品',!dialogVisible,'addProduct','eqit')" text="编辑产品" 
          icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button-click>
      </div>
        
    </div>
    <div class="kec-content">
        <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
          <div-sort class="padd" style="width:180px" @clickSort="sortFunc" :sortType="{a:'name',b:'ZH'}">供应商产品名称</div-sort>
          <div-sort class="padd" style="width:180px" @clickSort="sortFunc" :sortType="{a:'vendorProductCode',b:'ZH'}">供应商产品编码</div-sort>
          <div class="padd flx">描述</div>
          <div-sort class="padd" style="width:150px" @clickSort="sortFunc" :sortType="{a:'serviceTypeText',b:'ZH'}">服务类型名称</div-sort>
          <div-sort class="padd" style="width:150px" @clickSort="sortFunc" :sortType="{a:'serviceTypeText',b:'ZH'}">服务分区方案</div-sort>
          <div class="padd" style="width:101px">状态</div>
        </div>
        <kec-scroll :numbers="262" style="border-bottom:1px solid #EBEEF5">
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
              prop="name"
              label=""
              width="180">
              </el-table-column>
              <el-table-column
              prop="vendorProductCode"
              label=""
              width="180"
              >
              </el-table-column>
              <el-table-column
              prop="description"
              label=""
              >
              </el-table-column>
              <el-table-column
              prop="serviceTypeText"
              width="150"
              label="">
              </el-table-column>
              <el-table-column
              prop="schemaName"
              width="150"
              label="">
              </el-table-column>
              <el-table-column
              prop="role"
              label=""
              width="100">
                <template slot-scope="scope">
                  <el-checkbox 
                  @change="checkRole(
                  scope.row.id,
                  scope.row.name,
                  scope.row.description,
                  scope.row.serviceTypeCode,
                  scope.row.enabled,
                  scope.row.vendorProductCode,
                  scope.row.partitionSchemaId,
                  ventorsId,
                  scope.$index
                  )"
                  v-model="scope.row.enabled" 
                  >启用</el-checkbox>
                </template>
              </el-table-column>
          </el-table>
        </kec-scroll>
    </div>
    <component :is="componentName" :dialogVisible="dialogVisible" @closeFunc="cancelFunc" 
    :text="textItem" :types="textType" :item="itemObj"></component>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {sortCompare } from '@/utils/fun'
import {KecButton , KecTable ,KecScroll ,KecButtonClick,KecForm,KecSort}  from '@/common/components'
import addProduct from './addProduct' 
  export default {
    name:'vendorProduct',
    props:[''],
    data () {
      return {
           visible:true,
           numbers:0,
           table:[],
           diyModuleName:'',
           dialogVisible:false,
           componentName:'addProduct',
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
        addProduct,
        KecForm,
        DivSort:KecSort
    },

    computed: {
      ...mapState('vendor',['vendorProductList']),
      ...mapState('basic',['ventorsId']),
      ...mapState('home',['themeColor']),
      filteredTableData: function(){
        return this.table
      }
      
    },

    beforeMount() {},

    mounted() {
      this.loadQueryServerTypes()
      this.loadGetVendorProducts([this.ventorsId])
      this.loadGetPartitionSchemas({pageSize:100,pageNumber:1})
    },

    methods: {
        ...mapActions('vendor',['loadGetVendorProducts','loadPutVendorProducts','loadGetPartitionSchemas']),
        ...mapActions('basic',['loadQueryServerTypes']),
        checkRole(id,name,description,serviceTypeId,enabled,vendorProductCode,partitionSchemaId,ventorsId,index){
             let data = {name,description,serviceTypeId,id,enabled,vendorId:ventorsId,vendorProductCode,partitionSchemaId} ;
             this.loadPutVendorProducts(data).then(success=>{
                  
                  this.$message( {
                  message: success,
                  type: 'success'
                  });
              }).catch(error=> {
                  this.$set(this.tableRole[index],'enabled',!enabled)
                  this.tableRole
                  this.$message( {
                  message: error,
                  type: 'error'
                  });
              })
        },
        sortFunc(type){
             let {a,b} = type ;
             const _this = this ;
              _this.tableRole = sortCompare(_this.tableRole,a,b)
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
          bool && this.loadGetVendorProducts([this.ventorsId])

        }
        
    },

    watch: {
      vendorProductList:{
        deep:true,
        handler:function(val){
          const _ = this ;
          let arr = JSON.parse( JSON.stringify(val) ) ;
          this.tableRole = arr.map(item=>{
            let{partitionSchema} = item ;
            if(partitionSchema){
              item['schemaName'] = partitionSchema['schemaName']
              item['partitionSchemaId'] = partitionSchema['id']
            }
            return item
          })
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
   width calc(100vw - 295px)
   padding 1px
   position relative
 .tableHeader 
   height 38px 
   width calc(100vw - 297px)
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
   width calc(100vw - 25px)
  .tableHeader 
   width calc(100vw - 27px)
</style>