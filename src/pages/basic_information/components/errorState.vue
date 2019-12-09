<template>
  <div>
    <div class="btn-fun flexs j-end">
        <kec-button text="新增状态" icon="fa-plus" @click.native="newChannel(!dialogVisible)" background="#F18A33" color="#fff"></kec-button>
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
import {KecButton , KecTable}  from '@/common/components'
import ErrorDialog from './errorDialog'
  export default {
    name:'stateManagement',
    props:[''],
    data () {
      return {
          dialogVisible:false,
          componentName:'ErrorDialog',
          tableData: [{
             a:'#',
             b:'所属的状态',
             c:'异常状态编码',
             d:'英文名称',
             e:'中文名称',
             f:'启用',
             g:'客户可视',
             h:'公共可视',
             i:'报警',
             j:'备注'
           }],
           letWidth:{
             "0":"50px",
             "4":"80px",
             "5":"80px",
             "6":"80px",
           },
           lastWidth:null,
           tableHeader:{
             a:{"title":'#','slot':false},
             b:{"title":'所属的状态','slot':false},
             c:{"title":'异常状态编码','slot':false},
             d:{"title":'英文名称','slot':false},
             e:{"title":'中文名称','slot':false},
             f:{"title":'启用','slot':false},
             g:{"title":'客户可视','slot':false},
             h:{"title":'公共可视','slot':false},
             i:{"title":'报警','slot':false},
             j:{"title":'备注','slot':false}
            
             }
             
      };
    },
    components:{
      KecButton,
      KecTable,
      ErrorDialog
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