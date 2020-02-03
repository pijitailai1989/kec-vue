import * as types from '../mutation-types'
import api from '@/http/api'
import { mGetDate , sortCompare} from '@/utils/fun'
import { getPromiseAction ,getPromiseActionNoMutations} from '@/utils/promiseUtils'
import { stat } from 'fs'

export default {
  namespaced: true,
  state() {
    return {
      years:0,
      workDays:[],
      unitsList:[],
      unitsClassList:{},
      chargeUnitsTypeList:[],
      unitsTypeList:[],
      serverList:[],
      customerList:[],
      currencyList:[],
      supplierList:[],
      servicesList:[],
      ventorsId:null,
      ventorsInfo:{},
      vendorsList:{},
      channelsList:[],
      organizationList:[],
      organizationId:null,
      roleObj:{},
      subjectList:[],
      ristrictedWordsList:[],
      paymentMethodsList:[],
      productsList:[],
      productsInfo:null,
      channelInfo:null,
      productsId:null,
      categoryList:[],
      loading:false,
      subjectItemList:[],
      tagsData:{},
      countryList:[],
      tagTypesList:{},
      tagTypeClass:[],
      locationData:{},
      countryCodeList:[],
      partitionMethodsList:[],
      destinationCountry:null,
      destinationShow:false,
      standardStateList:[],
      userList:[],
      roleIds:[],
      userId:null,
      mainRoleId:null,
      userInfo:{},
      vendorTypeList:[],
      organizationQueryList:[],
      queryByOrgList:[],
      getUsers:{},
      permissionList:[],
      routerPathList:[],
      userRoleList:[],
      userRoleLists:[],
      permissionIds:[],
      codeRuleData:{},
      vendorStateList:[]
    }
  },
  getters: {
    
  },
  mutations: {
    setUserInfo(state,data){
      state.userInfo = data;
    },
    selectUserId(state,data){
      state.userId = data
    },
    selectMainRoleId(state,data){
      state.mainRoleId = data
    },
    selectRoleIds(state,data){
      state.roleIds = data
    },
    setDestinationShow(state,body){
      state.destinationShow = body || false; 
    },
    setDestination(state,body){
      state.destinationCountry = body || null; 
    },
    setVendorsList(state,body){
      state.vendorsList = body;
    },
    setLoading(state,data){
     state.loading = data 
    },
    setRoleObj(state,data){
     state.roleObj = data
    },
    setOrganizationId(state,data){
      state.organizationId = data
    },
    setProductsId(state,data){
      state.productsId = data;
    },
    setProductsInfo(state,data){
      state.productsInfo = data || null;
    },
    setChannelInfo(state,data){
      state.channelInfo = data || null;
    },
    setVentorsInfo(state,data){
      state.ventorsInfo = data;
    },
    selectVentorsId(state,data){
      state.ventorsId = data
    },
    clickDays(state,data){
      const arr = state.workDays ;
      let {index,months,value} = data;
      arr[months-1][index]['value'] = value === 0 ? 1 : 0 ;
      state.workDays = arr ;
    },
    [types.GET_WORKDAYS](state,body){
      let arr = body.days ;
      let newArr = arr.map( (item,index) => {
        let data = {
          value:parseInt(item),
          index,
          active:false,
          week:null
        }
        return data
      })
      let newarrays = [] ;
       for(let i = 1;i<13;i++){
         let days = mGetDate(state.years,i)
         let arrs = newArr.slice(0,days)
         newArr.splice(0,days)
         newarrays.push(arrs)
       }
       newarrays.forEach((item,index)=>{
        item.forEach( (el,itemIndex) => {
         let week = new Date(`${state.years}-${index+1}-${(itemIndex+1)}`).getDay() ;
         el['week'] = week ;
         el['days'] = itemIndex + 1 ;
        })
       })
       state.workDays = newarrays || [] ;
    },
    [types.CHARGE_UNITES](state,body){
       state.unitsList = body || [] ;
       let obj = {}
       if(body){
        body.forEach(el=>{
            if(!obj[el['unitTypeCode']]){
              obj[el['unitTypeCode']] = []
            } 
            
            let arr = obj[el['unitTypeCode']]
            arr.push(el)
            })
        state.unitsClassList = obj;
       }
       
    },
    [types.CHARGE_UNITS_TYPE](state,body){
      state.chargeUnitsTypeList = body || [] ;
    }
    ,[types.UNIT_TYPES](state,body){
      state.unitsTypeList = body || [] ;
    },

    [types.QUERY_SERVER_TYPES](state,body){
       state.serverList = body || [] ;
    },
    [types.CUSTOMER_QUERY_ALL](state,body){
       state.customerList = body || [] ;
    },
    [types.DICTIONARY_CURRENCY](state,body){
      let arr = sortCompare(body,'code')
      state.currencyList = arr || [] ;
   },
    [types.VENDOR_GET_VENDORS](state,body){
      state.supplierList = body || [] ;
    },
    [types.VENDOR_GET_VENDOR1](state,body){
      state.servicesList = body[0] || [] ;
    },
    [types.GET_VENDORS_BY_SERVICE_TYPE](state,body){
      state.vendorsList = body || {} ;
    },
    [types.CHANNEL_GET_CHANNELS](state,body){
      state.channelsList = body || [] ;
    },
    [types.ORGANIZATION_QUERY_PARENT](state,body){
      state.organizationList = body || [] ;
    },
    [types.SUBJECT_QUERY_PARENT](state,body){
      state.subjectList = body || [] ;
    },
    [types.RISTRICTED_WORDS](state,body){
      state.ristrictedWordsList = body || [] ;
    },
    [types.PAYMENT_METHODS](state,body){
      state.paymentMethodsList = body || [] ;
    },
    [types.PRODUCTS](state,body){
      state.productsList = body || [] ;
    },
    [types.CATEGORY_QUERY_PARENT](state,body){
      state.categoryList = body || [] ;
    },
    [types.SUBJECT_QUERY_ITEM](state,body){
      state.subjectItemList = body || [] ;
    },
    [types.GET_TAGS](state,body){
      state.tagsData = body || {} ;
      let arrs = body.content || []
      let obj = {}
       if(arrs){
        arrs.forEach(el=>{
            if(!obj[el['tagTypeCode']]){
              obj[el['tagTypeCode']] = []
            } 
            
            let arr = obj[el['tagTypeCode']]
            arr.push(el)
            })
        state.tagTypeClass = obj;
       }
    },
    [types.COUNTRY_QUERY_ALL](state,body){
      state.countryList = body || [];
    },
    [types.ENUMS_TAG_TYPES](state,body){
      state.tagTypesList = body || [];
    },
    [types.LOCATION_QUERY_ALL](state,body){
      state.locationData = body || {};
    },
    [types.QUERY_BY_COUNTRY_CODE](state,body){
      state.countryCodeList = body || [];
    },
    [types.PARTITION_MENTHODS](state,body){
      state.partitionMethodsList = body || [];
    },
    [types.GET_STANDARD_STATE](state,body){
      state.standardStateList = body || [];
    },
    [types.VENDOR_TYPE](state,body){
      state.vendorTypeList = body || [];
    },

    [types.ORGANIZATION_QUERY_ALL](state,body){
      let arr = body ;
      arr.unshift({id:null,name:"无"})
      state.organizationQueryList = body || [];
    },
    [types.QUERY_BY_ORG_ID](state,body){
      state.queryByOrgList = body || [];
    },
    [types.GET_USERS](state,body){
      state.getUsers = body || {};
    },
    [types.GET_USER_ROLE_QUERY_ALL](state,body){
      let {roleIds ,mainRoleId} = state ;
      let arr = [] ,index = null;
      if(body && body.length){
        arr = JSON.parse( JSON.stringify(body) ) ;
        arr.forEach( (el,i) => {
           el['role'] = false ;
           if(roleIds && roleIds.length){
            roleIds.forEach(item => {
              if(item == el.id){
                el['role'] = true 
              }
            })
           }
           if(mainRoleId && el.id == mainRoleId){
             index = i
           }
        })
      }
      arr.splice(index,1)
      state.userRoleList = arr || [];
      state.userRoleLists = body || [];
    },
    [types.GET_PERMISSION](state,body){
      state.permissionList = body || {};
    },
    [types.GET_FIND_ROUTER_PATH_LIST](state,body){
      state.routerPathList = body || [];
    },
    [types.GET_PERMISSON_ROLE](state,body){
      let {permissionList} = state;
      
      let arr = [];
      if(permissionList && permissionList.length){
        arr = JSON.parse( JSON.stringify(permissionList) ) ;
        arr.forEach( el => {
           el['role'] = false ;
           if(body && body.length){
            body.forEach(item => {
              if(item == el.id){
                el['role'] = true 
              }
            })
           }
        })
      }

      state.permissionList = arr || [];
      state.permissionIds = body || []
    },
    [types.CODE_QUERY_PAGE](state,body){
      let {content} = body;
            content.forEach(el=>{
              el['statu'] = false ;
              if(el['status'] == 1){
                el['statu'] = true ;
              }
      })
      state.codeRuleData = body || {};
    },
    [types.QUERY_BY_VENDOR_ID](state,body){
      let arr = body ;
      if(arr && arr.length){
        arr.forEach(item => {
          if(item.standardState){
            let { standardState:{code,name,id} } = item ;
            id && (item['standardStateId'] = id );
            code && (item['standardStateCode'] = code );
            name && (item['standardStateName'] = name );
          }
        })
      }
      state.vendorStateList = arr || [];
    },
  },
  actions: {
    loadQueryByVendorId({commit},payload){
      return getPromiseAction (api.queryByVendorId(payload),commit,types.QUERY_BY_VENDOR_ID)
    },
    loadVendorStateCreate({commit},payload){
      return getPromiseActionNoMutations (api.vendorStateCreate(payload))
    },
    loadVendorStateUpdate({commit},payload){
      return getPromiseActionNoMutations (api.vendorStateUpdate(payload))
    },
    loadVendorStateDelete({commit},payload){
      return getPromiseActionNoMutations (api.vendorStateDelete(payload))
    },

    loadCodeQueryPage({commit},payload){
      return getPromiseAction (api.codeQueryPage(payload),commit,types.CODE_QUERY_PAGE)
    },
    loadCodeCreate({commit},payload){
      return getPromiseActionNoMutations (api.codeCreate(payload))
    },
    loadCodeUpdate({commit},payload){
      return getPromiseActionNoMutations (api.codeUpdate(payload))
    },
    loadCodeDelete({commit},payload){
      return getPromiseActionNoMutations (api.codeDelete(payload))
    },
    loadCodeStatus({commit},payload){
      return getPromiseActionNoMutations (api.codeStatus(payload))
    },

    loadGetPermissionRole({commit},payload){
      return getPromiseAction (api.getPermissionRole(payload),commit,types.GET_PERMISSON_ROLE)
    },
    loadPostPermissionRole({commit},payload){
      return getPromiseActionNoMutations (api.postPermissionRole(payload))
    },
    loadGetPermission({commit},payload){
      return getPromiseAction (api.getPermission(payload),commit,types.GET_PERMISSION)
    },
    loadFindRouterPathList({commit},payload){
      return getPromiseAction (api.getFindRouterPathList(payload),commit,types.GET_FIND_ROUTER_PATH_LIST)
    },
    loadPutPermission({commit},payload){
      return getPromiseActionNoMutations (api.putPermission(payload))
    },
    loadPostPermission({commit},payload){
      return getPromiseActionNoMutations (api.postPermission(payload))
    },

    loadOrganizationQueryAll({commit},payload){
      return getPromiseAction (api.organizationQueryAll(payload),commit,types.ORGANIZATION_QUERY_ALL)
    },
    loadQueryByOrgId({commit},payload){
      return getPromiseAction (api.queryByOrgId(payload),commit,types.QUERY_BY_ORG_ID)
    },
    loadGetUsers({commit},payload){
      return getPromiseAction (api.getUsers(payload),commit,types.GET_USERS)
    },
    loadGetUserRoleQueryAll({commit},payload){
      return getPromiseAction (api.getUserRoleQueryAll(payload),commit,types.GET_USER_ROLE_QUERY_ALL)
    },
    loadCreateUser({commit},payload){
      return getPromiseActionNoMutations (api.createUser(payload))
    },
    loadUpdateUser({commit},payload){
      return getPromiseActionNoMutations (api.updateUser(payload))
    },
    loadRresetRole({commit},payload){
      return getPromiseActionNoMutations (api.resetRole(payload))
    },
    loadDeleteUser({commit},payload){
      return getPromiseActionNoMutations (api.deleteUser(payload))
    },

    loadGetStandardState({commit},payload){
      return getPromiseAction (api.getStandardState(payload),commit,types.GET_STANDARD_STATE)
    },
    loadPostStandardState({commit},payload){
      return getPromiseActionNoMutations (api.postStandardState(payload))
    },
    loadPutStandardState({commit},payload){
      return getPromiseActionNoMutations (api.putStandardState(payload))
    },
    loadDeleteStandardState({commit},payload){
      return getPromiseActionNoMutations (api.deleteStandardState(payload))
    },
    loadPutUpdateStatus({commit},payload){
      return getPromiseActionNoMutations (api.putUpdateStatus(payload))
    },

    loadEnumsTagTypes({commit},payload){
      return getPromiseAction (api.enumsTagTypes(payload),commit,types.ENUMS_TAG_TYPES)
    },
    
    loadPartitionMethods({commit},payload){
      return getPromiseAction (api.partitionMethods(payload),commit,types.PARTITION_MENTHODS)
    },
    loadLocationQueryAll({commit},payload){
      return getPromiseAction (api.locationQueryAll(payload),commit,types.LOCATION_QUERY_ALL)
    },
    loadQueryByCountryCode({commit},payload){
      return getPromiseAction (api.queryByCountryCode(payload),commit,types.QUERY_BY_COUNTRY_CODE)
    },
    loadLocationCreate({commit},payload){
      return getPromiseActionNoMutations (api.locationCreate(payload))
    },
    loadLocationUpdate({commit},payload){
      return getPromiseActionNoMutations (api.locationUpdate(payload))
    },
    loadLocationDelete({commit},payload){
      return getPromiseActionNoMutations (api.locationDelete(payload))
    },

    loadCountryQueryAll({commit},payload){
      return getPromiseAction (api.countryQueryAll(payload),commit,types.COUNTRY_QUERY_ALL)
    },

    loadWorkdays({commit},payload){
      return getPromiseAction (api.getWorkdays(payload),commit,types.GET_WORKDAYS)
    },
    loadPutWorkdays({commit},payload){
      return getPromiseActionNoMutations (api.putWorkdays(payload))
    },
    loadChargeUnits({commit},payload){
      return getPromiseAction (api.chargeUnits(),commit,types.CHARGE_UNITES)
    },

    loadChargeUnitsType({commit},payload){
      return getPromiseAction (api.chargeUnitsType(),commit,types.CHARGE_UNITS_TYPE)
    },
    loadUnitTypes({commit},payload){
      return getPromiseAction (api.unitTypes(),commit,types.UNIT_TYPES)
    },

    loadAddChargeUnits({commit},payload){
      return getPromiseActionNoMutations (api.addChargeUnits(payload))
    },
    loadModifyChargeUnit({commit},payload){
      return getPromiseActionNoMutations (api.modifyChargeUnit(payload))
    },
    loadDelChargeUnit({commit},payload){
      return getPromiseActionNoMutations (api.delChargeUnit(payload))
    },
    loadQueryServerTypes({commit},payload){
      return getPromiseAction (api.queryServerTypes(),commit,types.QUERY_SERVER_TYPES)
    },
    loadCreateServerType({commit},payload){
      return getPromiseActionNoMutations (api.createServerType(payload))
    },
    loadModifyServiceType({commit},payload){
      return getPromiseActionNoMutations (api.modifyServiceType(payload))
    },
    loadDeleteServiceType({commit},payload){
      return getPromiseActionNoMutations (api.deleteServiceType(payload))
    },
    
    loadCreateChargeItem({commit},payload){
      return getPromiseActionNoMutations (api.createChargeItem(payload))
    },
    loadModifyChargeItem({commit},payload){
      return getPromiseActionNoMutations (api.modifyChargeItem(payload))
    },
    loadDeleteChargeItem({commit},payload){
      return getPromiseActionNoMutations (api.deleteChargeItem(payload))
    },
    
    loadSubjectQueryItem({commit},payload){
      return getPromiseAction (api.subjectQueryItem(payload),commit,types.SUBJECT_QUERY_ITEM)
    },

    loadCustomerQueryAll({commit},payload){
      return getPromiseAction (api.customerQueryAll(payload),commit,types.CUSTOMER_QUERY_ALL)
    },
    loadDictionaryCURRENCY({commit},payload){
      return getPromiseAction (api.dictionaryCURRENCY(payload),commit,types.DICTIONARY_CURRENCY)
    },
    loadCustomerCreate({commit},payload){
      return getPromiseActionNoMutations (api.customerCreate(payload))
    },
    loadCustomerUpdate({commit},payload){
      return getPromiseActionNoMutations (api.customerUpdate(payload))
    },
    loadCustomerUpdateStatus({commit},payload){
      return getPromiseActionNoMutations (api.customerUpdateStatus(payload))
    },

    loadVendorGetVendors({commit},payload){
      return getPromiseAction (api.vendorGetVendors(payload),commit,types.VENDOR_GET_VENDORS)
    },
    loadVendorType({commit},payload){
      return getPromiseAction (api.vendorType(payload),commit,types.VENDOR_TYPE)
    },
    loadVendorPostVendor({commit},payload){
      return getPromiseActionNoMutations (api.vendorPostVendor(payload))
    },
    loadVendorPutVendor({commit},payload){
      return getPromiseActionNoMutations (api.vendorPutVendor(payload))
    },
    loadVendorDeleteVendor({commit},payload){
      return getPromiseActionNoMutations (api.vendorDeleteVendor(payload))   
    },

    loadVendorGetVendor1({commit},payload){
      return getPromiseAction (api.vendorGetVendor1(payload),commit,types.VENDOR_GET_VENDOR1)
    },
    loadVendorPostVendor1({commit},payload){
      return getPromiseActionNoMutations (api.vendorPostVendor1(payload))
    },
    loadVendorPutVendor1({commit},payload){
      return getPromiseActionNoMutations (api.vendorPutVendor1(payload))
    },
    loadVendorDeleteVendor1({commit},payload){
      return getPromiseActionNoMutations (api.vendorDeleteVendor1(payload))   
    },
    loadVendorPostChargeItems({commit},payload){
      return getPromiseActionNoMutations (api.vendorPostChargeItems(payload))
    },
    loadVendorPutChargeItems({commit},payload){
      return getPromiseActionNoMutations (api.vendorPutChargeItems(payload))
    },

    loadGetVendorsByServiceType({commit},payload){
      return getPromiseAction (api.getVendorsByServiceType(payload),commit,types.GET_VENDORS_BY_SERVICE_TYPE)
    },
    loadChannelGetChannels({commit},payload){
      return getPromiseAction (api.channelGetChannels(payload),commit,types.CHANNEL_GET_CHANNELS)
    },
    loadChannelPostChannel({commit},payload){
      return getPromiseActionNoMutations (api.channelPostChannel(payload))
    },
    loadChannelPutChannel({commit},payload){
      return getPromiseActionNoMutations (api.channelPutChannel(payload))
    },

    loadOrganizationQueryParent({commit},payload){
      return getPromiseAction (api.organizationQueryParent(payload),commit,types.ORGANIZATION_QUERY_PARENT)
    },
    loadOrganizationCreate({commit},payload){
      return getPromiseActionNoMutations (api.organizationCreate(payload))
    },
    loadOrganizationUpdate({commit},payload){
      return getPromiseActionNoMutations (api.organizationUpdate(payload))
    },
    loadRoleCreate({commit},payload){
      return getPromiseActionNoMutations (api.roleCreate(payload))
    },
    loadRoleUpdate({commit},payload){
      return getPromiseActionNoMutations (api.roleUpdate(payload))
    },
    loadAuthCreateUser({commit},payload){
      return getPromiseActionNoMutations (api.authCreateUser(payload))
    },

    loadSubjectQueryParent({commit},payload){
      return getPromiseAction (api.subjectQueryParent(payload),commit,types.SUBJECT_QUERY_PARENT)
    },
    loadSubjectCreate({commit},payload){
      return getPromiseActionNoMutations (api.subjectCreate(payload))
    },
    loadSubjectUpdate({commit},payload){
      return getPromiseActionNoMutations (api.subjectUpdate(payload))
    },

    loadRistrictedWords({commit},payload){
      return getPromiseAction (api.ristrictedWords(payload),commit,types.RISTRICTED_WORDS)
    },
    loadPaymentMethods({commit},payload){
      return getPromiseAction (api.paymentMethods(payload),commit,types.PAYMENT_METHODS)
    },
    loadProducts({commit},payload){
      return getPromiseAction (api.products(payload),commit,types.PRODUCTS)
    },
    loadPostProducts({commit},payload){
      return getPromiseActionNoMutations (api.postProducts(payload))
    },
    loadPutProducts({commit},payload){
      return getPromiseActionNoMutations (api.putProducts(payload))
    },
    loadDeleteProducts({commit},payload){
      return getPromiseActionNoMutations (api.deleteProducts(payload))
    },

    loadCategoryQueryParent({commit},payload){
      return getPromiseAction (api.categoryQueryParent(payload),commit,types.CATEGORY_QUERY_PARENT)
    },
    loadCategoryCreate({commit},payload){
      return getPromiseActionNoMutations (api.categoryCreate(payload))
    },
    loadCategoryUpdate({commit},payload){
      return getPromiseActionNoMutations (api.categoryUpdate(payload))
    },
    loadSkuCreate({commit},payload){
      return getPromiseActionNoMutations (api.skuCreate(payload))
    },
    loadSkuUpdate({commit},payload){
      return getPromiseActionNoMutations (api.skuUpdate(payload))
    },

    loadGetTags({commit},payload){
      return getPromiseAction (api.getTags(payload),commit,types.GET_TAGS)
    },
    loadPostTags({commit},payload){
      return getPromiseActionNoMutations (api.postTags(payload))
    },
    loadPutTags({commit},payload){
      return getPromiseActionNoMutations (api.putTags(payload))
    },
    loadDeleteTags({commit},payload){
      return getPromiseActionNoMutations (api.deleteTags(payload))
    },

  }
}