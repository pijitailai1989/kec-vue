<template>
    <kec-dialog 
      boxWidth="800px"
      boxTop="5vh"
      v-if="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button-click 
            v-checkSubmit
            :text="types==='add'?'新建':'保存'" 
            icon="fa-floppy-o" 
            background="#28A745" 
            color="#fff">
            </kec-button-click>
            <!-- <kec-button-click 
            @click="clickConfirm(selectIndex)" 
            :text="types==='add'?'新建':'保存'" 
            icon="fa-floppy-o" 
            background="#28A745" 
            color="#fff">
            </kec-button-click> -->
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
                <div class="col-sm-5">
                    <kec-form text="科目项名称 :" width="100px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.ledgerSubjectName}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                
                <div class="col-sm-4">
                    <kec-form text="计费维度 :" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.chargeItemAccountingWay}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-3">
                    <kec-form text="单位乘数 :" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.unitRate}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-5">
                    <kec-form text="科目编号 :" width="100px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.ledgerSubjectNumber}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-4">
                    <kec-form text="单位 :" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.unit}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-3">
                    <kec-form text="币种 :" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.currency}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-12 ser">
                   <kec-form text="">
                      <template #input>
                          <div class="col-sm-12 borders">
                            <div class="col-sm-12">
                                <el-tabs v-model="editableTabsValue" type="card" 
                                @tab-click="handleTabsClick" @edit="handleTabsEdit">
                                    <el-tab-pane
                                      :key="item.index"
                                      v-for="(item, index) in payload.productPricesList"
                                      :label="item.name"
                                      :name="item.index"
                                    >

                                       <div class="col-sm-7">
                                          <kec-form crosswise text="名称" width="90px">
                                            <template #input>
                                              <el-input placeholder="输入" 
                                              size="small"
                                              v-model="item.name">
                                              </el-input>
                                            </template>
                                          </kec-form>
                                          
                                        </div>
                                        <div class="col-sm-5">
                                          <kec-form text="费用触发货态" width="100px" star="star" crosswise>
                                            <template #input>
                                              
                                              <el-select v-model="item.standardStateIds" 
                                              class='v-check'
                                              v-checkParam="{required:true}"
                                              filterable
                                              placeholder="" size="medium" style="width:100%">
                                                <el-option
                                                  v-for="item in levelTwoList"
                                                  :key="item.id"
                                                  :label="item.name"
                                                  :value="item.id">
                                                </el-option>
                                              </el-select>
                                            </template>
                                          </kec-form>
                                          
                                        </div>
                                        <div class="col-sm-12">
                                          <kec-form crosswise text="适用标签" width="90px">
                                            <template #input>
                                              
                                              <el-select
                                                style="width:100%"
                                                v-model="item.typeTagIdSet"
                                                multiple
                                                size="small"
                                                filterable
                                                placeholder="">
                                                <el-option
                                                  v-for="item in tagIds"
                                                  :key="item.id"
                                                  :label="item.tagName"
                                                  :value="item.id">
                                                </el-option>
                                              </el-select>
                                            </template>
                                          </kec-form>
                                          
                                        </div>
                                        <div class="col-sm-5">
                                          <kec-form crosswise text="计算方式" width="90px">
                                            <template #input>
                                              <div class="p5">
                                              <el-radio v-model="item.gradientModel" :label="0">分段累加</el-radio>
                                              <el-radio v-model="item.gradientModel" :label="1">分段快查</el-radio>
                                              </div>
                                            </template>
                                          </kec-form>
                                          
                                        </div>
                                        <div class="col-sm-2" v-show="item.gradientModel==0">
                                          <kec-form crosswise text="续重进位"  width="60px">
                                            <template #input>
                                              <div class="p5">
                                                    <el-checkbox v-model="item.carryValve"></el-checkbox>
                                              </div>
                                              
                                            </template>
                                          </kec-form>
                                          
                                        </div>
                                        <div class="col-sm-5" v-show="item.gradientModel==0">
                                          <kec-form crosswise text="进位阀" width="60px">
                                            <template #input>
                                              
                                              <el-input-number :controls="false" size="small"
                                      v-model="item.carryValveNumber" style="width: 100%">
                                                       </el-input-number>
                                            </template>
                                          </kec-form>
                                          
                                        </div>
                                        
                                        
                                        <div class="col-sm-12" style="margin-bottom:5px;">

                                          <el-table
                                            height="200"
                                            :data="item.priceGradientItems"
                                            tooltip-effect="dark"
                                            :cell-style="{ padding:'3px 0'}"
                                            :header-cell-style="{ padding:'5px 0',backgroundColor:'#F5F7FA'}"
                                            style="width: 100%">
                                            <el-table-column
                                              prop="index"
                                              label="序号"
                                              width="50">
                                            </el-table-column>
                                            <el-table-column
                                               v-if="item.gradientModel==0"
                                              label="每续重"
                                              width="100">
                                              <template slot-scope="scope">
                                                <div class="row">
                                                     <div class="col-sm-12">
                                                       <el-input-number :controls="false" size="mini"
                                      v-model="scope.row.perRenewedWeight" style="width: 100%">
                                                       </el-input-number>
                                                     </div>
                                                </div>
                                              
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                              label="开始范围">
                                              <template slot-scope="scope">
                                                <div class="row">
                                                     <div class="col-sm-12">
                                                       <el-input-number :controls="false" disabled size="mini" 
                                      v-model="scope.row.startNumber" style="width: 100%">
                                                       </el-input-number>
                                                     </div>
                                                </div>
                                              
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                              label="结束范围">
                                              <template slot-scope="scope">
                                                <div class="row">
                                                     <div class="col-sm-12">
                                                       <el-input-number :controls="false" size="mini" :min="scope.row.startNumber+1"
                                       v-model="scope.row.endNumber" style="width: 100%">
                                                       </el-input-number>
                                                     </div>
                                                </div>
                                              
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                              label="价格"
                                              width="100">
                                              <template slot-scope="scope">
                                                <div class="row">
                                                     <div class="col-sm-12">
                                                       <el-input-number :controls="false" size="mini" 
                                      v-model="scope.row.price" style="width: 100%">
                                                       </el-input-number>
                                                     </div>
                                                </div>
                                              
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                              label="固定费"
                                              width="100">
                                              <template slot-scope="scope">
                                                <div class="row">
                                                     <div class="col-sm-12">
                                                       <el-input-number :controls="false" size="mini"
                                      v-model="scope.row.fixedCharge" style="width: 100%">
                                                       </el-input-number>
                                                     </div>
                                                </div>
                                              
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                              label="操作"
                                              width="50"
                                              show-overflow-tooltip>
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
                            <div class="col-sm-12 flexs j-end" style="margin:5px 0">
                              
                               <kec-button 
                                  v-show="addShow"
                                  @click.native="addPartitionCode(selectIndex)" 
                                  text="添加报价" icon="fa-plus" 
                                  background="#17A2B8" 
                                  color="#fff"></kec-button>
                               <!-- <kec-button-click 
                                  @click="clickConfirm(selectIndex)" 
                                  :text="types==='add'?'新建':'保存'" 
                                  icon="fa-floppy-o" 
                                  background="#28A745" 
                                  color="#fff">
                                  </kec-button-click> -->
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
    name:'ladderQuotation',
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
           "ledgerSubjectName":"",
           "ledgerSubjectNumber":"",
           "unit":"",
           "currency":"",
           "unitRate":"",
           "chargeItemAccountingWay":"",
           "productPricesList":[
              {
                  "id": null,
                  "index":'0',
                  "name": "",
                  "typeTagIdSet": [],
                  "standardStateIds": null,
                  "gradientModel": 0,
                  "carryValve": false,
                  "carryValveNumber": null,
                  "priceGradientItems": [
                      {
                          
                          "index": 0,
                          "perRenewedWeight": 0,
                          "startNumber":null,
                          "endNumber": null,
                          "price": null,
                          "fixedCharge": null
                      }
                  ]
              }
           ]
         }
         ,
        multipleSelection: [],
        editableTabsValue: '0',
        tabIndex: 0,
        locationList:[],
        selectIndex:0,
        removeArr:0,
        tagIds:[]

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
      ...mapState('order',['levelTwoList']),
      ...mapState('channels',['productPricesList','productPrices']),
      ...mapState('basic',['tagTypeClass','tagsData']),
      addShow: function(){
        const _ = this ;
        let arr = _.payload['productPricesList'][_.selectIndex]['priceGradientItems']
        let length = arr.length
        if(arr[length-1]['endNumber'] >0){
          return true
        }else{
          return false
        }
      }
    },

    beforeMount() {},

    mounted() {
      this.loadFunC(this.item)
    },

    methods: {
        ...mapActions('channels',['loadGetProductPrices','loadPostProductPrices','loadPutProductPrices']),
        cancel() {
            this.$emit('close',false)
            
            this.payload = {
                "ledgerSubjectName":"",
                "ledgerSubjectNumber":"",
                "unit":"",
                "currency":"",
                "unitRate":"",
                "chargeItemAccountingWay":"",
                "productPricesList":[
                    {
                        "id": null,
                        "index":'0',
                        "name": "",
                        "typeTagIdSet": [],
                        "standardStateIds": null,
                        "gradientModel": 0,
                        "carryValve": false,
                        "carryValveNumber": null,
                        "priceGradientItems": [
                            {
                                
                                "index": 0,
                                "perRenewedWeight": 0,
                                "startNumber":null,
                                "endNumber": null,
                                "price": null,
                                "fixedCharge": null
                            }
                        ]
                    }
                ]
            }
        },
        loadFunC(item){
          console.log('item',item)
          const _ = this ;
            let {ledgerSubjectName,
            ledgerSubjectNumber,
            id,
            unit,
            currency,
            unitRate,
            chargeItemAccountingWay
            } = item ;
            let {content} = _.tagsData;
            this.tagIds = content ;
            this.editableTabsValue = '0'
            this.tabIndex = 0
            this.selectIndex = 0
            this.loadGetProductPrices([item.id]).then(success=>{
              let productPricesList = []
              if(_.productPricesList.length){
               productPricesList = _.productPricesList.map((item,index)=>{
                  item['index'] = index + '' ;
                  let arr = item.typeTagSet.map(todo => {
                    return todo.id
                  })
                  _.$set(item,'typeTagIdSet',arr)
                  _.$set(item,'carryValve',item.carryValve==1?true:false)
                  return item ;
               })
               
               _.tabIndex = productPricesList.length - 1
             }else{
               _.tabIndex = 0
               productPricesList = [
                 {
                        
                        "index":'0',
                        "name": "",
                        "typeTagIdSet": [],
                        "standardStateIds": null,
                        "gradientModel": 0,
                        "carryValve": false,
                        "carryValveNumber": null,
                        "priceGradientItems": [
                            {
                                
                                "index": 0,
                                "perRenewedWeight": 0,
                                "startNumber":null,
                                "endNumber": null,
                                "price": null,
                                "fixedCharge": null
                            }
                        ]
                    }
               ]
             }
             _.editableTabsValue = '0'
              this.payload = {
                ledgerSubjectName,
                ledgerSubjectNumber,
                unit,
                productPriceId:id,
                currency,
                unitRate,
                chargeItemAccountingWay,
                productPricesList}
            })

        },
        submit(){
          const _ = this ;
          _.clickConfirm(_.selectIndex)
        },
        clickConfirm(selectIndex){
           const _this = this ;
           let item = this.payload['productPricesList'][selectIndex] ;
           let {id,name,typeTagIdSet,gradientModel,carryValveNumber,standardStateIds,
           carryValve,priceGradientItems} = item ;
           let data = {}
           if(id){
                data = {id,name,typeTagIdSet,gradientModel,carryValveNumber,standardStateIds,
           carryValve:carryValve?1:0,priceGradientItems} ;
                _this.loadPutProductPrices(data).then(success=>{
                      this.$emit('close',true)
                      _this.$message( {
                        message: success,
                        type: 'success'
                      });
                    }).catch(error=> {
                      _this.$message( {
                        message: error,
                        type: 'error'
                      });
                    })
              
           }else{
             data = {name,typeTagIdSet,gradientModel,carryValveNumber,standardStateIds,
           carryValve:carryValve?1:0,priceGradientItems,productPriceId:_this.payload.productPriceId} ;
             
             _this.loadPostProductPrices(data).then(success=>{
                  this.payload['productPricesList'][selectIndex] = _this.productPrices ;
                  this.$emit('close',true)
                  _this.$message( {
                  message: success,
                  type: 'success'
                  });
              }).catch(error=> {
                  _this.$message( {
                  message: error,
                  type: 'error'
                  });
              })
           }
           
        },
        handleTabsClick(name){
            this.selectIndex = name.index ;
        },
        addPartitionCode(index){
          
          let data = {
            "index": 0,
            "perRenewedWeight": 0,
            "startNumber":null,
            "endNumber": null,
            "price": null,
            "fixedCharge": null
          }
          this.payload['productPricesList'][index]['priceGradientItems'].push(data)
        },
        delPartitionCode(index,i){
          this.payload['productPricesList'][index]['priceGradientItems'].splice(i,1)
        },
        handleTabsEdit(targetName, action) {
            const _this = this ;
            if (action === 'add') {
              let newTabName = ++_this.tabIndex + '';
              _this.payload['productPricesList'].push({
                  "id": null,
                  "index":newTabName,
                  "name": "",
                  "typeTagIdSet": [],
                  "standardStateIds": null,
                  "gradientModel": 0,
                  "carryValve": false,
                  "carryValveNumber": null,
                  "priceGradientItems": [
                      {
                          "index": 0,
                          "perRenewedWeight": 0,
                          "startNumber":null,
                          "endNumber": null,
                          "price": null,
                          "fixedCharge": null
                      }
                  ]
              });
              _this.editableTabsValue = newTabName;
              
            }
            if (action === 'remove') {
              
              let tabs = JSON.parse( JSON.stringify ( _this.payload['productPricesList'] ))
              let activeName = _this.editableTabsValue;
              
                tabs.forEach((tab, index) => {
                  if (tab.name == targetName) {
                    
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                      activeName = nextTab.name;
                    }
                  }
                });
              
                 if(tabs.length>=2){
                     _this.payload['productPricesList'] = tabs.filter(tab => tab.index != targetName);
                 }
              
              
              
            }
            let {length} = _this.payload['productPricesList'] ;

            if(length>=1){
              _this.selectIndex = _this.tabIndex = length - 1 ;
              _this.editableTabsValue = _this.tabIndex + ''
            }

      },
      handleSelectionChange(val){
        this.multipleSelection = val ;
      }
    
    },

    watch: {
      dialogVisible:{
        deep:true,
        handler:function(val){
          const _ = this ;
          if(val){
            this.loadFunC(_.item)

          }
           
        }
      },
      payload:{
        deep:true,
        handler:function(val){
          const _ = this ;
          
          let {productPricesList} = val ;

          if(productPricesList.length){
            
            productPricesList.forEach( (item,i) =>{
              let {priceGradientItems} = item ;
                 _.$set(item,'index',i+'')
              if(priceGradientItems.length){
                
                priceGradientItems.forEach( (todo,index) =>{
                  _.$set(todo,'index',index)
                  if(index===0){
                    _.$set(todo,'startNumber',0)
                  }else{
                    _.$set(todo,'startNumber',priceGradientItems[index-1]['endNumber'])
                  }
                  
                })
              }
            })
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
      width 100% !important
    
  
  .input-with-select .el-input-group__prepend 
    background-color #fff
  
  .cur 
    cursor pointer
  .p5  
    padding 5px 0
</style>