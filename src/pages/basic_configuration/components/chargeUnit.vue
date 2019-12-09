<template>
  <kec-scroll :numbers="179">
    <div class="flexs kec-btn j-end" ref="box">
      <el-popover
        placement="bottom-start"
        width="360"
        v-model="addVisible"
        trigger="click">
        <kec-unit @close="closeFunc" type="addVisible"></kec-unit>
        <kec-button slot="reference" text="" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="bottom-start"
        width="360"
        v-model="changeVisible"
        :disabled="selectIndex===null"
        trigger="click">
        <kec-unit @close="closeFunc" type="changeVisible" :item="selectItem"></kec-unit>
        <kec-button :disabled="selectIndex===null" slot="reference" text="" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
      </el-popover>
      <kec-button @click.native="delFunc" :disabled="selectIndex===null" text="" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
    </div>
    <div class="kec-content">
          <kec-table 
           height="221px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="unitsList" 
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
import KecUnit from './addUnit' 
  export default {
    name:'chargeUnit',
    props:[''],
    data () {
      return {
           addVisible:false,
           changeVisible:false,
           letWidth:{
             "0":"50px",
             "1":"60px",
             "2":"80px",
             "3":"80px",
           },
           lastWidth:'',
           tableHeader:{
             id:{"title":'id','slot':false},
             chName:{"title":'中文名','slot':false},
             enName:{"title":'英文名','slot':false},
             code:{"title":'符号单位','slot':false},
             description:{"title":'描述','slot':false}
           },
           selectIndex:null,
           selectItem:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecUnit,
        KecScroll
    },

    computed: {
      ...mapState('basic',['unitsList']),
    },

    beforeMount() {},

    mounted() {
      this.loadChargeUnits()
    },

    methods: {
        ...mapActions('basic',['loadChargeUnits','loadDelChargeUnit']),
        activeFunc(index) {
          this.selectIndex = index ;
          console.log(index,'index')
        },
        activeItem(item){
          this.selectItem = item
          console.log(item,'item')
        },
        closeFunc(data){
          this.selectIndex = null ;
          if(data.bool) {
            this.loadChargeUnits()
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          if(this.selectIndex!==null) {
            this.loadDelChargeUnit({id:this.selectItem.id}).then(success=> {
                   this.selectIndex = null ;
                   this.loadChargeUnits()
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