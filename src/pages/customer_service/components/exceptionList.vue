<template>
 <div>
    <div class="flexs kec-btn j-end btn-fun row">
      <div class="col-sm-12 flexs">
        <kec-form crosswise width="60px" text="订单编号">
          <template #input>
            <el-input v-model="orderNum" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
        <kec-form crosswise width="40px" text="日期">
          <template #input>
            <el-date-picker
              @change="changeTimesFunc"
              size="medium"
              align="center"
              v-model="tiems"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </template>
        </kec-form>
        <div style="margin-left:10px">
           <el-button size="medium" @click.native="searchFunc">查询</el-button>
        </div>
        
      </div>
    </div>
    <kec-scroll :numbers="259" class="list">
        <div class="flexs j-end" style="padding:5px">
            <kec-button 
            text="添加异常" icon="fa-plus" 
            background="#ED6D01" 
            @click.native="buttonFunc('addVisible',null)"
            color="#fff"></kec-button>
            <kec-button-click 
            :disabled="selectIndex===null"
            text="修改异常" icon="fa-pencil" 
            background="#17A2B8" 
            @click="buttonFunc('changeVisible',selectItem)"
            color="#fff"></kec-button-click>
            <kec-button-click 
            :disabled="selectIndex===null"
            text="异常回复" icon="fa-pencil" 
            background="#17A2B8" 
            @click="buttonFunc('reply',selectItem)"
            color="#fff"></kec-button-click>
          
        </div>
        <div class="kec-content">
            <kec-table 
            height="335px"
            :tableHeader="tableHeader" 
            :lastWidth="lastWidth" 
            :tableData="order_list" 
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
                <template v-slot:typeTagSetName="slotProps">
                  <div class="flexs columns">
                    <el-tag class="pr" type="info" size="small" v-for="(name,i) of slotProps.item" :key="i">{{name}}</el-tag>
                  </div>
                </template>
                <template v-slot:processingTagSetName="slotProps">
                  <div class="flexs columns">
                    <el-tag class="pr" type="info" size="small" v-for="(name,i) of slotProps.item" :key="i">{{name}}</el-tag>
                  </div>
                </template>
            </kec-table>
        </div>
        <div class="flexs j-end" v-show="total">
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page.sync="PageNum"
                :page-size="PageSize"
                :total="total">
            </el-pagination>
        </div>
    </kec-scroll>
    <component v-show="types === 'changeVisible' || types === 'addVisible'" :is="'KecException'" @close="closeFunc"  :dialogVisible="dialogVisible" :type="types" :item="selectItem" :text="textItem"></component>
    <component v-show="types === 'reply'" :is="'exceptionReply'" @close="closeFunc"  :dialogVisible="dialogVisible" :type="types" :item="selectItem" :text="textItem"></component>
 </div>
  
</template>

<script>
import {formatDate } from '@/utils/fun'
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll ,KecForm,KecButtonClick}  from '@/common/components'
import KecException from './addException' 
import exceptionReply from './exceptionReply' 
  export default {
    name:'orderList',
    props:[''],
    data () {
      return {
           visible:false,
           dialogVisible:false,
           addVisible:false,
           changeVisible:false,
           order_list:[],
           types:'',
           componentName:'KecException',
           letWidth:{
             0:'150px',
             2:'120px',
             3:'120px',
             4:'150px',
             5:'150px',
             6:'150px'

           },
           lastWidth:'',
           tableHeader:{
             orderNum:{"title":'订单编号','slot':false,'sort':'ZH'},
             details:{"title":'异常详情','slot':false},
             salePlatform:{"title":'销售平台','slot':false},
             channelCode:{"title":'运输渠道','slot':false},
             typeTagSetName:{"title":'异常种类标签','slot':true},
             processingTagSetName:{"title":'处理情况标签','slot':true},
             exceptionDate:{"title":'日期','slot':false}
           },
           selectIndex:null,
           selectItem:null,
           PageSize:5,
           PageNum:1,
           total:null,
           orderNum:null,
           beginDate:null,
           endDate:null,
           tiems:'',
           searchBool:false,
           textItem:''

      };
    },

    components: {
        KecButton ,
        KecTable,
        KecScroll,
        KecForm,
        KecException,
        KecButtonClick,
        exceptionReply
    },

    computed: {
      ...mapState('customer',['exceptionList'])
    },

    beforeMount() {},

    mounted() {
      this.mountFunc(this.PageSize,this.PageNum)
      this.loadGetTags({pageSize:10000,pageNumber:1})
    },

    methods: {
        ...mapActions('customer',['loadGetLogisticsException']),
        ...mapActions('basic',['loadGetTags']),
        handleCurrentChange(page){
          this.PageNum = page ;
          this.mountFunc(this.PageSize,page)
        },
        searchFunc(){
          
          this.searchBool = true ;
          this.mountFunc(5,1)
        },
        buttonFunc(types,item){
          this.types = types ;
          this.dialogVisible = true ;
          if(types === 'addVisible') {
            this.textItem = '添加异常'
            this.selectItems = null
            this.componentName = 'KecException'
          }else if(types === 'changeVisible'){
            this.textItem = '修改异常'
            this.componentName = 'KecException'
          }else{
            this.textItem = '异常回复'
            this.componentName = 'exceptionReply'
          }
            
        },
        mountFunc(size,num){
          const _ = this ;
          let data = {
            pageSize:size,
            pageNumber:num
          }
          if(this.searchBool){
              this.beginDate && (data['beginDate'] = this.beginDate)
              this.endDate && (data['endDate'] = this.endDate)
              this.orderNum && (data['orderNum'] = this.orderNum)
          }
          
          _.loadGetLogisticsException(data).then(success => {
            if(_.exceptionList){
               let {content,totalElements} = _.exceptionList;
                
               if(content && content.length){
                  _.order_list = content.map(item => {
                    let {deliveryOrderVo,processingTagSet,typeTagSet} = item ;
                    let processingTagSetName = [],typeTagSetName = [],typeTagIds=[],processingTagIds=[];
                    if(processingTagSet.length){
                      processingTagSet.forEach( (el,i) =>{
                        processingTagSetName.push(el.tagName)
                        processingTagIds.push(el.id)
                        
                      })
                    }
                    if(typeTagSet.length){
                      typeTagSet.forEach( (el,i) =>{
                        typeTagSetName.push(el.tagName)
                        typeTagIds.push(el.id)
                      })
                    }
                    item['orderNum'] = deliveryOrderVo.orderNum ;
                    item['salePlatform'] = deliveryOrderVo.salePlatform ;
                    item['channelCode'] = deliveryOrderVo.channelCode ;
                    item['processingTagSetName'] = processingTagSetName ;
                    item['typeTagSetName'] = typeTagSetName ;
                    item['typeTagIds'] = typeTagIds ;
                    item['processingTagIds'] = processingTagIds ;


                    return item ;
                  }) ;


               }else{
                 _.order_list = []
               }
                _.total = totalElements ;
            }
            
          })
        },
        changeTimesFunc(val){
           if(val){
              this.beginDate = formatDate(val[0],'yyyy-MM-dd')
              this.endDate = formatDate(val[1],'yyyy-MM-dd')
           }else{
             this.beginDate = null
              this.endDate = null
           }
           
        },
        activeFunc(index) {
          this.selectIndex = index ;
        },
        activeItem(item){
          this.selectItem = item ;
        },
        closeFunc(data){
          this.selectIndex = null ;
          this.selectItem = null ;
          this.componentName = 'KecException'
          this.dialogVisible = false ;
          if(data.bool) {
            if(data.type === 'addVisible') this.PageNum = 1 ;
            this.mountFunc(this.PageSize,this.PageNum)
          }
          if(data.type){
              this[data.type] = false ;
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
   padding 15px 15px 13px 15px
   margin-top 10px
 .list  
   margin-top 10px
 .kec-button   
   margin-left 10px       
 .kec-content  
   padding 1px
   .pr+.pr  
     margin-top 2px
</style>