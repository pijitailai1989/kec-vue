<template>
   <div style="position:relative">
    <div class="tables scrollbar" 
      :style="{
       maxHeight:tabsShow=='show'?`calc( 100vh - 44px - ${height} )`:`calc( 100vh - ${height} )`,
       overflowY:'auto'
      }">
      <div ref="tableHeader" class="table-th flexs" :style="{background:themeColor.content_border_color}">
          <span class="flexs a-center j-center" :class="[ letWidth[index]?'':'five' ]" :style="{'width':letWidth[index]}" v-for="(item,key,index) in tableHeader" :key="key">{{item['title']}}</span>
          <span class="flexs a-center j-center" :style="{'width':lastWidth}" v-if="lastWidth">操作</span>
      </div>
      <div class="table-tr" :style="{'font-size':font,'padding-top':clientHeight+'px'}" v-if="tableData.length>0">
          <ul v-for="(item,index) in tableData" :key="index" 
              class="flexs item-ul" 
              :style="{
                       background:active_index===index?themeColor.content_table_color:'',
                       color:active_index===index?'#000':'',
                       opacity:active_index===index?1:1
                      }"
               @click="clickItemUl(index,item)">
              <li :class="[ letWidth[index]?'':'five' ]" class="todo-li flexs a-center j-center" :style="{'width':letWidth[index]}" v-for="(todo,key,index) in tableHeader" :key="key">
                <slot v-if="todo['slot']" name="a" v-bind:item="item[key]"></slot>
                <slot v-else v-bind:item="item[key]"></slot>
                
              </li>
              <li class="todo-li flexs a-center j-center" :style="{'width':lastWidth}" v-if="lastWidth">
                <slot name="operation"></slot>
              </li>
          </ul>
      </div>
      <div class="flexs a-center j-center sky" v-else>
          <div style="padding:50px 0" class="flexs a-center j-center columns">
            <i class="iconfont icon-zhaobudaojieguo" style="font-size:40px;color:#ccc"></i>
            <span style="font-size:14px;color:#ccc">No Data</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
         clientHeight:0
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
            
           
        }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
      let tableHeader = this.$refs.tableHeader ;
        this.clientHeight = tableHeader.clientHeight ;
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
      }
    }
    
  }

</script>
<style lang='stylus' scoped>
 .tables 
   width 100%
   border-radius 3px 
   .sky 
     background #F9F9F9
   .five  
     flex-grow 1  
     flex 1  
   .table-th  
      color #fff
      width 100%
      box-shadow  0px 1px 2px #ccc;
      background #fff
      position absolute
      padding 0
      border-radius 3px 
      top 0 
      left 0
      span 
        font-weight bold
        padding 9px 2px
        word-wrap  break-word
        word-break  break-all
      span+span  
        border-left 1px solid #fff
   .table-tr   
      width 100%
      
      ul
       border-top 1px solid #ccc 
       border-left 1px solid #ccc 
       border-right 1px solid #ccc 
       margin-bottom 0
       cursor pointer
       &:hover  
         background #eee
       &:last-child  
          border-bottom 1px solid #ccc 
       li+li
         border-left 1px solid #ccc
       li  
         padding 8px 0px
         word-wrap  break-word
         word-break  break-all
</style>