<template>
  <div class="row">
      <div class="col-sm-4">
        <kec-form text="产品名称">
         <template #input>
           <el-input v-model="payload.name" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
      </div>
      <div class="col-sm-4">
        <kec-form text="产品编码">
          <template #input>
            <el-input v-model="payload.code" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-4">
        <kec-form text="货态跟踪">
          <template #input>
            <el-select v-model="payload.needCargoTracking" placeholder="" style="width:100%" size="medium">
                  <el-option
                    v-for="(item,index) in Tracking"
                    :key="index"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>
          </template>
        </kec-form>
      </div>
      <div class="col-sm-12">
        <kec-form text="外部编码">
          <template #input>
            <el-input v-model="payload.externalCode" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
    
    <div class="col-sm-4">
        <kec-form text="起运地区/国家">
         <template #input>
           <el-select v-model="payload.shippingCountryCode" filterable placeholder="" size="medium" style="width:100%">
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
    <div class="col-sm-4">
        <kec-form text="目的地区/国家">
          <template #input>
            <!-- <el-select v-model="payload.destinationCountryCode" @change="changeCountryCode" :disabled="productsInfo?true:false || destinationShow" filterable placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in countryList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select> -->
            <el-select v-model="payload.destinationCountryCode" @change="changeCountryCode" filterable placeholder="" size="medium" style="width:100%">
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
      <div class="col-sm-4">
        <kec-form text="交付方式">
         <template #input>
           <el-select v-model="payload.paymentMethodCode" placeholder=""  size="medium" style="width:100%">
            <el-option
              v-for="item in paymentMethodsList"
              :key="item.code"
              :label="item.text"
              :value="item.code">
            </el-option>
           </el-select>
         </template>
        </kec-form>
      </div>
      
      <div class="col-sm-4">
        <kec-form text="类型">
          <template #input>
            <el-select v-model="payload.type" placeholder="" style="width:100%" size="medium">
                  <el-option
                    v-for="(item) in productTypeList"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code">
                  </el-option>
                </el-select>
          </template>
        </kec-form>
      </div>
    <div class="col-sm-8">
        <kec-form text="赔付上限">
         <template #input>
           <div class="flexs">
                <el-input v-model="payload.compensationLimit" placeholder=""  size="medium"></el-input>
                <el-select v-model="payload.compensationCurrency" filterable placeholder="" style="width:200px;margin:0 5px" size="medium">
                  <el-option
                    v-for="item in currencyList"
                    :key="item.id"
                    :label="item.code"
                    :value="item.code">
                  </el-option>
                </el-select>
                <el-select v-model="payload.compensationUnitId" placeholder="" style="width:200px" size="medium">
                  <el-option
                    v-for="item in unitsList"
                    :key="item.id"
                    :label="item.code"
                    :value="item.id">
                  </el-option>
                </el-select>
           </div>
           
         </template>
        </kec-form>
    </div>
    
      <div class="col-sm-6">
        <kec-form text="支持退货">
          <template #input>
            <div style="padding:5px">
                <el-switch
                active-color="#13ce66"
                v-model="payload.ableReturn">
                </el-switch>
            </div>
             
          </template>
        </kec-form>
      </div>
      <div class="col-sm-6">
        <kec-form text="支持敏感货">
          <template #input>
            <div style="padding:5px">
                <el-switch
                active-color="#13ce66"
                v-model="payload.ableSensitive">
                </el-switch>
            </div>
             
          </template>
        </kec-form>
      </div>
  </div>
</template>

<script>
import {KecForm, KecButton }  from '@/common/components'
import { mapState ,mapActions,mapMutations} from 'vuex';
  export default {
    name:'productStandard',
    props:{
      
    },
    data () {
      return {
        input:'',
        payload:{
          "code": "",
          "name": "",
          "externalCode":"",
          "destinationCountryCode": "",
          "shippingCountryCode": "",
          "paymentMethodCode": null,
          "needCargoTracking": false,
          "compensationLimit": null,
          "compensationCurrency": "",
          "compensationUnitId": null,
          "ableSensitive ":false,
          "ableReturn ":false,
          "type ":''
        },
        Tracking:[
          {text:'是',value:true},
          {text:'否',value:false}
        ]
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('channels',['productTypeList']),
      ...mapState('basic',['paymentMethodsList','unitsList','currencyList','productsInfo','unitsClassList','countryList','destinationShow'])
    },
    beforeMount() {},

    mounted() {
      this.productsInfoFunc(this.productsInfo)
    },

    methods: {
      ...mapMutations('basic',['setDestination']),
      ...mapActions('basic',['loadQueryByCountryCode']),
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
            
           let { code,
                name,
                externalCode,
                destinationCountryCode,
                shippingCountryCode,
                paymentMethodCode,
                needCargoTracking,
                compensationLimit,
                compensationCurrency,
                compensationChargeUnitId,
                ableSensitive,
                ableReturn,
                type
              } = info ;
              this.payload = {
                code,
                name,
                externalCode,
                destinationCountryCode,
                shippingCountryCode,
                paymentMethodCode,
                needCargoTracking,
                compensationLimit,
                compensationCurrency,
                compensationUnitId:compensationChargeUnitId,
                ableSensitive,
                ableReturn,
                type
              }

            }
        },
    },

    watch: {
      payload:{
        deep:true,
        handler:function(val){
          this.$emit('updata',val)
        }
      },
      productsInfo:{
        deep:true,
        handler:function(val){
          this.productsInfoFunc(val)
        }
      }
    }

  }

</script>
<style lang='stylus' scoped>
 .row  
   padding 18px 5px
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 100px
</style>