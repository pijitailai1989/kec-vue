<template>
  <kec-scroll :numbers="179">
    <div class="flexs j-between">
       <div class="flexs a-center" style="padding:0 5px">
                <el-input v-model="code" placeholder="编号" size="medium"></el-input>
                <div><el-button @click.native="searchFunc(code)"  style="margin-left:30px" size="small">查询</el-button></div>
       </div>
       <div class="flexs kec-btn j-end" ref="box">
              <kec-button slot="reference" text="添加"
              @click.native="dislogFunC('add',!dialogVisible,'KecCode')"
              icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
              <kec-button-click :disabled="selectItems===null"
              slot="reference" text="修改" icon="fa-pencil"
              @click="dislogFunC('eqit',!dialogVisible,'KecCode')"
              background="#17A2B8" color="#fff"></kec-button-click>
              <kec-button-click :disabled="selectItems===null"
              slot="reference" text="分配" icon="fa-thumb-tack"
              @click="dislogFunC('allocation',!dialogVisible,'KecAllocation')"
              background="#67c23a" color="#fff"></kec-button-click>
              <el-popover
                placement="left-start"
                width="160"
                :disabled="selectItems===null"
                v-model="visible">
                <p>确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click.native="delFunc">确定</el-button>
                </div>
                <kec-button slot="reference"
                  :disabled="selectItems===null" text="删除" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
              </el-popover>
        </div>
    </div>

    <div class="kec-content">
        <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
          <div-sort class="padd" style="width:120px" @clickSort="sortFunc" :sortType="{a:'code',b:'OTHER'}">科目项编号</div-sort>
          <div class="padd" style="width:100px">标签类型</div>
          <div class="padd flx" style="min-width:80px">描述</div>
          <div class="padd" style="width:200px">编码构成</div>
          <div class="padd" style="width:100px">总数量</div>
          <div class="padd" style="width:100px">可用数量</div>
          <div class="padd" style="width:100px">预警值</div>
          <div-sort class="padd" style="width:100px" @clickSort="sortFunc" :sortType="{a:'nextCase',b:'OTHER'}">下一编号</div-sort>
          <div class="padd" style="width:100px">创建时间</div>
          <div class="padd" style="width:80px">状态</div>
          <div class="padd" style="width:100px">操作</div>
        </div>
        <kec-scroll :numbers="260">
          <el-table
              class="scrollbar"
              ref="singleTable"

              :data="codeList"
              :header-cell-style="{
                fontWeight:'bold',
                height:'38px',
                color:'#fff',
                padding:'0'
              }"
              :cell-style="{
                borderRight:'1px solid #EBEEF5',
                padding:'6px 0'
              }"
              highlight-current-row
              @current-change="activeItem"
              style="width:100%">
              <el-table-column
              prop="code"
              width="120"
              label="科目项编号">
              </el-table-column>
              <el-table-column
              prop="typeName"
              width="100"
              label="标签类型">
              </el-table-column>
              <el-table-column
              prop="remark"
              label="描述">
              </el-table-column>
              <el-table-column
              prop="codeStructure"
              width="200"
              label="编码构成">
              </el-table-column>
              <el-table-column
              prop="maxCopy"
              width="100"
              label="总数量">
              </el-table-column>
              <el-table-column
              prop="usableCopy"
              width="100"
              label="可用数量">
              </el-table-column>
              <el-table-column
              prop="warningLine"
              width="100"
              label="预警值">
              </el-table-column>
              <el-table-column
              prop="nextCase"
              width="100"
              label="下一编号">
              </el-table-column>
              <el-table-column
              prop="createTime"
              width="100"
              label="创建时间">
              </el-table-column>
              <el-table-column
              prop="status"
              width="80"
              label="状态">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.statu" @change="changeStatusFunc(scope.row.statu,scope.row.id)">启用</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
              prop=""
              width="100"
              label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click.native="listFunc(scope.row.id)" plain size="small">分配情况</el-button>
                </template>
              </el-table-column>
          </el-table>
        </kec-scroll>
    </div>
    <div class="flexs j-end">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="PageNum"
        :page-size="PageSize"
        :total="total">
      </el-pagination>
    </div>
    <component :is="componentName" :item="selectItem" :dialogVisible="dialogVisible" @closeFunc="cancelFunc" :text="textItem"></component>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {sortCompare } from '@/utils/fun'
import {KecButton , KecTable ,KecScroll,KecButtonClick,KecSort }  from '@/common/components'
import KecCode from './addCode'
import KecAllocation from './allocation'
import KecAllocationList from './allocationList'
  export default {
    name:'codeRule',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           letWidth:{
             0:'100px'
           },
           lastWidth:'',
           tableHeader:{
             code:{"title":'科目项编号','slot':false},
             remark:{"title":'描述','slot':false},
             codeStructure:{"title":'编码构成','slot':false},
             maxCopy:{"title":'总数量','slot':false},
             usableCopy:{"title":'可用数量','slot':false},
             warningLine:{"title":'预警值','slot':false},
             nextCase:{"title":'下一编号','slot':false},
             createTime:{"title":'创建时间','slot':false},
             status:{"title":'状态','slot':true}

           },
           selectIndex:null,
           selectItems:null,
           selectItem:null,
           dialogVisible:false,
           componentName:'KecCode',
           textItem:'',
           PageSize:15,
           PageNum:1,
           code:'',
           total:null,
           codeList:[],
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecCode,
        KecScroll,
        KecButtonClick,
        KecAllocation,
        KecAllocationList,
        DivSort:KecSort
    },

    computed: {
      ...mapState('basic',['codeRuleData']),
      ...mapState('home',['themeColor']),
    },

    beforeMount() {},

    mounted() {
      let goUrl = JSON.parse( localStorage.getItem('goUrl') );
      goUrl && localStorage.removeItem("goUrl");
      this.mountFunc(this.PageSize,this.PageNum)
      this.loadProducts()
      this.loadCustomerQueryAll({status:'ENABLED'})
      this.loadGetTags()
    },

    methods: {
        ...mapActions('customer',['loadGetQueryRelation']),
        ...mapActions('basic',['loadGetTags','loadCodeQueryPage','loadCodeDelete','loadCodeStatus','loadProducts','loadCustomerQueryAll']),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItems = item ;
        },
        sortFunc(type){
             let {a,b} = type ;
             const _this = this ;
              _this.codeList = sortCompare(_this.codeList,a,b)
        },
        searchFunc(code){
          this.mountFunc(this.PageSize,1,code)
        },
        handleCurrentChange(page){
          this.PageNum = page ;
          this.mountFunc(this.PageSize,page)
        },
        listFunc(codeRuleId){

           this.loadGetQueryRelation({codeRuleId}).then(success=> {
                   this.dislogFunC('号段池',true,'KecAllocationList')
                }).catch(error=> {
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
        },
        changeStatusFunc(statu,id){
          let flag = statu ? 1 : 2 ;
          this.loadCodeStatus([id,flag]).then(success=> {

                   this.mountFunc(this.PageSize,this.PageNum)
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
        mountFunc(size,num,code){
          const _ = this ;
          let data = {
            pageSize:size,
            pageNumber:num
          }
          code && ( data['code'] = code )
          _.loadCodeQueryPage(data).then(success => {
            let {content,totalElements} = _.codeRuleData;
            _.codeList = content ;
            _.total = totalElements ;
          })
        },
        dislogFunC(text,bool,component) {
          this.textItem = text ;
          this.dialogVisible = bool ;
          this.componentName = component ;

          if(text!=='add' || text!=='KecAllocationList'){

            this.$nextTick(() => {
              this.selectItem = this.selectItems ;
            })

          }

        },
        delFunc(){
          let {length} = this.codeList ;
          if(this.selectItems!==null) {
            this.loadCodeDelete([this.selectItems.id]).then(success=> {
                   this.cancelFunc()
                   this.selectIndex = null ;
                   if(length == 1){
                     this.PageNum >=2 && this.PageNum -- ;
                   }
                   this.mountFunc(this.PageSize,this.PageNum)
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
        cancelFunc(propsBool) {
         this.$refs.singleTable.setCurrentRow();
         this.componentName = 'KecCode' ;
         this.dialogVisible = false ;
         this.visible = false ;
         this.selectIndex = null ;
         this.selectItems = null ;
         this.selectItem = null ;
         this.textItem = '' ;
         propsBool && this.mountFunc(this.PageSize,this.PageNum)
       },
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
