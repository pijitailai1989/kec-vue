<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="服务类型名称">
          <template #input>
            <el-input v-model="payload.name" 
                      placeholder="" 
                      size="medium">
            </el-input>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12 flexs kec-btn">
       <kec-button 
       @click.native="clickConfirm" 
       :text="type==='addVisible'?'新增':'修改'" 
       icon="fa-floppy-o" 
       :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"
       ></kec-button>
       <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'server',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
           name:""
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      ...mapActions('basic',['loadCreateServerType','loadModifyServiceType']),
      closeData(){
        this.payload={
           name:''
        }
      },
      clickConfirm() {
        const _this = this ;
        switch(_this.type){
          case 'addVisible':
                _this.loadCreateServerType(_this.payload).then(success=>{
                   this.$emit('close',{type:this.type,bool:true})
                   this.closeData()
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                   console.log(success,'success')
                }).catch(error=> {
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
                break;
          case 'changeVisible':
                _this.loadModifyServiceType(_this.payload).then(success=>{
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
                let data = {}
                data.id = val.id;
                data.name = val.name;
                this.payload = JSON.parse(JSON.stringify(data) );
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
   margin-left 50px
</style>