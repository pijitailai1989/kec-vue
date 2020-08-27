<script>
import {mapState} from 'vuex'
export default {
    name:'dialogsRender',
    props:{
        boxWidth:String,
        boxTop:String
    },
    data () {
      return {

      };
    },
    render: function(createElement) {
      return createElement(
        'div',{ class:'dialogs' },
        [
         createElement(
           'div',{ class:'box-content',style:{width:this.boxWidth,top:this.boxTop} },
           [
             createElement(
               'div',{ class:'tops',style:{'border-color':this.themeColor.content_border_color} },
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

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='stylus' scoped>
 .dialogs 
   position fixed  
   left 0 
   top 0  
   width 100vw 
   height 100vh
   background rgba(0,0,0,.5)
   z-index 1000
   .box-content  
     position absolute
     left 0 
     right 0 
     margin 0 auto
     background #fff
     border-radius 5px
     .tops,.centers 
       padding 5px 10px
     .bottoms  
       padding 10px 15px
     .tops  
       border-bottom 1px solid 
</style>