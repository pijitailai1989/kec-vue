<template>
  <div>
    <div class="btn-fun flexs j-end">
        <kec-button text="新增状态" icon="fa-plus" @click.native="newChannel(!dialogVisible)" background="#F18A33" color="#fff"></kec-button>
        <kec-button text="修改状态" icon="fa-trash-o" background="#17A2B8" color="#fff"></kec-button>
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
import StateDialog from './stateDialog'
  export default {
    name:'stateList',
    props:[''],
    data () {
      return {
          dialogVisible:false,
          componentName:'StateDialog',
          tableData: [{
             a:'序列',
             b:'状态编码',
             c:'英文名称',
             d:'中文名称',
             e:'启用',
             f:'客户可视',
             g:'异常状态',
             h:'备注',
             i:'使用中的流程',
             j:'绑定的异常状态'
           },{
             
             f:'客户可视',
             g:'异常状态',
             h:'备注',
             i:'使用中的流程',
             j:'绑定的异常状态',
             a:'序列',
             b:'状态编码',
             c:'英文名称',
             d:'中文名称',
             e:'启用'
           },{
             a:'序列',
             b:'状态编码',
             c:'英文名称',
             d:'中文名称',
             e:'启用',
             f:'客户可视',
             g:'异常状态',
             h:'备注',
             i:'使用中的流程',
             j:'绑定的异常状态'
           }],
           letWidth:{
             "0":"50px",
             "4":"80px",
             "5":"80px",
             "6":"80px",
           },
           lastWidth:null,
           tableHeader:{
             a:{"title":'序列','slot':false},
             b:{"title":'状态编码','slot':false},
             c:{"title":'英文名称','slot':false},
             d:{"title":'中文名称','slot':false},
             e:{"title":'启用','slot':false},
             f:{"title":'客户可视','slot':false},
             g:{"title":'异常状态','slot':false},
             h:{"title":'备注','slot':false},
             i:{"title":'使用中的流程','slot':false},
             j:{"title":'绑定的异常状态','slot':false}
            
             }
             
      };
    },
    components:{
      KecButton,
      KecTable,
      StateDialog
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