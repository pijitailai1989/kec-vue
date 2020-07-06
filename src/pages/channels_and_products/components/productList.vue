<template>
  <div>
    <div class="btn-fun flexs j-end">
        <kec-button
        text="新增产品" icon="fa-plus" 
        @click.native="dislogFunC('新增产品',!dialogVisible,'ProductDialog')" 
        background="#F18A33" color="#fff"></kec-button>
        <kec-button-click 
         style="margin-right:10px"
         :disabled="selectIndex===null"  
         text="修改产品" icon="fa-pencil"
         @click="dislogFunC('修改产品',!dialogVisible,'ProductDialog','eqit')" 
         background="#17A2B8" color="#fff"></kec-button-click>
        <!-- <kec-button text="编辑卖价" icon="fa-trash-o" @click.native="dislogFunC(!dialogVisible,'EditPriceDialog')" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="共享管理" icon="fa-trash-o" @click.native="dislogFunC(!dialogVisible,'ShareDialog')" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="操作日志" icon="fa-trash-o" background="#DC3545" color="#fff"></kec-button>
        <kec-button text="导出Excel" icon="fa-trash-o" background="#6C757D" color="#fff"></kec-button> -->
        <el-popover
            placement="bottom-start"
            width="160"
            :disabled="selectIndex===null"
            v-model="visible">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="cancelFunc(false)">取消</el-button>
              <el-button type="primary" size="mini" @click.native="delFunc(selectItem.id)">确定</el-button>
            </div>
            <kec-button slot="reference"
              :disabled="selectIndex===null" text="删除产品" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
        </el-popover>
    </div>
    <div class="list">
      
        <kec-table 
         height="251px"
         :tableHeader="tableHeader" 
         :lastWidth="lastWidth" 
         :tableData="productsList" 
         :letWidth="letWidth"
         :selectIndex="selectIndex"
         @active-item="activeItem"
         @active-index="activeFunc">
          <template #productId>
            <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
          </template>
          <template v-slot:default="slotProps">
            {{slotProps.item}}
          </template>
          <template v-slot:needCargoTracking="slotProps">
            <span>{{slotProps.item?'是':'否'}}</span>
          </template>
        </kec-table>
      
    </div>
    <component :is="componentName" :dialogVisible="dialogVisible" @closeFunc="cancelFunc" :text="textItem"></component>
  </div>
</template>

<script>
import {mapState,mapActions, mapMutations} from 'vuex'
import {KecButton , KecTable ,KecPageHeader,KecButtonClick}  from '@/common/components'
import ProductDialog from './productDialogs'
import EditPriceDialog from './editPriceDialog'
import ShareDialog from './shareDialog'
  export default {
    name:'productManagement',
    props:[''],
    data () {
      return {
           visible:false,
           dialogVisible:false,
           componentName:'',
           tableData: [],
           letWidth:{
             "0":"100px",
             "3":"120px",
             "4":"120px",
             "5":"100px"
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'ID','slot':false},
             name:{"title":'产品名称','slot':false,'sort':'ZH'},
             code:{"title":'产品编码','slot':false,'sort':'OTHER'},
             destinationCountryCode:{"title":'目的地区/国家','slot':false,'sort':'ZH'},
             shippingCountryCode:{"title":'起运国家','slot':false,'sort':'ZH'},
             needCargoTracking:{"title":'货态跟踪','slot':true}
           },
           selectIndex:null,
           selectItem:null,
           textItem:''
             
      };
    },
    components:{
      KecButton,
      KecTable,
      ProductDialog,
      EditPriceDialog,
      ShareDialog,
      KecPageHeader,
      KecButtonClick
    },
    computed: {
      ...mapState('home',['tabsShow']),
      ...mapState('basic',['productsList','tagTypeClass','tagsData']),
    },
    methods: {
      ...mapActions('basic',['loadChannelGetChannels',
      'loadDeleteProducts',
      'loadPaymentMethods',
      'loadDictionaryCURRENCY',
      'loadChargeUnits',
      'loadCountryQueryAll',
      'loadProductsSimpleList',
      'loadProductsId',
      'loadGetTags']),
      ...mapActions('channels',['loadGetProductTypes']),
      ...mapActions('vendor',['loadGetPartitionSchemasAll']),
      ...mapMutations('basic',['setProductsInfo','setProductsId','setDestination','setDestinationShow']),
      
      activeFunc(index) {
          this.selectIndex = index ;
      },
      activeItem(item){
        this.selectItem = item ;
      },
      dislogFunC(text,bool,component,type) {
          this.textItem = text ;
          this.dialogVisible = bool ;
          this.componentName = component ;
          // type==='eqit' && this.setProductsInfo(this.selectItem)
          type==='eqit' && this.loadProductsId([this.selectItem.id])
          // type==='eqit' && this.setProductsInfo(this.selectItem.productId)
      },
      cancelFunc(propsBool) {
         this.dialogVisible = false ;
         this.visible = false ;
         this.selectIndex = null ;
         this.selectItem = null ;
         this.textItem = '' ;
         this.setProductsInfo(null)
         this.setDestination(null)
         this.setDestinationShow(false)
         propsBool && this.loadProductsSimpleList()
         
      },
      delFunc(id){
         this.loadDeleteProducts({data:{id}}).then(success=>{
                   this.cancelFunc(true)
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
      mountFunc(size,num){
          const _ = this ;
          let data = {
            pageSize:size,
            pageNumber:num
          }
          
          _.loadGetTags(data) ;
        },
    
    },
    mounted(){
      this.loadGetPartitionSchemasAll({partitionType:"sale"})
      this.loadChannelGetChannels()
      this.loadPaymentMethods()
      this.loadDictionaryCURRENCY()
      this.loadChargeUnits()
      this.loadProductsSimpleList()
      this.loadCountryQueryAll()
      this.mountFunc(10000,1)
      this.loadGetProductTypes()
    }

  }

</script>
<style lang='stylus' scoped>
 .btn-fun  
   background #fff
   border-radius 4px
   padding 15px
   margin-top 10px
 .list 
   border-radius 4px
   margin-top 10px 
   width 100% 
   padding 1px   
   background #fff
 .kec-button+.kec-button 
   margin-left 10px
</style>