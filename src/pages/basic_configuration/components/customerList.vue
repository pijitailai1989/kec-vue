<template>
  <kec-scroll :numbers="179">
    <div class="flexs kec-btn j-end">
      <el-popover
        placement="bottom-end"
        width="450"
        v-model="addVisible"
        trigger="click">
        <kec-customer @close="closeFunc" type="addVisible"></kec-customer>
        <kec-button slot="reference" text="" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="bottom-end"
        width="450"
        :disabled="selectIndex===null"
        v-model="changeVisible"
        trigger="click">
        <kec-customer @close="closeFunc" type="changeVisible" :item="selectItem"></kec-customer>
        <kec-button :disabled="selectIndex===null" slot="reference" text="" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
      </el-popover>
        <kec-button @click.native="delFunc" :disabled="selectIndex===null" text="" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
    </div>
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
             "0":"50px"
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'id','slot':false},
             customerCode:{"title":'客户编码','slot':false},
             companyName:{"title":'公司名称','slot':false},
             contactName:{"title":'联系人','slot':false},
             phone:{"title":'联系电话','slot':false},
             email:{"title":'邮箱','slot':false},
             type:{"title":'类型','slot':false},
             },
             selectIndex:null,
           selectItem:null
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
    },

    methods: {
        ...mapActions('basic',['loadCustomerQueryAll','loadCustomerUpdateStatus','loadDictionaryCURRENCY']),
        activeFunc(index) {
          this.selectIndex = index ;
          console.log(index,'index')
        },
        activeItem(item){
          this.selectItem = item
          console.log(item,'item')
        },
        closeFunc(data){
          console.log(data,'data')
          this.selectIndex = null ;
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
 .kec-button   
   margin-left 10px
 .kec-btn  
   padding 5px        
 .kec-content  
   padding 1px
</style>