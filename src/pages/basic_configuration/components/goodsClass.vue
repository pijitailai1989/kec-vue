<template>
  <div class="row ventorsInfo">
    
    <div class="col-sm-6">
      <div class="col-sm-12">
        <kec-form text="货物品类结构" bold="bold">
          <template #input>
            <kec-scroll :numbers="257" class="borders col-sm-12">
              <div class="col-sm-10 col-sm-offset-1">
                 <el-tree accordion 
                    :data="categoryList" 
                    :props="defaultProps" 
                     node-key="id" 
                    @node-click="handleNodeClick">
                    <span class="custom-tree-node flexs a-center" style="width:100%;" slot-scope="{ node , data }">
                       <span class="flexs a-center j-center guding">
                           <i v-if="data.type ==='CATALOG'" class="fa fa-folder-open" aria-hidden="true"></i>
                           <i v-else class="fa fa-cube" aria-hidden="true"></i>
                       </span>     
                       <span aria-hidden="true">{{node.label}}( {{data.number}} )</span>      
                    </span>
                 </el-tree>
              </div>
              
            </kec-scroll>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-12">
        <div class="flexs col-sm-12 mar">
             <kec-button-click
             @click="newNode('parent')"
             text="新建根分级" icon="fa-eraser" background="#6C757D" color="#fff"></kec-button-click>
             <kec-button-click
             :disabled="payload.type!=='CATALOG'"
             @click="newNode('children')"
             text="新建分级结点" icon="fa-plus-square-o" background="#ED6D01" color="#fff">
             </kec-button-click>
             <kec-button-click
             :disabled="payload.type!=='CATALOG'"
             @click="newNode('newGoods')"
             text="新建货品" icon="fa-plus-square-o" background="#ED6D01" color="#fff">
             </kec-button-click>
        </div>
      </div>
    </div>
    <div class="col-sm-6" v-show="booleanShow">
        <kec-form :text="goodsType==='eqit'?'编辑属性':'新建属性'" bold="bold">
         <template #input>
           <div class="borders col-sm-12">
                <div class="col-sm-10 col-sm-offset-1" v-show="goodsType!=='parent'">
                  <kec-form text="路径">
                      <template #input>
                        <el-input v-model="payload.path" disabled placeholder="" size="small"></el-input>
                      </template>
                  </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1">
                  <kec-form text="编号">
                      <template #input>
                        <el-input v-model="payload.number" placeholder="" size="small"></el-input>
                      </template>
                  </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1">
                    <kec-form 
                    :text="payload.type==='SKU' || goodsType==='newGoods'?'货品名称':'类品名称'">
                      <template #input>
                        <el-input v-model="payload.name" placeholder="" size="small"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1" v-show="payload.type==='SKU' || goodsType==='newGoods'">
                    <kec-form text="尺寸">
                      <template #input>
                        <div class="col-sm-12 flexs">
                             <div class="col-sm-4">
                                <el-input v-model="payload.length" placeholder="长" size="small"></el-input>
                             </div>
                             <div class="col-sm-4">
                                <el-input v-model="payload.width" placeholder="宽" size="small"></el-input>
                             </div>
                             <div class="col-sm-4">
                                <el-input v-model="payload.height" placeholder="高" size="small"></el-input>
                             </div>
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1 mars" v-show="payload.type==='SKU' || goodsType==='newGoods'">
                    <kec-form text="重量">
                    <template #input>
                      <div class="col-sm-12 flexs">
                      <div class="col-sm-9">
                          <el-input v-model="payload.weight" placeholder="" size="small"></el-input>
                      </div>
                      <div class="col-sm-3">
                          <el-select v-model="payload.unit" placeholder="请选择" size="small">
                            <el-option
                              v-for="item in unitsClassList[1]"
                              :key="item.id"
                              :label="item.code"
                              :value="item.code">
                            </el-option>
                          </el-select>
                      </div>
                      </div>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1 mars" v-show="payload.type==='SKU' || goodsType==='newGoods'">
                    <kec-form text="海关编码">
                      <template #input>
                        <el-input v-model="payload.hsCode" placeholder="" size="small"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1">
                    <kec-form text="描述">
                    <template #input>
                      <el-input
                        type="textarea"
                        placeholder=""
                        v-model="payload.description"
                        show-word-limit
                      >
                      </el-input>
                    </template>
                    </kec-form>
                </div>
                
                <div class="flexs col-sm-10 col-sm-offset-1 mar">
                 <kec-button-click 
                 :loading="loading"
                 @click.native="clickConfirm()" 
                 text="保存" 
                 icon="fa-floppy-o" 
                 background="#28A745" 
                 color="#fff">
                 </kec-button-click>
                </div>
           </div>
         </template>
        </kec-form>
    </div>
    
    
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton ,KecScroll,KecButtonClick }  from '@/common/components'
  export default {
    name:'goodsClass',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        payload:{
            "name":"", 
            "number":"", 
            "categoryId":null, 
            "weight":null, 
            "length":null, 
            "width":null, 
            "height":null,
            "unit":"G",
            "description":"",
            "hsCode":"",
            "parentId":null,
            "type":'',
            "path":'',
            "id":null
        },
        booleanShow:false,
        goodsType:'',
        loading:false
      }
    },

    components: {
        KecForm ,
        KecButton,
        KecScroll,
        KecButtonClick
    },

    computed: {
      ...mapState('basic',['categoryList','unitsList','unitsClassList']),
    },

    beforeMount() {},

    mounted() {
       this.loadCategoryQueryParent()
    },

    methods: {
      ...mapMutations('home',['pushBreadcrumbArr']),
      ...mapActions('basic',[
      'loadCategoryQueryParent',
      'loadCategoryCreate',
      'loadCategoryUpdate',
      'loadSkuCreate',
      'loadSkuUpdate'
      ]),
      handleNodeClick(data){
        
        this.goodsType = 'eqit' ;
        this.booleanShow = true ;
        this.payload.name = data.name ;
        this.payload.number = data.number ;
        this.payload.parentId = data.id ;
        this.payload.categoryId = data.id ;
        this.payload.description = data.description ;
        this.payload.hsCode = data.hscode ;
        this.payload.type = data.type ;
        this.payload.weight = data.weight 
        this.payload.length = data.length
        this.payload.width = data.width
        this.payload.height = data.height
        // this.payload.unit = data.unit
        this.payload.path = data.path
        this.payload.id = data.id

        
      },
      closeData(){
        this.payload = {
            "name":"", 
            "number":"", 
            "categoryId":null, 
            "weight":null, 
            "length":null, 
            "width":null, 
            "height":null,
            "unit":"G",
            "description":"",
            "hsCode":"",
            "parentId":null,
            "type":'',
            "path":'',
            "id":null
        },
        this.booleanShow = false ;
        this.goodsType = '' ;
        this.loading = false ;
      },
      newNode(type){
        if(type==='parent'){
          this.payload.parentId = null ;
          this.payload.categoryId = null ;
        }
        this.payload.name = '' ;
        this.payload.number = '' ;
        this.payload.description = '' ;
        this.payload.hsCode = '' ;
        this.payload.type = '' ;
        this.payload.weight = null ;
        this.payload.length = null ;
        this.payload.width = null ; 
        this.payload.height = null ;
        // this.payload.unit = data.unit
        this.booleanShow = true ;
        this.goodsType = type ;

      },
      clickConfirm(){
        let {name,
             number,
             parentId,
             categoryId,
             description,
             hsCode,
             weight,
             length,
             width,
             height,
             unit,
             type,
             path,
             id
             } = this.payload ;
        this.loading = true ;
        let data ={}
        if(this.goodsType ==='newGoods'){
           data = {name,number,categoryId,description,weight,length,width,height,unit,hsCode}
           this.loadSkuCreate(data).then(success=>{
                   this.loadCategoryQueryParent()
                   this.closeData()
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                  this.loading = false ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
        }else if(this.goodsType ==='eqit'){
           if(type==='SKU'){
             data = {name,number,id,description,weight,length,width,height,unit,hsCode}
             this.loadSkuUpdate(data).then(success=>{
                   this.loadCategoryQueryParent()
                   this.closeData()
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                  this.loading = false ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
           }else{
                data = {name,number,id,description}
                this.loadCategoryUpdate(data).then(success=>{
                   this.loadCategoryQueryParent()
                   this.closeData()
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                  this.loading = false ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
           }
        
           
        }else{
           data = {name,number,parentId,description}
           this.loadCategoryCreate(data).then(success=>{
                   this.loadCategoryQueryParent()
                   this.closeData()
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                  this.loading = false ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
         }
      }
    },

    watch: {
      
      
    },
    destroyed(){
    }

  }

</script>
<style lang='stylus' scoped>
 .contextmenu  
   position fixed
   display none
 .row  
   padding 10px
 .ventorsInfo 
   background #fff
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 10px
 .mar  
   margin-top 8px
 .mars  
   margin-top 3px
 .guding 
   width 15px     
   height 15px
   margin-right 10px
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding 10px
   &.pro  
     height 99px   
     margin-bottom 4px
   &.err  
     min-height 40px
</style>