<template>
  <div>
    <div class="btn-fun flexs j-end">
        <kec-button text="新增结点" icon="fa-plus" @click.native="newChannel(!dialogVisible)" background="#F18A33" color="#fff"></kec-button>
        <kec-button text="修改结点" icon="fa-trash-o" background="#17A2B8" color="#fff"></kec-button>
        <kec-button text="操作日志" icon="fa-trash-o" background="#DC3545" color="#fff"></kec-button>
        <kec-button text="导出Excel" icon="fa-trash-o" background="#6C757D" color="#fff"></kec-button>
    </div>
    <div class="list">
      
        <kec-table 
         :height="tabsShow=='show'?'calc( 100vh - 292px )':'calc( 100vh - 248px )'"
         :tableHeader="tableHeader" 
         :lastWidth="lastWidth" 
         :tableData="tableData" 
         :letWidth="letWidth"
         @active-index="activeFunc"
        >
          
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
import {KecButton , KecTable }  from '@/common/components'
import NodeDialog from './nodeDialog'
  export default {
    name:'nodeManagement',
    props:[''],
    data () {
      return {
          dialogVisible:false,
          componentName:'NodeDialog',
          tableData: [{
             a:'序列',
             b:'结点编码',
             c:'英文名称',
             d:'中文名称',
             e:'阶段',
             f:'提供状态',
             g:'使用中的流程',
             h:'使用中的渠道',
             i:'使用中的产品'
           },{
             a:'序列',
             b:'结点编码',
             c:'英文名称',
             d:'中文名称',
             e:'阶段',
             f:'提供状态',
             g:'使用中的流程',
             h:'使用中的渠道',
             i:'使用中的产品'
           }],
           letWidth:{
           },
           lastWidth:null,
           tableHeader:{
             a:{"title":'序列','slot':false},
             b:{"title":'结点编码','slot':false},
             c:{"title":'英文名称','slot':false},
             d:{"title":'中文名称','slot':false},
             e:{"title":'阶段','slot':false},
             f:{"title":'提供状态','slot':false},
             g:{"title":'使用中的流程','slot':false},
             h:{"title":'使用中的渠道','slot':false},
             i:{"title":'使用中的产品','slot':false}
             }
             
      };
    },
    components:{
      KecButton,
      KecTable,
      NodeDialog
    },
    computed: {
      ...mapState('home',['tabsShow']),
    },
    methods: {
      newChannel(bool) {
         this.dialogVisible = bool ;
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
   position relative 
   border-radius 4px
   margin-top 10px 
   width 100% 
   padding 1px   
   background #fff
 .kec-button+.kec-button 
   margin-left 10px
</style>