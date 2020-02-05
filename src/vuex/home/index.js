import * as types from '../mutation-types'
import api from '@/http/api'
import { getPromiseAction ,getPromiseActionNoMutations} from '@/utils/promiseUtils'

export default {
  namespaced: true,
  state() {
    return {
      listArr:[],
      themeColor:{
        header_background_color:'',
        header_text_color:'',
        menu_background_color:'',
        menu_text_color:'',
        copy_background_color:'',
        content_background_color:'',
        content_table_color:'',
        content_border_color:'',
        content_text_color:''
      },
      iconType:false,
      tableTabs:JSON.parse( localStorage.getItem('tableTabs') ) || [ ],
      tabsShow:localStorage.getItem('tabsShow')  || 'hide',
      result:'',
      joke:[],
      breadcrumbArr:[],
      userInfo:{},
      isShowMenu:{}
    }
  },
  getters: {
    
  },
  mutations: {
    setBreadcrumbArr(state,data){
      state.breadcrumbArr = data ;
    },
    pushBreadcrumbArr(state,data){
      let arr = state.breadcrumbArr;
      arr.push(data)
      state.breadcrumbArr = arr ;
    },
    delBreadcrumbArr(state,data){
      let arr = state.breadcrumbArr;
      if(data+1 === arr.length) return ;
      let newArr = arr.slice(0,data+1);
      state.breadcrumbArr = newArr ;
    },
    setTabsShow(state,bool){
      state.tabsShow = bool ;
    },
    setThemeColor(state,obj){
      state.themeColor = obj ;
    },
    setTableTabs(state,item){
      let tool = true ;
      let {length} = state.tableTabs ;
      if(length){
        state.tableTabs.forEach(element=>{
          element.tableIndex = false ;
          if( item && item.path===element.path){
            tool = false ;
            element.tableIndex = true ;
          }
          
        })
      }
      
      tool && item && state.tableTabs.push(item) ;
      length>7 && state.tableTabs.shift() ;

    },
    deleteItemTabs(state,index) {
      let arr = state.tableTabs.map(item=>{
        return item ;
      })
      arr.splice(index,1)
      let {length} = arr ;
      if(length){
        if(index===0){
          arr[0].tableIndex = true ;
        }else{
          let i = parseInt(index-1);
          arr[i].tableIndex = true ;
        }
      }

      state.tableTabs = arr ;
    },
    setIconType(state,data) {
      state.iconType = data ;
    },
    setListArr(state, data) {
      let obj = data.data;
      obj.forEach(element => {
         element['active'] = false ;
      });
      state.listArr = obj ;
    },
    setItemActive(state,data){
      state.listArr[data.index]['active'] = data.active ? false : true ;
    },
    [types.POST_LOGIN](state,body){
      state.userInfo = body || {};
      if(body){
         let obj = {}
         let {permissions} = body ;
         if(permissions.length){
            permissions.forEach(el => {
              switch(el) {
                case '/product/channel:R':
                    obj['1'] = '1'
                    obj['1-1'] = '1-1'
                    break;
                case '/product:R':
                    obj['1'] = '1'
                    obj['1-1'] = '1-2'
                    break;
                case '/common/settings:R':
                    obj['3'] = '3'
                    obj['3-1'] = '3-1'
                    break;
                case '/business/vendor:R':
                    obj['3'] = '3'
                    obj['3-2'] = '3-2'
                    break;
                case '/admin/settings:R':
                    obj['3'] = '3'
                    obj['3-3'] = '3-3'
                    break;
                case '/admin/user/auth:R':
                    obj['3'] = '3'
                    obj['3-4'] = '3-4'
                    break;
                case '/accounting/subject:R':
                    obj['3'] = '3'
                    obj['3-5'] = '3-5'
                    break;
                case '/common/settings:R':
                    obj['3'] = '3'
                    obj['3-6'] = '3-6'
                    break;
                case '/business:R':
                    obj['4'] = '4'
                    obj['4-1'] = '4-1'
                    break;
                case '/business/customer:R':
                    obj['5'] = '5'
                    obj['5-1'] = '5-1'
                    break;
               case '/business/customer/care:R':
                    obj['6'] = '6-1'
                    obj['6-1'] = '6-1'
                    break;
                default:
                    break;
             }
            })
         }
          
         state.isShowMenu = obj ;
         
      }
      
    }
  },
  actions: {
    loadPostLogin({commit},payload){
        return getPromiseAction (api.postLogin(payload),commit,types.POST_LOGIN)
    },
    
  }
}