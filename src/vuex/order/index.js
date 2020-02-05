import * as types from '../mutation-types'
import api from '@/http/api'
import { getPromiseAction ,getPromiseActionNoMutations} from '@/utils/promiseUtils'

export default {
  namespaced: true,
  state() {
    return {
      orderList:{},
      orderInfos:{},
      levelTwoList:[],
      productBriefList:[],
      customerBriefList:[]
    }
  },
  getters: {
    
  },
  mutations: {
    setOrderInfo(state,data){
      state.orderInfos = data || {} ;
    },
    [types.GET_ORDERS](state,body){
        state.orderList = body || {};
    },
    [types.GET_QUERY_LEVEL_TWO](state,body){
      state.levelTwoList = body || [];
    },
    [types.GET_PRODUCT_BRIEF](state,body){
      state.productBriefList = body || [];
    },
    [types.GET_CUSTOMER_BRIEF](state,body){
      state.customerBriefList = body || [];
    }
  },
  actions: {
    loadGetOrders({commit},payload){
        return getPromiseAction (api.getOrders(payload),commit,types.GET_ORDERS)
    },
    loadGetQueryLevelTwo({commit},payload){
      return getPromiseAction (api.getQueryLevelTwo(payload),commit,types.GET_QUERY_LEVEL_TWO)
    },
    loadGetProductBrief({commit},payload){
      return getPromiseAction (api.getProductBrief(payload),commit,types.GET_PRODUCT_BRIEF)
    },
    loadGetCustomerBrief({commit},payload){
      return getPromiseAction (api.getCustomerBrief(payload),commit,types.GET_CUSTOMER_BRIEF)
    },
    loadPutOrders({commit},payload){
      return getPromiseActionNoMutations (api.putOrders(payload))
    },
    loadPatchOrders({commit},payload){
      return getPromiseActionNoMutations (api.patchOrders(payload))
    },
    
  }
}