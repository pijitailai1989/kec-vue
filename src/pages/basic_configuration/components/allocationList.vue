<template>
    <kec-dialog 
      boxWidth="960px"
      boxTop="12vh"
      v-show="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">号段池</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <!-- <kec-button @click.native="bindCodeFun(payload)" text="绑定" icon="fa-floppy-o" background="#28A745" color="#fff"></kec-button> -->
           <kec-button @click.native="cancel" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <template>
          <div class="kec-content">
                <kec-table 
                height="260px"
                :tableHeader="tableHeader" 
                :lastWidth="lastWidth" 
                :tableData="relationList" 
                :letWidth="letWidth"
                :selectIndex="selectIndex">
                  <template #operation>
                    <kec-button text="操作" icon="fa-trash-o" background="#F18A33" color="#fff"></kec-button>
                  </template>
                  <template v-slot:default="slotProps">
                    {{slotProps.item}}
                  </template>
                  <template v-slot:isLoop="slotProps">
                    <span>{{slotProps.item == 1 ?'是':'否'}}</span>
                  </template>
                </kec-table>
          </div>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {KecButton , KecForm ,KecDialog,KecTable}  from '@/common/components'
import { formatDate } from '@/utils/fun'
  export default {
    name:'allocationList',
    props:{
      dialogVisible:Boolean,
      text:String,
      item:Object
    },
    data () {
      return {
           letWidth:{
             
           },
           lastWidth:'',
           tableHeader:{
             productCode:{"title":'产品编号','slot':false},
             startCode:{"title":'起始编码','slot':false},
             endCode:{"title":'结束编码','slot':false},
             nextCode:{"title":'下一份编号','slot':false},
             productName:{"title":'产品名称','slot':false},
             customerName:{"title":'客户名称','slot':false},
             usableCopy:{"title":'可用份数','slot':false},
             isLoop:{"title":'循环使用','slot':true}
             
           },
           selectIndex:null,
           selectItem:null
          

      }
    },

    components: {
        KecButton,
        KecForm,
        KecDialog,
        KecTable
    },

    computed: {
      ...mapState('customer',['relationList']),
    },

    beforeMount() {},

    mounted() {
     
    },

    methods: {
        
        cancel() {
            this.$emit('closeFunc',false)
            
        },
        
        
        
    },

    watch: {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px
 .kec-content  
    padding 10px 0
 .row >>> .is-cursor
   .el-input__inner
      cursor pointer !important
 .p2 
   padding 2px 0
 .active  
   background #Fff
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
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding 5px
   &.pro  
     height 99px   
     margin-bottom 4px
   &.err  
     min-height 40px
  .flx  
     flex 1
</style>