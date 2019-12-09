import * as types from '../mutation-types'
import api from '@/http/api'
import { mGetDate } from '@/utils/fun'
import { getPromiseAction ,getPromiseActionNoMutations} from '@/utils/promiseUtils'

export default {
  namespaced: true,
  state() {
    return {
      years:0,
      workDays:[
        
      ],
      unitsList:[],
      serverList:[],
      customerList:[],
      currencyList:[],
      supplierList:[],
      servicesList:[],
      ventorsId:null,
      ventorsInfo:{},
      vendorsList:[],
      channelsList:[]
      
    }
  },
  getters: {
    
  },
  mutations: {
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
       console.log(state.workDays,'state.workDays')
    },
    [types.CHARGE_UNITES](state,body){
       state.unitsList = body || [] ;
    },
    [types.QUERY_SERVER_TYPES](state,body){
       state.serverList = body || [] ;
    },
    [types.CUSTOMER_QUERY_ALL](state,body){
       state.customerList = body || [] ;
    },
    [types.DICTIONARY_CURRENCY](state,body){
       state.currencyList = body || [] ;
   },
    [types.VENDOR_GET_VENDORS](state,body){
      state.supplierList = body || [] ;
    },
    [types.VENDOR_GET_VENDOR1](state,body){
      state.servicesList = body[0] || [] ;
    },
    [types.GET_VENDORS_BY_SERVICE_TYPE](state,body){
      state.vendorsList = body || [] ;
    },
    [types.CHANNEL_GET_CHANNELS](state,body){
      state.channelsList = body || [] ;
    }
  },
  actions: {
    loadWorkdays({commit},payload){
      return getPromiseAction (api.getWorkdays(payload),commit,types.GET_WORKDAYS)
    },
    loadPutWorkdays({commit},payload){
      return getPromiseActionNoMutations (api.putWorkdays(payload))
    },
    loadChargeUnits({commit},payload){
      return getPromiseAction (api.chargeUnits(),commit,types.CHARGE_UNITES)
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
  }
}