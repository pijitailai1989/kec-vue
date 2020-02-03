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
        menu_text_color:'',
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
      breadcrumbArr:[]
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
      let array = data.data;
      array.forEach(element => {
         element['active'] = false ;
      });
      state.listArr = array ;
    },
    setItemActive(state,data){
      state.listArr[data.index]['active'] = data.active ? false : true ;
    }
  },
  actions: {
    
    
  }
}