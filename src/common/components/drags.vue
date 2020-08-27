<script>
import {mapState} from 'vuex'
  export default {
    name:'KecDrag',
    props:{
        boxWidth:String,
        client:{
          type:Boolean,
          default:false
        },
    },
    data () {
      return {
      };
    },
    render: function(createElement) {
      return createElement(
        'div',{ class:'drags flexs a-center j-center' },
        [
         createElement(
           'div',{ class:'box',ref:'myDrag',style:{width:this.boxWidth} },
           [
             createElement(
               'div',{ on:{mousedown:this.downFunc},
                class:'tops',style:{'border-color':this.themeColor.content_border_color} },
                [ createElement('div',this.$slots.title) ]
             ),
             createElement(
                'div', { class:'centers' },
                [ createElement('div',this.$slots.default) ]
             ),
             createElement(
                'div', { class:'bottoms' },
                [ createElement('div',this.$slots.btn) ]
             ),
           ]

         )
        ]
      )
    },
    components: {},

    computed: {
      ...mapState('home',['themeColor']),
    },

    beforeMount() {},

    mounted() {
    },

    methods: {
        downFunc(e){
          const _ = this ;
          const oEvent = e || event;
          const oDiv = _.$refs.myDrag;
          if(_.client){
            let disX =  oEvent.clientX - oDiv.offsetLeft;
            let disY =  oEvent.clientY - oDiv.offsetTop;
            document.onmousemove = function (e){
              let oEvent = e ||event;
              let l = oEvent.clientX - disX;
              let t = oEvent.clientY - disY;
              if(l<0) {
                l=0;
              }else if(l>document.documentElement.clientWidth - oDiv.offsetWidth){
                l = document.documentElement.clientWidth - oDiv.offsetWidth;
              }
              if(t<0) {
                t=0;
              }else if(t>document.documentElement.clientHeight- oDiv.offsetHeight){
                t = document.documentElement.clientHeight - oDiv.offsetHeight;
              }
              oDiv.style.left = l+ 'px';
              oDiv.style.top  = t+ 'px';
            }
          }else{
            let disx = oEvent.pageX - oDiv.offsetLeft;
            let disy = oEvent.pageY - oDiv.offsetTop;
            document.onmousemove = function (e) {
              const oEvent = e || event;
              oDiv.style.left = oEvent.pageX - disx + 'px';
              oDiv.style.top = oEvent.pageY - disy + 'px';
            }
          }
          
          document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
          }

         
        }
    },

    watch: {
      
    }

  }

</script>
<style lang='stylus' scoped>
  .drags 
   position fixed  
   left 0 
   top 0  
   width 100vw 
   height 100vh
   z-index 1000
   background rgba(0,0,0,.1)
   .box  
     cursor pointer
     position absolute
     background #fff
     border-radius 5px
     .tops,.centers 
       padding 5px 10px
     .bottoms  
       padding 10px 15px
     .tops  
       border-bottom 1px solid 
</style>