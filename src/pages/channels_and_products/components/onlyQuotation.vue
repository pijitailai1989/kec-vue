<template>
    <kec-dialog 
      boxWidth="700px"
      boxTop="15vh"
      v-if="dialogVisible"
      >
      <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button-click 
           @click="clickConfirm(payload)" 
           :text="types==='add'?'新建':'保存'" 
           icon="fa-floppy-o" 
           background="#28A745" 
           color="#fff">
           </kec-button-click>
           <kec-button 
           @click.native="cancel(false)" 
           text="取消" icon="fa-undo" 
           background="#6C757D" 
           color="#fff"></kec-button>
        </div>
      </template>
      <template>
         <kec-scroll class="row">
            
            <div class="col-sm-12">
                <div class="col-sm-5">
                    <kec-form text="科目项名称 ：" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.ledgerSubjectName}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                
                <div class="col-sm-4">
                    <kec-form text="计费纬度 ：" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.chargeItemAccountingWay}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-3">
                    <kec-form text="单位乘数 ：" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.unitRate}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-5">
                    <kec-form text="科目编号 ：" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.ledgerSubjectNumber}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-4">
                    <kec-form text="单位 ：" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.unit}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-3">
                    <kec-form text="币种 ：" width="90px" crosswise>
                      <template #input>
                        <div class="p5">
                          {{payload.currency}}
                        </div>
                      </template>
                    </kec-form>
                </div>
                <div class="col-sm-12" >
                   <kec-form text="费用触发货态">
                    <template #input>
                      
                      <el-select v-model="payload.standardStateIds" 
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
                <div class="col-sm-12 ser" >
                   <kec-form text="适用标签">
                      <template #input>
                          <div class="col-sm-12 borders" style="padding-bottom:3px" v-if="tagIds.length">
                            <el-tag
                              size="mini"
                              v-for="(tag,index) in tagIds"
                              :key="tag.id"
                              closable
                              @close="handleClose(index)"
                              type="info">
                              {{tag.tagName}}
                            </el-tag>
                          </div>
                          <div class="col-sm-12 borders" style="padding-bottom:3px" v-else>
                            <span style="font-size:13px;color:#666">暂无数据</span>
                          </div>
                    </template>
                    </kec-form>
                </div>
                <div class="col-sm-12 ser">
                   <kec-form text="选择标签">
                      <template #input>
                          <div class="col-sm-12 borders">
                                  <div class="col-sm-6">
                                    <kec-form crosswise text="标签类型" width="70px">
                                      <template #input>
                                        
                                        <el-select
                                          style="width:100%"
                                          v-model="typeCode"
                                          size="small"
                                          @change="changeType"
                                          placeholder="">
                                          <el-option
                                            v-for="item in tagTypesList"
                                            :key="item.code"
                                            :label="item.text"
                                            :value="item.code">
                                          </el-option>
                                        </el-select>
                                      </template>
                                    </kec-form>
                                    
                                  </div>
                                  <div class="col-sm-6">
                                    <kec-form crosswise text="可用标签" width="70px">
                                      <template #input>
                                        
                                        <el-select
                                          style="width:100%"
                                          @change="changeTagId"
                                          v-model="tagId"
                                          size="small"
                                          placeholder="">
                                          <el-option
                                            v-for="item in tagTypeClass[typeCode]"
                                            :key="item.id"
                                            :label="item.tagName"
                                            :value="item.id">
                                          </el-option>
                                        </el-select>
                                      </template>
                                    </kec-form>
                                    
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
         typeCode:null,
         tagId:null,
         payload:{
           "ledgerSubjectName":"",
           "ledgerSubjectNumber":"",
           "unit":"",
           "currency":"",
           "unitRate":"",
           "chargeItemAccountingWay":"",
           "standardStateIds":null,
           "tagIds":[]
         },
        multipleSelection: [],
        editableTabsValue: '0',
        tabIndex: 0,
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
      ...mapState('order',['levelTwoList']),
      ...mapState('channels',['productPricesList','productPrices']),
      ...mapState('basic',['tagTypeClass','tagTypesList','tagsData']),
      tagIds: function(){
        const _ = this ;
        let arrs = []
        let arr = _.payload['tagIds'] ;
        let {content} = _.tagsData;
        arr.forEach(el=>{
          let {id,tagName} = content.find(item => { return el == item.id })
          let data = {id,tagName}
          arrs.push(data)
        })
        return arrs ;
      }
    },

    beforeMount() {},

    mounted() {
      this.loadFunC(this.item)
    },

    methods: {
        ...mapActions('basic',['loadEnumsTagTypes']),
        ...mapActions('channels',['loadPutProductPricesItem']),
        cancel(bool) {
            this.$emit('close',bool)
            this.payload = {
              "ledgerSubjectName":"",
              "ledgerSubjectNumber":"",
              "unit":"",
              "currency":"",
              "unitRate":"",
              "chargeItemAccountingWay":"",
              "standardStateIds":null,
              "tagIds":[]
            }
            this.typeCode = null
            this.tagId = null
            
        },
        handleClose(index){
           this.payload.tagIds.splice(index,1)
        },
        changeType(){
          this.tagId = null 
        },
        changeTagId(id){
           let index = this.payload.tagIds.indexOf(id)
           if(index == -1){
              this.payload.tagIds.push(id)
           }else{
              this.$message( {
                        message: '已添加！',
                        type: 'warning'
                      });
           }
        },
        loadFunC(item){
          const _ = this ;
          let {ledgerSubjectName,
            ledgerSubjectNumber,
            standardStateIds,
            tagIds,
            id,
            unit,
            currency,
            unitRate,
            chargeItemAccountingWay
            } = item ;

            this.payload = {
                ledgerSubjectName,
                ledgerSubjectNumber,
                standardStateIds,
                unit,
                id,
                currency,
                unitRate,
                tagIds,
                chargeItemAccountingWay}
            

        },
        clickConfirm(payload){
           const _this = this ;
           let {id,tagIds,standardStateIds} = payload ;
           let data = {id,tagIds,standardStateIds} ;
                _this.loadPutProductPricesItem(data).then(success=>{
                      this.cancel(true)
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
              
           
           
        },
    
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
  .el-tag 
    margin-bottom 3px
  .el-tag+.el-tag  
    margin-left 3px
    
</style>