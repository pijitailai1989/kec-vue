<template>
  <div class="row">
    
    <div class="col-sm-12">
        <kec-form text="分区名称">
          <template #input>
            <el-input v-model="payload.partitionName" placeholder="" size="medium"></el-input>
          </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="包含的行政区">
         <template #input>
           <el-select v-model="payload.subdivisionsId" 
                    @change="subdivisionsFunc"
                    multiple
                    filterable
                    allow-create
                    default-first-option 
                    placeholder="" style="width:100%" size="medium">
              <el-option
                v-for="item in countryCodeList"
                :key="item.id"
                :label="item.name  + '-' +item.subdivision"
                :value="item.id">
              </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="包含的区域">
         <template #input>
           <el-input v-model="payload.coverMatchMode" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="排除的区域">
         <template #input>
           <el-input v-model="payload.excludeMathMode" placeholder="" size="medium"></el-input>
         </template>
        </kec-form>
    </div>
    <div class="col-sm-12">
        <kec-form text="分区的方法">
         <template #input>
           <el-select
              @change="partitionMethodFunc"
              v-model="payload.partitionMethodCode" placeholder="" style="width:100%" size="medium">
              <el-option
                    v-for="item in partitionMethodsList"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code">
                  </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    
    <div class="col-sm-12">
        <kec-form text="属性标签">
         <template #input>
           <el-select v-model="payload.attrTagsId"
                   @change="attrTagsFunc"
                    multiple
                    filterable
                    allow-create
                    default-first-option 
                    placeholder="" style="width:100%" size="medium">
                  <el-option
                    v-for="item in tagTypeClass[4]"
                    :key="item.id"
                    :label="item.tagName"
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
    name:'addDivision',
    props:{
      serverId:Number,
      type:String,
      item:Object
    },
    data () {
      return {
        payload:{
           "id":null,
           "partitionName": "",
           "partitionMethodCode": "",
           "partitionMethodName":"",
           "coverMatchMode": "",
           "excludeMathMode": "",
           "subdivisionsId": [],
           "subdivisionsName":"",
           "attrTagsId":[],
           "attrTagsName":''
           
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['locationData','tagTypeClass','countryCodeList','partitionMethodsList'])
    },

    beforeMount() {},

    mounted() {},

    methods: {
      ...mapActions('basic',['']),
      subdivisionsFunc(val){
          
          let {length} = val ;
          let subdivisionsName = '' ;
          if(length){
            val.forEach( (el,i)=>{
                if(i>=1){ subdivisionsName += ','}
                subdivisionsName += this.retrunFuc(this.countryCodeList,'id',el,'name')
            })
          }
          this.payload.subdivisionsName = subdivisionsName ;
      },
      partitionMethodFunc(val){
         this.payload.partitionMethodName =  this.retrunFuc(this.partitionMethodsList,'code',val,'text')
         
      },
      attrTagsFunc(val){
          let {length} = val ;
          let attrTagsName = '' ;
          if(length){
            val.forEach( (el,i)=>{
                if(i>=1){ attrTagsName += ','}
                attrTagsName += this.retrunFuc(this.tagTypeClass[4],'id',el,'tagName')
            })
          }
          this.payload.attrTagsName = attrTagsName ;
      },
      retrunFuc(arr,id,value,type){
       let obj = arr.find(el => {
          return el[id] == value
        })
        return obj[type] ;
      },
      closeData(){
        this.payload={
           "id":null,
           "partitionName": "",
           "partitionMethodCode": "",
           "partitionMethodName":"",
           "coverMatchMode": "",
           "excludeMathMode": "",
           "subdivisionsId": [],
           "subdivisionsName":"",
           "attrTagsId":[],
           "attrTagsName":''
        }
      },
      clickConfirm() {
        this.$emit('close',{type:this.type,bool:true,data:this.payload})
        this.closeData()
        
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
            if(!val) return ;
            let data = JSON.parse(JSON.stringify(val) );
            let {id,
                partitionName,
                partitionMethodCode,
                partitionMethodName,
                coverMatchMode,
                excludeMathMode,
                subdivisionsId,
                subdivisionsName,
                attrTagsId,
                attrTagsName } = data ;
            this.payload={
                id,
                partitionName,
                partitionMethodCode,
                partitionMethodName,
                coverMatchMode,
                excludeMathMode,
                subdivisionsId,
                subdivisionsName,
                attrTagsId,
                attrTagsName
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