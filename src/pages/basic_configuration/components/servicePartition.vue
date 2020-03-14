<template>
  <kec-scroll :numbers="179" class="">
    <div class="flexs kec-btn j-end a-center" style="width:100%"> 
      
      <div class="flexs a-center j-end">
          <kec-button text="新建服务分区" 
          @click.native="dislogFunC('新建服务分区',!dialogVisible,'addPartition','add')" 
          icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
          <kec-button-click :disabled="itemObj?false:true" 
          @click="dislogFunC('编辑服务分区',!dialogVisible,'addPartition','eqit')" text="编辑服务分区" 
          icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button-click>
          <el-popover
                placement="left-start"
                width="160"
                :disabled="itemObj?false:true"
                v-model="visible">
                <p>确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click.native="delFunc">确定</el-button>
                </div>
                <kec-button slot="reference"
                  :disabled="itemObj?false:true" text="删除服务分区" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
              </el-popover>
      </div>
        
    </div>
    <div class="kec-content">
        <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
          <div-sort class="padd" style="width:120px" @clickSort="sortFunc" :sortType="{a:'countryName',b:'ZH'}">国家编码</div-sort>
          <div-sort class="padd" style="width:120px" @clickSort="sortFunc" :sortType="{a:'schemaName',b:'ZH'}">方案名称</div-sort>
          <div class="padd flx">分区名</div>

        </div>
        <kec-scroll :numbers="260" style="border-bottom:1px solid #EBEEF5">
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
              prop="countryCode"
              width="120"
              label=""
              >
              </el-table-column>
              <el-table-column
              prop="partitionSchemaName"
              width="120"
              label=""
              >
              </el-table-column>
              <el-table-column
              label=""
              >
              <template slot-scope="scope">
                  <div class="flexs">
                    <el-tag class="pr" type="info" size="small" 
                    v-for="(name,i) of scope.row.partitionList" 
                    :key="i">{{name.partitionName}}</el-tag>
                  </div>
                </template>
              </el-table-column>
          </el-table>
        </kec-scroll>
    </div>
    <component :is="componentName" :dialogVisible="dialogVisible" @closeFunc="cancelFunc" 
    :text="textItem" :types="textType" :item="itemObj"></component>
    <div class="flexs j-end">
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
import {sortCompare } from '@/utils/fun'
import {KecButton , KecTable ,KecScroll ,KecButtonClick,KecForm,KecSort}  from '@/common/components'
import addPartition from './addPartition' 
  export default {
    name:'servicePartition',
    props:[''],
    data () {
      return {
           visible:false,
           numbers:0,
           table:[],
           diyModuleName:'',
           dialogVisible:false,
           componentName:'addPartition',
           textItem:'',
           textType:'',
           tableRole:[],
           roleId:null,
           idsList:[],
           routerPath:'',
           itemObj:null,
           PageSize:10,
           PageNum:1,
           total:null
      };
    },

    components: {
        KecButtonClick ,
        KecButton,
        KecTable,
        KecScroll,
        addPartition,
        KecForm,
        DivSort:KecSort
    },

    computed: {
      ...mapState('vendor',['schemasList']),
      ...mapState('home',['themeColor']),
      filteredTableData: function(){
        return this.table
      }
      
    },

    beforeMount() {},

    mounted() {
      this.mountFunc(this.PageSize,this.PageNum)
      this.loadCountryQueryAll()
    },

    methods: {
        ...mapActions('vendor',['loadGetPartitionSchemas','loadDeletePartitionSchemas']),
        ...mapActions('basic',['loadCountryQueryAll']),
        handleCurrentChange(page){
          this.PageNum = page ;
          this.mountFunc(this.PageSize,page)
        },
        mountFunc(size,num){
          const _ = this ;
          let data = {
            pageSize:size,
            pageNumber:num
          }
          _.loadGetPartitionSchemas(data).then(success => {
            let {content,totalElements} = _.schemasList;
            if(content && content.length){
              _.tableRole = content.map(item=>{
                  // item['countryName'] = item['country']['name']
                  return item
              })
              
            }else{
              _.tableRole = []
            }
            
            _.total = totalElements ;
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
        delFunc(){
          let {length} = this.tableRole ;
          if(this.itemObj!==null) {
            this.loadDeletePartitionSchemas({data:{id:this.itemObj.id}}).then(success=> {
                   this.itemObj = null ;
                   if(length == 1){
                     this.PageNum >=2 && this.PageNum -- ;
                   }
                   this.mountFunc(this.PageSize,this.PageNum)
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                  this.itemObj = null ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
          } 
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
          bool && this.mountFunc(this.PageSize,this.PageNum)

        }
        
    },

    watch: {
     
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
 .pr+.pr  
     margin-left 2px
</style>