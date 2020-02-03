<template>
    <kec-dialog 
      boxWidth="300px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">修改服务收费项</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button @click.native="clickConfirm" text="修改" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
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
                      <el-select v-model="payload.currency" filterable placeholder="" size="medium" style="width:100%">
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
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecForm ,KecDialog ,KecTabs,KecList}  from '@/common/components'
  export default {
    name:'editServerDialog',
    props:{
      dialogVisible:Boolean,
      serverId:Number,
      type:String,
      item:Object,
      chargeItems:Array
    },
    data () {
      return {
         currentTabComponent:'AttributeComponent',
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
        KecButton,
        KecForm,
        KecDialog,
        KecTabs,
        KecList,
    },

    computed: {
      ...mapState('basic',['unitsList','ventorsId','currencyList']),
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('basic',['loadVendorPostChargeItems','loadVendorPutChargeItems']),
        cancel(val) {
            this.$emit('closeFunc',false)
        },
        tabsFunc(index) {
            let arr = ['AttributeComponent','KecCountry'] ;
            this.currentTabComponent = arr[index] ;
        },
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
                   this.$emit('closeFunc',true)
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
                   this.$emit('closeFunc',true)
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
    },

    watch: {
      item:{
          deep:true,
          handler:function(val){
            let data = JSON.parse(JSON.stringify(val) );
            this.payload={
                chargeItemId:data.chargeItemId,
                chargeItemName:data.chargeItemName,
                unitPrice:data.unitPrice,
                currency:data.currency,
                unit:data.unit,
                id:data.id,
                status:data.status
                
             }
          }
      },
    },
    destroyed() {
      this.currentTabComponent = ''
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   height 469px
 .j-end 
   height 40px
</style>