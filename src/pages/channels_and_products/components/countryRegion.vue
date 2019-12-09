<template>
  <div>
    <div class="flexs kec-btn j-end">
      <el-popover
        placement="bottom-end"
        width="920"
        trigger="click">
        <kec-add-country></kec-add-country>
        <kec-button slot="reference" text="加入國家/區域" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="bottom-end"
        width="920"
        trigger="click">
        <kec-add-country></kec-add-country>
        <kec-button slot="reference" text="修改國家/區域" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
      </el-popover>
    </div>
    <div class="kec-content">
          <kec-table 
           height="401px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="tableData" 
           :letWidth="letWidth"
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
import {KecButton , KecTable }  from '@/common/components'
import KecAddCountry from './addCountry' 
  export default {
    name:'countryRegion',
    props:[''],
    data () {
      return {
         tableData: [{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家',
             f:'国家',
             j:'国家',
           }],
           letWidth:{
             "0":"80px",
             "2":"90px",
             "3":"90px",
             "4":"120px",
             "5":"100px",
             "6":"100px",
           },
           lastWidth:'',
           tableHeader:{
             a:{"title":'目的地','slot':false},
             b:{"title":'區域','slot':false},
             c:{"title":'最小重量','slot':false},
             d:{"title":'最大重量','slot':false},
             e:{"title":'按件計費','slot':false},
             f:{"title":'按箱計費','slot':false},
             j:{"title":'按批次計費','slot':false}
             }
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecAddCountry
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        activeFunc(index) {
          console.log(index,'index')
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
   padding 0 2px
</style>