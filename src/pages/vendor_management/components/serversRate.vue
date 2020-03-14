<template>
  <div class="serversRate">
    <div class="flexs kec-btn j-end">
      <el-popover
        placement="left-start"
        width="300"
        v-model="addVisible"
        trigger="click">
        <add-server-ventors @close="closeFunc" type="addVisible"></add-server-ventors>
        <kec-button slot="reference" text="添加服务" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="300"
        :disabled="todoIndex===null"
        v-model="changeVisible"
        trigger="click">
        <add-server-ventors @close="closeFunc" type="changeVisible" :item="selectItem"></add-server-ventors>
        <kec-button :disabled="todoIndex===null" slot="reference" text="修改服务" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="160"
        :disabled="todoIndex===null"
        v-model="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click.native="delFunc">确定</el-button>
        </div>
        <kec-button :disabled="todoIndex===null" slot="reference" text="删除服务" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="300"
        :disabled="todoIndex===null"
        v-model="addVisible1"
        trigger="click">
        <add-server-item @close="closeFunc" type="addVisible1" :chargeItems="chargeItems" :serverId="serverId"></add-server-item>
        <kec-button :disabled="todoIndex===null" slot="reference" text="添加服务项" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
    </div>
    <kec-scroll :numbers="249">
       <div class="kec-content" v-for="(todo,index) in servicesList" :key="todo.id">
             <div class="flexs texts a-center" :class="todoIndex===index?'active':''" @click="todoIndexClick(index,todo)">
                <span class="">{{todo.serviceName}}</span>
                <i class="fa fa-check-square-o fa-lg" v-if="todoIndex===index" aria-hidden="true"></i>
                <i class="fa fa-square-o fa-lg" v-else aria-hidden="true"></i>
             </div>
             <kec-table 
              :tableHeader="tableHeader" 
              :lastWidth="lastWidth" 
              :tableData="todo.vendorChargeItems || []" 
              :letWidth="letWidth"
              @active-item="activeItem">
               <template #operation>
                   <kec-button @click.native="editServerFunc(todo)" text="修改" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
               </template>
               <template v-slot:default="slotProps">
                 {{slotProps.item}}
               </template>
             </kec-table>
       </div>
    </kec-scroll>
    <component 
      :is="componentName" 
      :dialogVisible="dialogVisible" 
      @closeFunc="cancelFunc"
      type="changeVisible1" 
      :chargeItems="chargeItems" 
      :serverId="serverId" 
      :item="serverItem"></component>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll}  from '@/common/components'
import addServerVentors from './addServerVentors' 
import addServerItem from './addServerItem'
import editServerDialog from './editServerDialog' 
  export default {
    name:'serversRate',
    props:[''],
    data () {
      return {
           visible:false,
          dialogVisible:false,
           componentName:'editServerDialog',
           addVisible:false,
           changeVisible:false,
           addVisible1:false,
           changeVisible1:false,
           letWidth:{
             "0":"50px"
           },
           lastWidth:'100px',
           tableHeader:{
             id:{"title":'id','slot':false},
             chargeItemName:{"title":'收费项名称','slot':false},
             unit:{"title":'收费单位','slot':false},
             currency:{"title":'币种','slot':false},
             status:{"title":'状态','slot':false},
             unitPrice:{"title":'收费价格','slot':false},
           },
           selectIndex:null,
           selectItem:null,
           todoIndex:null,
           todoId:null,
           chargeItems:[],
           serverId:null,
           serverItem:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        addServerVentors,
        addServerItem,
        KecScroll,
        editServerDialog
    },

    computed: {
      ...mapState('basic',['servicesList','ventorsId','serverList','unitsList']),
    },

    beforeMount() {},

    mounted() {
      this.loadVendorGetVendor1([this.ventorsId,'service','getServices'])
    },

    methods: {
        ...mapActions('basic',[
        'loadVendorGetVendor1',
        'loadVendorPostVendor1',
        'loadVendorDeleteVendor1',
        ]),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.serverItem = item ;
        },
        cancelFunc(propsBool) {
         propsBool && this.loadVendorGetVendor1([this.ventorsId,'service','getServices'])
         this.dialogVisible = false ;
         this.selectIndex = null ;
         this.selectItem = null ;
        },
        todoIndexClick(index,todo){
           if(index === this.todoIndex){
             this.todoIndex = null ;
             return ;
           }
           this.todoIndex = index ;
           this.todoId = todo.id ;
           this.selectItem = {
             serviceTypeId:todo.serviceTypeId,
             serviceName:todo.serviceName,
             id:todo.id
           }
           this.serverId = todo.id ;
           let obj = this.serverList.find(item => {
             return item.id === todo.serviceTypeId
           })
           if(obj) this.chargeItems = obj.chargeItems ;


        },
        editServerFunc(todo){
          this.dialogVisible = true ;
           this.serverId = todo.id ;
           let obj = this.serverList.find(item => {
             return item.id === todo.serviceTypeId
           })
           this.chargeItems = obj.chargeItems ;

        },
        closeFunc(data){
          this.selectIndex = null ;
          if(data.bool) {
            this.loadVendorGetVendor1([this.ventorsId,'service','getServices'])
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          if(this.todoIndex!==null) {
            let data = [this.ventorsId,'service','deleteService',this.todoId]
            this.loadVendorDeleteVendor1(data).then(success=>{
                   this.todoIndex = null ;
                   this.loadVendorGetVendor1([this.ventorsId,'service','getServices'])
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                }).catch(error=> {
                  this.todoIndex = null ;
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
 .kec-content+.kec-content 
   margin-top 5px
 .serversRate
   width 100%
 .texts  
   padding 5px
   cursor pointer
   i  
     margin-left 10px
   &.active  
     color #ED6D01
</style>