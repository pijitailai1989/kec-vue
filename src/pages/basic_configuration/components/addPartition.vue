<template>
    <kec-dialog 
      boxWidth="1200px"
      boxTop="10vh"
      v-if="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button-click 
           @click="clickConfirm(types)" 
           :text="types==='add'?'新建':'保存'" 
           icon="fa-floppy-o" 
           background="#28A745" 
           color="#fff">
           </kec-button-click>
           <kec-button 
           @click.native="cancel" 
           text="取消" icon="fa-undo" 
           background="#6C757D" 
           color="#fff"></kec-button>
        </div>
      </template>
      <template>
         <kec-scroll class="row">
            <div class="col-sm-5">
                <div class="col-sm-12">
                    <kec-form text="国家/地区" width="90px" crosswise>
                      <template #input>
                        <el-select 
                        :disabled="types==='eqit'"
                        filterable v-model="payload.countryCode" 
                        @change="changeCountry(payload.countryCode,payload.id)"
                        placeholder="" style="width:100%">
                          <el-option
                            v-for="item in countryList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-12 ser">
                    <kec-form text="可用地区过滤">
                      <template #input>
                        <div class="col-sm-12 borders">
                            <div class="col-sm-12" style="margin-bottom:5px">
                              <el-input placeholder="请输入内容" v-model="filterInput" class="input-with-select">
                                <el-select
                                disabled
                                 v-model="filterType" slot="prepend" placeholder="请选择">
                                  <el-option label="全部" value="1"></el-option>
                                  <el-option label="邮编" value="2"></el-option>
                                  <el-option label="地点" value="3"></el-option>
                                </el-select>
                                <el-button
                                @click.native="filterFunc(filterInput)"
                                 slot="append">查询</el-button>
                              </el-input>
                            </div>
                            <div class="col-sm-12" style="margin-bottom:5px;">

                              <el-table
                                height="350"
                                :data="filteredTableData"
                                tooltip-effect="dark"
                                style="width: 100%"
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                
                                  type="selection"
                                  width="30">
                                </el-table-column>
                                <el-table-column
                                  prop="locationCode"
                                  label="地点编码">
                                </el-table-column>
                                <el-table-column
                                  prop="locationName"
                                  label="名称">
                                </el-table-column>
                                <el-table-column
                                  prop="locationCode"
                                  label="邮编">
                                </el-table-column>
                              </el-table>

                            </div>
                        </div>
                        
                      </template>
                    </kec-form>
                </div>
            </div>
            <div class="col-sm-1 flexs j-center">
                 <div style="padding-top:250px">
                    <div>
                    <el-button 
                    :disabled="multipleSelection.length <= 0"
                    @click.native="joinFunc(selectIndex,multipleSelection)"
                    style="margin-bottom:5px">加入
                         <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                    </div>
                    <div>
                     <el-button
                     :disabled="removeArr <=0 "
                     @click.native="removeFunc(selectIndex)"
                     ><i class="el-icon-d-arrow-left"></i>
                      移除</el-button>
                    </div>
                 </div>
            </div>
            <div class="col-sm-6">
                <div class="col-sm-12">
                    <kec-form crosswise text="方案名称" width="90px">
                      <template #input>
                        <el-input v-model="payload.partitionSchemaName" placeholder=""></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-12 ser">
                   <kec-form text="分区名详情">
                      <template #input>
                          <div class="col-sm-12 borders">
                            <div class="col-sm-12" style="margin-bottom:5px;">
                                <el-tabs v-model="editableTabsValue" type="card" @tab-click="handleTabsClick" editable @edit="handleTabsEdit">
                                    <el-tab-pane
                                      :key="item.name"
                                      v-for="(item, index) in payload.partitionList"
                                      :label="item.partitionName"
                                      :name="item.name"
                                    >

                                       <div class="col-sm-12">
                                          <kec-form crosswise text="分区名" width="70px">
                                            <template #input>
                                              <el-input placeholder="输入" 
                                              
                                              v-model="item.partitionName">
                                              </el-input>
                                            </template>
                                          </kec-form>
                                          
                                        </div>
                                        <div class="col-sm-12" style="margin-bottom:5px;">

                                          <el-table
                                            height="305"
                                            :data="item.coveredLocations"
                                            tooltip-effect="dark"
                                            style="width: 100%"
                                            @selection-change="handleSelectionChangeRight">
                                            <el-table-column
                                            
                                              type="selection"
                                              width="30">
                                            </el-table-column>
                                            <el-table-column
                                            prop="locationCode"
                                              label="地点编码">
                                            </el-table-column>
                                            <el-table-column
                                              prop="locationName"
                                              label="名称">
                                            </el-table-column>
                                            <el-table-column
                                              prop="locationCode"
                                              label="邮编"
                                              show-overflow-tooltip>
                                            </el-table-column>
                                          </el-table>

                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                            
                          </div>
                    </template>
                    </kec-form>
                </div>
                
            </div>
          </kec-scroll>
      </template>
    </kec-dialog>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {KecButton , KecForm ,KecDialog ,KecTabs,KecButtonClick,KecScroll}  from '@/common/components'

  export default {
    name:'addPartition',
    props:{
      dialogVisible:Boolean,
      text:String,
      item:Object,
      types:String
    },
    data () {
      return {
         table:[],
         loading:false,
         filterInput:'',
         filterType:'2',
         payload:{
            "id":null,
            "countryCode": "",
            "partitionSchemaName": "",
            "partitionList": [
                {
                        "partitionName": "",
                        "name":'0',
                        "coveredLocations": [],
                        "selectArr":[]
                }
            ]
         },
        multipleSelection: [],
        editableTabsValue: '0',
        tabIndex: 1,
        locationList:[],
        selectIndex:0,
        removeArr:0

      };
    },

    components: {
        KecButton,
        KecButtonClick,
        KecForm,
        KecDialog,
        KecTabs,
        KecScroll
    },

    computed: {
      ...mapState('home',['themeColor']),
      ...mapState('basic',['countryList']),
      ...mapState('vendor',['locationsList']),
      filteredTableData: function(){
        let arr = this.locationList.filter(item => {
          return item['active'] === true ;
        })
        return arr
        
      }
    },

    beforeMount() {},

    mounted() {
      
           
    },

    methods: {
        ...mapActions('vendor',['loadGetLocations','loadPostPartitionSchemas','loadPutPartitionSchemas']),
        cancel() {
            this.$emit('closeFunc',false)
            this.payload = {
                "id":null,
                "countryCode": "",
                "partitionSchemaName": "",
                "partitionList": [
                    {
                        "partitionName": "",
                        "name":"0",
                        "coveredLocations": [],
                        "selectArr":[]
                    }
                ]
            }
        },
        joinFunc(index,arr){
            const _ = this ;
            arr.forEach(item =>{
              _.payload.partitionList[index]['coveredLocations'].unshift(item);
            })
            
            for (let i = _.locationList.length - 1; i >= 0; i--) {
                let locaId = _.locationList[i]['id']
                arr.forEach( (todo,y) =>{
                  if(locaId === todo.id){
                    _.locationList.splice(i,1)
                  }
               })
            }
            
        },
        removeFunc(index){
           const _ = this ;
           let arr = _.payload.partitionList[index]['selectArr'] ;
          
          arr.forEach(item =>{
            _.$set( item , 'active' , true )
            _.locationList.unshift(item)
           })
            let selectArr = _.payload.partitionList[index]['coveredLocations'];
            for (let i = selectArr.length - 1; i >= 0; i--) {
                let locaId = selectArr[i]['id']
                arr.forEach( (todo,y) =>{
                  if(locaId === todo.id){
                    _.payload.partitionList[index]['coveredLocations'].splice(i,1)
                  }
               })
            }
        },
        filterFunc(filterInput){
          let reg = new RegExp (filterInput) ;
          this.locationList.forEach(item=>{
            this.$set( item , 'active' , false )
            if(reg.test(item.locationCode)){
               this.$set( item , 'active' , true )
            }
          })
          
        },
        handleSelectionChangeRight(val){
          const _this = this ;
          this.$set(this.payload.partitionList[_this.selectIndex],'selectArr',val);
          this.removeArr = this.payload.partitionList[_this.selectIndex]['selectArr'].length
          
        },
        changeCountry(countryCode,schemeId){
          let data = {
            pageSize:6000,
            pageNumber:1,
            countryCode
          }
          schemeId && ( data['schemeId'] = schemeId )
          return ;
          this.loadGetLocations(data).then(success => {
            let {content,totalElements} = this.locationsList;
            if(content && content.length){
              this.locationList = content.map(item=>{
                this.$set( item , 'active' , true )
                return item 
              }) 
            }else{
              this.locationList = []
            }
          })
          
        },
        clickConfirm(type){
           const _this = this ;
           _this.loading = true ;
           let {id,countryCode,partitionSchemaName,partitionList} = this.payload ;
           let arr = []
           if(partitionList.length){
              partitionList.forEach(item=>{
                 let data = {}
                     data['partitionName'] = item['partitionName']
                     data['coveredLocations'] = []
                 if(item.coveredLocations.length){
                   item.coveredLocations.forEach(todo=>{
                     data['coveredLocations'].push(todo.id)
                   })
                 }
                 arr.push(data)

              })
           }else{
              return
           }
           let data = {}
           if(type==='add'){
                data = {countryCode,partitionSchemaName,partitionList:arr} ;
                _this.loadPostPartitionSchemas(data).then(success=>{
                      _this.$emit('closeFunc',true)
                      _this.loading = false ;
                      _this.$message( {
                        message: success,
                        type: 'success'
                      });
                    }).catch(error=> {
                      _this.loading = false ;
                      _this.$message( {
                        message: error,
                        type: 'error'
                      });
                    })
              
           }else{
             data = {id,countryCode,partitionSchemaName,partitionList:arr} ;
             
             _this.loadPutPartitionSchemas(data).then(success=>{
                  _this.$emit('closeFunc',true)
                  _this.loading = false ;
                  _this.$message( {
                  message: success,
                  type: 'success'
                  });
              }).catch(error=> {
                  _this.$message( {
                  message: error,
                  type: 'error'
                  });
                  _this.loading = false ;
              })
           }
           
        },
        handleTabsClick(name){
            this.selectIndex = name.index ;
            this.removeArr = this.payload.partitionList[name.index]['selectArr'].length
        },
        handleTabsEdit(targetName, action) {
            const _this = this ;
            if (action === 'add') {
              let newTabName = ++this.tabIndex + '';
              this.payload['partitionList'].push({
                "partitionName": "",
                "name":newTabName,
                "coveredLocations": [],
                "selectArr":[]
              });
              this.editableTabsValue = newTabName;
              
            }
            if (action === 'remove') {
              
              let tabs = JSON.parse( JSON.stringify ( this.payload['partitionList'] ))
              let activeName = this.editableTabsValue;
              
                tabs.forEach((tab, index) => {
                  if (tab.name == targetName) {
                    if(tabs.length>=2){
                        let arr = tabs[index]['coveredLocations'] ;
                          arr.forEach(item =>{
                            _this.$set( item , 'active' , true )
                            _this.locationList.unshift(item)
                          })
                    }
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                      activeName = nextTab.name;
                    }
                  }
                });
              
              
              this.editableTabsValue = activeName;
              
                 if(tabs.length>=2){
                     this.payload['partitionList'] = tabs.filter(tab => tab.name !== targetName);
                 }
              
              
              
            }
            let {length} = this.payload['partitionList'] ;

            if(length>=1){
              this.selectIndex = length - 1 ;
              this.removeArr = this.payload.partitionList[length - 1]['selectArr'].length
            }
            

      },
      handleSelectionChange(val){
        this.multipleSelection = val ;
      }
    
    },

    watch: {
      types:{
        deep:true,
        handler:function(val){
          const _ = this ;
           this.payload = {
                "id":null,
                "countryCode": "",
                "partitionSchemaName": "",
                "partitionList": [
                    {
                        "partitionName": "",
                        "name":"0",
                        "coveredLocations": [],
                        "selectArr":[]
                    }
                ]
            }
           if( val === 'eqit'){
             let{country,countryName,id,partitionList,schemaName} = _.item ;
             if(partitionList.length){
               partitionList.forEach((item,index)=>{
                  item['name'] = index + ''
                  item['selectArr'] = []
               })
               _.editableTabsValue = '0'
               _.tabIndex = partitionList.length
              //  _.changeCountry(country['code'],id)
             }
             _.payload = {id,countryCode:country['code'],partitionSchemaName:schemaName,partitionList}
             _.filterInput = ''
             _.filterType = ''
           }else{
             _.locationList = []
             _.filterInput = ''
             _.filterType = ''
           }

           
        }
      }
    },
    destroyed() {
      
    }

  }

</script>
<style lang='stylus' scoped>
 .kec-button+.kec-button 
   margin-left 10px
   
 .row >>> .is-cursor
   .el-input__inner
      cursor pointer !important
 .kec-content  
   width 780px
   padding 1px
   position relative
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding-top 4px
   &.pro  
     height 99px  
     margin-bottom 4px
     
   &.err  
     min-height 40px
  .ser
    margin-top 5px
    .el-select
      width 100px !important
    
  
  .input-with-select .el-input-group__prepend 
    background-color #fff
  
  
</style>