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
         let {permissions,token} = body ;
         sessionStorage.setItem('token',token)
         sessionStorage.setItem('userInfo',JSON.stringify(body))
         if(permissions.length){
            permissions.forEach(el => {
                 let index = el.lastIndexOf(":R")
                 if(index !== -1){
                  obj[el] = true ;
                 }
            })
         }
         state.isShowMenu = obj ;
         sessionStorage.setItem('isShowMenu',JSON.stringify(obj) )
      }
      
    }
  },
  actions: {
    loadPostLogin({commit},payload){
        return getPromiseAction (api.postLogin(payload),commit,types.POST_LOGIN)
    },
    loadPostLogout({commit},payload){
      return getPromiseActionNoMutations (api.postLogout(payload))
    },
  }
}