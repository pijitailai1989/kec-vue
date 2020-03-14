<template>
   <div style="position:relative">
    <div class="tables scrollbar" 
      :style="{
       maxHeight:tabsShow=='show'?`calc( 100vh - 44px - ${height} )`:`calc( 100vh - ${height} )`,
       overflowY:'auto'
      }">
      <div ref="tableHeader" class="table-th flexs" :style="{background:themeColor.content_border_color,
      borderColor:themeColor.content_border_color}">
          <div class="flexs a-center j-center sort" 
          :class="[ letWidth[index]?'':'five' ]" 
          :style="{'width':letWidth[index]}" 
          v-for="(item,key,index) in tableHeader" 
          :key="key"
          >
          <span>{{item['title']}}</span>
          <i class="fa fa-sort" @click="sortEvent(key,item['sort'])" v-if="item['sort']"></i>
          </div>
          <div class="flexs a-center j-center" :style="{'width':lastWidth}" v-if="lastWidth">操作</div>
      </div>
      <div class="table-tr" :style="{'font-size':font,'padding-top':clientHeight+'px'}" v-if="tableDatas.length>0">
          <ul v-for="(item,index) in tableDatas" :key="index" 
              class="flexs item-ul" 
              :style="{
                       background:active_index===index?themeColor.content_table_color:'',
                       color:active_index===index?'#000':'',
                       opacity:active_index===index?1:1
                      }"
               @click="clickItemUl(index,item)">
              <li :class="[ letWidth[index]?'':'five' ]" class="todo-li flexs a-center j-center" 
              :style="{'width':letWidth[index]}" v-for="(todo,key,index) in tableHeader" :key="key">
                <slot v-if="todo['slot']" :name="key" v-bind:item="item[key]"></slot>
                <slot v-else v-bind:item="item[key]"></slot>
                
              </li>
              <li class="todo-li flexs a-center j-center" :style="{'width':lastWidth}" v-if="lastWidth">
                <slot name="operation" v-bind:item="item"></slot>
              </li>
          </ul>
      </div>
      <div class="flexs a-center j-center sky" v-else>
          <div style="padding:30px 0 10px 0" class="flexs a-center j-center columns">
            <i class="iconfont icon-zhaobudaojieguo" style="font-size:40px;color:#ccc"></i>
            <span style="font-size:14px;color:#ccc">No Data</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {sortCompare } from '@/utils/fun'
  export default {
    name:'tables',
    props:{
       selectIndex: [String, Object,Number],
       tableData:Array,
       font:String,
       letWidth:Object,
       tableHeader:Object,
       lastWidth:String,
       height:String
    },
    data () {
      return {
         active_index:null,
         clientHeight:38,
         tableDatas:[],
         sortArr:[]
      };
    },
    computed: {
      ...mapState('home',['themeColor','tabsShow']),
    },
    methods:{
        clickItemUl(index,item) {
          if( index !== this.active_index ){
             this.active_index = index ; 
             this.$emit('active-index',index)
             this.$emit('active-item',item)
          }
        },
        handleResize(){
          let tableHeader = this.$refs.tableHeader ;
          if(tableHeader.clientHeight != this.clientWidth){
             this.clientHeight = tableHeader.clientHeight ;
          }
        },
        sortFunc(key){
           this.$emit('sort-event',key)
        },
        sortEvent(key,value){
          const _this = this ;
           _this.tableDatas = sortCompare(_this.tableDatas,key,value)
        },
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
      let tableHeader = this.$refs.tableHeader ;
        this.clientHeight = tableHeader.clientHeight || 38;
    },
    destroyed () {
       window.removeEventListener('resize', this.handleResize)
    },
    watch: {
      selectIndex:{
          deep:true,
          handler:function(val){
             this.active_index = val===null ? null : val ;
          }
      },
      tableData:{
        deep:true,
        handler:function(val){
          if(val && val.length){
            this.tableDatas = JSON.parse( JSON.stringify(val) )
          }else{
            this.tableDatas = []
          }
        }
      }
    }
    
  }

</script>
<style lang='stylus' scoped>
 .tables 
   width 100%
   border-radius 3px 
   border-bottom 1px solid #EBEEF5 
   .sky 
     background #F9F9F9
   .five  
     flex-grow 1  
     flex 1  
     min-width 100px
   .table-th  
      .sort  
        position relative
        i  
          position absolute
          right 4px  
          cursor pointer
          &:hover 
            font-size 16px
            right 3px 
      border-left 1px solid
      border-right 1px solid
      color #fff
      width 100%
      border-radius 3px
      box-shadow  0px 1px 2px #EBEEF5
      background #fff
      position absolute
      z-index 99
      padding 0
      top 0 
      left 0
      div 
        font-weight bold
        padding 8px 2px
        word-wrap  break-word
        word-break  break-all
        
      div+div 
        border-left 1px solid #fff
   .table-tr   
      width 100%
      
      ul
       border-top 1px solid #EBEEF5 
       border-left 1px solid #EBEEF5 
       border-right 1px solid #EBEEF5 
       margin-bottom 0
       cursor pointer
       &:hover  
         background #F5F7FA
       &:last-child  
          
       li+li
         border-left 1px solid #EBEEF5
       li  
         padding 8px 0px
         word-wrap  break-word
         word-break  break-all
</style>