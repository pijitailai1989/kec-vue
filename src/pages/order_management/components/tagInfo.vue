<template>
  <div style="padding:5px">
    <div class="kec-content">
        <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
           <div class="padd" style="width:149px">标签类型</div>
           <div class="padd flx" style="min-width:81px">标签名称</div>
          
        </div>
        <kec-scroll numbers="356">
          <el-table
              class="scrollbar"
              ref="singleTable"
              :data="tableData"
              :header-cell-style="{
                fontWeight:'bold',
                height:'38px',
                color:'#000',
                padding:'0'
              }"
              :cell-style="{
                borderRight:'1px solid #EBEEF5',
                padding:'6px 0'
              }"
              style="width:100%">
              <el-table-column
              prop="tagTypeName"
              width="150"
              label="标签类型">
              </el-table-column>
              <el-table-column
              prop="tagIds"
              label="标签">
              <template slot-scope="scope">
               <el-select
                      style="width:100%"
                      v-model="scope.row.tagIds"
                      multiple
                      size="small"
                      filterable
                      allow-create
                      default-first-option
                      placeholder="">
                      <el-option
                        v-for="item in tagTypeClass[scope.row.tagTypeCode]"
                        :key="item.id"
                        :label="item.tagName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
              </el-table-column>
              
          </el-table>
        </kec-scroll>
    </div>
  </div>
</template>

<script>
import { mapState ,mapActions, mapMutations} from 'vuex';
import {KecButton , KecTable,KecForm ,KecScroll}  from '@/common/components'
  export default {
    name:'tagInfo',
    props:{
      
    },
    data () {
      return {
         tableData: []
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecForm,
        KecScroll
    },

    computed: {
      ...mapState('order',['orderInfos']),
      ...mapState('home',['themeColor']),
      ...mapState('basic',['tagTypeClass'])
    
    },

    beforeMount() {},

    mounted() {
      
    },
    updated(){
      
      
    },
    methods: {
      
    },

    watch: {
      orderInfos:{
        deep:true,
        handler:function(val){
          let {tags} = val ;
          this.tableData = tags
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
   position relative
   
.tableHeader 
   height 38px 
   width 100%
   border-radius 3px
   position absolute
   top 0  
   left 1px
   z-index 9
   div+div  
     border-left 1px solid #fff
   .padd 
     padding 0 0 0 10px
     height 38px 
     line-height 38px
     color #fff  
     font-weight bold   
   .flx 
     flex 1
     flex-grow 1
</style>