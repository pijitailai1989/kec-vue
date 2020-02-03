<template>
  <div>
    <div class="btn-fun flexs j-end">
        <kec-button text="新增渠道" 
        icon="fa-plus" 
        @click.native="dislogFunC('新增渠道',!dialogVisible,'ChannelDialog')" 
        background="#F18A33" 
        color="#fff"></kec-button>
        <kec-button-click text="修改渠道" 
        icon="fa-pencil" 
        :disabled="selectIndex===null"  
        @click="dislogFunC('修改渠道',!dialogVisible,'ChannelDialog','eqit')" 
        background="#17A2B8" 
        color="#fff"></kec-button-click>
        <!-- <kec-button text="编辑成本" icon="fa-trash-o" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="共享管理" icon="fa-trash-o" @click.native="dislogFunC(!dialogVisible,'ShareDialog')" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="操作日志" icon="fa-trash-o" background="#DC3545" color="#fff"></kec-button>
        <kec-button text="导出Excel" icon="fa-trash-o" background="#6C757D" color="#fff"></kec-button> -->
    </div>
    <div class="list">
      
        <kec-table 
         height="248px"
         :tableHeader="tableHeader" 
         :lastWidth="lastWidth" 
         :tableData="channelsList" 
         :letWidth="letWidth"
         :selectIndex="selectIndex"
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
    <component :is="componentName" :dialogVisible="dialogVisible" @closeFunc="cancelFunc" :text="textItem"></component>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecPageHeader,KecButtonClick}  from '@/common/components'
import ChannelDialog from './channelDialogs'
import ShareDialog from './shareDialog'
  export default {
    name:'channelManagement',
    props:[''],
    data () {
      return {
          visible:false,
          dialogVisible:false,
          componentName:'',
          tableData: [],
           letWidth:{
             "0":"60px"
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'id','slot':false},
             channelCode:{"title":'渠道编码','slot':false},
             averageCostWeight:{"title":'成本','slot':false},
             averageCostVolume:{"title":'平均成本','slot':false},
             grossProfit:{"title":'毛利','slot':false},
             useTime:{"title":'时效','slot':false}
           },
           selectItem:null,
           selectIndex:null,
           selectItem:null,
           textItem:''
             
      };
    },
    components:{
      KecButton,
      KecTable,
      ChannelDialog,
      ShareDialog,
      KecPageHeader,
      KecButtonClick
    },
    computed: {
      ...mapState('home',['tabsShow']),
      ...mapState('basic',['channelsList'])
    },
    methods: {
      ...mapActions('basic',['loadQueryServerTypes','loadChannelGetChannels']),
      ...mapMutations('basic',['setChannelInfo']),
      dislogFunC(text,bool,component,type) {
          this.textItem = text ;
          this.dialogVisible = bool ;
          this.componentName = component ;
          type==='eqit' && this.setChannelInfo(this.selectItem)
      },
      cancelFunc(propsBool) {
         this.dialogVisible = false ;
         this.visible = false ;
         this.selectIndex = null ;
         this.selectItem = null ;
         this.textItem = '' ;
         this.setChannelInfo(null)
         propsBool && this.loadChannelGetChannels()
         
      },
      activeFunc(index) {
          this.selectIndex = index ;
      },
      activeItem(item){
          this.selectItem = item
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