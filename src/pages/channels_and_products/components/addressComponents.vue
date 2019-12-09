<template>
  <div>
    <div class="flexs kec-btn j-end">
      <el-popover
        placement="bottom-end"
        width="360"
        trigger="click">
        <kec-address></kec-address>
        <kec-button slot="reference" text="新增地址" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="bottom-end"
        width="360"
        trigger="click">
        <kec-address></kec-address>
        <kec-button slot="reference" text="修改地址" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
      </el-popover>
        <kec-button text="刪除地址" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
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
import KecAddress from './addAddress' 
  export default {
    name:'addressComponents',
    props:[''],
    data () {
      return {
         tableData: [{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           },{
             a:'1',
             b:'姓名',
             c:'地址',
             d:'邮编',
             e:'国家'
           }],
           letWidth:{
             "0":"30px",
             "1":"60px",
             "3":"60px",
             "4":"60px"
           },
           lastWidth:'',
           tableHeader:{
             a:{"title":'#','slot':false},
             b:{"title":'姓名','slot':false},
             c:{"title":'地址','slot':false},
             d:{"title":'邮编','slot':false},
             e:{"title":'国家','slot':false}
             }
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecAddress
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