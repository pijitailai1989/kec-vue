<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="收费项名称">
          <template #input>
            <el-select v-model="payload.chargeItemId"  placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in chargeItems"
                :key="item.id"
                :label="item.name"
                @click.native="clickID(item.name)"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="价格">
         <template #input>
           <el-input v-model="payload.unitPrice" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="币种">
         <template #input>
           <el-select v-model="payload.currency" placeholder="" size="medium" style="width:100%">
             <el-option
               v-for="item in currencyList"
               :key="item.id"
               :label="item.code"
               :value="item.code">
             </el-option>
           </el-select>
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
       :text="type==='addVisible1'?'新增':'修改'" 
       icon="fa-floppy-o" 
       :background="type==='addVisible1'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
       <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'addServerItem',
    props:{
      serverId:Number,
      type:String,
      item:Object,
      chargeItems:Array
    },
    data () {
      return {
        payload:{
           chargeItemId:null,
           chargeItemName:null,
           unitPrice:null,
           currency:null,
           unit:null
           
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['unitsList','ventorsId','currencyList']),
      
    },

    beforeMount() {},

    mounted() {},

    methods: {
      ...mapActions('basic',['loadVendorPostChargeItems','loadVendorPutChargeItems']),
      closeData(){
        this.payload={
           chargeItemId:null,
           chargeItemName:null,
           unitPrice:null,
           currency:null,
           unit:null
        }
      },
      clickID(name){
        this.payload.chargeItemName = name ;
      },
      clickConfirm() {
        const _this = this ;
        _this.payload['unitPrice'] = parseInt(_this.payload['unitPrice'])
        let data = {
                  url:[_this.ventorsId,_this.serverId,'chargeItem','postChargeItem'],
                  data:_this.payload
                 }
        switch(_this.type){
          case 'addVisible1':
                
                _this.loadVendorPostChargeItems(data).then(success=>{
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
          case 'changeVisible1':
                data.url = [_this.ventorsId,_this.serverId,'chargeItem','putChargeItem']
                _this.loadVendorPutChargeItems(data).then(success=>{
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
            
            let data = JSON.parse(JSON.stringify(val) );
            this.payload={
                chargeItemId:'',
                chargeItemName:'',
                unitPrice:'',
                currency:'',
                unit:''
             }
          }
      },
      chargeItems:{
          deep:true,
          handler:function(val){
            
          }
      },
      serverId:{
          deep:true,
          handler:function(val){
            
          }
      },
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