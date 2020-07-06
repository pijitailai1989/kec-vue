<template>
  <kec-scroll :numbers="179">
    <div class="flexs kec-btn j-end" ref="box">
      <el-popover
        placement="left-start"
        width="360"
        v-model="addVisible"
        trigger="click">
        <kec-country @close="closeFunc" type="addVisible"></kec-country>
        <kec-button slot="reference" text="" icon="fa-plus" background="#ED6D01" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="360"
        v-model="changeVisible"
        :disabled="selectIndex===null"
        trigger="click">
        <kec-country @close="closeFunc" type="changeVisible" :item="selectItem"></kec-country>
        <kec-button :disabled="selectIndex===null" slot="reference" text="" icon="fa-pencil" background="#17A2B8" color="#fff"></kec-button>
      </el-popover>
      <el-popover
        placement="left-start"
        width="160"
        :disabled="selectIndex===null"
        v-model="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click.native="delFunc">确定</el-button>
        </div>
        <kec-button slot="reference"
          :disabled="selectIndex===null" text="" icon="fa-eraser" background="#DC3545" color="#fff"></kec-button>
      </el-popover>
    </div>
    <div class="kec-content">
          <kec-table 
           height="255px"
           :tableHeader="tableHeader" 
           :lastWidth="lastWidth" 
           :tableData="locationList" 
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
    <div class="flexs j-end">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="PageNum"
        :page-size="PageSize"
        :total="total">
      </el-pagination>
    </div>
  </kec-scroll>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecButton , KecTable ,KecScroll }  from '@/common/components'
import KecCountry from './addCountry' 
  export default {
    name:'countryDistrict',
    props:[''],
    data () {
      return {
           visible:false,
           addVisible:false,
           changeVisible:false,
           locationList:[],
           letWidth:{
             1:'120px',
             3:'100px',
             4:'100px',
             5:'100px',
             6:'100px'
           },
           lastWidth:'',
           tableHeader:{
             countryName:{"title":'国家/地区','slot':false},
             countryCode:{"title":'国家/地区代码','slot':false},
             locationName:{"title":'地点','slot':false},
             locationCode:{"title":'地点代码','slot':false},
            //  e:{"title":'类型','slot':false},
             longitude:{"title":'经度','slot':false},
             latitude:{"title":'纬度','slot':false},
             postCode:{"title":'邮政编码','slot':false}
             
           },
           selectIndex:null,
           selectItem:null,
           PageSize:20,
           PageNum:1,
           total:null
      };
    },

    components: {
        KecButton ,
        KecTable,
        KecCountry,
        KecScroll
    },

    computed: {
      ...mapState('basic',['locationData'])
    },

    beforeMount() {},

    mounted() {
      this.loadCountryQueryAll()
      this.mountFunc(this.PageSize,this.PageNum)
    },

    methods: {
        ...mapActions('basic',['loadLocationQueryAll','loadLocationDelete','loadCountryQueryAll']),
        handleCurrentChange(page){
          this.PageNum = page ;
          this.mountFunc(this.PageSize,page)
        },
        mountFunc(size,num){
          const _ = this ;
          let data = {
            pageSize:size,
            pageNumber:num
          }
          _.loadLocationQueryAll(data).then(success => {
            let {content,totalElements} = _.locationData;
            _.locationList = content ;
            _.total = totalElements ;
          })
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
          if(data.bool) {
            if(data.type === 'addVisible') this.PageNum = 1 ;
            this.mountFunc(this.PageSize,this.PageNum)
          }
          if(data.type){
              this[data.type] = false ;
          } 
        },
        delFunc(){
          let {length} = this.locationList ;
          if(this.selectIndex!==null) {
            this.loadLocationDelete([this.selectItem.id]).then(success=> {
                   this.selectIndex = null ;
                   if(length == 1){
                     this.PageNum >=2 && this.PageNum -- ;
                   }
                   this.mountFunc(this.PageSize,this.PageNum)
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

    watch: {
      
    }

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