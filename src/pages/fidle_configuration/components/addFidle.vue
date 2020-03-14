<template>
  <kec-dialog 
      boxWidth="450px"
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
              <kec-form text="供应商产品" crosswise width="100px">
              <template #input>
                <div class="flexs">
                      <el-select
                        style="width:100%"
                          v-model="payload.vendorProductId"
                          filterable
                          placeholder="">
                          <el-option
                            v-for="item in vendorProductList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                  </div>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="描述" crosswise width="100px">
              <template #input>
                <el-input type="textarea" v-model="payload.infoName" placeholder="" size="medium"></el-input>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="配置Json路径" crosswise width="100px">
              <template #input>
                <el-input v-model="payload.path" placeholder="" size="medium"></el-input>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-12">
              <kec-form text="">
              <template #input>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 8, maxRows: 10}"
                  placeholder="请输入内容"
                  v-model="payload.jsonData"
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
    name:'addFidle',
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
           infoName:'',
           vendorProductId:null,
           path:null,
           jsonData:null
        },
        
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecDialog
    },

    computed: {
      ...mapState('vendor',['vendorProductList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('fidle',['loadPostLastMileExtraInfos','loadPutLastMileExtraInfos']),
      closeData(){
        this.payload={
           id:null,
           infoName:'',
           vendorProductId:null,
           path:null,
           jsonData:null
        
        }
      },
      clickConfirm() {
        const _this = this ;
        let {id,infoName,vendorProductId,path,jsonData} = _this.payload ;
        let data = {}
        switch(_this.type){
          case 'addVisible':
                data = {infoName,vendorProductId,content:{path,jsonData}}
                _this.loadPostLastMileExtraInfos(data).then(success=>{
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
               data = {infoName,vendorProductId,content:{path,jsonData},id}
                _this.loadPutLastMileExtraInfos(data).then(success=>{
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
              let {id,infoName,vendorProductId,content:{
                path,jsonData
              }} = payload ;

              this.payload = {
                id,infoName,vendorProductId,path:path?path:null,jsonData:jsonData?jsonData:null
              }
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