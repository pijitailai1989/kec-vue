<template>
   <div style="position:relative">
    <div class="tables scrollbar" :style="{maxHeight:height,overflowY:'auto'}">
      <div ref="tableHeader" class="table-th flexs" :style="{background:themeColor.content_border_color}">
          <span class="flexs a-center j-center" :class="[ maxWidth[index]?'':'five' ]" :style="{'width':maxWidth[index]}" v-for="(item,key,index) in tableHeader" :key="key">{{item['title']}}</span>
          
      </div>
      <div class="table-tr" :style="{'font-size':font,'padding-top':clientHeight+'px'}" v-if="tableData.length">
          <div v-for="(item,index) in tableData" :key="index" 
              class="flexs columns item-ul" 
               >
              <div class="flexs" style="width:100%;background:#FAE1CB">
                <div :class="[ maxWidth[index]?'':'five' ]" class="todo-li flexs a-center j-center" 
                :style="{'width':maxWidth[index]}" v-for="(todo,key,index) in tableHeader" :key="todo.id">
                  <slot v-if="todo['slot']" name="a" v-bind:item="item[key]"></slot>
                  <slot v-else v-bind:item="item[key]"></slot>
                </div>
              </div>
              <div class="todo-bottom">
                  <div class="tables-th flexs">
                       <span class="flexs a-center j-center" :class="[ minWidth[indexs]?'':'five' ]" :style="{'width':minWidth[indexs]}" 
                       v-for="(y,keys,indexs) in tableHeaderMin" :key="keys">{{y['title']}}</span>
                       <span class="flexs a-center j-center" :style="{'width':lastWidth}">操作</span>
                   </div>
                   <div class="tables-tr">
                       <div v-for="(z,indexs) in item.costArr" :key="indexs" 
                        class="flexs columns item-ul">
                          <div class="flexs" style="width:100%">
                            <div :class="[ minWidth[indexx]?'':'five' ]" class="todo-li flexs a-center j-center" 
                            :style="{'width':minWidth[indexx]}" v-for="(n,keyx,indexx) in tableHeaderMin" :key="n.id">
                              <el-input v-model="z[keyx]" size="mini" placeholder="请输入内容"></el-input>
                            </div>
                            <div class="todo-li flexs a-center j-center" :style="{'width':lastWidth}">
                              <kec-button text="" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
                            </div>
                          </div>
                          
                        </div>
                   </div>
              </div>
          </div>
      </div>
      <div class="flexs a-center j-center" v-else>
          <div style="padding:50px 0" class="flexs a-center j-center columns">
            <i class="iconfont icon-zhaobudaojieguo" style="font-size:40px;color:#ccc"></i>
            <span style="font-size:14px;color:#ccc">No Data</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { KecButton }  from '@/common/components'
import { mapState } from 'vuex'

  export default {
    name:'tablesTemplate',
    props:{
       selectIndex: [String, Object,Number],
       tableData:Array,
       font:String,
       maxWidth:Object,
       minWidth:Object,
       tableHeader:Object,
       tableHeaderMin:Object,
       lastWidth:String,
       height:String
    },
    data () {
      return {
         active_index:null,
         clientHeight:0
      };
    },
    components:{
      KecButton
    },
    computed: {
      ...mapState('home',['themeColor']),
    },
    methods:{
        
        handleResize(){
          let tableHeader = this.$refs.tableHeader ;
          if(tableHeader.clientHeight != this.clientHeight){
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
      tableData:{
        deep:true,
        handler:function(val){
            console.log(val)
        }
      }
    }
    
  }

</script>
<style lang='stylus' scoped>
 .tables 
   width 100%
   border-radius 3px 
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
        padding 8px
        word-wrap  break-word
        word-break  break-all
      span+span  
        border-left 1px solid #fff
   .table-tr   
      width 100%
      
      .item-ul
       border-top 1px solid #ccc 
       border-left 1px solid #ccc 
       border-right 1px solid #ccc 
       margin-bottom 0
       cursor pointer
       &:hover  
         background 
       &:last-child  
          border-bottom 1px solid #ccc 
       .todo-li+.todo-li
         border-left 1px solid #ccc
       .todo-li  
         padding 8px
         word-wrap  break-word
         word-break  break-all
       .todo-bottom  
         padding 5px    
         border-top 1px solid #ccc   
         width 100%
         span+span  
           border-left 1px solid #fff
         .item-ul
          border-top 1px solid #ECEDF1 
          border-left 1px solid #ECEDF1 
          border-right 1px solid #ECEDF1 
          margin-bottom 0
          cursor pointer
          &:hover  
            background 
          &:last-child  
             border-bottom 1px solid #ECEDF1
          .todo-li+.todo-li
            border-left 1px solid #ECEDF1
       .tables-th   
         padding 1px
         background #ECEDF1
</style>