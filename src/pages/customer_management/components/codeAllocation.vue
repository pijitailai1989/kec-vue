<template>
  <kec-scroll :numbers="219">
    <div class="flexs kec-btn j-end" ref="box">
      <!-- <el-popover
        placement="left-start"
        width="360"
        v-model="addVisible"
        trigger="click">
        <kec-unit @close="closeFunc" type="addVisible"></kec-unit>
        <kec-button slot="reference" text="" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="360"
        v-model="changeVisible"
        :disabled="selectIndex===null"
        trigger="click">
        <kec-unit @close="closeFunc" type="changeVisible" :item="selectItem"></kec-unit>
        <kec-button :disabled="selectIndex===null" slot="reference" text="" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="160"
        :disabled="selectIndex===null"
        v-model="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click.native="delFunc">确定</el-button>
        </div>
        <kec-button slot="reference"
          :disabled="selectIndex===null" text="" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </el-popover> -->
      <kec-button
          text="配置" icon="fa-plus" background="#DC3545" @click.native="goUrlFunC" color="#fff"></kec-button>
    </div>
    <div class="kec-content">
          <kec-table 
           height="221px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="relationList" 
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
            <template v-slot:isLoop="slotProps">
              <span>{{slotProps.item == 1 ?'是':'否'}}</span>
            </template>
          </kec-table>
    </div>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll }  from '@/common/components'
// import KecUnit from './addUnit' 
  export default {
    name:'codeAllocation',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           letWidth:{
             
           },
           lastWidth:'',
           tableHeader:{
             productCode:{"title":'产品编号','slot':false,'sort':'ZH'},
             startCode:{"title":'起始编码','slot':false,'sort':'ZH'},
             endCode:{"title":'结束编码','slot':false,'sort':'ZH'},
             nextCode:{"title":'下一份编号','slot':false,'sort':'ZH'},
             productName:{"title":'产品名称','slot':false},
             customerName:{"title":'客户名称','slot':false},
             usableCopy:{"title":'可用数量','slot':false},
             isLoop:{"title":'循环使用','slot':true}
             
           },
           selectIndex:null,
           selectItem:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecScroll
    },

    computed: {
      ...mapState('customer',['relationList']),
      ...mapState('basic',['ventorsId']),
    },

    beforeMount() {},

    mounted() {
      this.loadGetQueryRelation({customerId:this.ventorsId})
    },

    methods: {
        ...mapActions('customer',['loadGetQueryRelation']),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item ;
        },
        closeFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          if(data.bool) {
            this.loadChargeUnits()
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        goUrlFunC(){
           this.$router.push({path:'/basic-config'})
           localStorage.setItem('goUrl',
             JSON.stringify({
               index:7,name:'codeRule'
             })
           )
        },
        delFunc(){
          if(this.selectIndex!==null) {
            this.loadDelChargeUnit({data:{id:this.selectItem.id}}).then(success=> {
                   this.selectIndex = null ;
                   this.loadChargeUnits()
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                  this.selectIndex = null ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
          } 
        }
    },

    watch: {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button   
   margin-left 10px
 .kec-btn  
   padding 5px        
 .kec-content  
   padding 1px
</style>