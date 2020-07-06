<template>
  <div style="padding:5px">
    <div class="flexs j-between a-center">
      <div>
             <span>目的地区/国家 ：</span>
             <span>{{destinationCountry && destinationCountry.name}}</span>
      </div>
      <div class="flexs kec-btn j-end" v-show="destinationCountry">
        <el-popover
          placement="left-start"
          width="560"
          v-model="addVisible"
          trigger="click">
          <add-division @close="closeFunc" type="addVisible"></add-division>
          <kec-button slot="reference" text="新增分区" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
        </el-popover>
        <el-popover
          placement="left-start"
          width="560"
          v-model="changeVisible"
          :disabled="selectIndex===null"
          trigger="click">
          <add-division @close="closeFunc" type="changeVisible"  :item="selectItem"></add-division>
          <kec-button  :disabled="selectIndex===null" slot="reference" text="修改分区" icon="fa-pencil" 
          background="#17A2B8" color="#fff"></kec-button>
          
        </el-popover>
        <el-popover
            placement="bottom-start"
            width="160"
            :disabled="selectIndex===null"
            v-model="visible">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click.native="closeFunc">取消</el-button>
              <el-button type="primary" size="mini" @click.native="delItem(selectIndex)">确定</el-button>
            </div>
          <kec-button :disabled="selectIndex===null" text="刪除分区" slot="reference"
          icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
        </el-popover>
      </div>
    </div>
    
    <div class="kec-content" v-show="destinationCountry">
          <kec-table 
           height="419px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="tableData" 
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
  </div>
</template>

<script>
import { mapState ,mapActions, mapMutations} from 'vuex';
import {KecButton , KecTable,KecForm }  from '@/common/components'
import addDivision from './addDivision' 
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
             id:{"title":'分区编号','slot':false},
             partitionName:{"title":'分区名称','slot':false},
             subdivisionsName:{"title":'包含的行政区','slot':false},
             coverMatchMode:{"title":'包含的区域','slot':false},
             excludeMathMode:{"title":'排除的区域','slot':false},
             partitionMethodName:{"title":'分区的方法','slot':false},
             attrTagsName:{"title":'属性标签','slot':false}
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
        KecForm
    },

    computed: {
      ...mapState('basic',['productsInfo','countryList','destinationCountry'])
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
      this.$emit('updata',data)
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
        productsInfoFunc(infos){
          let info = JSON.parse(JSON.stringify(infos)) ;
          if( info && info.id ){
           let { servicePartitionList ,destinationCountryCode } = info ;
           
          if(servicePartitionList.length){
            servicePartitionList.forEach( el => {
              let {attrTags,subdivisions,partitionMethod} = el ;
              let attrTagsId = [] ,attrTagsName = '' , subdivisionsId = [] ,subdivisionsName = '';
              if(attrTags.length){
               attrTags.forEach( (item,i)=>{
                   attrTagsId.push(item.id)
                   if(i>=1) attrTagsName+= ','
                   attrTagsName+= item.tagName
                })
              }
              if(subdivisions.length){
               subdivisions.forEach( (item,i)=>{
                   subdivisionsId.push(item.id)
                   if(i>=1) subdivisionsName+= ','
                   subdivisionsName += item.name
                })
              }
              el['partitionMethodName'] = partitionMethod.text || '' ;
              el['partitionMethodCode'] = partitionMethod.code ;
              el['attrTagsId'] = attrTagsId ;
              el['attrTagsName'] = attrTagsName ;
              el['subdivisionsId'] = subdivisionsId ;
              el['subdivisionsName'] = subdivisionsName ;
            })
          }
          
           this.tableData = servicePartitionList ;
           this.destinationCountryCode = destinationCountryCode ;
           destinationCountryCode && this.changeCountryCode([destinationCountryCode])
           
          }
        },
        
        activeFunc(index) {
          this.selectIndex = index ;

        },
        activeItem(item){
          this.selectItem = item ;
        },
        closeFunc(data){
          
          if(data.bool) {

            if(data.type === 'addVisible'){
              this.tableData.push(data.data)
            }else if(data.type === 'changeVisible'){
              const i = this.selectIndex ;
              this.tableData.splice(i,1,data.data)
            }
          }
          this[data.type] = false ;
          this.selectIndex = null ;
          this.selectItem = null ;
          this.visible = false ;
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
   padding 0 2px
</style>