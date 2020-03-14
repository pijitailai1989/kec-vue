<template>
  <div>
    <div class="flexs kec-btn j-end" ref="box">
      <el-popover
        placement="left-start"
        width="360"
        v-model="addVisible"
        trigger="click">
        <kec-cargo-config @close="closeFunc" type="addVisible"></kec-cargo-config>
        <kec-button slot="reference" text="添加货态" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="360"
        v-model="changeVisible"
        :disabled="selectIndex===null"
        trigger="click">
        <kec-cargo-config @close="closeFunc" type="changeVisible" :item="selectItem"></kec-cargo-config>
        <kec-button :disabled="selectIndex===null" slot="reference" text="修改货态" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
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
          :disabled="selectIndex===null" text="删除货态" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </el-popover>
    </div>
    <div class="kec-content">
          <kec-table 
           height="251px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="vendorStateList" 
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
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll }  from '@/common/components'
import KecCargoConfig from './addCargoConfig' 
  export default {
    name:'cargoConfig',
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
             code:{"title":'货态编码','slot':false,'sort':'ZH'},
             name:{"title":'货态中文名称','slot':false,'sort':'ZH'},
             nameEn:{"title":'货态英文名称','slot':false,'sort':'ZH'},
             description:{"title":'描述','slot':false},
             standardStateName:{"title":'关联的标准货态名称','slot':false,'sort':'ZH'},
             standardStateCode:{"title":'关联的标准货态编码','slot':false,'sort':'ZH'}
             
           },
           selectIndex:null,
           selectItem:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecCargoConfig,
        KecScroll
    },

    computed: {
      ...mapState('basic',['vendorStateList','ventorsId']),
    },

    beforeMount() {},

    mounted() {
      this.loadGetQueryLevelTwo()
      this.loadQueryByVendorId([this.ventorsId])
    },

    methods: {
        ...mapActions('basic',['loadQueryByVendorId','loadVendorStateDelete']),
        ...mapActions('order',['loadGetQueryLevelTwo']),
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
            this.loadQueryByVendorId([this.ventorsId])
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          if(this.selectIndex!==null) {
            this.loadVendorStateDelete([this.selectItem.id]).then(success=> {
                   this.selectIndex = null ;
                   this.loadQueryByVendorId([this.ventorsId])
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