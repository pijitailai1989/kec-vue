<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="中文名">
          <template #input>
            <el-input v-model="payload.chName" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="英文名">
         <template #input>
           <el-input v-model="payload.enName" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="单位类型">
         <template #input>
           <el-select v-model="payload.unitTypeCode" placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in unitsTypeList"
                :key="item.code"
                :label="item.text"
                :value="item.code">
              </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="符号单位">
         <template #input>
           <el-input v-model="payload.code" placeholder="" size="medium"></el-input>
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
    name:'unit',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
           code: "",
           description: "",
           enName: "",
           chName:"",
           unitTypeCode:null
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['unitsTypeList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('basic',['loadAddChargeUnits','loadModifyChargeUnit']),
      closeData(){
        this.payload={
           code: "",
           description: "",
           enName: "",
           chName:"",
           unitTypeCode:null
        }
      },
      clickConfirm() {
        const _this = this ;
        switch(_this.type){
          case 'addVisible':
                _this.loadAddChargeUnits(_this.payload).then(success=>{
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
                _this.loadModifyChargeUnit(_this.payload).then(success=>{
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
               this.payload = JSON.parse(JSON.stringify(val) );
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
   margin-left 100px
</style>