<template>
  <kec-scroll :numbers="179">
    <div class="flexs kec-btn j-end" ref="box">
      <el-popover
        placement="left-start"
        width="360"
        v-model="addVisible"
        trigger="click">
        <kec-item @close="closeFunc" type="addVisible"></kec-item>
        <kec-button slot="reference" text="添加" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="360"
        v-model="changeVisible"
        :disabled="selectIndex===null"
        trigger="click">
        <kec-item @close="closeFunc" type="changeVisible" :item="selectItem"></kec-item>
        <kec-button :disabled="selectIndex===null" slot="reference" text="修改" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
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
          :disabled="selectIndex===null" text="删除" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </el-popover>
    </div>
    <div class="kec-content">
          <kec-table 
           height="255px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="tagsList" 
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
            <template v-slot:receiptsDirection="slotProps">
              <span>{{slotProps.item ?'应收':'应付'}}</span>
            </template>
          </kec-table>
    </div>
    <div class="flexs j-end">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="PageNum"
        :page-size="PageSize"
        :total="total">
      </el-pagination>
    </div>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll }  from '@/common/components'
import KecItem from './addItem' 
  export default {
    name:'chargesItem',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           tagsList:[],
           letWidth:{
             4:'100px',
             5:'100px',
             6:'100px',
           },
           lastWidth:'',
           tableHeader:{
            //  name:{"title":'收费项名称','slot':false,'sort':'ZH'},
             serviceTypeText:{"title":'服务类型名称','slot':false,'sort':'ZH'},
             ledgerSubjectNumber:{"title":'科目项编号','slot':false,'sort':'ZH'},
             ledgerSubjectName:{"title":'科目项名称','slot':false,'sort':'ZH'},
             accountingObjectText:{"title":'计费依据','slot':false},
             accountingWayText:{"title":'计费维度','slot':false},
             receiptsDirection:{"title":'计费方向','slot':true},
             unitCode:{"title":'计费单位','slot':false}
             
           },
           selectIndex:null,
           selectItem:null,
           PageSize:20,
           PageNum:1,
           total:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecItem,
        KecScroll
    },

    computed: {
      ...mapState('basic',['chargeItemList'])
    },

    beforeMount() {},

    mounted() {
      this.mountFunc(this.PageSize,this.PageNum)
      this.loadQueryServerTypes()
      this.loadChargeUnits()
      this.loadSubjectQueryItem()
      this.loadGetAccountObject()
      this.loadUnitTypes()
    },

    methods: {
        ...mapActions('basic',['loadGetChargeItem','loadDeleteChargeItem','loadQueryServerTypes','loadGetAccountObject',
        'loadChargeUnits','loadSubjectQueryItem','loadUnitTypes']),
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
          _.loadGetChargeItem(data).then(success => {
            let {content,totalElements} = _.chargeItemList;
            if(content && content.length){
              content.forEach(el=>{
                el['unitCode'] = el['chargeUnit']['code']
                el['unitId'] = el['chargeUnit']['id']
                // el['chargeSubjectName'] = el['ledgerSubject']['name']
                // el['chargeSubjectId'] = el['ledgerSubject']['id']
                // el['chargeSubjectPath'] = el['ledgerSubject']['path']
                el['chargeSubjectPath'] = el['ledgerSubjectNumber']
                el['serviceTypeText'] = el['serviceType']['text']
                el['accountingObjectText'] = el['accountingObject'] && el['accountingObject']['text']
                el['accountingWayText'] = el['accountingWay'] && el['accountingWay']['text']
                el['serviceTypeCode'] = el['serviceType']['code']
              })
              _.tagsList = content ;
            }
            
            _.total = totalElements ;
          })
        },
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
            if(data.type === 'addVisible') this.PageNum = 1 ;
            this.mountFunc(this.PageSize,this.PageNum)
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          let {length} = this.tagsList ;
          if(this.selectIndex!==null) {
            this.loadDeleteChargeItem({data:{id:this.selectItem.id}}).then(success=> {
                   this.selectIndex = null ;
                   if(length == 1){
                     this.PageNum >=2 && this.PageNum -- ;
                   }
                   this.mountFunc(this.PageSize,this.PageNum)
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