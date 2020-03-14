<template>
  <div class="supplier">
    <div class="btn-fun flexs j-end">
        <kec-button text="新增状态" icon="fa-plus" background="#F18A33" color="#fff"></kec-button>
        <kec-button text="导出Excel" icon="fa-trash-o" background="#6C757D" color="#fff"></kec-button>
    </div>
    <div ref="boxWork" class="contents scrollbar flexs rows a-center j-center" :style="{height:tabsShow=='show'?'calc( 100vh - 242px )':'calc( 100vh - 198px )'}">
        <div class="row">
           <div class="col-sm-4">
             <kec-form text="收费单位维护">
               <template #input>
                 <div class="col-sm-12 borders err">
                     <charge-unit></charge-unit>
                 </div>
               </template>
             </kec-form>
           </div>
           <div class="col-sm-2">
             <kec-form text="服务类型维护">
               <template #input>
                 <div class="col-sm-12 borders err">
                     <server-type></server-type>
                 </div>
               </template>
             </kec-form>
           </div>
           <div class="col-sm-6">
             <kec-form text="收费项维护">
               <template #input>
                 <div class="col-sm-12 borders err">
                     <charges-item></charges-item>
                 </div>
               </template>
             </kec-form>
           </div>
        </div>  
        
        <div class="workday" v-for="(item,index) in workDays" :key="item.index">
           <kec-calendars :width="calendarsWidth" :fontsize="13" :itemDays="item" :months="index+1"></kec-calendars>
        </div>
            
    </div>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecCalendars,KecButton,KecSwitch,KecForm}  from '@/common/components'
import chargeUnit from './components/chargeUnit'
import chargesItem from './components/chargesItem'
import serverType from './components/serverType'
  export default {
    name:'supplier_workday',
    props:[''],
    data () {
      return {
         years:'2019',
         clientWidth:0,
         
         
      };
    },

    components: {
      KecCalendars,
      KecButton,
      KecSwitch,
      KecForm,
      chargeUnit,
      chargesItem,
      serverType
    },

    computed: {
      ...mapState('home',['tabsShow']),
      ...mapState('basic',['workDays']),
      calendarsWidth(){
        let width = parseInt( ( this.clientWidth - 64 ) / 28 ) 
        return width * 7
      }
    },

    beforeMount() {},
    created() {
       
       
    },
    mounted() {
      // let data ={
      //   "year":'2019',
      //   "country":"CN"
      // }
      // this.loadWorkdays(data)
        window.addEventListener('resize', this.handleResize)
        let boxWork = this.$refs.boxWork ;
        this.clientWidth = boxWork.clientWidth ;
    },
    beforeMount(){
       
    },
    destroyed () {
       window.removeEventListener('resize', this.handleScroll)
    },
    methods: {
        ...mapActions('basic',['loadWorkdays']),
        handleResize() {
          let width = this.$refs.boxWork.clientWidth ;
           if(width>=999) this.clientWidth = width ;
        }
    },

    watch: {}

  }

</script>
<style lang='stylus' scoped>
.workday  
  padding 3px
.btn-fun  
  background #fff
  border-radius 4px
  padding 15px
.kec-button+.kec-button 
   margin-left 10px
.contents  
   width 100%
   margin-top 10px
   overflow-y auto
.row  
   padding 10px    
   width 100%
   background #ffffff
   border-radius 4px
   
.borders  
   border 1px solid #DCDFE6
   border-radius 4px
   &.pro  
     height 99px   
     margin-bottom 4px
   &.err  
     min-height 40px
</style>