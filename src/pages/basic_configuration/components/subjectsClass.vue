<template>
  <div class="row ventorsInfo">
    
    <div class="col-sm-6">
      
        <kec-form text="收益成本分类账科目" bold="bold">
          <template #input>
            <kec-scroll :numbers="257" class="borders col-sm-12">
              <div class="col-sm-10 col-sm-offset-1">
                 <el-tree accordion 
                    :data="subjectList" 
                    :props="defaultProps" 
                     node-key="id" 
                    @node-click="handleNodeClick">
                    <span class="custom-tree-node flexs a-center" style="width:100%;" slot-scope="{ node , data }">
                       <span class="flexs a-center j-center guding">
                           <i v-if="data.type ==='CATALOG'" class="fa fa-folder-open" aria-hidden="true"></i>
                           <i v-else class="fa fa-file-text" aria-hidden="true"></i>
                       </span>     
                       <span aria-hidden="true">{{node.label}}( {{data.number}} )</span>      
                    </span>
                 </el-tree>
              </div>
              
            </kec-scroll>
          </template>
        </kec-form>
        
    </div>
    <div class="col-sm-6" v-show="booleanShow">
        <kec-form :text="textStr+'基本属性'" bold="bold">
         <template #input>
           <div class="borders col-sm-12">
                <div class="col-sm-10 col-sm-offset-1" v-show="subjectPath">
                  <kec-form text="科目编号路径">
                      <template #input>
                        <el-input v-model="subjectPath" disabled placeholder="" size="small"></el-input>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1">
                    <kec-form text="属性">
                      <template #input>
                        <template>
                          <el-radio :disabled="attrType==='eqit'" v-model="payload.type" label="CATALOG">分级</el-radio>
                          <el-radio v-show="attrType!='parent'" :disabled="attrType==='eqit'" v-model="payload.type" label="ITEM">科目项</el-radio>
                        </template>
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
                    <kec-form text="名称">
                      <template #input>
                        <el-input v-model="payload.name" placeholder="" size="small"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-10 col-sm-offset-1">
                    <kec-form text="方向">
                    <template #input>
                      <el-select v-model="payload.orientation" :disabled="attrType!=='parent'"  size="small" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
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
                 <kec-button @click.native="clickConfirm()" text="保存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
                </div>
           </div>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <div class="flexs col-sm-8 col-sm-offset-1 mar">
             <kec-button-click
             @click="newNode('parent')"
             text="新建根分级" icon="fa-eraser" background="#6C757D" color="#fff"></kec-button-click>
             <kec-button-click
             @click="newNode('children')"
             text="新建结点属性" icon="fa-plus-square-o" :disabled="subjectType !=='CATALOG'" background="#ED6D01" color="#fff"></kec-button-click>
        </div>
    </div>
    
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton ,KecScroll,KecButtonClick }  from '@/common/components'
  export default {
    name:'subjectsClass',
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
        options: [{
          value: 'AR',
          label: '应收'
        }, {
          value: 'AP',
          label: '应付'
        }],
        payload:{
           "name":null, 
           "parentId":null ,
           "number":null, 
           "description":null,
           "orientation":'AR',
           "type":'CATALOG',
           "id":null,
        },
        subjectType:null,
        subjectPath:null,
        booleanShow:false,
        textStr :'',
        attrType :''

      }
    },

    components: {
        KecForm ,
        KecButton,
        KecScroll,
        KecButtonClick
    },

    computed: {
      ...mapState('basic',['subjectList']),
    },

    beforeMount() {},

    mounted() {
       this.loadSubjectQueryParent()
    },

    methods: {
      ...mapMutations('home',['pushBreadcrumbArr']),
      ...mapActions('basic',[
      'loadSubjectQueryParent',
      'loadSubjectCreate',
      'loadSubjectUpdate'
      ]),
      handleNodeClick(data){
        this.subjectType = data.type ;
        this.subjectPath = data.path ;
        this.booleanShow = true ;
        this.payload.name = data.name ;
        this.payload.number = data.number ;
        this.payload.parentId = data.id ;
        this.payload.id = data.id ;
        this.payload.description = data.description ;
        this.payload.orientation = data.orientation ;
        this.payload.type = data.type ;
        this.textStr = '修改' ;
        this.attrType = 'eqit'
        
      },
      closeData(){
        this.payload = {
           "name":null, 
           "parentId":null ,
           "number":null, 
           "description":null,
           "orientation":'AR',
           "type":'CATALOG',
           "id":null
        },
        this.subjectType = null
        this.subjectPath = null
        this.booleanShow = false
        this.attrType = ''
        this.textStr = '' ;
      },
      newNode(type){
        this.booleanShow = true ;
        this.attrType = type ;

        if(type === 'parent'){
           this.subjectPath = null ;
           this.subjectType = null ;
           this.payload.parentId = null ;
           this.payload.orientation = 'AR' ;
           this.payload.type = 'CATALOG' ;
        }
        this.payload.name = null ;
        this.payload.number = null ;
        this.payload.description = null ;
        
        this.payload.id = null ;
        this.textStr = '新建' ;

      },
      clickConfirm(){
        let {name,number,parentId,id,description,orientation,type} = this.payload ;
        
        let data ={}
        if(!id){
           data = {name,number,parentId,description,orientation,type}
           this.loadSubjectCreate(data).then(success=>{
                   this.loadSubjectQueryParent()
                   this.closeData()
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
        }else{
          data = {name,number,id,description}
           this.loadSubjectUpdate(data).then(success=>{
                   this.loadSubjectQueryParent()
                   this.closeData()
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
   margin-left 20px
 .mar  
   margin-top 10px
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