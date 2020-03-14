<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="货态编码">
          <template #input>
            <el-input v-model="payload.code" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="中文名称">
         <template #input>
           <el-input v-model="payload.name" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="英文名称">
         <template #input>
           <el-input v-model="payload.nameEn" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="关联的标准货态">
         <template #input>
           <el-select v-model="payload.standardStateId" placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in levelTwoList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="描述">
         <template #input>
           <el-input v-model="payload.description" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12 flexs kec-btn">
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
    name:'addCargoConfig',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
           id:null,
           code: "",
           description: "",
           name: "",
           nameEn:"",
           standardStateId:null
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('order',['levelTwoList']),
      ...mapState('basic',['ventorsId'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('basic',['loadVendorStateCreate','loadVendorStateUpdate']),
      closeData(){
        this.payload={
           id:null,
           code: "",
           description: "",
           name: "",
           nameEn:"",
           standardStateId:null
        }
      },
      clickConfirm() {
        const _this = this ;
        let {id,code,description,name,nameEn,standardStateId} = this.payload;
        let data ={}
        switch(_this.type){
          
          case 'addVisible':
                data = {code,description,name,nameEn,standardStateId,vendorId:_this.ventorsId};
                _this.loadVendorStateCreate(data).then(success=>{
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
               data={id,code,description,name,nameEn,standardStateId}
                _this.loadVendorStateUpdate(data).then(success=>{
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
            if(val) this.payload = JSON.parse(JSON.stringify(val) );
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