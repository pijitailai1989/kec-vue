<template>
    <kec-dialog 
      boxWidth="700px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text==='add'?'添加编码规则':'修改编码规则'}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button @click.native="addCodeFun(text)" text="保存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-sm-4">
              <kec-form text="编号">
                <template #input>
                  <el-input v-model="payload.code" placeholder="" ></el-input>
                </template>
              </kec-form>
          </div>
          <div class="col-sm-4">
                      <kec-form text="类型">
                      <template #input>
                        <div class="flexs">
                             <el-select v-model="payload.type" placeholder="请选择" class="flx">
                                <el-option
                                  v-for="item in tagTypeClass[6]"
                                  :key="item.id"
                                  :label="item.tagName"
                                  :value="item.tagValue">
                                </el-option>
                              </el-select>
                        </div>
                      </template>
                      </kec-form>
          </div>
          <div class="col-sm-2">
              <kec-form text="预警值">
              <template #input>
                <el-input v-model="payload.warningLine" placeholder="" ></el-input>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-2">
                      <kec-form text="步长">
                      <template #input>
                        <el-input v-model="payload.step" placeholder=""></el-input>
                      </template>
                      </kec-form>
                  </div>
          
          <div class="col-sm-12">
              <kec-form text="描述">
              <template #input>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="payload.remark">
                </el-input>
              </template>
              </kec-form>
          </div>
          
          <div class="col-sm-12">
              <kec-form text="编码规则">
              <template #input>
                <div class="row borders">
                  <div class="col-sm-10">
                      <kec-form  crosswise text="字符常量" width="80px">
                      <template #input>
                        <div class="flexs">
                             <el-input v-model="payload.stringText" placeholder="" size="medium"></el-input>
                        </div>
                      </template>
                      </kec-form>
                  </div>
                  
                  <div class="col-sm-2 flexs j-end">
                    <el-button @click.native="addFunc(payload.structures,'constant',payload.stringText)" type="success" plain  style="margin-left:30px" size="medium">添加</el-button>
                  </div>
                  <div class="col-sm-10">
                      <kec-form  crosswise text="日期格式" width="80px">
                      <template #input>
                        <div class="flexs">
                             <el-select v-model="payload.date" placeholder="请选择" class="flx">
                                <el-option
                                  v-for="item in options"
                                  :key="item"
                                  :label="item"
                                  :value="item">
                                </el-option>
                              </el-select>
                        </div>
                      </template>
                      </kec-form>
                  </div>
                  
                  <div class="col-sm-2 flexs j-end">
                    <el-button @click.native="addFunc(payload.structures,'time',payload.date)" type="success" plain style="margin-left:30px" size="medium">添加</el-button>
                  </div>
                  <div class="col-sm-10">
                      <kec-form  crosswise text="流水号" width="80px">
                      <template #input>
                        <div class="flexs">
                        <el-input v-model="payload.min" placeholder="" size="medium"></el-input>
                        <span style="font-weight:400;padding:5px 2px;color:#ccc">-</span>
                        <el-input v-model="payload.max" placeholder="" size="medium"></el-input>
                        </div>
                      </template>
                      </kec-form>
                  </div>
                  
                  <div class="col-sm-2 flexs j-end">
                    <el-button :disabled="intervalShow" @click.native="addFunc(payload.structures,'interval',payload.min,payload.max)" type="success" plain  size="medium">添加</el-button>
                  </div>
                </div>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12" v-show="payload.structures.length">
              <kec-form text="结果预览">
                <template #input>
                    <div class="row borders">
                        <el-tag
                          v-for="(tag,index) in payload.structures"
                          :key="index"
                          closable
                          @close="closeTagFunc(index,tag.structureType)"
                          type="info">
                          {{tag.structureValue}}
                          
                        </el-tag>
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
    name:'addCode',
    props:{
      dialogVisible:Boolean,
      text:String,
      item:Object
    },
    data () {
      return {
         payload:{
            "id":null,
            "code":'',
            "remark":'',
            "warningLine":'',
            "structures":[],
            "step":null,
            "stringText":'',
            "date":'',
            "min":null,
            "max":null,
            "type":null
         },
         options:['yyyy','yyyyMM','yyyyMMdd'],
         intervalShow:false
          

      };
    },

    components: {
        KecButton,
        KecForm,
        KecDialog
    },

    computed: {
      ...mapState('basic',['tagTypeClass'])
    },

    beforeMount() {},

    mounted() {
     
    },

    methods: {
        ...mapActions('basic',['loadCodeCreate','loadCodeUpdate']),
        cancel() {
            this.$emit('closeFunc',false)
            this.closeData()
        },
        closeData(){
          this.intervalShow = false ;
          this.payload = {
            "id":null,
            "code":'',
            "remark":'',
            "warningLine":'',
            "structures":[],
            "step":null,
            "stringText":'',
            "date":'',
            "min":null,
            "max":null,
            "type":null
         }
        },
        addFunc(array, type , value , value1 ){
            
            let data = {
              "structureType":type,
              "sort":null
            }
            switch(type) {
                case 'constant':
                    value && ( data['structureValue'] = value )
                    break;
                case 'time':
                    value && ( data['structureValue'] = value)
                    break;
                default:
                    value && value1 && ( data['structureValue'] = `${value}-${value1}`  )
                    value && value1 && ( this.intervalShow = true )
                    break;
            }

            data['structureValue'] && this.payload.structures.push(data)
            this.payload.structures.forEach( (item,index) => {
              item.sort = index + 1 ;
            })
        },
        closeTagFunc(index,type){
           if(type === 'interval'){
             this.intervalShow = false ;
           }
           this.payload.structures.splice(index,1)
           this.payload.structures.forEach( (item,index) => {
              item.sort = index + 1 ;
           })
        },
        addCodeFun(types){
          let {id,code,remark,warningLine,structures,step,type} = this.payload ;
          if(types==='add'){
            let data = {code,remark,warningLine,structures,step,type}
            this.loadCodeCreate(data).then(success=>{
                   
                   this.$emit('closeFunc',true)
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
            let data = {code,remark,warningLine,structures,step,id,type}
            this.loadCodeUpdate(data).then(success=>{
                   this.$emit('closeFunc',true)
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
      item:{
        deep:true,
        handler:function(val){
          if(val){
             let data = JSON.parse( JSON.stringify(val) )
             let {id,code,remark,warningLine,structures,step,type} = data ;
             this.payload = {id,code,remark,warningLine,structures,step,type,
             stringText:'',date:'',min:null,max:null}
             let obj = structures.find( item => { return  item.structureType == 'interval'})
             obj && ( this.intervalShow = true )
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