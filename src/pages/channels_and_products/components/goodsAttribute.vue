<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="col-sm-6">
        <kec-form text="长宽高之和最大值">
         <template #input>
           <div class="flexs a-center">
           <el-input v-model="payload.threeDimensionsMaxSize" placeholder="" size="medium"></el-input>
           <el-select v-model="payload.threeDimensionsUnitId" placeholder="" style="width:100px;margin-left:5px" size="medium">
                  <el-option
                    v-for="item in unitsClassList[2]"
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
        <kec-form text="材积重量因子">
          <template #input>
            <el-input v-model="payload.volumeWeightFactory" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
      </div>
    </div>
    <div class="col-sm-6">
        <kec-form text="面积限制">
          <template #input>
            <div class="flexs a-center">
                <el-input v-model="payload.areaMaxSize" placeholder="" size="medium"></el-input>
                <el-select v-model="payload.areaLimitUnitId" placeholder="" style="width:100px;margin-left:5px" size="medium">
                  <el-option
                    v-for="item in unitsClassList[4]"
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
        <kec-form text="重量限制">
         <template #input>
           <div class="flexs a-center">
                <el-input v-model="payload.minWeight" placeholder="" style="width:160px;margin-left:5px" size="medium"></el-input>
                <span style="margin:0 5px">~</span>
                <el-input v-model="payload.maxWeight" placeholder="" style="width:160px;margin-left:5px" size="medium"></el-input>
                <el-select v-model="payload.weightUnitId" placeholder="" style="width:100px;margin-left:5px" size="medium">
                  <el-option
                    v-for="item in unitsClassList[1]"
                    :key="item.id"
                    :label="item.code"
                    :value="item.id">
                  </el-option>
                </el-select>
            </div>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
      <div class="col-sm-12">
        <kec-form text="品类限制">
         <template #input>
           <div class="flexs">
                <el-select
                   style="width:100%"
                    v-model="payload.categoryTagSet"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="">
                    <el-option
                      v-for="item in tagTypeClass[0]"
                      :key="item.id"
                      :label="item.tagName"
                      :value="item.id">
                    </el-option>
                  </el-select>
            </div>
         </template>
        </kec-form>
      </div>
    </div>
    <div class="col-sm-12">
        <kec-form text="计重规则">
         <template #input>
           <div class="flexs">
                <el-select
                   style="width:100%"
                    v-model="payload.weightTagSet"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="">
                    <el-option
                      v-for="item in tagTypeClass[1]"
                      :key="item.id"
                      :label="item.tagName"
                      :value="item.id">
                    </el-option>
                  </el-select>
           </div>
           
         </template>
        </kec-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'goodsAttribute',
    props:{
      
    },
    data () {
      return {
        input:'',
        payload:{
          "threeDimensionsMaxSize": null,
          "weightUnitId":null,
          "threeDimensionsUnitId":null,
          "areaMaxSize": null,
          "areaLimitUnitId": null,
          "volumeWeightFactory": null,
          "minWeight": null,
          "maxWeight": null,
          "weightTagSet":[],
          "categoryTagSet":[]
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['unitsList','currencyList','productsInfo','unitsClassList','tagTypeClass'])
    },
    updated(){
      this.$emit('updata',this.payload)
    },
    beforeMount() {},

    mounted() {
      this.productsInfoFunc(this.productsInfo)
    },
    
    methods: {
      productsInfoFunc(infos){
          let info = JSON.parse(JSON.stringify(infos)) ;
          if( info && info.id){
            
           let { code,
                threeDimensionsMaxSize
                ,areaMaxSize
                ,areaLimitUnitId
                ,volumeWeightFactory
                ,minWeight
                ,maxWeight
                ,categoryTagSet
                ,weightTagSet
                ,threeDimensionsMaxSizeUnitId
                ,maxWeightUnitId
              } = info ;
              let categoryTagSets = [] ;
              if(categoryTagSet.length){
                 categoryTagSet.forEach(item=>{
                    categoryTagSets.push(item.id)
                 })
              }
              let weightTagSets = [] ;
              if(weightTagSet.length){
                 weightTagSet.forEach(item=>{
                    weightTagSets.push(item.id)
                 })
              }
              
              this.payload = {
                threeDimensionsMaxSize
                ,areaMaxSize
                ,areaLimitUnitId
                ,volumeWeightFactory
                ,minWeight
                ,maxWeight
                ,categoryTagSet:categoryTagSets
                ,weightTagSet:weightTagSets
                ,threeDimensionsUnitId:threeDimensionsMaxSizeUnitId
                ,weightUnitId:maxWeightUnitId
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
   padding 20px 5px
 .ggs  
   height 58px    
   line-height 76px
 .kec-btn 
   margin-top 10px
 .kec-button+.kec-button  
   margin-left 100px
</style>