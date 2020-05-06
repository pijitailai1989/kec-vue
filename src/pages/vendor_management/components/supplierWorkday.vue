<template>
  <div class="row supplier">
    <div class="col-sm-3">
        <kec-form crosswise text="年份" width="40px">
          <template #input>
            <el-select v-model="years" placeholder="" @change="changeFunc">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </kec-form>
    </div>
    <div ref="boxWork" class="contents flexs rows j-start" v-show="workDays.length>=1">
        <div class="workday" v-for="(item,index) in workDays" :key="item.index">
           <kec-calendars :width="calendarsWidth" :fontsize="13" :itemDays="item" :years="years" :months="index+1"></kec-calendars>
        </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/utils/fun'
import {mapState,mapActions,mapMutations} from 'vuex'
import {KecCalendars,KecButton,KecSwitch,KecForm,KecScroll}  from '@/common/components'
  export default {
    name:'supplier_workday',
    props:[''],
    data () {
      return {
         years: parseInt( formatDate(new Date(),'yyyy') ),
         options:[],
         clientWidth:0,
      };
    },

    components: {
      KecCalendars,
      KecButton,
      KecSwitch,
      KecForm,
      KecScroll
    },

    computed: {
      ...mapState('home',['tabsShow']),
      ...mapState('basic',['workDays','ventorsId']),
      calendarsWidth(){
        let width = parseInt( ( this.clientWidth - 68 ) / 28 * 7 ) 
        return width ;
        
      }
    },

    beforeMount() {},
    created() {
       
       
    },
    mounted() {
      this.dayFunc()
      
      this.loadWorkdays([this.ventorsId,'workingCalendar','getWorkingCalendar',this.years])
        window.addEventListener('resize', this.handleResize)
        let boxWork = this.$refs.boxWork ;
        this.clientWidth = boxWork.clientWidth ;
    },
    beforeMount(){
       
    },
    destroyed () {
       window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        ...mapActions('basic',['loadWorkdays']),
        handleResize() {
          let width = this.$refs.boxWork.clientWidth ;
           if(width>=699) this.clientWidth = width ;
        },
        dayFunc(){
          let arr = [] ;
          let year = parseInt( formatDate(new Date(),'yyyy') );
          for(let i = 0;i<3;i++){
              arr.push( (year+i) )
          }
          this.options = arr ;
        },
        changeFunc(val){
          this.loadWorkdays([this.ventorsId,'workingCalendar','getWorkingCalendar',val])
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
   margin-top 5px
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