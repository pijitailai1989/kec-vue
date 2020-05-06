<template>
  <div class="row">
    <div class="col-sm-12">
        <kec-form text="资源组合">
         <template #input>
           <el-select v-model="channelId" placeholder="" @change="changeId" size="medium" style="width:100%">
              <el-option
                v-for="item in channelsList"
                :key="item.id"
                :label="item.channelName+' ( '+item.channelCode+' )'"
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
    name:'addChannel',
    props:{
      type:String,
      item:Object,
    },
    data () {
      return {
        channelId:null,
        payload : {
           "id": null,
           "channelCode": null,
           "averageCostWeight": 2,
           "averageCostVolume": 3,
           "grossProfit": 6,
           "useTime": 5,
        }
      };
    },

    components: {
        KecForm ,
        KecButton
    },

    computed: {
      ...mapState('basic',['channelsList']),
      
    },

    beforeMount() {},

    mounted() {
      
    },

    methods: {
      ...mapActions('basic',['loadChannelGetChannels']),
      closeData(){
        this.channelId = null ;
        this.payload = {
           "id": null,
           "channelCode": null,
           "averageCostWeight": 2,
           "averageCostVolume": 3,
           "grossProfit": 6,
           "useTime": 5,
        }
      },
      changeId(id){
        
        const result = this.channelsList.find( (el) => el.id === id );
        this.payload = {
           "id": result.id,
           "channelCode": result.channelCode,
           "averageCostWeight": 2,
           "averageCostVolume": 3,
           "grossProfit": 6,
           "useTime": 5,
        }

      },
      clickConfirm() {

        this.channelId && this.$emit('close',{type:this.type,bool:true,data:this.payload})
        this.closeData()
      },
      clickClose() {
        this.$emit('close',{type:this.type,bool:false})
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