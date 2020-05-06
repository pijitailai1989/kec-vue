<template>
    <kec-dialog 
      boxWidth="500px"
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
           :text="types==='add'?'新建':'修改'" 
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
         <kec-scroll class="flexs columns a-center row">
            <div class="flexs kec-btn j-between a-center col-sm-12" style="width:100%"> 
                 
                      <div class="row">
                          <div class="col-sm-12">
                              <kec-form crosswise text="供应商产品名称" width="120px">
                                <template #input>
                                  <el-input v-model="payload.name" placeholder=""></el-input>
                                </template>
                              </kec-form>
                          </div>
                          <div class="col-sm-12">
                              <kec-form crosswise text="供应商产品编码" width="120px">
                                <template #input>
                                  <el-input v-model="payload.vendorProductCode" placeholder=""></el-input>
                                </template>
                              </kec-form>
                          </div>
                          <div class="col-sm-12" v-show="types==='add'">
                              <kec-form text="服务类型" width="120px" crosswise>
                                <template #input>
                                  <el-select filterable v-model="payload.serviceTypeId" placeholder="" style="width:100%">
                                    <el-option
                                      v-for="item in serverList"
                                      :key="item.code"
                                      :label="item.text"
                                      :value="item.code">
                                    </el-option>
                                  </el-select>
                                </template>
                              </kec-form>
                          </div>
                          <div class="col-sm-12" v-show="types==='eqit'">
                              <kec-form text="服务类型" width="120px" crosswise>
                                <template #input>
                                  <el-input disabled v-model="payload.serviceTypeText" ></el-input>
                                </template>
                              </kec-form>
                          </div>
                          <div class="col-sm-12" v-show="types==='add'">
                              <kec-form text="分区方案" width="120px" crosswise>
                                <template #input>
                                  <el-select filterable v-model="payload.schemaName" @change="schemaNameSelect" placeholder="" style="width:100%">
                                    <el-option
                                      v-for="(item,index) in schemasList"
                                      :key="item.schemaName"
                                      :label="item.schemaName"
                                      :value="index">
                                    </el-option>
                                  </el-select>
                                </template>
                              </kec-form>
                          </div>
                          <div class="col-sm-12" v-show="types==='eqit'">
                              <kec-form text="分区方案" width="120px" crosswise>
                                <template #input>
                                  <el-input disabled v-model="payload.schemaName"></el-input>
                                </template>
                              </kec-form>
                          </div>
                          <div class="col-sm-12" v-show="types==='add'">
                              <kec-form text="服务分区" width="120px" crosswise>
                                <template #input>
                                  <el-select filterable 
                                  :disabled="tableRole.length==0"
                                  v-model="payload.servicePartitionId" placeholder="" style="width:100%">
                                    <el-option
                                      v-for="item in tableRole"
                                      :key="item.id"
                                      :label="item.partitionName"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                                </template>
                              </kec-form>
                          </div>
                          <div class="col-sm-12" v-show="types==='eqit'">
                              <kec-form text="服务分区" width="120px" crosswise>
                                <template #input>
                                  <el-input disabled v-model="payload.partitionName"></el-input>
                                </template>
                              </kec-form>
                          </div>
                          <div class="col-sm-12" v-show="types==='eqit'">
                              <kec-form text="状态" width="120px" crosswise>
                                <template #input>
                                  <el-checkbox 
                                  v-model="payload.enabled" 
                                  >启用</el-checkbox>
                                </template>
                              </kec-form>
                          </div>
                          <div class="col-sm-12">
                              <kec-form crosswise text="描述" width="120px">
                              <template #input>
                                <el-input
                                  type="textarea"
                                  placeholder="请输入内容"
                                  v-model="payload.description"
                                  show-word-limit
                                >
                                </el-input>
                              </template>
                              </kec-form>
                          </div>
                          
                      </div>
            </div>
          </kec-scroll>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {KecButton , KecForm ,KecDialog ,KecTabs,KecButtonClick,KecScroll}  from '@/common/components'

  export default {
    name:'addProduct',
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
         routerPath:'',
         payload:{
            id:null,
            name:"",
            description:"",
            enabled:false,
            serviceTypeId:null,
            vendorProductCode:null,
            servicePartitionId:null,
            partitionName:'',
            schemaName:'',
            serviceTypeText:'',
         },
         tableRole:[]
         
         

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
      ...mapState('basic',['serverList','ventorsId']),
      ...mapState('vendor',['schemasList'])
    },

    beforeMount() {},

    mounted() {
      
           
    },

    methods: {
        ...mapActions('vendor',['loadPostVendorProducts','loadPutVendorProducts']),
        cancel() {
            this.$emit('closeFunc',false)
            this.payload = {
                id:null,
                name:"",
                description:"",
                enabled:false,
                serviceTypeId:null,
                vendorProductCode:null,
                servicePartitionId:null,
                partitionName:'',
                schemaName:'',
                serviceTypeText:'',
            }
        },
        schemaNameSelect(val){
             this.payload.servicePartitionId = null ;
             this.tableRole = this.schemasList[val]['partitionList']
        },
        clickConfirm(type){
           const _this = this ;
           _this.loading = true ;
           let {name,description,serviceTypeId,id,enabled,vendorProductCode,servicePartitionId} = this.payload ;
           let data = {}
           if(type==='add'){
                data = {name,description,serviceTypeId,vendorId:_this.ventorsId,vendorProductCode,servicePartitionId} ;
                _this.loadPostVendorProducts(data).then(success=>{
                      _this.$emit('closeFunc',true)
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
              
           }else{
             data = {name,description,id,enabled,vendorProductCode} ;
             
             _this.loadPutVendorProducts(data).then(success=>{
                  _this.$emit('closeFunc',true)
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
          _.payload = {
                id:null,
                name:"",
                description:"",
                enabled:false,
                serviceTypeId:null,
                vendorProductCode:null,
                servicePartitionId:null,
                partitionName:'',
                schemaName:'',
                serviceTypeText:'',
            }
           if( val === 'eqit'){
             let {id,name,description,enabled,serviceTypeCode,vendorProductCode,servicePartitionId,
             partitionName,schemaName,serviceTypeText} = _.item ;
             _.payload = {id,name,description,enabled,serviceTypeId:serviceTypeCode,vendorProductCode,
             servicePartitionId,partitionName,schemaName,serviceTypeText}
           }
          //  let {content,totalElements} = _.schemasList;
          //     if(content && content.length){
          //       _.tableRole = content.map(item=>{
          //           return item
          //       })
                
          //     }else{
          //       _.tableRole = []
          //     }
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
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding-top 4px
   &.pro  
     height 99px  
     margin-bottom 4px
   &.err  
     min-height 40px
</style>