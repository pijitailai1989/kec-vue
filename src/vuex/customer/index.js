import * as types from '../mutation-types'
import api from '@/http/api'
import { getPromiseAction ,getPromiseActionNoMutations} from '@/utils/promiseUtils'

export default {
  namespaced: true,
  state() {
    return {
      exceptionList:{},
      orderStateList:[]
    }
  },
  getters: {
    
  },
  mutations: {
    [types.GET_LOGISTICS_EXCEPTION](state,body){
        state.exceptionList = body || {};
    },
    [types.GET_ORDER_STATE](state,body){
      if(body && body.length){
        state.orderStateList = body.map(el => {
          el['active'] = false
          return el ;
        })
      }
    },
    setOrderStateList(state,body){
      let {bool,index,empty} = body ;
      if(empty) {state.orderStateList = [] ; return ;}
      let arr = JSON.parse( JSON.stringify(state.orderStateList) )
      arr[index]['active'] = bool ;
      state.orderStateList = arr ;
    }
  },
  actions: {
    loadGetLogisticsException({commit},payload){
        return getPromiseAction (api.getLogisticsException(payload),commit,types.GET_LOGISTICS_EXCEPTION)
    },
    loadGetOrderState({commit},payload){
      return getPromiseAction (api.getOrderState(payload),commit,types.GET_ORDER_STATE)
    },

    loadPostLogisticsException({commit},payload){
      return getPromiseActionNoMutations (api.postLogisticsException(payload))
    },
    loadPutLogisticsException({commit},payload){
      return getPromiseActionNoMutations (api.putLogisticsException(payload))
    },
    
  }
}