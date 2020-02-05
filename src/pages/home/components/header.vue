<template>
  <div class="header flexs" :style="{background:backgroundColor,color:textColor}">
     <div class="flexs a-center j-center lefts">
        <i class="imgs"><img src="@/assets/images/logo.png" alt=""></i>
        <el-tooltip class="item" effect="dark" :content="iconType?headers.CLICK_ON:headers.CLICK_ON_THE_FOLD" placement="right">
          <i :class="['iconfont',iconType?'icon-shousuocaidan':'icon-shousuocaidan-copy']" @click="setIconType(!iconType)"></i>
        </el-tooltip>  
     </div>
     <div class="flexs a-center j-end rights">
         <div>
             <el-dropdown trigger="click" @command="handleCommand">
               <i class="el-dropdown-link fa fa-language fa-2x" :style="{color:textColor}"></i>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item v-for="item in langList" :disabled="item.ids === selectLang" :command="item.ids" :key="item.ids">{{item.title}}</el-dropdown-item>
               </el-dropdown-menu>
             </el-dropdown>
         </div>
         <el-dropdown trigger="click" @command="handleLogout">
               <span :style="{color:textColor}">{{userInfo.userName}}</span>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item command="logout">登出</el-dropdown-item>
               </el-dropdown-menu>
         </el-dropdown>
     </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
  export default {
    name:'HomeHeader',
    props:{
      textColor:String,
      backgroundColor:String,
    },
    data () {
      return {
        langList:[
           {ids:"zh",title:"简体中文"},
           {ids:"en",title:"English"},
        ],
        selectLang:""

      };
    },
    mounted() {
      this.selectLang = sessionStorage.getItem('locale') || 'zh';
      
    },
    computed:{
      ...mapState('home',['iconType','userInfo']),
      headers() {
        return this.$t('header')
      }
    },
    methods: {
      ...mapMutations('home',['setIconType']),
      handleCommand(lang) {
        this.selectLang = lang ;
        sessionStorage.setItem('locale', lang);
        this.$i18n.locale = sessionStorage.getItem('locale');
        switch(lang) {
            case 'zh':
              this.$message({ message: '切换为中文！', type: 'success' });
              break;
            case 'en':
              this.$message({ message: 'Switch to English!', type: 'success' });
              break;
            default:
              break;
        }
          
      },
      handleLogout(logout){
        if(logout==='logout'){
           this.$cookies.remove('keyName')
           this.$router.push({
             path:'/'
           })
        }
      }
    },
    watch: {
    }

  }

</script>
<style lang='stylus' scoped>
@import '~css/stylus.styl'
 .el-dropdown-menu__item
    &:hover
      background #ccc !important
      color #333 !important
 .header 
   opacity .8
   .lefts
     width 270px
     height $headerHeight 
     position relative
     .imgs  
       height 50px
       img  
         height 100%
    
     .iconfont 
       display none
       font-size 35px
       right 0
       margin-left 10px
       cursor pointer
   @media screen and ( max-width: 1024px ) 
     .lefts
       .iconfont 
         display inline-block
   .rights 
     flex 1
     height $headerHeight 
     padding 0 20px
     span
       padding 0 10px 0 30px
       cursor pointer  
       font-size 22px
     
</style>