<template>
  <div class="calendars" :style="{width:(width+11)+'px',height:height+'px',fontSize:fontsize+'px'}">
    <div class="years flexs j-between a-center" :style="{borderColor:themeColor.content_border_color}">
        <span>{{years}} - {{months}}</span>
        <i class="fa fa-calendar" ></i>
    </div>
    <div class="weeks flexs">
        <span 
        @click="clickWeekFunc"
        v-for="item of week" 
        :key="item.id" 
        :style="{width:spanWidth+'px'}"
        >{{item.text}}</span>
    </div>
    <div class="flexs rows dates">
        <span 
             v-show="marginSpan>0" 
             class="date" 
             v-for="item in marginSpan" :key="item+'week'"
             :style="{width:spanWidth+'px',height:spanHeight+'px',lineHeight:spanHeight+'px'}"></span>
        
        <span class="date may" 
             v-for="(item,index) in itemDays" 
             :key="item.index"
             is="KecWorkStatus"
             @click.native="clickSpanFunc(months,index,item.value,item.index)"
             :class="[item.value===0?'active':'actives']"
             :statusText="item.value"
             :style="{width:spanWidth+'px',height:spanHeight+'px',lineHeight:spanHeight+'px'}">
             <span>{{item.days}}</span></span>
        
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import { mGetDate } from '@/utils/fun'
import  KecWorkStatus  from './workstatus'
  export default {
    name:'calendars',
    props:{
        itemDays:Array,
        width:Number,
        fontsize:Number,
        months:Number,
        years:Number
    },
    data () {
      return {
          week:[
              {id:0,text:'日'},
              {id:1,text:'一'},
              {id:2,text:'二'},
              {id:3,text:'三'},
              {id:4,text:'四'},
              {id:5,text:'五'},
              {id:6,text:'六'}
          ]
      };
    },

    components: {
        KecWorkStatus
    },

    computed: {
        ...mapState('home',['themeColor']),
        ...mapState('basic',['ventorsId']),
        marginSpan(){
            const _ = this ;
            let indexs = new Date(_.years+'-'+_.months).getDay()
            return indexs ;
        },
        spanWidth(){
            const _ = this ;
            let numbers = parseInt( _.width  / 7 ) 
            return numbers ;
        },
        spanHeight(){
            const _ = this ;
            let numbers = parseInt( _.width / 7 * .8 ) 
            return numbers ;
        },
        height(){
            const _ = this ;
            let numbers = parseInt( _.width / 7 * .8 * 6) + 85
            return numbers ;
        }
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
      ...mapMutations('basic',['clickDays']),
      ...mapActions('basic',['loadPutWorkdays']),
      clickSpanFunc(months,index,value,day){
        let data = {
          months,index,value
        }
        let dat = {
          year:parseInt(this.years),
          days:[day],
          status: value == 1 ? 0 : 1
        }
        let parmas = {
          url:[this.ventorsId,'workingCalendar','putWorkingCalendar'],
          data:dat
        }
        this.loadPutWorkdays(parmas).then(res=>{
          this.clickDays(data)
          this.$message( {
           message: res,
           type: 'success'
          });
        })
        
      },
      clickWeekFunc(){

      }
    },

    watch: {}

  }

</script>
<style lang='stylus' scoped>

 .calendars
   background #fff  
   padding 5px
   box-shadow 0px 2px 4px #00000029
   border-radius 4px
   .weeks
     span   
       text-align center 
       padding 10px 0
   .years
     padding 8px 5px
     border-bottom 1px solid
   .dates
       border-left 1px solid #ccc
       border-top 1px solid #ccc
     .date  
       border-bottom 1px solid #ccc
       border-right 1px solid #ccc
       &.may  
         cursor pointer
         &.active  
           background #E1F4ED !important
           color #222
         &.actives  
           background #F4F4F4 !important
           color #222
         &:hover  
           background #E1F4ED
   
</style>