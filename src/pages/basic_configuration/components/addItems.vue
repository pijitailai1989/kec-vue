<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="服务类型">
          <template #input>
            <el-select v-model="serverId" disabled placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in serverList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="收费项名称">
         <template #input>
           <el-input v-model="payload.name" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="科目项名称">
         <template #input>
           <el-select v-model="payload.chargeSubjectId" @change="changeItemFunc" filterable placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in subjectItemList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="科目项编号">
         <template #input>
           <el-input v-model="payload.chargeSubjectPath" disabled placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="收费单位">
         <template #input>
           <el-select v-model="payload.unitId" placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in unitsList"
                :key="item.id"
                :label="item.code"
                :value="item.id">
              </el-option>
            </el-select>
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
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'unit',
    props:{
      serverId:Number,
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
           id:null,
           name:'',
           chargeSubjectPath:'',
           chargeSubjectId:null,
           unitId:''
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['serverList','unitsList','unitsClassList','subjectItemList']),
      
    },

    beforeMount() {},

    mounted() {},

    methods: {
      ...mapActions('basic',['loadCreateChargeItem','loadModifyChargeItem']),
      closeData(){
        this.payload={
           id:null,
           name:'',
           chargeSubjectPath:'',
           chargeSubjectId:null,
           unitId:''
        }
      },
      clickConfirm() {
        const _this = this ;
        let {name,chargeSubjectId,unitId,chargeSubjectPath,id} = _this.payload ;
        let data = {id:_this.serverId}
        switch(_this.type){
          case 'addVisible':
                data.chargeItems = {name,chargeSubjectId,unitId}
                _this.loadCreateChargeItem(data).then(success=>{
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
                data.chargeItems = {name,chargeSubjectId,unitId,id}
                _this.loadModifyChargeItem(data).then(success=>{
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
      clickClose(){
        this.$emit('close',{type:this.type,bool:false})
        this.closeData()
      },
      changeItemFunc(id){
        let obj = this.subjectItemList.find(el=> {
          return el.id == id ;
        })
        this.payload.chargeSubjectPath = obj.path ;
      }
    },

    watch: {
      item:{
          deep:true,
          handler:function(val){
            if(val){
               let data = JSON.parse(JSON.stringify(val) );
               let {unitId,chargeSubjectPath,chargeSubjectId,id,name} = data ;
               this.payload = {unitId,chargeSubjectPath,chargeSubjectId,id,name}
               console.log(this.payload,'this.payload')
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