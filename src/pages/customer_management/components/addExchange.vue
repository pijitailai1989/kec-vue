<template>
    <kec-dialog 
      boxWidth="960px"
      boxTop="12vh"
      v-if="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button-click :loading="loading"  text="保存" icon="fa-floppy-o" background="#28A745" color="#fff">

           </kec-button-click>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-sm-12">
              <kec-tabs 
                style="margin-top:10px"
                height="400px" 
                :titleList="['全程分类报价']"
                @change="tabsFunc"
                >
                  <template>
                    <div>
                      <price v-show="currentTabComponent==='price'" @updata="channelData"></price>
                    </div>
                  </template>
                </kec-tabs>
          </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {KecButton , KecForm ,KecDialog ,KecTabs,KecButtonClick}  from '@/common/components'
import price from './price'
  export default {
    name:'addExchange',
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
         currentTabComponent:'price',
         payload:{
           "categoryTagSet":[],
           "weightTagSet":[],
           "servicePartitionList":[],
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
        price
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
            console.log(11111111111)
            this.$emit('close',false)
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
           "servicePartitionList":[],
           "channelList":[]
         }
        },
        clickConfirm(data){
           this.loading = true ;
           let { id } = data ;
           if(id){
             this.loadPutProducts(data).then(success=>{
                   this.$emit('close',true)
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
                   this.$emit('close',true)
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
            let arr = ['price'] ;
            this.currentTabComponent = arr[index] ;
        },
        channelData(data){
            this.payload.channelList = data ;
        },
        serverData(data){
            let arr = JSON.parse( JSON.stringify(data.servicePartitionList) )
            let list = []
            arr.forEach(item=>{
              let { coverMatchMode,excludeMathMode,partitionName,id,partitionMethodCode,
                    subdivisionsId,attrTagsId} = item ;
              let subdivisions = [],attrTags = [];
              if(subdivisionsId.length){
                subdivisionsId.forEach(el=>{
                  let data = {id:el}
                  subdivisions.push(data)
                })
              }
              if(attrTagsId.length){
                attrTagsId.forEach(el=>{
                  let data = {id:el}
                  attrTags.push(data)
                })
              }
              let data = {coverMatchMode,excludeMathMode,partitionName,id,
                          partitionMethod:partitionMethodCode,subdivisions,attrTags};
              list.push(data)
            })
            
            this.payload.servicePartitionList =  list;
        },
        productData(data){
            this.payload["code"]=data.code
            this.payload["name"]=data.name
            this.payload["shippingCountryCode"]=data.shippingCountryCode
            this.payload["paymentMethodCode"]=data.paymentMethodCode
            this.payload["needCargoTracking"]=data.needCargoTracking
            this.payload["compensationLimit"]=data.compensationLimit
            this.payload["compensationCurrency"]=data.compensationCurrency
            this.payload["compensationUnitId"]=data.compensationUnitId
            this.payload["destinationCountryCode"]=data.destinationCountryCode
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
        if(!newVal) this.currentTabComponent = 'price' ;
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