<template>
  <kec-scroll :numbers="179">
    <div class="flexs kec-btn j-between a-center" style="width:100%"> 
      <div class="flexs a-center j-start">
           <div class="flexs a-center">
            <!-- <kec-form crosswise text="服务类型" width="70px">
                <template #input>
                  <el-select @change="selectServerType" v-model="serviceTypeId" size="medium" filterable placeholder="" style="width:120px">
                    <el-option
                      v-for="item in serverList"
                      :key="item.code"
                      :label="item.text"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </template>
              </kec-form> -->
              <kec-form text="供应商" crosswise width="60px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="vendorId" filterable placeholder="" size="medium" style="width:120px">
                          <el-option
                            v-for="item in supplierList"
                            :key="item.id"
                            :label="item.companyName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
                </kec-form>
              <kec-button-click text="查询" 
               @click="queryFunc"
              style="width:60px"
              :disabled="!vendorId"
               background="#17A2B8" color="#fff"></kec-button-click>
          </div>
           
      </div>
      <div class="flexs kec-btn j-end" ref="box">
        <!-- <kec-button 
          text="添加字段" icon="fa-plus" 
          background="#ED6D01" 
          @click.native="buttonFunc('addVisible',null)"
          color="#fff"></kec-button> -->
          <kec-button-click
          text="修改字段" icon="fa-pencil" 
          background="#17A2B8" 
          @click="buttonFunc('changeVisible',selectItem)"
          color="#fff"></kec-button-click>
        <!-- <el-popover
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
            :disabled="selectIndex===null" text="删除字段" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
        </el-popover> -->
      </div>
        
    </div>
    
    <div class="kec-content">
          <kec-table 
           height="221px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="extraInfosList" 
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
    <component :is="'KecFidle'" @close="closeFunc"  
    :dialogVisible="dialogVisible" :type="types" 
    :item="selectItems" :text="textItem"></component>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll,KecButtonClick,KecForm }  from '@/common/components'
import KecFidle from './addFidle' 
  export default {
    name:'fidleList',
    props:[''],
    data () {
      return {
           serviceTypeId:null,
           vendorId:null,
           vendorList:[],
           visible:false,
           addVisible:false,
           changeVisible:false,
           dialogVisible:false,
           letWidth:{
               0:'50px'
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'ID','slot':false},
             serviceTypeName:{"title":'服务类型','slot':false,'sort':'ZH'},
             vendorProductName:{"title":'供应商产品','slot':false,'sort':'ZH'},
             infoName:{"title":'描述','slot':false},
             
           },
           selectIndex:null,
           selectItem:null,
           selectItems:null,
           textItem:'',
           types:''
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecFidle,
        KecScroll,
        KecForm,
        KecButtonClick
    },

    computed: {
      ...mapState('fidle',['extraInfosList']),
      ...mapState('basic',['vendorsList','serverList','supplierList'])
    },

    beforeMount() {},

    mounted() {
      this.loadVendorGetVendors()
      this.loadQueryServerTypes()
    },

    methods: {
        ...mapActions('fidle',['loadGetLastMileExtraInfos','loadDeleltLastMileExtraInfos']),
        ...mapMutations('vendor',['setVendorProductList']),
        ...mapActions('vendor',['loadGetVendorProducts']),
        ...mapActions('basic',['loadVendorGetVendors','loadQueryServerTypes','loadGetVendorsByServiceType','loadVendorGetVendors']),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item ;
        },
        buttonFunc(type,item){
          if(type === 'addVisible'){
             this.textItem = '添加额外字段'
          }else{
             this.textItem = '修改额外字段'
          }
           this.selectItems = item ;
           this.types= type ;
           this.dialogVisible = true
        },
        selectServerType(code){
          this.vendorId = null
          this.loadGetVendorsByServiceType(['getVendorsByServiceType',code]).then(success=>{
            let {serviceId,vendors} = this.vendorsList ;
            this.vendorList = vendors ;
          })
        },
        queryFunc(){
           this.loadGetLastMileExtraInfos({vendorId:this.vendorId})
           this.loadGetVendorProducts([this.vendorId])
        },
        closeFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          this.selectItems = null ;
          this.dialogVisible = false
          if(data.bool) {
            this.loadGetLastMileExtraInfos({vendorId:this.vendorId})
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          if(this.selectIndex!==null) {
            this.loadDeleltLastMileExtraInfos({data:{id:this.selectItem.id}}).then(success=> {
                   this.selectIndex = null ;
                   this.loadGetLastMileExtraInfos({vendorId:this.vendorId})
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