<template>
  <div>
    <div class="btn-fun flexs j-end">
        <kec-button text="新增产品" icon="fa-plus" @click.native="dislogFunC(!dialogVisible,'ProductDialog')" background="#F18A33" color="#fff"></kec-button>
        <kec-button text="修改资料" icon="fa-pencil" @click.native="dislogFunC(!dialogVisible,'ProductDialog')" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="编辑卖价" icon="fa-trash-o" @click.native="dislogFunC(!dialogVisible,'EditPriceDialog')" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="共享管理" icon="fa-trash-o" @click.native="dislogFunC(!dialogVisible,'ShareDialog')" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="操作日志" icon="fa-trash-o" background="#DC3545" color="#fff"></kec-button>
        <kec-button text="导出Excel" icon="fa-trash-o" background="#6C757D" color="#fff"></kec-button>
    </div>
    <div class="list">
      
        <kec-table 
         height="248px"
         :tableHeader="tableHeader" 
         :lastWidth="lastWidth" 
         :tableData="tableData" 
         :letWidth="letWidth"
         @active-index="activeFunc">
          <template #operation>
            <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
          </template>
          <template v-slot:default="slotProps">
            {{slotProps.item}}
          </template>
          <template v-slot:a="slotProps">
            <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
            <span>{{slotProps.item}}</span>
          </template>
        </kec-table>
      
    </div>
    <component :is="componentName" :dialogVisible="dialogVisible" @closeFunc="cancelFunc"></component>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {KecButton , KecTable ,KecPageHeader}  from '@/common/components'
import ProductDialog from './productDialog'
import EditPriceDialog from './editPriceDialog'
import ShareDialog from './shareDialog'
  export default {
    name:'productManagement',
    props:[''],
    data () {
      return {
          dialogVisible:false,
          componentName:'',
          tableData: [{
             a:'1',
             b:'渠道编码',
             c:'中文名称',
             d:'英文名称',
             e:'渠道类别',
             f:'出/入库渠道'
           },{
             a:'#',
             b:'渠道编码',
             c:'中文名称',
             d:'英文名称',
             e:'渠道类别',
             f:'出/入库渠道'
           },{
             a:'#',
             b:'渠道编码',
             c:'中文名称',
             d:'英文名称',
             e:'渠道类别',
             f:'出/入库渠道'
           }],
           letWidth:{
             "0":"30px"
           },
           lastWidth:'',
           tableHeader:{
             a:{"title":'#','slot':false},
             b:{"title":'客户中文名称','slot':false},
             c:{"title":'客户英文名称','slot':false},
             d:{"title":'启用中的产品','slot':false},
             e:{"title":'被停用的产品','slot':false},
             f:{"title":'共享','slot':false}
             }
             
      };
    },
    components:{
      KecButton,
      KecTable,
      ProductDialog,
      EditPriceDialog,
      ShareDialog,
      KecPageHeader
    },
    computed: {
      ...mapState('home',['tabsShow']),
    },
    methods: {
      dislogFunC(bool,component) {
          this.dialogVisible = bool ;
          this.componentName = component ;
      },
      cancelFunc(propsBool) {
         this.dialogVisible = propsBool ;
      },
      activeFunc(index) {
          console.log(index,'index')
      }
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