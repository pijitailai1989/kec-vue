<template>
    <kec-dialog 
      boxWidth="800px"
      boxTop="12vh"
      v-if="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button-click 
           :loading="loading" 
           @click="clickConfirm(types)" 
           :text="types==='add'?'添加':'修改'" 
           icon="fa-floppy-o" 
           background="#28A745" 
           color="#fff">
           </kec-button-click>
           <kec-button 
           @click.native="cancel" 
           text="取消" icon="fa-undo" 
           background="#6C757D" 
           color="#fff"></kec-button>
        </div>
      </template>
      <template>
         <kec-scroll class="flexs columns a-center">
            <div class="flexs kec-btn j-between a-center" style="width:100%" v-show="types=='add'"> 
                 <kec-form text="资源路径" crosswise width="70px">
                    <template #input>
                      <div class="flexs a-center">
                          <el-select v-model="routerPath" @change="changeRouterPath" placeholder="" size="medium">
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
            </div>
            <div class="kec-content">
                <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
                  <div class="padd" style="width:200px">模块</div>
                  <div class="padd" style="width:200px">权限名称</div>
                  <div class="padd flx">路径</div>
                  <div class="padd" style="width:49px">增</div>
                  <div class="padd" style="width:50px">查</div>
                  <div class="padd" style="width:50px">改</div>
                  <div class="padd" style="width:50px">删</div>
                </div>
                <kec-scroll :numbers="600">
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
                      prop="moduleName"
                      label="模块"
                      width="200">
                      </el-table-column>
                      <el-table-column
                      prop="diyModuleName"
                      label="权限名称"
                      width="200">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.diyModuleName" placeholder="" size="small"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                      prop="routerPathString"
                      label="路径">
                      </el-table-column>
                      <el-table-column
                      prop="create"
                      label="增"
                      width="50">
                        <template slot-scope="scope">
                          <el-checkbox v-model="scope.row.create"></el-checkbox>
                        </template>
                      </el-table-column>
                      <el-table-column
                      prop="read"
                      label="查"
                      width="50"
                      >
                        <template slot-scope="scope">
                          <el-checkbox v-model="scope.row.read"></el-checkbox>
                        </template>
                      </el-table-column>
                      <el-table-column
                      prop="update"
                      label="改"
                      width="50">
                        <template slot-scope="scope">
                          <el-checkbox v-model="scope.row.update"></el-checkbox>
                        </template>
                      </el-table-column>
                      
                      <el-table-column
                      prop="delete"
                      label="删"
                      width="49">
                        <template slot-scope="scope">
                          <el-checkbox v-model="scope.row.delete"></el-checkbox>
                        </template>
                      </el-table-column>
                  </el-table>
                </kec-scroll>
            </div>
          </kec-scroll>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {KecButton , KecForm ,KecDialog ,KecTabs,KecButtonClick,KecScroll}  from '@/common/components'

  export default {
    name:'addResources',
    props:{
      dialogVisible:Boolean,
      text:String,
      item:Object,
      types:String
    },
    data () {
      return {
         table:[],
         loading:false,
         routerPath:''
      };
    },

    components: {
        KecButton,
        KecButtonClick,
        KecForm,
        KecDialog,
        KecTabs,
        KecScroll
    },

    computed: {
      ...mapState('home',['themeColor']),
      ...mapState('basic',['routerPathList','permissionList'])
    },

    beforeMount() {},

    mounted() {
      
           
    },

    methods: {
        ...mapActions('basic',['loadPostPermission','loadPutPermission']),
        cancel() {
            this.$emit('closeFunc',false)
            this.table = []
            this.routerPath =''
        },
        changeRouterPath(path){
          if(path){
           let {diyModuleName,moduleName,routerPathString} = this.permissionList.find(item => {
              return path === item.routerPathString
            })
           let data = {diyModuleName,moduleName,routerPathString,create:false,delete:false,read:false,update:false}
           this.table = [data]
          //  this.table.push(data)

          }
        },
        clickConfirm(type){

           const _this = this ;
           _this.routerPath = '' ;
           _this.loading = true ;
           if(type==='add'){
             if(_this.table.length){
                let data = _this.table[0] ;
                _this.loadPostPermission(data).then(success=>{
                      _this.$emit('closeFunc',true)
                      this.table = []
                      _this.loading = false ;
                      _this.$message( {
                        message: success,
                        type: 'success'
                      });
                    }).catch(error=> {
                      _this.loading = false ;
                      _this.$message( {
                        message: error,
                        type: 'error'
                      });
                    })
              }
           }else{
             _this.loadPutPermission({updateList:_this.table}).then(success=>{
                  _this.$emit('closeFunc',false)
                  this.table = []
                  _this.loading = false ;
                  _this.$message( {
                  message: success,
                  type: 'success'
                  });
              }).catch(error=> {
                  _this.$message( {
                  message: error,
                  type: 'error'
                  });
                  _this.loading = false ;
              })
           }
           
        }
    },

    watch: {
      types:{
        deep:true,
        handler:function(val){
          const _ = this ;
           if( val === 'eqit'){
             _.table = [ _.item ]
           }
        }
      }
    },
    destroyed() {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .row >>> .is-cursor
   .el-input__inner
      cursor pointer !important
 .kec-content  
   width 780px
   padding 1px
   position relative
 .tableHeader 
   height 38px 
   width 778px
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
</style>