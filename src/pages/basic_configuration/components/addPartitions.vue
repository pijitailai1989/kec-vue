<template>
    <kec-dialog 
      boxWidth="600px"
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
            
            <div class="col-sm-12">
                <div class="col-sm-6">
                    <kec-form text="国家/地区" width="90px" crosswise>
                      <template #input>
                        <el-select 
                        :disabled="types==='eqit'"
                        size="medium"
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
                <div class="col-sm-6">
                    <kec-form text="分区类型" width="90px" crosswise>
                      <template #input>
                        <el-select 
                        size="medium"
                        filterable v-model="payload.partitionType"
                        placeholder="" style="width:100%">
                          <el-option
                            v-for="item in typess"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form crosswise text="方案名称" width="90px">
                      <template #input>
                        <el-input v-model="payload.partitionSchemaName" placeholder="" size="medium"></el-input>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-6">
                    <kec-form text="区段类型" width="90px" crosswise>
                      <template #input>
                        <el-select 
                        size="medium"
                        filterable v-model="payload.sectionType"
                        placeholder="" style="width:100%">
                          <el-option
                            v-for="item in typex"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-12 ser">
                   <kec-form text="分区名详情">
                      <template #input>
                          <div class="col-sm-12 borders">
                            <div class="col-sm-12">
                                <el-tabs v-model="editableTabsValue" type="card" 
                                @tab-click="handleTabsClick" editable @edit="handleTabsEdit">
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
                                              size="small"
                                              v-model="item.partitionName">
                                              </el-input>
                                            </template>
                                          </kec-form>
                                          
                                        </div>
                                        <div class="col-sm-12" style="margin-bottom:5px;">
                                          <el-input
                                            v-if="payload.sectionType === 'codeList'"
                                            type="textarea"
                                            :autosize="{ minRows: 10, maxRows: 10}"
                                            placeholder="请输入内容"
                                            v-model="item.zipCodeText">
                                          </el-input>
                                          <el-input
                                            v-else-if="payload.sectionType === 'label'"
                                            type="textarea"
                                            :autosize="{ minRows: 10, maxRows: 10}"
                                            placeholder="请输入内容"
                                            v-model="item.keywords">
                                          </el-input>
                                          <el-table
                                            height="200"
                                            v-else
                                            :data="payload.sectionType === 'code'?item.partitionZipCode:item.partitionTags"
                                            tooltip-effect="dark"
                                            :cell-style="{ padding:'3px 0' }"
                                            :header-cell-style="{ padding:'5px 0',backgroundColor:'#F5F7FA'}"
                                            style="width: 100%">
                                            <el-table-column
                                              v-if="payload.sectionType === 'code'"
                                              prop="locationCode"
                                              label="地区邮编">
                                              <template slot-scope="scope">
                                                <div class="row">
                                                     <div class="col-sm-6">
                                                       <el-input placeholder="开始区间" size="mini" v-model="scope.row.zipCodeStart">
                                                       </el-input>
                                                     </div>
                                                     <div class="col-sm-6">
                                                       <el-input placeholder="结束区间" size="mini" v-model="scope.row.zipCodeEnd">
                                                       </el-input>
                                                     </div>
                                                </div>
                                              
                                            </template>
                                            </el-table-column>
                                            <!-- <el-table-column
                                              v-if="payload.sectionType === 'label'"
                                              prop="locationCode"
                                              label="地区标签">
                                              <template slot-scope="scope">
                                                <div class="row">
                                                     <div class="col-sm-3">
                                                         <el-select 
                                                          size="mini"
                                                          filterable v-model="scope.row.tagId"
                                                          placeholder="">
                                                            <el-option
                                                              v-for="item in tagTypeClass[12]"
                                                              :key="item.id"
                                                              :label="item.tagName"
                                                              :value="item.id">
                                                            </el-option>
                                                          </el-select>
                                                     </div>
                                                     <div class="col-sm-9">
                                                       <el-input placeholder="" size="mini" v-model="scope.row.keywords">
                                                       </el-input>
                                                     </div>
                                                </div>
                                              
                                            </template>
                                            </el-table-column> -->
                                            <el-table-column
                                              label="删除"
                                              width="50">
                                              <template slot-scope="scope">
                                                 <i class="fa fa-minus-circle cur fa-lg" 
                                                 style="color:#C50A2E"
                                                 @click="delPartitionCode(selectIndex,scope.$index)" aria-hidden="true"></i>
                                              </template>
                                            </el-table-column>
                                          </el-table>

                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                            <div class="col-sm-12" style="margin:5px 0">
                               <kec-button 
                                  v-show="payload.sectionType === 'code'"
                                  @click.native="addPartitionCode(selectIndex)" 
                                  text="添加地区" icon="fa-plus" 
                                  background="#17A2B8" 
                                  color="#fff"></kec-button>
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
            "partitionType":null,
            "sectionType":"code",
            "partitionList": [
                {
                        "partitionName": "",
                        "name":'0',
                        "partitionTags":[
                          {
		                    		"tagId": "",
		                    		"keywords": ""
		                    	}
                        ],
                        "zipCodeText":"",
                        "keywords":"",
                        "partitionZipCode": [
                          {
                            "zipCodeStart": "",
                            "zipCodeEnd": ""
                          }
                        ]
                }
            ]
         },
        multipleSelection: [],
        editableTabsValue: '0',
        tabIndex: 0,
        locationList:[],
        selectIndex:0,
        removeArr:0,
        typess:[
          {code:'sale',text:'销售方案'},
          {code:'vendor',text:'供应商方案'},
          {code:'sort',text:'分拣方案'}
        ],
        typex:[
          {code:'code',text:'邮编区段'},
          {code:'label',text:'地址列表'},
          {code:'codeList',text:'邮编列表'}
        ]

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
      ...mapState('basic',['countryList','tagTypeClass']),
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
                "partitionType":null,
                "sectionType":"code",
                "partitionSchemaName": "",
                "partitionList": [
                    {
                            "partitionName": "",
                            "name":'0',
                            "partitionZipCode": [
                              {
                                "zipCodeStart": "",
                                "zipCodeEnd": ""
                              }
                            ],
                            "zipCodeText":"",
                            "keywords":"",
                            "partitionTags":[
                              {
		                        		"tagId": "",
		                        		"keywords": ""
		                        	}
                            ],
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
           let {id,countryCode,partitionSchemaName,partitionList,partitionType,sectionType} = this.payload ;
           let arr = []
           if(partitionList.length){
              partitionList.forEach(item=>{
                 let data = {}
                    data['partitionName'] = item['partitionName']
                    item['id'] = ( data['id'] = item['id'] )
                    if(sectionType === 'code'){
                      data['partitionZipCode'] = item['partitionZipCode']
                    }else if(sectionType === 'label'){
                      data['keywords'] = item['keywords']
                    }else{
                      data['zipCodeText'] = item['zipCodeText']
                    }
                     
                 
                 arr.push(data)

              })
           }else{
              return
           }
           let data = {}
           if(type==='add'){
                data = {countryCode,partitionSchemaName,partitionList:arr,partitionType} ;
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
             data = {id,countryCode,partitionSchemaName,partitionList:arr,partitionType} ;
             
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
        },
        addPartitionCode(index){
          this.payload['partitionList'][index]['partitionZipCode'].push({"zipCodeStart": "","zipCodeEnd": ""})
          // this.payload['partitionList'][index]['partitionTags'].push({"tagId": "","keywords": ""})
        },
        delPartitionCode(index,i){
          this.payload['partitionList'][index]['partitionZipCode'].splice(i,1)
          // this.payload['partitionList'][index]['partitionTags'].splice(i,1)
        },
        handleTabsEdit(targetName, action) {
            const _this = this ;
            if (action === 'add') {
              let newTabName = ++this.tabIndex + '';
              this.payload['partitionList'].push({
                "partitionName": "",
                "name":newTabName,
                "partitionZipCode": [
                              {
                                "zipCodeStart": "",
                                "zipCodeEnd": ""
                              }
                            ],
                "zipCodeText":"",
                "keywords":"",
                "partitionTags":[
                              {
		                        		"tagId": "",
		                        		"keywords": ""
		                        	}
                            ],
              });
              this.editableTabsValue = newTabName;
              
            }
            if (action === 'remove') {
              
              let tabs = JSON.parse( JSON.stringify ( this.payload['partitionList'] ))
              let activeName = this.editableTabsValue;
              
                tabs.forEach((tab, index) => {
                  if (tab.name == targetName) {
                    
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
                "partitionType":null,
                "sectionType":"code",
                "partitionList": [
                    {
                            "partitionName": "",
                            "partitionZipCode": [
                              {
                                "zipCodeStart": "",
                                "zipCodeEnd": ""
                              }
                            ],
                            "zipCodeText":"",
                            "keywords":"",
                            "partitionTags":[
                              {
		                        		"tagId": "",
		                        		"keywords": ""
		                        	}
                            ],
                    }
                ]
            }
           if( val === 'eqit'){
             let{country,countryName,id,partitionList,schemaName,partitionType} = JSON.parse( JSON.stringify(_.item ));
             let sectionType = '' ;
             if(partitionList.length){
               partitionList.forEach((item,index)=>{
                  let {keywords,partitionZipCode,zipCodeText} = item ;
                  item['name'] = index + ''
                  if(!keywords){
                    // item['partitionTags']=[
                    //           {
		                //         		"tagId": "",
		                //         		"keywords": ""
		                //         	}
                    //         ]
                    item['keywords'] = ""
                  }else{
                    sectionType = 'label'
                  }
                  if(!partitionZipCode){
                    item['partitionZipCode']=[
                              {
                                "zipCodeStart": "",
                                "zipCodeEnd": ""
                              }
                            ]
                  }else{
                    sectionType = 'code'
                  }
                  if(!zipCodeText){
                    item['zipCodeText'] = ""
                  }else{
                    sectionType = 'codeList'
                  }
               })
               
               _.tabIndex = partitionList.length
              //  _.changeCountry(country['code'],id)
             }
             _.payload = {
               id,countryCode:country['code'],
               partitionSchemaName:schemaName,
               partitionList:partitionList.length>0?partitionList:_.payload['partitionList'],
               sectionType:sectionType?sectionType:'code',
               partitionType
               }

            
           }

           _.editableTabsValue = '0'

           
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
  
  .cur 
    cursor pointer
</style>