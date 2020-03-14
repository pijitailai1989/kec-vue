<template>
  <div ref="boxWork">
    <div class="kec-header" >
       <home-header :textColor="themeColor.header_text_color" :backgroundColor="themeColor.header_background_color"></home-header>
    </div>
    <div class="kec-content flexs">
        <div :class="['kec-menu',iconType?'ipad-opened':'']" :style="{background:themeColor.menu_background_color}">
          <home-menu-top></home-menu-top>
          <home-menu :activeColor="themeColor.header_background_color" :textColor="themeColor.menu_text_color" :backgroundColor="themeColor.menu_background_color"></home-menu>
        </div>
        <div class="kec-design flexs columns">
            <div class="kec-details">
              <transition name="kec">
                  <home-tabs class="kec-tabs" v-if="tabsShow=='show'" :btnColor="themeColor.header_background_color"></home-tabs>
              </transition>
              <div class="kec-function" :style="{background:themeColor.content_background_color}">
                  <!-- <keep-alive> -->
                    <router-view></router-view>
                  <!-- </keep-alive> -->
              </div>
            </div>
            <div class="kec-copyright" :style="{background:themeColor.copy_background_color}">
              <span :style="{color:themeColor.copy_text_color}">@ {{copyTime}} Kerry Logistics Network Limited. All Rights Reserved</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex'
import HomeMenu from './components/menu'
import HomeHeader from './components/header'
import HomeTabs from './components/tabs'
import HomeMenuTop from './components/menuTop'
import { formatDate } from '@/utils/fun'
  export default {
    name:'home',
    props:[''],
    data () {
      return {
          bg_active:'',
          copyTime:formatDate( new Date(),'yyyy' ),
          clientWidth:0,
      };
    },
    components: {
      HomeMenu,
      HomeHeader,
      HomeTabs,
      HomeMenuTop
    },
    computed: {
      ...mapState('home',['iconType','themeColor','tabsShow','result']),
    },
    watch: {
      
    },
    updated() {
      this.cookiesFunc()
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
        let boxWork = this.$refs.boxWork ;
        this.clientWidth = boxWork.clientWidth ;
      this.cookiesFunc()
    },
    methods: {
      ...mapMutations('home',['setIconType']),
      handleResize() {
          let width = this.$refs.boxWork.clientWidth ;
           if(width<=999){
             this.iconType && this.setIconType(false)
           }else{
             !this.iconType && this.setIconType(true)
           }
      },
      cookiesFunc(){
        const _this = this ;
        // let bool = this.$cookies.isKey('keyName') ;
        let bool = sessionStorage.getItem('token')
        if(!bool){ 
          setTimeout(
            function(){
              _this.$router.push({  path:'/' })
            }, 1500 );
          _this.$message( {
                    message: '请重新登录！',
                    type: 'warning'
                   });
        }
      }
    },
    destroyed () {
       window.removeEventListener('resize', this.handleResize)
    },

  }

</script>
<style lang='stylus' scoped>
@import '~css/stylus.styl'
  .kec-enter-active {
   animation: fadeOutUp .6s reverse;
  }
  .kec-leave-active {
    display none
  }
  @-webkit-keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}
 .kec-header
   width 100%
   height $headerHeight
   
   box-shadow: 0px 3px 6px #00000029;
   &.bg_active 
     background #ccc

 .kec-content
   width 100%
   height calc( 100vh - 70px )
   position relative

 .kec-menu 
    display block
    height 100%
      
 @media screen and ( max-width: 1024px ) 
  .menu 
    display none
  .kec-menu 
    position absolute 
    left 0
    top 0
    z-index 1000
    opacity 0.8
    &.ipad-opened
      .menu 
         display -webkit-box
         display -moz-box     
         display -ms-flexbox
         display -webkit-flex
         display flex; 
    
 .kec-design 
   flex 1
   height calc( 100vh - 70px )
   .kec-details 
     flex 1
     .kec-function 
       padding 10px
       width 100% 
   .kec-copyright 
     width 100%
     height 40px
     line-height 40px 
     text-align center
     opacity 0.4
     z-index 2
</style>