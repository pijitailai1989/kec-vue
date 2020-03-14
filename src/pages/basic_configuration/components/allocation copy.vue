<template>
    <kec-dialog 
      boxWidth="700px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">分配</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <!-- <kec-button @click.native="addCodeFun(text)" text="保存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button> -->
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-sm-12">
              <kec-form crosswise text="科目项编号" width="80px">
                <template #input>
                  <el-input v-model="code" placeholder="" size="medium" disabled></el-input>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form crosswise text="编码构成" width="80px">
              <template #input>
                <el-input v-model="codeStructure" placeholder="" size="medium" disabled></el-input>
              </template>
              </kec-form>
          </div>
          
          <div class="col-sm-12">
              <kec-form text="分配目标" crosswise  width="80px">
              <template #input>
                <div class="row borders">
                  <div class="col-sm-12 flexs a-center">
                    <div class="col-sm-6 flexs a-center">
                        <el-button 
                        :disabled="!bindProduct.id"
                        @click.native="bindCodeFun('product',id,bindProduct.id,bindProduct.name)" 
                        :type="bindProduct.name?'danger':'success'" 
                        plain style="margin-right:10px" size="medium">{{bindProduct.name?'解绑':'绑定'}}</el-button>
                        <div class="flexs" v-show="!bindProduct.name">
                                <el-select v-model="bindProduct.id" placeholder="请选择" class="flx">
                                    <el-option
                                      v-for="item in productsList"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                        </div>
                        
                      </div>
                      <div class="col-sm-6 flexs">
                          <kec-form crosswise text="产品绑定 :" width="80px">
                          <template #input>
                            <span>{{bindProduct.name?bindProduct.name:'无'}}</span>
                          </template>
                          </kec-form>
                      </div>
                  </div>
                  <div class="col-sm-12 flexs a-center" style="margin-top:5px">
                      <div class="col-sm-6 flexs">
                        <el-button 
                        :disabled="!bindCustomer.id"
                        @click.native="bindCodeFun('customer',id,bindCustomer.id,bindCustomer.companyName)" 
                        :type="bindCustomer.companyName?'danger':'success'" 
                        plain style="margin-right:10px" size="medium">{{bindCustomer.companyName?'解绑':'绑定'}}</el-button>
                        <div class="flexs" v-show="!bindCustomer.companyName">
                                <el-select v-model="bindCustomer.id" placeholder="请选择" class="flx">
                                    <el-option
                                      v-for="item in customerList"
                                      :key="item.id"
                                      :label="item.companyName"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                        </div>
                        
                      </div>
                      <div class="col-sm-6 flexs a-center">
                          <kec-form crosswise text="客户绑定 :" width="80px">
                          <template #input>
                            <span>{{bindCustomer.companyName?bindCustomer.companyName:'无'}}</span>
                          </template>
                          </kec-form>
                      </div>
                  </div>
                  
                </div>
              </template>
              </kec-form>
          </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {KecButton , KecForm ,KecDialog}  from '@/common/components'
import { formatDate } from '@/utils/fun'
  export default {
    name:'allocation',
    props:{
      dialogVisible:Boolean,
      text:String,
      item:Object
    },
    data () {
      return {
         
            "id":null,
            "code":'',
            "codeStructure":'',
            "bindProduct":{
               "id":null,
               "name":''
            },
            "bindCustomer":{
              "id":null,
              "companyName":''
            }
         
          

      }
    },

    components: {
        KecButton,
        KecForm,
        KecDialog
    },

    computed: {
      ...mapState('basic',['productsList','customerList','codeRuleObJ']),
    },

    beforeMount() {},

    mounted() {
     
    },

    methods: {
        ...mapActions('basic',['loadBindRelation','loadCodeQuery','loadReleaseRelation']),
        cancel() {
            this.$emit('closeFunc',false)
            
        },
        bindCodeFun(type,id,bindId,name){
            let data = { id,type }
             if(name){
                this.loadReleaseRelation(data).then(success=>{
                   this.codeQueryFunc(this.item.id)
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
                data['relationId'] = bindId ;
                this.loadBindRelation(data).then(success=>{
                   this.codeQueryFunc(this.item.id)
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
        codeQueryFunc(id){
            this.loadCodeQuery([id]).then(success=>{
                 let {id,code,codeStructure,bindProduct,bindCustomer} = this.codeRuleObJ ;
                 this.id = id ;
                 this.code = code ;
                 this.codeStructure = codeStructure ;
                 this.bindProduct = bindProduct.id?{id:bindProduct.id,name:bindProduct.name}:{id:null,name:''} ;
                 this.bindCustomer = bindCustomer.id?{id:bindCustomer.id,companyName:bindCustomer.companyName}:{id:null,companyName:''} ;
             })
        }
    },

    watch: {
      item:{
        deep:true,
        handler:function(val){
          if(val){
            
             let data = JSON.parse( JSON.stringify(val) )
             
             let {id} = data ;
             this.codeQueryFunc(id)
          }
          
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .row >>> .is-cursor
   .el-input__inner
      cursor pointer !important
 .p2 
   padding 2px 0
 .active  
   background #Fff
   border-radius 3px
 .cur 
   cursor pointer
 .text 
   &.bold 
     font-weight 600  
 .back  
   background #eee
 .bor  
   border 1px solid #eee
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding 5px
   &.pro  
     height 99px   
     margin-bottom 4px
   &.err  
     min-height 40px
  .flx  
     flex 1
</style>