<template>
    <kec-drag 
      boxWidth="500px" client
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button @click.native="clickConfirm" text="保存" 
           icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
         <div class="row">
    
            <div class="col-sm-12">
                <kec-form crosswise width="70px" text="中文名称">
                  <template #input>
                    <el-input v-model="payload.name" placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
            </div>
            <div class="col-sm-12">
                <kec-form crosswise width="70px" text="英文名称">
                <template #input>
                  <el-input v-model="payload.nameEn" placeholder="" size="medium"></el-input>
                </template>
                </kec-form>
            </div>
            <div class="col-sm-12">
                <kec-form crosswise width="70px" text="编码">
                <template #input>
                  <el-input v-model="payload.code" placeholder="" size="medium"></el-input>
                </template>
                </kec-form>
            </div>
            <div class="col-sm-12">
                <kec-form crosswise width="70px" text="状态" style="margin:10px 0">
                <template #input>
                    <template>
                      <el-checkbox v-model="payload.status">启用</el-checkbox>
                    </template>
                </template>
                </kec-form>
            </div>
            <div class="col-sm-12">
                <kec-form crosswise width="70px" text="排序">
                <template #input>
                  <el-input v-model="payload.seq" placeholder="" size="medium"></el-input>
                </template>
                </kec-form>
            </div>
            <div class="col-sm-12">
                <kec-form crosswise width="70px" text="费用关联">
                <template #input>
                  <el-select v-model="payload.chargeItemIds" multiple placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="item in chargeItemList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </template>
                </kec-form>
            </div>
            <div class="col-sm-12">
                <kec-form crosswise width="70px" text="描述">
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
            <!-- <div class="col-sm-12 flexs kec-btn j-center">
              <kec-button 
              @click.native="clickConfirm" 
              :text="type==='addVisible'?'新增':'修改'" 
              icon="fa-floppy-o" 
              :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
              <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
            </div> -->
          </div>
      </template>
    </kec-drag>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton ,KecDrag}  from '@/common/components'
  export default {
    name:'cargoDialog',
    props:{
      type:String,
      item:Object,
      serviceId:Number,
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
        payload:{
           code: "",
           description: "",
           name: "",
           nameEn:"",
           serviceId:null,
           seq:null,
           status:false,
           id:null,
           chargeItemIds:[]
        }
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecDrag
    },

    computed: {
      ...mapState('customer',['chargeItemList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('basic',['loadPostStandardState','loadPutStandardState']),
      
      closeData(){
        this.payload={
           code: "",
           description: "",
           name: "",
           nameEn:"",
           serviceId:null,
           seq:null,
           status:false,
           id:null,
           chargeItemIds:[]
        }
      },
      clickConfirm() {
        const _this = this ;
        let { code,description,name,nameEn,seq,status,id,serviceId ,chargeItemIds} = _this.payload ;
        let data = {}
        switch(_this.type){
          case 'addVisible':
                data = {code,description,name,nameEn,seq,status,serviceId,chargeItemIds}
                _this.loadPostStandardState(data).then(success=>{
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
               data = {code,description,name,nameEn,seq,status,id,chargeItemIds}
                _this.loadPutStandardState(data).then(success=>{
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
            const _ = this ;
            if(val){
               let payload = JSON.parse(JSON.stringify(val) );
               let { code,description,name,nameEn,serviceId,seq,status,id,chargeItemIds } = payload
               _.payload = {code,description: description || '',name,nameEn:nameEn || '',serviceId,seq,status,id,chargeItemIds}

            } 
          }
      },
      serviceId:{
        deep:true,
        handler:function(val){
          val && ( this.payload.serviceId = val )
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
   margin-left 100px

 
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
</style>