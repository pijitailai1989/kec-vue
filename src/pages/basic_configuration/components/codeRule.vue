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
          <div class="padd" style="width:100px">科目项编号</div>
          <div class="padd flx" style="min-width:80px">描述</div>
          <div class="padd" style="width:200px">编码构成</div>
          <div class="padd" style="width:100px">总份数</div>
          <div class="padd" style="width:100px">可用分数</div>
          <div class="padd" style="width:100px">预警值</div>
          <div class="padd" style="width:100px">下份编号</div>
          <div class="padd" style="width:100px">创建时间</div>
          <div class="padd" style="width:100px">状态</div>
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
                padding:'0',
                background:themeColor.content_border_color
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
              width="100"
              label="科目项编号">
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
              label="总份数">
              </el-table-column>
              <el-table-column
              prop="usableCopy"
              width="100"
              label="可用分数">
              </el-table-column>
              <el-table-column
              prop="warningLine"
              width="100"
              label="预警值">
              </el-table-column>
              <el-table-column
              prop="nextCase"
              width="100"
              label="下份编号">
              </el-table-column>
              <el-table-column
              prop="createTime"
              width="100"
              label="创建时间">
              </el-table-column>
              <el-table-column
              prop="status"
              width="100"
              label="状态">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.statu" @change="changeStatusFunc(scope.row.statu,scope.row.id)">启用</el-checkbox>
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
import {KecButton , KecTable ,KecScroll,KecButtonClick }  from '@/common/components'
import KecCode from './addCode'
  export default {
    name:'codeRule',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           letWidth:{
             
           },
           lastWidth:'',
           tableHeader:{
             code:{"title":'科目项编号','slot':false},
             remark:{"title":'描述','slot':false},
             codeStructure:{"title":'编码构成','slot':false},
             maxCopy:{"title":'总份数','slot':false},
             usableCopy:{"title":'可用分数','slot':false},
             warningLine:{"title":'预警值','slot':false},
             nextCase:{"title":'下份编号','slot':false},
             createTime:{"title":'创建时间','slot':false},
             status:{"title":'状态','slot':true}
             
           },
           selectIndex:null,
           selectItems:null,
           selectItem:null,
           dialogVisible:false,
           componentName:'KecCode',
           textItem:'',
           PageSize:10,
           PageNum:1,
           code:'',
           total:null,
           codeList:[]
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecCode,
        KecScroll,
        KecButtonClick
    },

    computed: {
      ...mapState('basic',['codeRuleData']),
      ...mapState('home',['themeColor']),
    },

    beforeMount() {},

    mounted() {
      this.mountFunc(this.PageSize,this.PageNum)
    },

    methods: {
        ...mapActions('basic',['loadCodeQueryPage','loadCodeDelete','loadCodeStatus']),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItems = item ;
        },
        searchFunc(code){
          this.mountFunc(this.PageSize,1,code)
        },
        handleCurrentChange(page){
          this.PageNum = page ;
          this.mountFunc(this.PageSize,page)
        },
        changeStatusFunc(statu,id){
          console.log(statu,id,'statu,id')
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
          if(text==='eqit'){
            this.selectItem = this.selectItems ;
          }
          this.textItem = text ;
          this.dialogVisible = bool ;
          this.componentName = component ;
        },
        delFunc(){
          if(this.selectItems!==null) {
            this.loadCodeDelete([this.selectItems.id]).then(success=> {
                   this.cancelFunc()
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
         this.dialogVisible = false ;
         this.visible = false ;
         this.selectIndex = null ;
         this.selectItems = null ;
         this.selectItem = null ;
         this.textItem = '' ;
         propsBool && this.mountFunc(this.PageSize,1)
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