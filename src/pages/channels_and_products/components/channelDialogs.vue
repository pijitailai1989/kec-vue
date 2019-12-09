<template>
    <kec-dialog 
      boxWidth="800px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">新增渠道</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button @click.native="addChannelFun" text="新增" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button>
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
        <div class="row">
          <div class="col-sm-12 flexs a-center p2">
             <div class="col-sm-2 text bold">
                渠道名称/编码
             </div>
             <div class="col-sm-3">
                <el-input v-model="payload.channelCode" placeholder="" size="medium"></el-input>
             </div>
          </div>
          <div class="col-sm-12 p2">
                <div class="col-sm-2 flexs columns a-center" style="padding:30px 0">
                      <i v-if="upShow" class="fa fa-arrow-up fa-2x" style="padding:10px;color:#ccc"></i>
                      <i v-else @click="shiftFunc('up',selectIndex)" class="cur fa fa-arrow-up fa-2x" style="padding:10px;color:#F18A33"></i>
                      <i v-if="downShow" class="fa fa-arrow-down fa-2x" style="padding:10px;color:#ccc"></i>
                      <i v-else @click="shiftFunc('down',selectIndex)" class="cur fa fa-arrow-down fa-2x" style="padding:10px;color:#F18A33"></i>
                </div>
                <div class="col-sm-10 flexs columns bor a-center p2">
                    <div class="col-sm-12 flexs a-center back p2">
                      <div class="col-sm-5 text bold">
                          选择服务
                      </div>
                      <div class="col-sm-5 text bold">
                          选择服务商
                      </div>
                      <div class="col-sm-2 text bold">
                          操作时效
                      </div>
                    </div>
                    <div class="col-sm-12 flexs a-center p2 cur" 
                     @click="selectClick(index)" 
                     v-for="(item,index) of payload.channelServiceNodes" 
                     :class="[selectIndex===index?'active':'']"
                     :key="index">
                      <div class="col-sm-5 flexs">
                          <el-select v-model="item.serviceTypeId" @change="selectServerType(item.serviceTypeId,index)" placeholder="请选择" size="medium" style="width:70%">
                            <el-option
                              v-for="item in serverList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </div>
                      <div class="col-sm-5 flexs">
                          <el-select v-model="item.vendorId" placeholder="请选择" size="medium" style="width:80%">
                            <el-option
                              v-for="item in item.selectArr"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                      </div>
                      <div class="col-sm-2 text">
                          {{item.text}}小时
                      </div>
                    </div>
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
import {mapState, mapActions} from 'vuex'
import {KecButton , KecForm ,KecDialog}  from '@/common/components'
import KecWeight from './weightComponents'
import KecRule from './ruleComponents'
  export default {
    name:'channelDialog',
    props:{
      dialogVisible:Boolean,
      
    },
    data () {
      return {
         input:'',
         payload:{
            "channelCode":"",
            "channelServiceNodes":[
              {
                "serviceTypeId":null,
                "vendorId":null,
                "selectArr":[]
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
        KecRule
    },

    computed: {
      ...mapState('basic',['serverList','vendorsList']),
    },

    beforeMount() {},

    mounted() {},

    methods: {
        ...mapActions('basic',['loadGetVendorsByServiceType','loadChannelPostChannel']),
        cancel() {
            this.$emit('closeFunc',false)
            this.selectIndex=null,
            this.upShow=true,
            this.downShow=true,
            this.pushIndex=null
            this.closeData()
        },
        closeData(){
          this.payload = {
            "channelCode":"",
            "channelServiceNodes":[
              {
                "serviceTypeId":null,
                "vendorId":null,
                "selectArr":[]
              }
            ]
         }
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
                "selectArr":[]
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
        selectServerType(id,index){
           this.loadGetVendorsByServiceType(['vendor','getVendorsByServiceType',id]) ;
           this.pushIndex = index ;
        },
        addChannelFun(){
          let { channelCode,channelServiceNodes} = this.payload ;
          let data = {} ;
          let newArr = []
          let arr = JSON.parse(JSON.stringify(channelServiceNodes))
          arr.forEach(el=>{
            let de = {
              "serviceTypeId":el.serviceTypeId,
              "vendorId":el.vendorId
            }
            newArr.push(de)
          })
          data['channelCode'] = channelCode ;
          data['channelServiceNodes'] = newArr ;
           this.loadChannelPostChannel(data).then(success=>{
                   this.closeData()
                   this.$emit('closeFunc',false)
                   this.selectIndex=null,
                   this.upShow=true,
                   this.downShow=true,
                   this.pushIndex=null
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
    },

    watch: {
      vendorsList:{
        deep:true,
        handler:function(val){
           const _ = this ;
           let arr = JSON.parse(JSON.stringify(val))
           this.payload.channelServiceNodes[_.pushIndex]['selectArr'] = arr ;
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
   background #FDCEA6
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