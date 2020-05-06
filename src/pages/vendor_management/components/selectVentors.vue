<template>
  <kec-scroll :numbers="175">
    <div class="flexs kec-btn j-end">
      <el-popover
        placement="left-start"
        width="700"
        v-model="addVisible"
        trigger="click">
        <kec-supplier @close="closeFunc" type="addVisible"></kec-supplier>
        <kec-button slot="reference" text="新建供应商" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <kec-button-click
        @click="eqitVentorFunc"
        :disabled="selectIndex===null" 
        slot="reference" text="编辑供应商" 
        icon="fa-pencil" background="#17A2B8" 
        color="#fff"></kec-button-click>
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
          :disabled="selectIndex===null" text="删除供应商" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </el-popover>
    </div>
    <div class="kec-content">
          <kec-table 
           height="221px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="supplierList" 
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
import {KecButton , KecTable,KecScroll,KecButtonClick }  from '@/common/components'
import KecSupplier from './addSupplier' 
  export default {
    name:'selectVentors',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           letWidth:{
             "0":"60px"
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'id','slot':false},
             companyName:{"title":'公司名称','slot':false,'sort':'ZH'},
             contactName:{"title":'联系人','slot':false,'sort':'ZH'},
             phone:{"title":'联系电话','slot':false,'sort':'1-9'},
             email:{"title":'邮箱','slot':false},
             webSite:{"title":'网址','slot':false,'sort':'OTHER'},
           },
           selectIndex:null,
           selectItem:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecSupplier,
        KecButtonClick,
        KecScroll
    },

    computed: {
      ...mapState('basic',['supplierList']),
    },

    beforeMount() {},

    mounted() {
      this.loadVendorGetVendors()
      this.loadDictionaryCURRENCY()
      this.loadChargeUnits()
      this.loadQueryServerTypes()
      this.loadCountryQueryAll()
      this.loadGetBillCycles()
    },

    methods: {
        ...mapActions('basic',
        ['loadVendorGetVendors',
        'loadVendorDeleteVendor',
        'loadQueryServerTypes',
        'loadDictionaryCURRENCY',
        'loadCountryQueryAll',
        'loadVendorType',
        'loadChargeUnits']
        ),
        ...mapMutations('basic',['selectVentorsId','setVentorsInfo']),
        ...mapActions('vendor',['loadGetBillCycles']),
        ...mapMutations('home',['pushBreadcrumbArr']),
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
            this.loadVendorGetVendors()
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          if(this.selectIndex!==null) {
            this.loadVendorDeleteVendor(this.selectItem.id).then(success=>{
                   this.selectIndex = null ;
                   this.loadVendorGetVendors()
                   this.$message( {
                    message: success,
                    type: 'success'
                   });
                },error=>{
                  this.selectIndex = null ;
                   this.$message( {
                    message: error,
                    type: 'error'
                   });
                })
          } 
        },
        eqitVentorFunc(){
          let item = this.selectItem ;
          this.setVentorsInfo(item)
          this.selectVentorsId(item.id)
          this.pushBreadcrumbArr({name:'供应商信息',components:'ventorsItem'})
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