<template>
    <div class="divBack">
       <div class="flexs ulBack">
           <el-tooltip :content="menu[item.title]" placement="top-end" effect="light"
             v-for="(item,index) in tableTabs"
             :key="item.id" >
              <div 
                 @mouseout="iconIndex=null"
                 @mouseover="iconIndex=index"
                 @click="liItemClick(item)"
                 class="item flexs a-center"
                 :class="[item.tableIndex?'active':'']"
                 :style="{background:item.tableIndex?btnColor:''}">
                 <span>{{menu[item.title]}}</span>
                 <i 
                   v-show="iconIndex==index || item.tableIndex" 
                   class="fa fa-times"
                   :style="{color:item.tableIndex?'#fff':btnColor}"
                   @click.stop="iconClick(index)"
                 ></i>
              </div>
           </el-tooltip>
       </div>
     
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
  export default {
    name:'home-tabs',
    props:{
      btnColor:String
    },
    data () {
      return {
         iconIndex:null
      };
    },
    computed: {
      ...mapState('home',['tableTabs']),
      menu(){
        return this.$t('menu')
      }
    },
    methods: {
        ...mapMutations('home',['setTableTabs','deleteItemTabs']),
        iconClick(index){
          let {length} = this.tableTabs ;
          if(length>1) this.deleteItemTabs(index) ;
        },
        liItemClick(item){
          const _this = this ;
          const path = _this.$route.path;
          if(path === item.path) return ;
          _this.$router.push({path:item.path})
          _this.setTableTabs(item)

        }
    },
    watch:{
      tableTabs: {
        handler(val,oldval){
          const _this = this ;
          const path = _this.$route.path;
           
          val.forEach(item=>{
            if(item.tableIndex){
                if(path ===item.path) return ;
                _this.$router.push({path:item.path})
            }
          })
          localStorage.setItem('tableTabs',JSON.stringify(val) )
        },
        deep:true
      }
    }

  }

</script>
<style lang='stylus' scoped>
  .divBack
    padding 5px 10px   
  .ulBack
    margin-bottom 0
    .item 
     padding 6px 18px 
     border-top 1px solid #E4E7ED
     border-bottom 1px solid #E4E7ED
     border-right 1px solid #E4E7ED
     position relative
     cursor pointer
     background #fff
     &.active 
       color #fff
     i 
      position absolute  
      right 2px
      font-size 12px
      &:hover
        border-radius 8px
        font-weight bold
        font-size 14px
        right 1px
     span  
      max-width 100px  
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
     &:first-child
         border-left 1px solid #E4E7ED
         border-top-left-radius 4px
         border-bottom-left-radius 4px
     &:last-child 
         border-top-right-radius 4px
         border-bottom-right-radius 4px
         
</style>