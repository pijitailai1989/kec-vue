<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="col-sm-6">
        <kec-form text="参考编号">
         <template #input>
           <el-input v-model="payload.referenceNumber" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="付款方式">
          <template #input>
            <el-input v-model="payload.paymentMethod" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="追踪编号">
          <template #input>
            <el-input v-model="trackingNumber" disabled placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="申报价值">
         <template #input>
           <div class="flexs">
              <el-input v-model="payload.declaredValue" placeholder="" size="medium" class="flx"></el-input>
              <el-input v-model="payload.declaredValueCurrency" placeholder="" size="medium" style="width:60px;margin-left:5px"></el-input>
           </div>
         </template>
        </kec-form>
      </div>
      
      <div class="col-sm-6">
        <kec-form text="指定路线">
         <template #input>
           <el-input v-model="payload.name" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="代收货款">
          <template #input>
            <div class="flexs">
              <el-input v-model="payload.codValue" placeholder="" size="medium" class="flx"></el-input>
              <el-input v-model="payload.codValueCurrency" placeholder="" size="medium" style="width:60px;margin-left:5px"></el-input>
            </div>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="产品编码">
          <template #input>
            <el-input v-model="channelCode" disabled placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="重量">
         <template #input>
           <el-input v-model="payload.actualWeight" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-2">
        <kec-form text="高度">
          <template #input>
            <el-input v-model="payload.height" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-2">
        <kec-form text="长度">
          <template #input>
            <el-input v-model="payload.length" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-2">
        <kec-form text="宽度">
          <template #input>
            <el-input v-model="payload.width" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-2 col-sm-offset-4">
        <kec-form text="拦截操作">
          <template #input>
            <div class="flexs a-center" style="padding-top:2px"> 
               <kec-button-click :disabled="isIntercept" text="拦截订单" 
                @click="interceptFunc(id)" :loading="loading" 
                background="#F18A33" color="#fff"></kec-button-click>
            </div>
            
          </template>
        </kec-form>
      </div>
    </div>
  </div>
</template>

<script>
import {KecForm, KecButton,KecButtonClick }  from '@/common/components'
import { mapState ,mapActions,mapMutations} from 'vuex';
  export default {
    name:'orderInfo',
    props:{
      
    },
    data () {
      return {
        payload:{
          actualWeight: null,
          codValue: null,
          codValueCurrency: null,
          declaredValue: null,
          declaredValueCurrency: null,
          height: null,
          id: null,
          length: null,
          paymentMethod: null,
          referenceNumber: null,
          shipmentTerm: null,
          shipmentType: null,
          width: null
        },
        channelCode:null,
        trackingNumber:null,
        isIntercept:true,
        id:null,
        loading:false
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecButtonClick
    },

    computed: {
      ...mapState('order',['orderInfos'])
    },
    beforeMount() {},

    mounted() {
      
    },

    methods: {
      ...mapMutations('basic',['setDestination']),
      ...mapActions('basic',['loadQueryByCountryCode']),
      ...mapActions('order',['loadPatchOrders']),
      interceptFunc(id){
            this.loading = true ;
             this.loadPatchOrders({id:id}).then(success=>{
                   this.$emit('closeFunc',true)
                   this.loading = false ;
                   
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                  this.loading = false ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
      }
      
    },

    watch: {
      orderInfos:{
        deep:true,
        handler:function(val){
          let {aPackage,channelCode,trackingNumber,isIntercept,id} = val ;
          this.channelCode = channelCode ;
          this.trackingNumber = trackingNumber ;
          this.isIntercept = isIntercept ;
          this.id = id ;
          this.payload = aPackage
          // this.payload = JSON.parse( JSON.stringify(aPackage) )
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .row  
   padding 20px 5px
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 100px
 .flx  
    flex 1
</style>