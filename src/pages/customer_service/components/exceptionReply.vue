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
            :text="'回复'" 
            icon="fa-floppy-o" 
            :background="'#ED6D01'" color="#fff"></kec-button>
            <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <div class="row">
          <div class="col-sm-12">
              <kec-form text="订单编号">
              <template #input>
                <el-input v-model="payload.orderNum" placeholder="" disabled size="medium"></el-input>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="回复列表">
              <template #input>
                 <div v-if="payload.logisticsExceptionActions.length">
                     <div v-for="(item,index) of payload.logisticsExceptionActions" 
                     :key="index">
                      <span>{{item.actionOpinion}}</span>
                      <span>{{item.actionTime}}</span>
                     </div>
                     
                 </div>
                 <div v-else>NO</div>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="回复内容">
              <template #input>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="payload.actionOpinion"
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
    name:'exceptionReply',
    props:{
      type:String,
      item:Object,
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
        payload:{
           logisticsExceptionId:null,
           actionOpinion:'',
           logisticsExceptionActions:[],
           orderNum:''
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
           logisticsExceptionId:null,
           actionOpinion:'',
           logisticsExceptionActions:[],
           orderNum:''
        }
      },
      clickConfirm() {
        const _this = this ;
        let {logisticsExceptionId,actionOpinion} = _this.payload ;
                _this.loadPostLogisticsException(_this.payload).then(success=>{
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
        
        
      },
      clickClose() {
        this.$emit('close',{type:this.type,bool:false})
        this.closeData()
      },
      itemFunc(){

      }
    },

    watch: {
      item:{
          deep:true,
          handler:function(val){
            if(val){
              let payload = JSON.parse(JSON.stringify(val) );
              let {id,logisticsExceptionActions,orderNum} = payload ;
               
              this.payload = {logisticsExceptionId:id,logisticsExceptionActions:[{actionOpinion:'1223'}],actionOpinion:'',orderNum}

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