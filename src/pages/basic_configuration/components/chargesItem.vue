<template>
  <kec-scroll :numbers="179">
    <div class="flexs kec-btn j-between a-center">
      <div class="flexs a-center">
           <span style="width:120px">服务类型</span>
           <el-select v-model="value" placeholder="" @change="selectFunc" size="mini" style="width:100%">
              <el-option
                v-for="item in serverList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
      </div>
      <div class="flexs ">
           <el-popover
             placement="bottom-end"
             width="300"
             v-model="addVisible"
             trigger="click">
             <kec-item :serverId="value" @close="closeFunc" type="addVisible"></kec-item>
             <kec-button slot="reference" text="" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
           </el-popover>
           <el-popover
             placement="bottom-end"
             width="300"
             v-model="changeVisible"
             :disabled="selectIndex===null"
             trigger="click">
             <kec-item :serverId="value" @close="closeFunc" type="changeVisible"  :item="selectItem"></kec-item>
             <kec-button :disabled="selectIndex===null" slot="reference" text="" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
           </el-popover>
           <kec-button @click.native="delFunc" text="" :disabled="selectIndex===null" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </div>
    </div>
    <div class="kec-content">
          <kec-table 
           height="221px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="tableData" 
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
import KecItem from './addItem' 
  export default {
    name:'chargeItem',
    props:[''],
    data () {
      return {
        value:null,
         tableData: [],
           letWidth:{
             "0":"50px",
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'id','slot':false},
             name:{"title":'收费项名称','slot':false},
             chargeSubjectCode:{"title":'科目编号','slot':false},
             chargeSubjectName:{"title":'收费科目','slot':false},
             unit:{"title":'收费单位','slot':false}
             },
             selectIndex:null,
           selectItem:null,
           addVisible:false,
           changeVisible:false
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecItem,
        KecScroll
    },

    computed: {
      ...mapState('basic',['serverList']),
    },

    beforeMount() {},

    mounted() {
      this.loadQueryServerTypes()
      this.loadChargeUnits()
    },

    methods: {
      ...mapActions('basic',['loadDeleteChargeItem','loadQueryServerTypes','loadChargeUnits']),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item
        },
        closeFunc(data){
          this.selectIndex = null ;
          if(data.bool) {
            this.loadQueryServerTypes()
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          const _this = this ;
          if(this.selectIndex!==null) {
            let data = {
              id:_this.value,
              chargeItems:{
                id:_this.selectItem.id
              }
            }
            this.loadDeleteChargeItem(data).then(success=>{
                   this.selectIndex = null ;
                   this.loadQueryServerTypes()
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
        },
        selectFunc(val){
          this.selectIndex = null ;
          this.serverList.forEach(element => {
            element.chargeItems.forEach(item => {
              item['unitCode'] = item['unit']['code']
            })
            if(element.id == val){
              this.tableData = element.chargeItems ;
            }
          });
        }
    },

    watch: {
      serverList:{
        deep:true,
        handler:function(val){
           const _this = this ;
           if(val.length){
              _this.value = _this.value===null ? _this.serverList[0]['id'] : _this.value ;
              _this.selectFunc(_this.value)
           }
           
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
   padding 1px
</style>