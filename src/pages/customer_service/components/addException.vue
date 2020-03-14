<template>
  <kec-dialog 
      boxWidth="600px"
      boxTop="12vh"
      v-if="dialogVisible">
     <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button 
            @click.native="clickConfirm" 
            :text="type==='addVisible'?'添加':'修改'" 
            icon="fa-floppy-o" 
            :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
            <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <div class="row">
          <div class="col-sm-12">
              <kec-form text="订单编号">
              <template #input>
                <el-input v-model="payload.orderNum" placeholder="" :disabled="type==='changeVisible'" size="medium"></el-input>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="发现时间">
              <template #input>
                <el-date-picker
                    :disabled="type==='changeVisible'"
                    style="width:100%"
                    v-model="payload.exceptionDate"
                    size="medium"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="处理情况标签">
              <template #input>
                <div class="flexs">
                      <el-select
                        style="width:100%"
                          v-model="payload.processingTagIds"
                          multiple
                          filterable
                          allow-create
                          default-first-option
                          placeholder="">
                          <el-option
                            v-for="item in tagTypeClass[5]"
                            :key="item.id"
                            :label="item.tagName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                  </div>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="异常种类标签">
              <template #input>
                <div class="flexs">
                      <el-select
                        style="width:100%"
                          v-model="payload.typeTagIds"
                          multiple
                          filterable
                          allow-create
                          default-first-option
                          placeholder="">
                          <el-option
                            v-for="item in tagTypeClass[3]"
                            :key="item.id"
                            :label="item.tagName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                  </div>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="备注详情">
              <template #input>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="payload.details"
                  show-word-limit
                >
                </el-input>
              </template>
              </kec-form>
          </div>
        </div>
    
  </kec-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton ,KecDialog}  from '@/common/components'
import {formatDate} from '@/utils/fun'
  export default {
    name:'addContract',
    props:{
      type:String,
      item:Object,
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
        payload:{
           id:null,
           exceptionDate: "",
           details: "",
           orderNum:null,
           typeTagIds:[],
           processingTagIds:[]
        },
        
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecDialog
    },

    computed: {
      ...mapState('basic',['tagTypeClass'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('customer',['loadPostLogisticsException','loadPutLogisticsException']),
      closeData(){
        this.payload={
           id:null,
           exceptionDate: "",
           details: "",
           orderNum:null,
           typeTagIds:[],
           processingTagIds:[]
        }
      },
      clickConfirm() {
        const _this = this ;
        let {id,exceptionDate,details,orderNum,typeTagIds,processingTagIds} = _this.payload ;
        let data = {}
        switch(_this.type){
          case 'addVisible':
                data = {exceptionDate:formatDate(exceptionDate,'yyyy-MM-dd hh:mm:ss'),details,orderNum,typeTagIds,processingTagIds}
                _this.loadPostLogisticsException(data).then(success=>{
                   this.$emit('close',{type:this.type,bool:true})
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
                break;
          case 'changeVisible':
                data = {id,details,typeTagIds,processingTagIds}
                _this.loadPutLogisticsException(data).then(success=>{
                   this.$emit('close',{type:this.type,bool:true})
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
                break;
          default: 
                break;
        }
        
        
      },
      clickClose() {
        this.$emit('close',{type:this.type,bool:false})
        this.closeData()
      }
    },

    watch: {
      item:{
          deep:true,
          handler:function(val){
            if(val){
              let payload = JSON.parse(JSON.stringify(val) );
              let {id,exceptionDate,details,orderNum,typeTagIds,processingTagIds} = payload ;

              this.payload = {id,exceptionDate,details,orderNum,typeTagIds,processingTagIds}
            }else{
              this.closeData()
            }
          }
      }
      
    }

  }

</script>
<style lang='stylus' scoped>
 .row  
   padding 5px
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 10px
</style>