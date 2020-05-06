<template>
    <kec-drag 
      boxWidth="960px" client
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button-click :loading="loading" 
           text="储存" icon="fa-floppy-o" @click="clickConfirm(orderInfos)" background="#28A745" color="#fff">

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
                :indexs="indexss"
                :titleList="['订单基本信息','发件人','收件人','货物信息','标签信息']"
                @change="tabsFunc"
                >
                  <template>
                    <div>
                      <order-info @closeFunc="cancelFunc" v-show="componentName==='orderInfo'"></order-info>
                      <cargo-info v-show="componentName==='cargoInfo'"></cargo-info>
                      <addresser v-show="componentName==='addresser'"></addresser>
                      <recipients v-show="componentName==='recipients'"></recipients>
                      <tag-info v-show="componentName==='tagInfo'"></tag-info>
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
import orderInfo from './orderInfo'
import cargoInfo from './cargoInfo'
import tagInfo from './tagInfo'
import addresser from './addresser'
import recipients from './recipients'
  export default {
    name:'orderDialog',
    props:{
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
        indexss:0,
         server:null,
         channerls:null,
         product:null,
         goods:null,
         payload:{
           "categoryTagSet":[],
           "weightTagSet":[],
           "servicePartitionList":[],
           "channelList":[]
         },
         loading:false,
         componentName:"orderInfo"
      };
    },

    components: {
        KecButton,
        KecButtonClick,
        KecForm,
        KecDialog,
        KecTabs,
        orderInfo,
        recipients,
        addresser,
        cargoInfo,
        tagInfo,
        KecDrag
    },

    computed: {
      ...mapState('order',['orderInfos'])
    },

    beforeMount() {},

    mounted() {
      
    },

    methods: {
        ...mapActions('order',['loadPutOrders']),
        cancel() {
            this.$emit('closeFunc',false)
        },
        cancelFunc(){
            this.$emit('closeFunc',true)
        },
        tabsFunc(index) {
            let arr = ['orderInfo','addresser','recipients','cargoInfo','tagInfo'] ;
            this.componentName = arr[index] ;
        },
        clickConfirm(data){
           this.loading = true ;
             this.loadPutOrders(data).then(success=>{
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
           
           
        },
        
    },

    watch: {
      dialogVisible( newVal , oldVal ) {
        this.componentName = 'orderInfo'
        this.indexss ++
      },
      
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