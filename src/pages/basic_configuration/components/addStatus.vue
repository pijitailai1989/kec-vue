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
    <div class="col-sm-12 flexs kec-btn j-center">
       <kec-button 
       @click.native="clickConfirm" 
       :text="type==='addVisible'?'新增':'修改'" 
       icon="fa-floppy-o" 
       :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
       <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'status',
    props:{
      type:String,
      item:Object,
      serviceId:Number
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
           id:null
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
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
           id:null
        }
      },
      clickConfirm() {
        const _this = this ;
        let { code,description,name,nameEn,seq,status,id,serviceId } = _this.payload ;
        let data = {}
        switch(_this.type){
          case 'addVisible':
                data = {code,description,name,nameEn,seq,status,serviceId}
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
               data = {code,description,name,nameEn,seq,status,id}
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
               let { code,description,name,nameEn,serviceId,seq,status,id } = payload

               _.payload = {code,description: description || '',name,nameEn:nameEn || '',serviceId,seq,status,id}

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
</style>