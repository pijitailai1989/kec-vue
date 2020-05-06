<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="类型" crosswise width="60px">
          <template #input>
            <el-select v-model="payload.tagTypeCode" filterable 
            @change="changeTag"
            placeholder="" size="medium" style="width:100%">
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
    <div class="col-sm-12">
        <kec-form text="标签名" crosswise width="60px">
         <template #input>
           <el-input v-model="payload.tagName" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="标签编码" crosswise width="60px">
         <template #input>
           <el-input v-model="payload.tagValue" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12 flexs j-center">
        <kec-form crosswise width="60px">
         <template #input>
           <div style="padding:7px 0 3px 0">
             
             <el-radio-group v-model="payload.matchingType">
              <el-radio :label="0">存在匹配</el-radio>
              <el-radio :label="1">量化条件</el-radio>
            </el-radio-group>
           </div>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12" v-show="payload.matchingType==1">
        <kec-form text="关系" crosswise width="60px">
          <template #input>
            <el-select v-model="payload.comparativeRelation" filterable placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in relationList"
                :key="item.code"
                :label="item.text"
                :value="item.code">
              </el-option>
            </el-select>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12" v-show="payload.matchingType==1">
        <kec-form text="数量" crosswise width="60px">
         <template #input>
           <el-input-number v-model="payload.number" size="medium"
                                       style="width:100%"
                                       :controls="false"></el-input-number>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12" v-show="payload.matchingType==1&&payload.tagTypeCode!=9">
        <kec-form text="单位" crosswise width="60px">
          <template #input>
            <el-select v-model="payload.chargeUnitId" filterable placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in unitList"
                :key="item.id"
                :label="item.chName"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12" v-show="payload.matchingType==1&&payload.tagTypeCode==9">
        <kec-form text="币种" crosswise width="60px">
          <template #input>
            <el-select v-model="payload.currency" filterable placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in unitList"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12 flexs kec-btn j-center">
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
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'addLabel',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
           tagTypeCode: "",
           tagName: "",
           tagValue:null,
           matchingType:0,
           comparativeRelation:null,
           number:null,
           chargeUnitId:null,
           currency:null
        },
        unitList:[]
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['tagTypesList','relationList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('basic',['loadPostTags','loadPutTags']),
      closeData(){
        this.payload={
           tagTypeCode: "",
           tagName: "",
           tagValue:null,
           matchingType:0,
           comparativeRelation:null,
           number:null,
           chargeUnitId:null,
           currency:null
        }
      },
      changeTag(code){
          let {unit} = this.tagTypesList.find(e=>{ return code == e.code })
          this.payload.chargeUnitId = null
          this.payload.currency = null
          if(unit){
            this.unitList = unit ;
          }else{
            this.unitList = []
          }
      },
      clickConfirm() {
        const _this = this ;
        switch(_this.type){
          case 'addVisible':
                _this.loadPostTags(_this.payload).then(success=>{
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
                _this.loadPutTags(_this.payload).then(success=>{
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
      clickClose() {
        this.$emit('close',{type:this.type,bool:false})
        this.closeData()
      }
    },

    watch: {
      item:{
          deep:true,
          handler:function(val){
            if(val){
               let {tagTypeCode,tagName,tagValue,matchingType,
               comparativeRelation,number,currency,chargeUnit,id
               } = JSON.parse(JSON.stringify(val) );
               this.changeTag(tagTypeCode)
               this.payload={
                  id,
                  tagTypeCode,
                  tagName,
                  tagValue,
                  matchingType,
                  comparativeRelation,
                  number,
                  chargeUnitId:chargeUnit?chargeUnit.id:null,
                  currency:currency?currency:null
                }
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