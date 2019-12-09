<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="服务类型">
          <template #input>
            <el-select v-model="serverId" placeholder="" @change="serverClick" size="medium" style="width:100%">
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
    name:'addServerVentors',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        serverId:'',
        payload:{
           "serviceName":"干线2",
           "serviceTypeId":2
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['serverList','ventorsId']),
      
    },

    beforeMount() {},

    mounted() {
      this.loadQueryServerTypes()
    },

    methods: {
      ...mapActions('basic',['loadQueryServerTypes','loadVendorPostVendor1','loadVendorPutVendor1']),
      closeData(){
        this.payload={
           "serviceName":"",
           "serviceTypeId":''
        }
      },
      clickConfirm() {
        const _this = this ;
        let data = {
                  url:[_this.ventorsId,'service','postService'],
                  data:_this.payload
                 }
        switch(_this.type){
          case 'addVisible':
                
                _this.loadVendorPostVendor1(data)
                .then(success=>{
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
                data.url = [_this.ventorsId,'service','putService']
                _this.loadVendorPutVendor1(data).then(success=>{
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
      },
      serverClick(id){
        let obj = this.serverList.find(el=>{
             return el.id === id ;
        })

        this.payload["serviceName"] = obj.name ;
        this.payload["serviceTypeId"] = obj.id ;
        
      }
    },

    watch: {
      item:{
          deep:true,
          handler:function(val){
            let data = JSON.parse(JSON.stringify(val) );
            this.payload={
                "serviceName":data.serviceName,
                "serviceTypeId":data.serviceTypeId,
                "id":data.id
             }
             this.serverId = data.serviceTypeId ;
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