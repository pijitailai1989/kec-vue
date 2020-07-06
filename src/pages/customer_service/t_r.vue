<template>
 <div>
    <div class="flexs kec-btn btn-fun" >
      <kec-form crosswise bold="bold" text="订单编号 / 参考号:" width="120px" style="width:100%">
        <template #input>
          <el-input placeholder="请输入订单编号/参考号" v-model="orderNum" style="width:100%">
            <el-button @click.native="searchOrder(orderNum)" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </template>
      </kec-form>
    </div>
    <kec-scroll :numbers="225" class="list flexs j-center">
        <div class="kec-content">
            <el-timeline>
              <el-timeline-item size="large" 
              @click.native = setOrderStateList({bool:!item.active,index})
              :color="themeColor.header_background_color" 
              :icon="item.active?'el-icon-arrow-down':'el-icon-arrow-right'"
              :timestamp="item.levelOneStandardStateName+' ( '+item.createTime+' ) '" 
              placement="top" 
              v-for="(item,index) of orderStateList" 
              :key="item.id">
                <el-card v-show="item.active" @click.native.stop="">
                  <div class="flexs columns">
                    <span class="fo" v-for="(todo,i) in item.children" :key="i">{{todo.detail+' ( '+todo.createTime+' ) '}}</span>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
        </div>
    </kec-scroll>
    
 </div>
  
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {Timeline,TimelineItem,Card} from 'element-ui'
import {KecButton , KecForm ,KecScroll }  from '@/common/components'
  export default {
    name:'t_r',
    props:[''],
    data () {
      return {
           orderNum:'',
           orderNumCopy:''
      };
    },

    components: {
        KecButton ,
        KecForm,
        KecScroll,
        'el-timeline':Timeline,
        'el-timeline-item':TimelineItem,
        'el-card':Card
    },

    computed: {
      ...mapState('customer',['orderStateList']),
      ...mapState('home',['themeColor'])
    },

    beforeMount() {},

    mounted() {
      this.orderStateList.length && this.setOrderStateList({empty:true})
    },

    methods: {
        ...mapActions('customer',['loadGetOrderState']),
        ...mapMutations('customer',['setOrderStateList']),
        searchOrder(order) {
          console.log(order,'order')
          const _this = this ;
          if(order){
            order !== _this.orderNumCopy && _this.loadGetOrderState([order]) 
            order !== _this.orderNumCopy && (_this.orderNumCopy = order)
          }
          
        }
        
    },

    watch: {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .btn-fun  
   background #fff
   border-radius 4px
   padding 15px 15px 11px
   margin-top 10px
 .list  
   margin-top 10px
 .kec-button   
   margin-left 10px       
 .kec-content  
   cursor pointer
   width 450px
   padding 20px 0
   .fo  
     font-size 13px    
     color #888   
     padding 5px 0
</style>