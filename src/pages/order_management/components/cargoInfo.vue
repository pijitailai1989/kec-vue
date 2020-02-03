<template>
  <div class="kec-content">
          <kec-table 
           height="419px"
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
</template>

<script>
import {KecForm, KecButton ,KecTable}  from '@/common/components'
import { mapState ,mapActions,mapMutations} from 'vuex';
  export default {
    name:'cargoInfo',
    props:{
      
    },
    data () {
      return {
           tableData: [],
           letWidth:{
             "0":"80px"
           },
           lastWidth:'',
           tableHeader:{
             sku:{"title":'SKU','slot':false},
             brand:{"title":'品牌','slot':false},
             description:{"title":'英文品名','slot':false},
             category:{"title":'类别','slot':false},
             unitPrice:{"title":'单价','slot':false},
             quantity:{"title":'数量','slot':false},
             remark:{"title":'备注','slot':false}
            },
            selectIndex:null,
            selectItem:null,
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecTable
    },

    computed: {
      ...mapState('order',['orderInfos'])
    },
    beforeMount() {},

    mounted() {
      
    },

    methods: {
      activeFunc(){

      },
      activeItem(){

      }
      
    },

    watch: {
      orderInfos:{
        deep:true,
        handler:function(val){
          let {items} = val ;
          this.tableData = items
          // this.tableData = JSON.parse( JSON.stringify(items) )
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
   padding 3px 2px
</style>