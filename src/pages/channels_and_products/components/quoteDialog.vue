<template>
    <kec-dialog  
      boxWidth="500px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">新增报价表</span>
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
                <kec-form crosswise width="100px" text="产品">
                  <template #input>
                    <el-select v-model="payload.productId" 
                   disabled placeholder="" size="medium" style="width:100%">
                    <el-option
                      v-for="item in productsList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  </template>
                </kec-form>
            </div>
            
            <div class="col-sm-12">
                <kec-form crosswise width="100px" text="目的地区/国家">
                <template #input>
                  <el-select v-model="payload.destinationCountryIds" 
                  multiple placeholder="" size="medium" style="width:100%">
                    <el-option
                      v-for="item in countryPartitionList.countryList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </template>
                </kec-form>
            </div>
            <div class="col-sm-12">
                <kec-form crosswise width="100px" text="分区方案">
                <template #input>
                  <el-select v-model="payload.schemaIds" 
                   multiple placeholder="" size="medium" style="width:100%">
                    <el-option
                      v-for="item in countryPartitionList.partitionList"
                      :key="item.id"
                      :label="item.schemaName"
                      :value="item.schemaId">
                    </el-option>
                  </el-select>
                </template>
                </kec-form>
            </div>
            <div class="col-sm-12">
                <kec-form crosswise width="100px" text="描述">
                  <template #input>
                    <el-input v-model="payload.description"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                     placeholder="" size="medium"></el-input>
                  </template>
                </kec-form>
            </div>
            <div class="col-sm-12" style="padding:5px 0">
                <kec-form crosswise width="100px" text="类型">
                  <template #input>
                    <div class="flexs" style="padding:10px 0">
                        <el-radio v-model="payload.isStandard" :label="1">标准价</el-radio>
                        <el-radio v-model="payload.isStandard" :label="2">协议价</el-radio>
                    </div>
                  </template>
                </kec-form>
            </div>
          </div>
      </template>
    </kec-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton ,KecDialog}  from '@/common/components'
  export default {
    name:'quoteDialog',
    props:{
      item:Object,
      dialogVisible:Boolean,
    },
    data () {
      return {
        payload:{
           productId:null,
           description: "",
           destinationCountryIds:[],
           schemaIds:[],
           isStandard:null
        }
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecDialog
    },

    computed: {
      ...mapState('channels',['countryPartitionList']),
      ...mapState('basic',['productsList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('channels',['loadPostProductQuotation']),
      
      closeData(){
        this.payload={
           productId:null,
           description: "",
           destinationCountryIds:[],
           schemaIds:[],
           isStandard:null
        }
      },
      clickConfirm() {
        const _this = this ;
        let { productId,description,destinationCountryIds,schemaIds,isStandard} = _this.payload ;
        let data = {productId,description,destinationCountryIds,schemaIds,isStandard}
                _this.loadPostProductQuotation(data).then(success=>{
                   this.$emit('close',this.payload.isStandard)
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
        
        
      },
      clickClose() {
        this.$emit('close',false)
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
               let { destinationCountryNameList,
               partitionNameList,
               productId,
               description
                } = payload
               _.payload.productId = productId ;

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