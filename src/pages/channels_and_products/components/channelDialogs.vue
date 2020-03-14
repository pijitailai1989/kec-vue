<template>
    <kec-dialog 
      boxWidth="1100px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button @click.native="addChannelFun" text="保存" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-sm-12 flexs a-center p2">
             <div class="col-sm-1 text bold flexs j-end">
                渠道名称
             </div>
             <div class="col-sm-3">
                <el-input v-model="payload.channelName" placeholder="" size="medium"></el-input>
             </div>
             <div class="col-sm-1 text bold flexs j-end">
                渠道编码
             </div>
             <div class="col-sm-3">
                <el-input v-model="payload.channelCode" placeholder="" size="medium"></el-input>
             </div>
          </div>
          <div class="col-sm-12 p2">
                <!-- <div class="col-sm-2 flexs columns a-center" style="padding:30px 0">
                      <i v-if="upShow" class="fa fa-arrow-up fa-2x" style="padding:10px;color:#ccc"></i>
                      <i v-else @click="shiftFunc('up',selectIndex)" class="cur fa fa-arrow-up fa-2x" style="padding:10px;color:#F18A33"></i>
                      <i v-if="downShow" class="fa fa-arrow-down fa-2x" style="padding:10px;color:#ccc"></i>
                      <i v-else @click="shiftFunc('down',selectIndex)" class="cur fa fa-arrow-down fa-2x" style="padding:10px;color:#F18A33"></i>
                </div> -->
                <div class="col-sm-12 flexs columns bor a-center p2">
                    <div class="col-sm-12 flexs a-center back p2">
                      <div class="col-sm-3 text bold">
                          选择服务
                      </div>
                      <div class="col-sm-3 text bold">
                          选择服务商
                      </div>
                      <div class="col-sm-3 text bold">
                          选择服务商产品
                      </div>
                      <!-- <div class="col-sm-2 text bold">
                          选择分区
                      </div> -->
                      <div class="col-sm-1 text bold">
                          操作时效
                      </div>
                      <div class="col-sm-1 text bold">
                          成本
                      </div>
                      <div class="col-sm-1 text bold">
                          删除
                      </div>
                    </div>
                    <vuedraggable v-model="payload.channelServiceNodes" class="col-sm-12">
                      <transition-group>
                          <div class="flexs a-center p2 cur" 
                          @click="selectClick(index)"
                          v-for="(item,index) of payload.channelServiceNodes" 
                          :class="[selectIndex===index?'active':'']"
                          :key="index+'item'">
                            <div class="col-sm-3 flexs">
                                <el-select v-model="item.serviceTypeId" 
                                @change="selectServerType(item.serviceTypeId,index,true)" 
                                placeholder="请选择" size="medium" style="width:90%">
                                  <el-option
                                    v-for="item in serverList"
                                    :key="item.code"
                                    :label="item.text"
                                    :value="item.code">
                                  </el-option>
                                </el-select>
                            </div>
                            <div class="col-sm-3 flexs">
                                <el-select v-model="item.vendorId" 
                                @change="selectVendor(item.vendorId,index,true)" 
                                placeholder="请选择" size="medium" style="width:90%">
                                  <el-option
                                    v-for="em in item.selectArr"
                                    :key="em.id"
                                    :label="em.companyName"
                                    :value="em.id">
                                  </el-option>
                                </el-select>
                            </div>
                            <!-- <div class="col-sm-2 flexs">
                                <el-select v-model="item.vendorProductId" 
                                @change="selectPartition(item.vendorProductId,index,true)"
                                placeholder="请选择" size="medium" style="width:90%">
                                  <el-option
                                    v-for="em in item.selectArrs"
                                    :key="em.id"
                                    :label="em.name"
                                    :value="em.id">
                                  </el-option>
                                </el-select>
                            </div> -->
                            <div class="col-sm-3 flexs">
                                <el-select v-model="item.partitionId" placeholder="请选择" size="medium" style="width:90%">
                                  <el-option
                                    v-for="em in item.selectArrss"
                                    :key="em.id"
                                    :label="em.partitionName"
                                    :value="em.id">
                                  </el-option>
                                </el-select>
                            </div>
                            <div class="col-sm-1 text">
                                {{item.text}}小时
                            </div>
                            <div class="col-sm-1 text">
                                {{item.text}}小时
                            </div>
                            <div class="col-sm-1">
                               <span style="padding:5px 10px" @click="delItemFunc(index)">
                                 <i class="fa fa-trash-o" aria-hidden="true"></i>
                               </span> 
                            </div>
                          </div>
                      </transition-group>
                    </vuedraggable>
                </div>
          </div>
          <div class="col-sm-12 p2">
             <div class="col-sm-2"></div>
             <div class="col-sm-10">
               <div class="col-sm-2 flexs a-center col-sm-offset-10">
                  <kec-button @click.native="addItemFunc" text="添加结点" icon="fa-plus" background="#F18A33" color="#fff"></kec-button>
               </div>
             </div>
          </div>
          <div class="col-sm-12 p2">
             <div class="col-sm-offset-8 col-sm-2 text">
                渠道时效：4小时
             </div>
             <div class="col-sm-2 text">
                渠道成本：50/件
             </div>
          </div>
        </div>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {KecButton , KecForm ,KecDialog}  from '@/common/components'
import KecWeight from './weightComponents'
import KecRule from './ruleComponents'
import vuedraggable from 'vuedraggable';
  export default {
    name:'channelDialog',
    props:{
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
         input:'',
         payload:{
            "id":"",
            "channelCode":"",
            "channelName":"",
            "channelServiceNodes":[
              {
                "serviceTypeId":null,
                "vendorId":null,
                "vendorProductId":null,
                "partitionId":null,
                "selectArr":[],
                "selectArrs":[],
                "selectArrss":[],
              }
            ]
         },
          selectIndex:null,
          upShow:true,
          downShow:true,
          pushIndex:null

      };
    },

    components: {
        KecButton,
        KecForm,
        KecDialog,
        KecWeight,
        KecRule,
        vuedraggable
    },

    computed: {
      ...mapState('basic',['serverList','vendorsList','channelInfo']),
      ...mapState('vendor',['vendorProductList']),
      ...mapState('channels',['partitionsList'])
    },

    beforeMount() {},

    mounted() {
     this.channelInfo && this.payloadFunC(this.channelInfo)
    },

    methods: {
        ...mapActions('basic',['loadGetVendorsByServiceType','loadChannelPostChannel','loadChannelPutChannel']),
        ...mapMutations('basic',['setVendorsList']),
        ...mapMutations('vendor',['setVendorProductList']),
        ...mapActions('vendor',['loadGetVendorProducts']),
        ...mapActions('channels',['loadGetServicePartitions']),
        cancel() {
            this.$emit('closeFunc',false)
            this.selectIndex=null,
            this.upShow=true,
            this.downShow=true,
            this.closeData()
        },
        closeData(){
          this.payload = {
            "id":"",
            "channelCode":"",
            "channelName":"",
            "channelServiceNodes":[
              {
                "serviceTypeId":null,
                "vendorId":null,
                "vendorProductId":null,
                "partitionId":null,
                "selectArr":[],
                "selectArrs":[],
                "selectArrss":[],

              }
            ]
         }
        },
        delItemFunc(i){
          let arr = this.payload.channelServiceNodes ;
          if(arr.length>1){
            arr.splice(i,1)
          }
        },
        payloadFunC(data){
          this.payload["channelCode"] =data.channelCode ;
          this.payload["channelName"] =data.channelName ;
          this.payload["id"] =data.id ;
          let arr = [
            {
                "serviceTypeId":null,
                "vendorId":null,
                "vendorProductId":null,
                "partitionId":null,
                "selectArr":[],
                "selectArrs":[],
                "selectArrss":[]
              }
          ] 
          if(data && data.vendorProducts && data.vendorProducts.length){
            arr = []
            let arr1 = data.servicePartitionSet
            let arr2 = data.vendorProducts
            arr2.forEach( (item,index)=>{
                item['servicePartition'] = arr1[index].servicePartition ;
            })
            arr2.forEach( (el,index)=>{
              
              let{serviceTypeCode,id,partitionSchema,vendor,servicePartition} = el
              
              this.selectServerType(serviceTypeCode,index)
              vendor && this.selectVendor(vendor.id,index)
              this.selectPartition(id,index)
              let data = {
                "serviceTypeId":serviceTypeCode,
                "vendorId":vendor && vendor.id,
                "vendorProductId":id,
                "partitionId":servicePartition.id
              }
              arr.push(data)
            })
          }
          this.payload["channelServiceNodes"] = arr ;
         
        },
        selectClick(index){
            
            let length = this.payload.channelServiceNodes.length ;
            if(length <= 1 ) return ; 
            this.selectIndex = index ;
            if( index === 0 ){
              this.upShow = true ;
              this.downShow = false ;
            }else if( index === (length - 1) ){
              this.upShow = false ;
              this.downShow = true ;
            }else{
              this.upShow = false ;
              this.downShow = false ;
            }

        },
        addItemFunc(){
          
          let data = {
                "serviceTypeId":null,
                "vendorId":null,
                "vendorProductId":null,
                "partitionId":null,
                "selectArr":[],
                "selectArrs":[],
                "selectArrss":[]
          }
          this.payload.channelServiceNodes.push(data)
        },
        shiftFunc(type,index){
            let arr = JSON.parse( JSON.stringify(this.payload.channelServiceNodes) );
            let i = null ;
            if(type==="up"){
               i = index - 1 ;
               arr.splice(i,0,arr.splice(index,1)[0])
            }else{
               i = index + 1 ;
               arr.splice(index,0,arr.splice(i,1)[0])
            }
           this.selectClick(i) ;
           this.payload.channelServiceNodes = arr ;
        },
        selectServerType(id,index,bool){
           this.loadGetVendorsByServiceType(['getVendorsByServiceType',id]) ;

           if(bool){
              this.$set(this.payload.channelServiceNodes[index],'vendorId', null )
              this.$set(this.payload.channelServiceNodes[index],'vendorProductId', null )
              this.$set(this.payload.channelServiceNodes[index],'partitionId', null )
           } 
        },
        selectVendor(id,index,bool){
           const _ = this ;
           _.loadGetVendorProducts([id]).then(success=>{
             let arr = _.payload.channelServiceNodes;
             let serviceTypeCode = arr[index]['serviceTypeId']
             let arrays = []
             if(_.vendorProductList && _.vendorProductList.length){
               _.vendorProductList.forEach(el=>{
                 if(el.serviceTypeCode==serviceTypeCode){
                     arrays.push(el)
                 }
               })
             }
              _.$set(arr[index], 'selectArrs', arrays)
              
           })
           if(bool){
              _.$set(_.payload.channelServiceNodes[index],'vendorProductId', null );
              _.$set(this.payload.channelServiceNodes[index],'partitionId', null )
           } 
        },
        selectPartition(id,index,bool){
           const _ = this ;
           _.loadGetServicePartitions([id]).then(success=>{
             let arr = _.payload.channelServiceNodes;
             let arrays = []
             if(_.partitionsList && _.partitionsList.length){
               _.partitionsList.forEach(el=>{
                     arrays.push(el)
               })
             }
              _.$set(arr[index], 'selectArrss', arrays)
              
           })
           if(bool) _.$set(_.payload.channelServiceNodes[index],'partitionId', null );
        },
        addChannelFun(){
          let { channelCode,channelName,channelServiceNodes,id} = this.payload ;
          
          let data = {} ;
          let newArr = []
          let newArrs = []
          let arr = JSON.parse(JSON.stringify(channelServiceNodes))
          arr.forEach(el=>{
            let de = {
              "productId":el.vendorProductId,
              "PartitionId":el.partitionId
            }
            newArr.push(el.vendorProductId)
            newArrs.push(de)
          })
          data['channelCode'] = channelCode ;
          data['channelName'] = channelName ;
          data['vendorProductIds'] = newArr ;
          // data['partition'] = newArrs ;
          if(this.channelInfo){
            data['channelId'] = id;
            this.loadChannelPutChannel(data).then(success=>{
                   this.closeData()
                   this.$emit('closeFunc',true)
                   this.selectIndex=null
                   this.upShow=true
                   this.downShow=true
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
          }else{
             this.loadChannelPostChannel(data).then(success=>{
                   this.closeData()
                   this.$emit('closeFunc',true)
                   this.selectIndex=null
                   this.upShow=true
                   this.downShow=true
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
          }
           
        }
    },

    watch: {
      vendorsList:{
        deep:true,
        handler:function(val){
          const _ = this ;

          if(val !==null){
            let obj = JSON.parse(JSON.stringify(val))
            let arr = _.payload.channelServiceNodes;
            let {serviceId,vendors} = obj ;
            
            arr.forEach( (el,index)=>{
              if(serviceId==el.serviceTypeId){
                _.$set(el, 'selectArr', vendors)
              }
            })
            _.setVendorsList(null)
          }
           
        }
      },
      channelInfo:{
        deep:true,
        handler:function(val){
          val && this.payloadFunC(val)
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px

 .row >>> .is-cursor
   .el-input__inner
      cursor pointer !important
 .p2 
   padding 2px 0
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