<template>
  <kec-dialog 
      boxWidth="800px"
      boxTop="12vh"
      v-if="dialogVisible">
     <template v-slot:title>
        <span style="font-weight:bold;font-size:17px">{{text}}</span>
      </template>
      <template v-slot:btn>
        <div class="flexs j-end">
           <kec-button 
            @click.native="clickConfirm(payload)" 
            :text="type==='addBill'?'保存':'修改'" 
            icon="fa-floppy-o" 
            :background="type==='addBill'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
            <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
        </div>
      </template>
      <div class="row">
          <div class="col-sm-6">
            <kec-form text="提单号码" crosswise width="70px">
              <template #input>
                <div class="flexs a-center">
                    <el-input v-model="payload.ladingBillNumber" placeholder="" size="medium"></el-input>
                </div>
              </template>
            </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form text="承运人" crosswise width="70px">
              <template #input>
                <div class="flexs">
                      <el-select
                        style="width:100%"
                          v-model="payload.carriageVendorID"
                          filterable
                           size="medium"
                          placeholder="">
                          <el-option
                            v-for="item in supplierList"
                            :key="item.id"
                            :label="item.companyName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                  </div>
              </template>
              </kec-form>
          </div>
          <div class="col-sm-6">
            <kec-form text="发货人" crosswise width="70px">
              <template #input>
                <div class="flexs a-center">
                    <el-input v-model="payload.shipper" placeholder="" size="medium"></el-input>
                </div>
              </template>
            </kec-form>
          </div>
          <div class="col-sm-6">
            <kec-form text="收货人" crosswise width="70px">
              <template #input>
                <div class="flexs a-center">
                    <el-input v-model="payload.consignee" placeholder="" size="medium"></el-input>
                </div>
              </template>
            </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form text="起运港" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="payload.departurePortID"
                         remote
                         reserve-keyword
                         @click.native="changeF('departureList')"
                         :remote-method="remoteMethod"
                         filterable placeholder="" size="medium" style="width:100%">
                          <el-option
                            v-for="item in departureList"
                            :key="item.id"
                            :label="item.locationName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
                </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form text="目的港" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-select v-model="payload.arrivalPortID" 
                         filterable
                         remote
                         reserve-keyword
                         @click.native="changeF('arrivalList')"
                         :remote-method="remoteMethod"
                         placeholder="" size="medium" style="width:100%">
                          <el-option
                            v-for="item in arrivalList"
                            :key="item.id"
                            :label="item.locationName"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </div>
                  </template>
                </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form text="离港时间" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-date-picker
                          style="width:100%"
                           size="medium"
                          v-model="payload.departureDate"
                          type="datetime"
                          placeholder="选择时间">
                        </el-date-picker>
                    </div>
                  </template>
                </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form text="到港时间" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-date-picker
                          style="width:100%"
                           size="medium"
                          v-model="payload.arrivalDate"
                          type="datetime"
                          placeholder="选择时间">
                        </el-date-picker>
                    </div>
                  </template>
                </kec-form>
          </div>
          <div class="col-sm-6">
              <kec-form text="查找箱号" crosswise width="70px">
                  <template #input>
                    <div class="flexs a-center">
                        <el-input v-model="boxNumber" placeholder="" size="medium"></el-input>
                        <el-button type="warning" @click.native="searchBox(boxNumber)" size="medium" plain style="margin-left:5px">添加</el-button>
                    </div>
                  </template>
                </kec-form>
          </div>
          <div class="col-sm-6">
            <kec-form text="单据附件" crosswise width="70px">
                  <template #input>
                    <kec-upload bColor="#62BE35" text="上传文件" multiple="" @change="changeFile($event)" />
                  </template>
            </kec-form>
              
          </div>
          <div class="col-sm-12 borders">
            <div class="col-sm-12" style="margin-bottom:5px">
              <el-table
                :data="payload.items"
                height="250"
                :cell-style="{ padding:'3px 0' }"
                :header-cell-style="{ padding:'5px 0',backgroundColor:'#F5F7FA'}"
                style="width: 100%">
                <el-table-column
                 width="50"
                  label="序号">
                  <template slot-scope="scope">
                      <span>{{scope.$index+1}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="箱号">
                  <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.boxNumber" disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="重量(kg)">
                  <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.boxWeight" disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  width="120"
                  label="付费重量(kg)">
                  <template slot-scope="scope">
                      <el-input-number style="width:100%" v-model="scope.row.dealWeight" :controls="false" size="mini"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  width="120"
                  label="体积(立方厘米)">
                  <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.boxVolume" disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="付费体积">
                  <template slot-scope="scope">
                      <el-input-number style="width:100%" v-model="scope.row.dealVolume" :controls="false" size="mini"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  label="件数"
                  width="80">
                  <template slot-scope="scope">
                      <el-input size="mini" v-model="scope.row.countNumber" disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="删除"
                  width="50">
                  <template slot-scope="scope">
                      <i class="fa fa-minus-circle cur fa-lg" 
                      @click="itemsRow(scope.$index)"
                      style="color:#C50A2E" aria-hidden="true"></i>
                  </template>
                </el-table-column>
              </el-table>
                          
            </div>
            <div class="col-sm-3">
              <kec-form text="付费实重" crosswise width="70px">
                <template #input>
                  <div class="flexs a-center">
                      <el-input-number style="width:100%" v-model="payload.countWeight" :controls="false" size="medium"></el-input-number>
                      <div style="color:#777;padding-left:2px">kg</div>
                  </div>
                </template>
              </kec-form>
            </div>
            <div class="col-sm-3">
              <kec-form text="付费材重" crosswise width="70px">
                <template #input>
                  <div class="flexs a-center">
                      <el-input-number style="width:100%" v-model="payload.countDimensionalWeight" :controls="false" size="medium"></el-input-number>
                      <div style="color:#777;padding-left:2px">kg</div>
                  </div>
                </template>
              </kec-form>
            </div>
            <div class="col-sm-6">
              <kec-form text="运费总额" crosswise width="70px">
                <template #input>
                  <div class="flexs a-center">
                    <div class="col-sm-8">
                      <el-input v-model="payload.countMoney" placeholder="" size="medium"></el-input></div>
                    <div class="col-sm-4">
                      <el-select v-model="payload.currency" filterable placeholder="" size="medium">
                          <el-option
                            v-for="item in currencyList"
                            :key="item.id"
                            :label="item.code"
                            :value="item.code">
                          </el-option>
                        </el-select></div>
                  </div>
                </template>
              </kec-form>
            </div>
          </div>
          
        </div>
    
  </kec-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton ,KecDialog}  from '@/common/components'
import {formateDate} from '@/utils/fun'
  export default {
    name:'addBill',
    props:{
      type:String,
      item:Object,
      dialogVisible:Boolean,
      text:String
    },
    data () {
      return {
        boxNumber:"",
        types:'',
        departureList:[],
        arrivalList:[],
        payload:{
          "id":null,
          "ladingBillNumber": "", 
          "shipper": "", 
          "consignee": "", 
          "departureDate": "", 
          "arrivalDate": "", 
          "countMoney": null, 
          "carriageVendorID": null, 
          "departurePortID": null, 
          "arrivalPortID": null, 
          "billFile":null,
          "currency":"",
          "countWeight":null,
          "countDimensionalWeight":null,
          "items": [
              // {
              //     "boxID": null, 
              //     "boxNumber": "", 
              //     "boxWeight": null, 
              //     "dealWeight": null, 
              //     "boxVolume": null,
              //     "dealVolume": null,
              //     "countNumber": null,
              // }
          ]
        },
        
      };
    },

    components: {
        KecForm ,
        KecButton,
        KecDialog
    },

    computed: {
      ...mapState('vendor',['boxesItem','locationList']),
      ...mapState('basic',['supplierList','currencyList']),
    },

    beforeMount() {},

    mounted() {
      
    },

    methods: {
      ...mapActions('vendor',['loadPostLadingBills','loadGetBoxes','loadGetLocationsByType']),
      closeData(){
        this.payload={
          "id":null,
          "ladingBillNumber": "", 
          "shipper": "", 
          "consignee": "", 
          "departureDate": "", 
          "arrivalDate": "", 
          "countMoney": null, 
          "carriageVendorID": null, 
          "departurePortID": null, 
          "arrivalPortID": null, 
          "billFile":null,
          "currency":"",
          "countWeight":null,
          "countDimensionalWeight":null,
          "items": [
              // {
              //     "boxID": null, 
              //     "boxNumber": "", 
              //     "boxWeight": null, 
              //     "dealWeight": null, 
              //     "boxVolume": null,
              //     "dealVolume": null,
              //     "countNumber": null,

              // }
          ]
        }
      },
      itemsRow(index){
        let {length} = this.payload['items'] ;
        length>=2 && this.payload['items'].splice(index,1)
      },
      searchBox(boxNumber){
        const _ = this ;
        let {items} = _.payload ;
        
        this.loadGetBoxes([boxNumber]).then(success=>{
            let {boxNumber,countNumber,id,totalVolume,totalWeight} = _.boxesItem ;
            let data = {
                  "boxID": id, 
                  "boxNumber": boxNumber, 
                  "boxWeight": totalWeight/1000, 
                  "dealWeight": null, 
                  "boxVolume": totalVolume,
                  "dealVolume": null,
                  "countNumber": countNumber,
            }
            const found = items.find(item=>{ return item.boxID == id })
            if(found){
              this.$message( {
              message: '已经添加了！',
              type: 'error'
              });
            }else{
              _.payload['items'].push(data)
              this.$message( {
              message: '添加成功！',
              type: 'success'
              });
            }
            _.boxNumber = ''
            
        }).catch(error=> {
            this.$message( {
            message: error,
            type: 'error'
            });
            _.boxNumber = ''
        })
        
      },
      changeF(TYPE){
        this.types = TYPE ;
      },
      remoteMethod(query){
        const _ = this ;
        this.loadGetLocationsByType([1,query]).then(success=>{
            if(_.types === 'departureList'){
               _.departureList = JSON.parse(JSON.stringify(_.locationList ))
            }else{
               _.arrivalList = JSON.parse(JSON.stringify(_.locationList ))
            }
        })
      },
      clickConfirm(payload) {
        const _this = this ;
        let formData = new FormData()
        let {id,ladingBillNumber,shipper,consignee,departureDate,arrivalDate,
              countMoney,carriageVendorID,departurePortID,arrivalPortID,items,billFile,
              currency,countWeight,countDimensionalWeight} = payload ;
          items.forEach(item =>{
            item['dealWeight'] = parseFloat(item['dealWeight']) * 1000 
            item['boxWeight'] = parseFloat(item['boxWeight']) * 1000 
          })
          countWeight = parseFloat(countWeight) * 1000
          countDimensionalWeight = parseFloat(countDimensionalWeight) * 1000
        let data = {
                    ladingBillNumber,shipper,consignee,
                    departureDate:departureDate?formateDate(departureDate,true):'',
                    arrivalDate:arrivalDate?formateDate(arrivalDate,true):'',
                    countMoney,carriageVendorID,departurePortID,arrivalPortID,items,
                    currency,countWeight,countDimensionalWeight}
      
         formData.append('jsonData',JSON.stringify(data))
         formData.append('billFile',billFile)
        _this.loadPostLadingBills(formData).then(success=>{
            this.$emit('close',{type:this.type,bool:false})
            this.closeData()
            this.$message( {
            message: success,
            type: 'success'
            });
        }).catch(error=> {
            this.$message( {
            message: error,
            type: 'error'
            });
        })
        
        
      },
      clickClose() {
        this.$emit('close',{type:this.type,bool:false})
        this.closeData()
      },
      changeFile(event){
        console.log(event,'event')
        this.payload.billFile = event
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '统计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '0';
          } else {
            sums[index] = index+1;
          }
        });

        return sums;
      }
    },

    watch: {
      
      
    }

  }

</script>
<style lang='stylus' scoped>
 .row  
   padding 5px
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 10px
 .cur 
    cursor pointer
 .borders  
   border 1px solid #DCDFE6
   border-radius 4px
   padding-top 4px
   &.pro  
     height 99px  
     margin-bottom 4px
     
   &.err  
     min-height 40px
</style>