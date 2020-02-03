<template>
  <div style="background:#fff">
    <div v-for="item of servicesList" :key="item.id">
        <div class="flexs kec-btn j-between a-center">
          <div>
              <span>{{item.serviceName}}{{item.vendorChargeItems.length}}</span>
          </div>
          <div class="flexs ">
              <el-popover
                placement="left-start"
                width="300"
                v-model="addVisible"
                trigger="click">
                <kec-item :serverId="value" @close="closeFunc" type="addVisible"></kec-item>
                <kec-button slot="reference" text="" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
              </el-popover>
              <el-popover
                placement="left-start"
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
              <kec-table-template 
              height="700px"
              :tableHeader="tableHeader" 
              :tableHeaderMin="tableHeaderMin" 
              :lastWidth="lastWidth" 
              :tableData="item.vendorChargeItems" 
              :maxWidth="maxWidth"
              :minWidth="minWidth"
              :selectIndex="selectIndex">
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
              </kec-table-template>
        </div>
      </div>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import KecTableTemplate  from './tablesTemplate'
import {KecButton}  from '@/common/components'
import KecItem from './addItem' 
  export default {
    name:'chargeItem',
    props:[''],
    data () {
      return {
        value:null,
         tableData: [
           {chargesSubject: "1",chargeItemId: 11,chargeItemName: "1",unitCode:'1',costArr:[
             {ids:11,name:'name1'},
             {ids:'',name:''},
           ]},
           {chargesSubject: "1",id: 12,name: "1",unitCode:'1',costArr:[
             {ids:12,name:'name3'}
           ]}
         ],
           maxWidth:{
             "0":"50px",
           },
           minWidth:{
             
           },
           lastWidth:'80px',
           tableHeader:{
             chargeItemId:{"title":'id','slot':false},
             chargeItemName:{"title":'收费项名称','slot':false}
             },
             tableHeaderMin:{
             ids:{"title":'id','slot':false},
             name:{"title":'收费项名称','slot':false},
             },
             selectIndex:null,
           selectItem:null,
           addVisible:false,
           changeVisible:false
      };
    },

    components: {
        KecButton ,
        KecTableTemplate,
        KecItem
    },

    computed: {
      ...mapState('basic',['serverList','servicesList','ventorsId']),
    },

    beforeMount() {},

    mounted() {
      // this.loadQueryServerTypes()
      const _ = this ;
      this.loadVendorGetVendor1([_.ventorsId,'service','getServices'])
    },

    methods: {
      ...mapActions('basic',['loadDeleteChargeItem','loadQueryServerTypes','loadVendorGetVendor1']),
        
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
          // this.selectIndex = null ;
          // this.serverList.forEach(element => {
          //   element.chargeItems.forEach(item => {
          //     item['unitCode'] = item['unit']['code']
          //   })
          //   if(element.id == val){
          //     this.tableData = element.chargeItems ;
          //   }
          // });
        }
    },

    watch: {
      // serverList:{
      //   deep:true,
      //   handler:function(){
      //      const _this = this ;
      //      _this.value = _this.value===null ? _this.serverList[0]['id'] : _this.value ;
      //      _this.selectFunc(_this.value)
      //   }
      // }
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