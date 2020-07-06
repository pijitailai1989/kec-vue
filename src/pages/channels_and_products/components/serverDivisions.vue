<template>
  <div style="padding:5px">
    <div class="flexs j-between a-center">
      <div>
             <!-- <span>目的地区/国家 ：</span>
             <span>{{destinationCountry && destinationCountry.name}}</span> -->
      </div>
      <div class="flexs kec-btn j-end" v-show="setDestinationShow">
        <el-popover
          placement="left-start"
          width="260"
          v-model="addVisible"
          trigger="click">
          <add-division @close="closeFunc"></add-division>
          <kec-button slot="reference" text="新增分区" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
        </el-popover>
      </div>
    </div>
    
    <div class="kec-content" v-show="setDestinationShow">
          <div class="tableHeader flexs" :style="{background:themeColor.content_border_color}">
          
          <div class="padd" style="width:119px">分区方案</div>
          <!-- <div class="padd flx" style="min-width:81px">分区编号</div> -->
          <div class="padd " style="width:120px">分区名称</div>
          <!-- <div class="padd flx" style="min-width:81px">分区类型</div> -->
          <div class="padd flx" style="min-width:81px">标签</div>
          <div class="padd" style="width:100px">覆盖/排除</div>
        </div>
        <kec-scroll numbers="276">
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
              highlight-current-row
              style="width:100%"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column
              prop="schemaName"
              width="120"
              label="分区方案">
              </el-table-column>
              <!-- <el-table-column
              prop="countryCode"
              label="分区编号">
              </el-table-column> -->
              <el-table-column
              prop="partitionName"
              width="120"
              label="分区名称">
              </el-table-column>
              <!-- <el-table-column
              prop="partitionType"
              label="分区类型">
              </el-table-column> -->
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
                        v-for="item in tagTypeClass[8]"
                        :key="item.id"
                        :label="item.tagName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
              </el-table-column>
              
              <el-table-column
              prop="isArrive"
              width="100"
              label="覆盖/排除">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.isArrive" ></el-checkbox>
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
import addDivision from './addDivisions' 
  export default {
    name:'serverDivision',
    props:{
      
    },
    data () {
      return {
         tableData: [],
           letWidth:{
             "0":"80px"
           },
           lastWidth:'',
           tableHeader:{
             schemaName:{"title":'分区方案','slot':false},
             countryCode:{"title":'分区编号','slot':false},
             partitionName:{"title":'分区名称','slot':false},
             partitionType:{"title":'分区类型','slot':false},
             tagIds:{"title":'标签','slot':true},
             isArrive:{"title":'覆盖/排除','slot':true}
            },
            selectIndex:null,
            selectItem:null,
            addVisible:false,
            changeVisible:false,
            visible:false
      };
    },

    components: {
        KecButton ,
        KecTable,
        addDivision,
        KecForm,
        KecScroll
    },

    computed: {
      ...mapState('basic',['productsInfo','countryList','destinationCountry','tagTypeClass']),
      ...mapState('home',['themeColor'])
    },

    beforeMount() {},

    mounted() {
      this.productsInfoFunc(this.productsInfo)
      this.loadPartitionMethods()
    },
    updated(){
      let data = {
        servicePartitionList:this.tableData
      }
      
    },
    methods: {
      ...mapMutations('basic',['setDestination','setDestinationShow']),
      
      
      ...mapActions('basic',['loadQueryByCountryCode','loadPartitionMethods']),
        changeCountryCode(code){
            this.loadQueryByCountryCode([code])
            let data = this.countryList.find(el=> {
             return el.code == code
            })
            this.setDestination(data)
        },
        changeStatusFunc(){},
        productsInfoFunc(infos){
          let info = JSON.parse(JSON.stringify(infos)) ;
          if( info && info.id ){
           let { servicePartitionList,destinationCountryCode} = info ;
           destinationCountryCode && this.changeCountryCode([destinationCountryCode])
          if(servicePartitionList.length){
            this.tableData = servicePartitionList.map( el => {
              let {id,partitionSchemaName,partitionName,tags,isArrive} = el ;
              let arr = []
              if(tags.length){
                tags.forEach(item => {
                  arr.push(item.id)
                });
              }
              let data = {id,partitionName,schemaName:partitionSchemaName,tagIds:arr,isArrive}
              return data ;
            })
          }
          
            
           
           
          }
        },
        
        isArriveFunc(index) {
          this.selectIndex = index ;

        },
        isArriveItem(item){
          this.selectItem = item ;
        },
        closeFunc(date){
          let {bool,data} = date ;
          const _ = this ;
          if(bool){
            this.addVisible = false ;
            _.tableData = _.tableData.concat(data);
            let obj = {};
             _.tableData = _.tableData.reduce(function(item, next) {
               obj[next.id] ? '' : obj[next.id] = true && item.push(next);
               return item;
            }, []);
            
          }
          this.selectIndex = null ;
        },
        delItem(i){
          this.tableData.splice(i,1)
          this.visible = false ;
          this.selectIndex = null ;
        }
    },

    watch: {
      productsInfo:{
        deep:true,
        handler:function(val){
          this.productsInfoFunc(val)
        }
      },
      tableData:{
        deep:true,
        handler:function(val){
          let {length} = val 
          if(length>=1){
            this.setDestinationShow(true)
            this.$emit('updata',val)
          }else{
            this.setDestinationShow(false)
          }
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