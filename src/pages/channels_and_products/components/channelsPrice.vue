<template>
  <div style="padding:5px">
    <div class="flexs kec-btn j-end">
      <el-popover
        placement="bottom-end"
        width="360"
        v-model="addVisible"
        trigger="click">
        <add-channel @close="closeFunc" type="addVisible"></add-channel>
        <kec-button slot="reference" text="新增资源组合" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <!-- <el-popover
        placement="bottom-end"
        width="360"
        v-model="changeVisible"
        :disabled="selectIndex===null"
        trigger="click">
        <add-channel @close="closeFunc" type="changeVisible"  :item="selectItem"></add-channel>
        <kec-button  :disabled="selectIndex===null" slot="reference" text="修改分区" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
      </el-popover> -->
      <el-popover
            placement="bottom-start"
            width="160"
            :disabled="selectIndex===null"
            v-model="visible">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click.native="closeFunc">取消</el-button>
              <el-button type="primary" size="mini" @click.native="delItem(selectIndex)">确定</el-button>
            </div>
        <kec-button :disabled="selectIndex===null" slot="reference"
        text="删除资源组合" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </el-popover>
    </div>
    <div class="kec-content">
          <kec-table 
           height="276"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="tableData" 
           :letWidth="letWidth"
           :selectIndex="selectIndex"
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {KecButton , KecTable }  from '@/common/components'
import addChannel from './addChannel' 
  export default {
    name:'serverDivision',
    props:{
      
    },
    data () {
      return {
         tableData: [],
           letWidth:{
             "0":"80px"
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'ID','slot':false},
             channelName:{"title":'资源组名称','slot':false},
             channelCode:{"title":'资源组编号','slot':false},
            //  a:{"title":'供应商产品','slot':false},
            //  averageCostVolume:{"title":'平均成本','slot':false},
            //  grossProfit:{"title":'毛利','slot':false},
            //  useTime:{"title":'时效','slot':false}
            },
            selectIndex:null,
            selectItem:null,
            addVisible:false,
            visible:false,
            changeVisible:false,
      };
    },

    components: {
        KecButton ,
        KecTable,
        addChannel
    },

    computed: {
      ...mapState('basic',['productsInfo'])
    },

    beforeMount() {},

    mounted() {
      this.productsInfoFunc(this.productsInfo)
    },

    updated(){
      this.$emit('updata',this.tableData)
    },

    methods: {
        productsInfoFunc(infos){
          let info = JSON.parse(JSON.stringify(infos)) ;
          if( info && info.id ){
           let { channels } = info 
           this.tableData = channels ;
          }
        },
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item
        },
        closeFunc(data){
          if(data.bool) {
            const result = this.tableData.find( ( el ) => el.id === data.data.id );
            if(result){
               this.$message( {
                    message: '资源组已经被添加!',
                    type: 'warning'
                   });
            }else{
              console.log(data.data,'data.data')
               this.tableData.push(data.data)
            }
          }
          if(data.type){
              this[data.type] = false ;
          } 
          this.selectIndex = null ;
          this.visible = false ;
        },
        delItem(i){
          this.tableData.splice(i,1)
          this.visible = false ;
          this.selectIndex = null ;
        }
    },

    watch: {
      productsInfo:{
        deep:true,
        handler:function(val){
          this.productsInfoFunc(val)
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button   
   margin-left 10px
 .kec-btn  
   padding 5px        
 .kec-content  
   padding 0 2px
</style>