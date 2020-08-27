<template>
  <kec-scroll :numbers="179">
    <div class="flexs kec-btn j-end" ref="box">
      <el-popover
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
      </el-popover>
    </div>
    <div class="kec-content">
          <kec-table 
           height="221px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="unitsList" 
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
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll }  from '@/common/components'
import KecUnit from './addUnit' 
import { get,post} from "../../../untils/user.js"
  export default {
    name:'chargeUnit',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           letWidth:{
             
             "0":"50px",
             "1":"120px",
             "2":"120px",
             "3":"120px",
             "4":"120px",
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'ID','slot':false},
             chName:{"title":'中文名','slot':false,'sort':'ZH'},
             enName:{"title":'英文名','slot':false,'sort':'ZH'},
             code:{"title":'符号单位','slot':false},
             unitType:{"title":'单位类型','slot':false,'sort':'ZH'},
             description:{"title":'描述','slot':false}
             
           },
           unitsLists:[],
           selectIndex:null,
           selectItem:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecUnit,
        KecScroll
    },

    computed: {
      ...mapState('basic',['unitsList']),
    },

    beforeMount() {},

    mounted() {
      this.loadChargeUnit()
      this.loadUnitTypes()
    },

    methods: {
        ...mapActions('basic',['loadChargeUnits','loadDelChargeUnit','loadUnitTypes']),
        loadChargeUnit(){
            const _ = this ;
            _.loadChargeUnits().then(success=>{
              _.unitsLists = _.unitsList.map(item=>{
                // item['unitTypeText'] = item['unitType']['text']
                // item['unitTypeCode'] = item['unitType']['code']
                return item
              })
              })
        },
        activeFunc(index) {
          this.selectIndex = index ;
          
        },
        activeItem(item){
          let { id,code,
           description,
           enName,
           chName,
           unitTypeCode} = item ;
          this.selectItem = {id,code,
           description,
           enName,
           chName,
           unitTypeCode};
        },
        closeFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          data.bool && this.loadChargeUnit()
          data.type && (this[data.type] = false)
        },
        delFunc(){
          if(this.selectIndex!==null) {
            this.loadDelChargeUnit({data:{id:this.selectItem.id}}).then(success=> {
                   this.selectIndex = null ;
                   this.loadChargeUnit()
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