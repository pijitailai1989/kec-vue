<template>
  <div class="row">
    
    <!-- <div class="col-sm-12">
        <kec-form text="收费项名称" crosswise width="80px">
         <template #input>
           <el-input v-model="payload.name" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div> -->
    <div class="col-sm-12">
        <kec-form text="服务类型" crosswise width="80px">
          <template #input>
            <el-select v-model="payload.serviceTypeCode" placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in serverList"
                :key="item.code"
                :label="item.text"
                :value="item.code">
              </el-option>
            </el-select>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="计费方向" crosswise width="80px">
         <template #input>
           <div style="padding:7px 0 3px 0">
             
             <el-radio-group v-model="payload.receiptsDirection" :disabled="type ==='changeVisible'" @change="changeReceiptsFunc">
              <el-radio :label="false" >应付</el-radio>
              <el-radio :label="true">应收</el-radio>
            </el-radio-group>
           </div>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="科目项名称" crosswise width="80px">
         <template #input>
           <el-select v-model="payload.chargeSubjectId"  :disabled="type ==='changeVisible'" 
           @change="changeItemFunc" filterable placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="(item,index) in list"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="科目项编号" crosswise width="80px">
         <template #input>
           <el-input v-model="payload.chargeSubjectPath" disabled placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="计费依据" crosswise width="80px">
         <template #input>
           <el-select v-model="payload.accountingType" placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in accountObjectList"
                :key="item.code"
                :label="item.text"
                :value="item.code">
              </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="计费维度" crosswise width="80px">
         <template #input>
           <el-select v-model="payload.accountingDimension" @change="changeAccountFunc" placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in unitsTypeList"
                :key="item.code"
                :label="item.text"
                :value="item.code">
              </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="计费单位" crosswise width="80px">
         <template #input>
           <el-select v-model="payload.unitId" placeholder="" :disabled="payload.accountingDimension===null" size="medium" style="width:100%">
              <el-option
                v-for="item in unitsClassList[payload.accountingDimension]"
                :key="item.id"
                :label="item.code"
                :value="item.id">
              </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    
    <div class="col-sm-12 flexs kec-btn">
       <kec-button 
       @click.native="clickConfirm" 
       :text="type==='addVisible'?'新增':'修改'" 
       icon="fa-floppy-o" 
       :background="type==='addVisible'?'#ED6D01':'#17A2B8'" color="#fff"></kec-button>
       <kec-button @click.native="clickClose" text="取消" icon="fa-undo" background="#6C757D" color="#fff"></kec-button>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'item',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
           id:null,
           name:'',
           chargeSubjectPath:'',
           chargeSubjectId:null,
           serviceTypeCode:null,
           receiptsDirection:false,
           unitId:'',
           accountingType:null,
           accountingDimension:null,
           
        },
        list:[]
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['queryItemList','serverList','unitsList','unitsClassList','subjectItemList','accountObjectList','unitsTypeList','unitsClassList']),
      
    },

    beforeMount() {},

    mounted() {
      this.type==='addVisible' && this.changeReceiptsFunc(false)
    },

    methods: {
      ...mapActions('basic',['loadCreateChargeItem','loadModifyChargeItem','loadGetQueryItem']),
      closeData(){
        this.payload={
           id:null,
           name:'',
           chargeSubjectPath:'',
           chargeSubjectId:null,
           serviceTypeCode:null,
           receiptsDirection:false,
           unitId:'',
           accountingType:null,
           accountingDimension:null
        }
      },
      changeAccountFunc(){
        this.payload.unitId = ''
      },
      changeReceiptsFunc(val,bool){
        if(!bool){
          this.payload.chargeSubjectId = null;
          this.payload.chargeSubjectPath = '';
        }
        this.loadGetQueryItem([val]).then(success=>{
                   this.list = this.queryItemList
                })
      },
      clickConfirm() {
        const _this = this ;
        let {name,chargeSubjectId,unitId,chargeSubjectPath,id,serviceTypeCode,receiptsDirection,accountingType,accountingDimension} = _this.payload ;
        let data = {}
        switch(_this.type){
          case 'addVisible':
                data = {chargeSubjectId,unitId,serviceTypeCode,receiptsDirection,accountingType,accountingDimension}
                _this.loadCreateChargeItem(data).then(success=>{
                   this.$emit('close',{type:this.type,bool:true})
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
                break;
          case 'changeVisible':
                data = {chargeSubjectId,unitId,id,serviceTypeCode,receiptsDirection,accountingType,accountingDimension}
                _this.loadModifyChargeItem(data).then(success=>{
                   this.$emit('close',{type:this.type,bool:true})
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
                break;
          default: 
                break;
        }
        
        
      },
      clickClose(){
        this.$emit('close',{type:this.type,bool:false})
        this.closeData()
      },
      changeItemFunc(id){
        let obj = this.subjectItemList.find(el=> {
          return el.id == id ;
        })
        this.payload.chargeSubjectPath = obj.path ;
      }
    },

    watch: {
      item:{
          deep:true,
          handler:function(val){
            if(val){
               let data = JSON.parse(JSON.stringify(val) );
               let {unitId,chargeSubjectPath,chargeSubjectId,id,name,serviceTypeCode,
               receiptsDirection,accountingObject,accountingWay,ledgerSubject} = data ;
               this.payload = {unitId,chargeSubjectPath,chargeSubjectId,id,name,serviceTypeCode,
               receiptsDirection,
               accountingType:accountingObject ? accountingObject.code : null,
               accountingDimension:accountingWay ? accountingWay.code : null}
              //  this.type && this.changeReceiptsFunc(receiptsDirection,true)
              this.list.push(ledgerSubject)
            }
            
          }
      }
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
   margin-left 100px
</style>