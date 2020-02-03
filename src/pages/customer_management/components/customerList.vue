<template>
 <div>
   <div class="flexs kec-btn j-end btn-fun ">
      <el-popover
        placement="left-start"
        width="700"
        v-model="addVisible"
        trigger="click">
        <kec-customer @close="closeFunc" type="addVisible"></kec-customer>
        <kec-button slot="reference" text="添加客户" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="700"
        :disabled="selectIndex===null"
        v-model="changeVisible"
        trigger="click">
        <kec-customer @close="closeFunc" type="changeVisible" :item="selectItem"></kec-customer>
        <kec-button :disabled="selectIndex===null" slot="reference" text="修改客户" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
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
          :disabled="selectIndex===null" text="删除客户" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </el-popover>
    </div>
    <kec-scroll :numbers="249" class="list">
    <div class="kec-content">
          <kec-table 
           height="221px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="customerList" 
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
 </div>
  
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll }  from '@/common/components'
import KecCustomer from './addCustomer' 
  export default {
    name:'customerList',
    props:[''],
    data () {
      return {
           addVisible:false,
           changeVisible:false,
           letWidth:{
             "0":"60px"
           },
           lastWidth:'',
           tableHeader:{
           id:{"title":'id','slot':false},
           companyName:{"title":'公司名称','slot':false},
           contactName:{"title":'联系人','slot':false},
           phone:{"title":'联系电话','slot':false},
           email:{"title":'邮箱','slot':false},
           type:{"title":'类型','slot':false},
           webSite:{"title":'网址','slot':false},
           },
           selectIndex:null,
           selectItem:null,
           visible:false
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecCustomer,
        KecScroll
    },

    computed: {
      ...mapState('basic',['customerList']),
    },

    beforeMount() {},

    mounted() {
      this.loadCustomerQueryAll({status:'ENABLED'})
      this.loadDictionaryCURRENCY()
      this.loadCountryQueryAll()
    },

    methods: {
        ...mapActions('basic',['loadCustomerQueryAll','loadCustomerUpdateStatus','loadDictionaryCURRENCY','loadCountryQueryAll']),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item
        },
        closeFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          if(data.bool) {
            this.loadCustomerQueryAll({status:'ENABLED'})
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          if(this.selectIndex!==null) {
            this.loadCustomerUpdateStatus({id:this.selectItem.id,status:'REMOVED'}).then(success=>{
                   this.selectIndex = null ;
                   this.loadCustomerQueryAll({status:'ENABLED'})
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

    watch: {}

  }

</script>
<style lang='stylus' scoped>
 .btn-fun  
   background #fff
   border-radius 4px
   padding 15px
   margin-top 10px
 .list  
   margin-top 10px
 .kec-button   
   margin-left 10px      
 .kec-content  
   padding 1px
</style>