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
        <kec-form text="收费科目">
         <template #input>
           <el-input v-model="payload.chargeSubjectName" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="收费编号">
         <template #input>
           <el-input v-model="payload.chargeSubjectCode" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="收费单位">
         <template #input>
           <el-select v-model="payload.unit" placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in unitsList"
                :key="item.id"
                :label="item.code"
                :value="item.code">
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
           name:'',
           chargeSubjectCode:'',
           chargeSubjectName:'',
           unit:''
           
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['serverList','unitsList']),
      
    },

    beforeMount() {},

    mounted() {},

    methods: {
      ...mapActions('basic',['loadCreateChargeItem','loadModifyChargeItem']),
      closeData(){
        this.payload={
           name:'',
           chargeSubjectCode:'',
           chargeSubjectName:'',
           unit:''
        }
      },
      clickConfirm() {
        const _this = this ;
        console.log(_this.payload,'_this.payload')
        let data = {
                  id:_this.serverId,
                  chargeItems:_this.payload
                }
        switch(_this.type){
          case 'addVisible':
                
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
      clickClose() {
        this.$emit('close',{type:this.type,bool:false})
        this.closeData()
      }
    },

    watch: {
      item:{
          deep:true,
          handler:function(val){
            console.log(val)
            
            let data = JSON.parse(JSON.stringify(val) );
            this.payload={
                name:data.name,
                chargesSubject:data.chargesSubject,
                id:data.id,
                unit:data.unit
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