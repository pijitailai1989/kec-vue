<template>
  <div class="row">
    
    
    <div class="col-sm-12">
        <kec-form text="分区方案
        ">
         <template #input>
           <el-select v-model="subdivisionsId" 
                    @change="subdivisionsFunc"
                    filterable
                    placeholder="" style="width:100%" size="medium">
              <el-option
                v-for="item in schemasList"
                :key="item.id"
                :label="item.schemaName"
                :value="item.id">
              </el-option>
            </el-select>
         </template>
        </kec-form>
    </div>
    
    <div class="col-sm-12 flexs kec-btn">
       <kec-button 
       @click.native="clickConfirm" 
       :text="'新增'" 
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
        subdivisionsId: null,
        list:[]
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('vendor',['schemasList']),
      ...mapState('basic',['locationData','tagTypeClass','countryCodeList','partitionMethodsList'])
    },

    beforeMount() {},

    mounted() {
      
    },

    methods: {
      subdivisionsFunc(ids){
          const _ = this ;
          let obj = _.schemasList.find(item =>{ return ids === item.id })
          let {id,countryCode,schemaName,partitionType,partitionList} = obj ;
          if(partitionList.length){
              _.list = partitionList.map(element => {
              _.$set(element,'schemaName',schemaName)
              _.$set(element,'countryCode',countryCode)
              _.$set(element,'partitionType',partitionType)
              _.$set(element,'isArrive',false)
              _.$set(element,'tagIds',[])
              return element ;
            });
          }
          
      },
      closeData(){
        this.list = [] ;
        this.subdivisionsId = null
      },
      clickConfirm() {
        let {length} = this.list
        if(length>0){
           this.$emit('close',{bool:true,data:this.list})
           this.closeData() 
        }
        
      },
      clickClose() {
        this.$emit('close',{bool:true})
        this.closeData()
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
   margin-left 100px
</style>