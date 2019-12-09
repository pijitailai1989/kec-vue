<template>
  <div>
    <div class="btn-fun flexs j-end">
        <kec-button text="新增渠道" icon="fa-plus" @click.native="dislogFunC(!dialogVisible,'ChannelDialog')" background="#F18A33" color="#fff"></kec-button>
        <kec-button text="修改资料" icon="fa-pencil" @click.native="dislogFunC(!dialogVisible,'ChannelDialog')" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="编辑成本" icon="fa-trash-o" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="共享管理" icon="fa-trash-o" @click.native="dislogFunC(!dialogVisible,'ShareDialog')" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="操作日志" icon="fa-trash-o" background="#DC3545" color="#fff"></kec-button>
        <kec-button text="导出Excel" icon="fa-trash-o" background="#6C757D" color="#fff"></kec-button>
    </div>
    <div class="list">
      
        <kec-table 
         height="248px"
         :tableHeader="tableHeader" 
         :lastWidth="lastWidth" 
         :tableData="channelsList" 
         :letWidth="letWidth"
         @active-item="activeItem"
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
import {mapState,mapActions} from 'vuex'
import {KecButton , KecTable ,KecPageHeader}  from '@/common/components'
import ChannelDialog from './channelDialogs'
import ShareDialog from './shareDialog'
  export default {
    name:'channelManagement',
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
             f:'出/入库渠道',
             g:'承运商',
             h:'渠道功能',
             i:'创建公司',
             j:'创建人',
             y:'共享'
           },{
             a:'#',
             b:'渠道编码',
             c:'中文名称',
             d:'英文名称',
             e:'渠道类别',
             f:'出/入库渠道',
             g:'承运商',
             h:'渠道功能',
             i:'创建公司',
             j:'创建人',
             y:'共享'
           }],
           letWidth:{
             "0":"40px"
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'#','slot':false},
             channelCode:{"title":'渠道编码','slot':false}
           },
           selectItem:null
             
      };
    },
    components:{
      KecButton,
      KecTable,
      ChannelDialog,
      ShareDialog,
      KecPageHeader
    },
    computed: {
      ...mapState('home',['tabsShow']),
      ...mapState('basic',['channelsList'])
    },
    methods: {
      ...mapActions('basic',['loadQueryServerTypes','loadChannelGetChannels']),
      dislogFunC(bool,component) {
          this.dialogVisible = bool ;
          this.componentName = component ;
      },
      cancelFunc(propsBool) {
         this.dialogVisible = propsBool ;
         this.loadChannelGetChannels()
      },
      activeFunc(index) {
          console.log(index,'index')
      },
      activeItem(item){
          this.selectItem = item
          console.log(item,'item')
        },
    },
    mounted(){
      this.loadQueryServerTypes()
      this.loadChannelGetChannels()
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