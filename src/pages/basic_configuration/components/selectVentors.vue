<template>
  <div style="background:#fff">
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
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable }  from '@/common/components'
import KecSupplier from './addSupplier' 
  export default {
    name:'selectVentors',
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
        KecSupplier
    },

    computed: {
      ...mapState('basic',['supplierList']),
    },

    beforeMount() {},

    mounted() {
      this.loadVendorGetVendors()
    },

    methods: {
        ...mapActions('basic',['loadVendorGetVendors','loadVendorDeleteVendor']),
        ...mapMutations('basic',['selectVentorsId','setVentorsInfo']),
        ...mapMutations('home',['pushBreadcrumbArr']),
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item;
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