<template>
    <kec-drag
      boxWidth="960px" client
      v-if="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button-click :loading="loading" @click="clickConfirm(payload)" text="保存" 
           icon="fa-floppy-o" background="#28A745" color="#fff">
           </kec-button-click>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-sm-12">
              <kec-tabs 
                style="margin-top:10px"
                height="360px" 
                :titleList="['产品规格','货物属性','服务分区','资源组配置']"
                @change="tabsFunc"
                >
                  <template>
                    <div>
                      <server-division v-show="currentTabComponent==='serverDivision'" @updata="serverData"></server-division>
                      <channels-price v-show="currentTabComponent==='channelsPrice'" @updata="channelData"></channels-price>
                      <product-standard v-show="currentTabComponent==='productStandard'" @updata="productData"></product-standard>
                      <goods-attribute v-show="currentTabComponent==='goodsAttribute'" @updata="goodsData"></goods-attribute>
                    </div>
                  </template>
                </kec-tabs>
          </div>
        </div>
      </template>
    </kec-drag>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {KecButton , KecForm ,KecDialog ,KecTabs,KecButtonClick,KecDrag}  from '@/common/components'
import serverDivision from './serverDivisions'
import channelsPrice from './channelsPrice'
import productStandard from './productStandard'
import goodsAttribute from './goodsAttribute'
  export default {
    name:'productDialogs',
    props:{
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
         server:null,
         channerls:null,
         product:null,
         goods:null,
         currentTabComponent:'productStandard',
         payload:{
           "categoryTagSet":[],
           "weightTagSet":[],
           "servicePartitions":[],
           "channelList":[]
         },
         loading:false
      };
    },

    components: {
        KecButton,
        KecButtonClick,
        KecForm,
        KecDialog,
        KecTabs,
        channelsPrice,
        serverDivision,
        goodsAttribute,
        productStandard,
        KecDrag
    },

    computed: {
      ...mapState('basic',['productsInfo']),
    },

    beforeMount() {},

    mounted() {
      if(this.productsInfo){
         this.payload.id = this.productsInfo.id ;
      }
      this.mountFunc(10000,1)
    },

    methods: {
        ...mapActions('basic',['loadPostProducts','loadPutProducts']),
        cancel() {
            this.$emit('closeFunc',false)
            this.closeData()
        },
        mountFunc(size,num){
          const _ = this ;
          let data = {
            pageSize:size,
            pageNumber:num
          }
          
        },
        closeData(){
          this.payload={
           "categoryTagSet":[],
           "weightTagSet":[],
           "servicePartitions":[],
           "channelList":[]
         }
        },
        clickConfirm(data){
           this.loading = true ;
           let { id } = data ;
           if(id){
             this.loadPutProducts(data).then(success=>{
                   this.$emit('closeFunc',true)
                   this.loading = false ;
                   this.closeData()
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
           }else{
             this.loadPostProducts(data).then(success=>{
                   this.$emit('closeFunc',true)
                   this.loading = false ;
                   this.closeData()
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
        tabsFunc(index) {
            let arr = ['productStandard','goodsAttribute','serverDivision','channelsPrice'] ;
            this.currentTabComponent = arr[index] ;
        },
        channelData(data){
            let arr = []
            if(data && data.length){
              data.forEach(item=>{
                 let data = {id:item.id}
                 arr.push(data)
              })
            }
            this.payload.channelList = arr ;

        },
        serverData(datas){
            let arr = JSON.parse( JSON.stringify(datas) )
            let list = []
            arr.forEach(item=>{
              let {id,tagIds,isArrive} = item ;
              let arrs = []
              tagIds.forEach(todo=>{
                 let date ={id:todo}
                 arrs.push(date)
              })
              let data = {id,tags:arrs,isArrive};
              list.push(data)
            })
            
            this.payload.servicePartitions =  list;
        },
        productData(data){
            this.payload["code"]=data.code
            this.payload["name"]=data.name
            this.payload["externalCode"]=data.externalCode
            this.payload["shippingCountryCode"]=data.shippingCountryCode
            this.payload["paymentMethodCode"]=data.paymentMethodCode
            this.payload["needCargoTracking"]=data.needCargoTracking
            this.payload["compensationLimit"]=data.compensationLimit
            this.payload["compensationCurrency"]=data.compensationCurrency
            this.payload["compensationUnitId"]=data.compensationUnitId
            this.payload["destinationCountryCode"]=data.destinationCountryCode
            this.payload["ableReturn"]=data.ableReturn
            this.payload["ableSensitive"]=data.ableSensitive
            this.payload["type"]=data.type
        },
        goodsData(data){
            this.payload["threeDimensionsMaxSize"]=data.threeDimensionsMaxSize
            this.payload["areaMaxSize"]=data.areaMaxSize
            this.payload["areaLimitUnitId"]=data.areaLimitUnitId
            this.payload["volumeWeightFactory"]=data.volumeWeightFactory
            this.payload["minWeight"]=data.minWeight
            this.payload["maxWeight"]=data.maxWeight
            this.payload["weightUnitId"]=data.weightUnitId
            this.payload["threeDimensionsUnitId"]=data.threeDimensionsUnitId
            let categoryTagSet = []
            if(data.categoryTagSet.length){
              let arr = data.categoryTagSet ;
              arr.forEach(el=>{
                 let data = {id:el}
                 categoryTagSet.push(data)
              })
            }
            let weightTagSet = []
            if(data.weightTagSet.length){
              let arr = data.weightTagSet ;
              arr.forEach(el=>{
                 let data = {id:el}
                 weightTagSet.push(data)
              })
            }
            this.payload.categoryTagSet=categoryTagSet
            this.payload.weightTagSet=weightTagSet
        }
    },

    watch: {
      dialogVisible( newVal , oldVal ) {
        if(!newVal) this.currentTabComponent = 'productStandard' ;
      },
      productsInfo:{
        deep:true,
        handler:function(val){
          if(val){
            this.payload.id = val.id ;
          }
        }
      }
    },
    destroyed() {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .row >>> .is-cursor
   .el-input__inner
      cursor pointer !important
</style>