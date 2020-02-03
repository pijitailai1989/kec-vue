<template>
  <kec-scroll :numbers="179" class="flexs columns a-center">
    <div class="flexs kec-btn j-end" ref="box" style="width:100%">
      <el-popover
        placement="left-start"
        width="360"
        v-model="addVisible"
        :disabled="newShow"
        trigger="click">
        <kec-status @close="closeFunc" type="addVisible" :serviceId="selectItem?selectItem.serviceId:null"></kec-status>
        <kec-button :disabled="newShow" slot="reference" text="添加二级货态" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="420"
        v-model="changeVisible"
        :disabled="selectItem===null"
        trigger="click">
        <kec-status @close="closeFunc" type="changeVisible" :item="selectItem"></kec-status>
        <kec-button :disabled="selectItem===null" slot="reference" text="货态设置" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="160"
        :disabled="delShow"
        v-model="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click.native="delFunc(selectItem.id)">确定</el-button>
        </div>
        <kec-button slot="reference"
          :disabled="delShow" text="删除货态" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </el-popover>
    </div>
    <div class="kec-content">
        <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
          <div class="padd" style="min-width:149px">编码</div>
          <div class="padd" style="min-width:60px">排序</div>
          <div class="padd" style="min-width:150px">中文名称</div>
          <div class="padd" style="min-width:160px">英文名称</div>
          <div class="padd" style="min-width:120px">服务类型</div>
          <div class="padd flx" style="min-width:81px">描述</div>
          <div class="padd" style="min-width:100px">状态</div>
        </div>
        <kec-scroll :numbers="219">
          <el-table
              class="scrollbar"
              ref="singleTable"
              :data="standardStateList"
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
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width:100%"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column
              prop="code"
              label="编码"
              width="150">
              </el-table-column>
              <el-table-column
              prop="seq"
              label="排序"
              width="60">
              </el-table-column>
              <el-table-column
              prop="name"
              label="中文名称"
              width="150">
              </el-table-column>
              <el-table-column
              prop="nameEn"
              label="英文名称"
              width="160">
              </el-table-column>
              <el-table-column
              prop="serviceName"
              label="服务类型"
              width="120">
              </el-table-column>
              <el-table-column
              prop="description"
              label="描述">
              </el-table-column>
              
              <el-table-column
              prop="status"
              label="状态"
              width="100">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.status" @change="changeStatusFunc(scope.row.status,scope.row.id)">启用</el-checkbox>
                </template>
              </el-table-column>
          </el-table>
        </kec-scroll>
    </div>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll }  from '@/common/components'
import KecStatus from './addStatus' 
  export default {
    name:'cargoStatus',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           selectIndex:null,
           selectItem:null,
           tableData: [{
            id: 1,
            date: '100',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            id: 2,
            date: '200',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
            }, {
            id: 3,
            date: '300',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
                id: 31,
                date: '301',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                id: 32,
                date: '302',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }]
            }, {
            id: 4,
            date: '400',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            }],
            currentRow: null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecStatus,
        KecScroll
    },

    computed: {
      ...mapState('basic',['standardStateList']),
      ...mapState('home',['themeColor']),
      newShow(){
        const _ = this ;
        let bool = true ;
         if(_.selectItem){
           _.selectItem.level === 'ONE' && (bool = false)
         }
         return bool
      },
      delShow(){
        const _ = this ;
        let bool = true ;
         if(_.selectItem){
           _.selectItem.level === 'TWO' && (bool = false)
         }
         return bool
      }
    },

    beforeMount() {},

    mounted() {
      this.loadGetStandardState()
    },

    methods: {
        ...mapActions('basic',['loadGetStandardState','loadDeleteStandardState','loadPutUpdateStatus']),
        handleCurrentChange(val){
          this.selectItem = val ;
        },
        closeFunc(data){
          this.$refs.singleTable.setCurrentRow();
          this.selectIndex = null ;
          this.selectItem = null ;
          if(data.bool) {
            this.loadGetStandardState()
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        changeStatusFunc(status,id){
          this.loadPutUpdateStatus([id,status]).then(success=> {
                   this.loadGetStandardState()

                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                   this.loadGetStandardState()
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
        },
        delFunc(id){
          
            this.loadDeleteStandardState([id]).then(success=> {
                   this.loadGetStandardState()

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
   width calc(100vw - 290px)
   padding 0 1px
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
 @media screen and ( max-width: 1024px ) 
  .kec-content  
   width calc(100vw - 20px)
  .tableHeader 
   width calc(100vw - 22px)
</style>