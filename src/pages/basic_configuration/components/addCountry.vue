<template>
  <div class="row">
    <div class="col-sm-12">
        <kec-form text="国家">
         <template #input>
           <el-select v-model="payload.countryCode" filterable placeholder="" size="medium" style="width:100%">
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
    <div class="col-sm-12">
        <kec-form text="地点">
          <template #input>
            <el-input v-model="payload.locationName" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="地点代码">
         <template #input>
           <el-input v-model="payload.locationCode" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="经度">
         <template #input>
           <el-input v-model="payload.longitude" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="纬度">
         <template #input>
           <el-input v-model="payload.latitude" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="邮政编码">
         <template #input>
           <el-input v-model="payload.postCode" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="类型">
         <template #input>
           <el-select 
           multiple
          filterable
          allow-create
          default-first-option
           v-model="payload.types" placeholder="" size="medium" style="width:100%">
              <el-option
                v-for="item in types"
                :key="item.code"
                :label="item.text"
                :value="item.code">
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
import {mapActions, mapState} from 'vuex'
import {KecForm, KecButton }  from '@/common/components'
  export default {
    name:'addCountry',
    props:{
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
          "id":"",
           "countryCode":"",
           "locationName":"",
           "locationCode":"",
           "postCode":"",
           "longitude":"",
           "latitude":"",
           "types":[]
        },
        types:[
           {code:"SPECIFIED",text:"指定"},
           {code:"PORT",text:"港口"},
           {code:"RAIL",text:"铁轨"},
           {code:"ROAD",text:"公路"},
           {code:"AIRPORT",text:"机场"},
           {code:"POSTAL",text:"邮局"}, 
           {code:"MULTIMODAL",text:"多模式"},
           {code:"FIXED",text:"固定模式"},
           {code:"BORDER",text:"边境"}
        ]
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['countryList'])
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapActions('basic',['loadLocationCreate','loadLocationUpdate']),
      closeData(){
        this.payload={
           "id":"",
           "countryCode":"",
           "locationName":"",
           "locationCode":"",
           "postCode":"",
           "longitude":"",
           "latitude":"",
           "types":[]
        }
      },
      clickConfirm() {
        const _this = this ;
        let {postCode,longitude,types,latitude,locationCode,locationName,countryCode,id} = _this.payload;
        let data ={}
        switch(_this.type){
          case 'addVisible':
                data = {postCode,longitude,types,latitude,locationCode,locationName,countryCode}
                _this.loadLocationCreate(data).then(success=>{
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
                data = {postCode,longitude,types,latitude,locationCode,locationName,countryCode,id}
                _this.loadLocationUpdate(data).then(success=>{
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
            if(val) this.payload = JSON.parse(JSON.stringify(val) );
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