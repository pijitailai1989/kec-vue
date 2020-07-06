<template>
  <div>
    <div class="btn-fun flexs j-end">
        <kec-button text="新增资源组合" 
        icon="fa-plus" 
        @click.native="dislogFunC('新增资源组合',!dialogVisible,'ChannelDialog')" 
        background="#F18A33" 
        color="#fff"></kec-button>
        <kec-button-click text="编辑资源组合" 
        icon="fa-pencil" 
        :disabled="selectIndex===null"  
        @click="dislogFunC('编辑资源组合',!dialogVisible,'ChannelDialog','eqit')" 
        background="#17A2B8" 
        color="#fff"></kec-button-click>
        <!-- <kec-button text="编辑成本" icon="fa-trash-o" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="共享管理" icon="fa-trash-o" @click.native="dislogFunC(!dialogVisible,'ShareDialog')" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="操作日志" icon="fa-trash-o" background="#DC3545" color="#fff"></kec-button>
        <kec-button text="导出Excel" icon="fa-trash-o" background="#6C757D" color="#fff"></kec-button> -->
    </div>
    <div class="list">
      
        <kec-table 
         height="283px"
         :tableHeader="tableHeader" 
         :lastWidth="lastWidth" 
         :tableData="channelLists" 
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
          <template v-slot:vendorProduct="slotProps">
                  <el-popover
                    placement="left"
                    width="300"
                    v-show="slotProps.item.length>0"
                    trigger="hover">
                    <div v-if="slotProps.item.length>0">
                      <el-tag class="pr" type="info" size="small"
                       v-for="(item,i) of slotProps.item" :key="i"
                       >{{item.name}}</el-tag>
                    </div>
                    <div v-else>
                       <el-tag class="pr" type="info" size="small">暂无数据</el-tag>
                    </div>
                    <el-tag class="pr ell" type="info" slot="reference" size="small">{{slotProps.item[0]['name']}}</el-tag>
                  </el-popover>
          </template>
        </kec-table>
        <div class="flexs j-end">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page.sync="PageNum"
          :page-size="PageSize"
          :total="total">
        </el-pagination>
      </div>
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
             "0":"60px",
             "2":"150px"
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'ID','slot':false},
            //  channelCode:{"title":'渠道编码','slot':false,'sort':'ZH'},
             channelName:{"title":'资源组合名称','slot':false,'sort':'ZH'},
             vendorProduct:{"title":'供应商产品','slot':true},
            //  averageCostWeight:{"title":'成本','slot':false},
            //  averageCostVolume:{"title":'平均成本','slot':false},
            //  grossProfit:{"title":'毛利','slot':false},
            //  useTime:{"title":'时效','slot':false}
           },
           selectItem:null,
           selectIndex:null,
           selectItem:null,
           textItem:'',
           PageSize:20,
           PageNum:1,
           total:null,
           channelLists:[]
             
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
      ...mapState('basic',['channelsList','channelsObj'])
    },
    methods: {
      ...mapActions('basic',['loadQueryServerTypes','loadChannelGetChannels','loadGetChannels']),
      ...mapMutations('basic',['setChannelInfo']),
      handleCurrentChange(page){
          this.PageNum = page ;
          this.mountFunc(this.PageSize,page)
      },
      mountFunc(size,num){
        const _ = this ;
        let data = {
          pageSize:size,
          pageNumber:num
        }
        _.loadGetChannels(data).then(success => {
          let {content,totalElements} = _.channelsObj;
          _.channelLists = content ;
          _.total = totalElements ;
        })
      },
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
         propsBool && this.mountFunc(this.PageSize,this.PageNum)
         
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
      this.mountFunc(this.PageSize,this.PageNum)
      // this.loadChannelGetChannels()
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
 .pr+.pr
    margin-left 5px  
    margin-bottom 5px
 .ell 
    width 80px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    cursor pointer

</style>