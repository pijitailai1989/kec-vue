import * as types from '../mutation-types'
import api from '@/http/api'
import { getPromiseAction ,getPromiseActionNoMutations} from '@/utils/promiseUtils'

export default {
  namespaced: true,
  state() {
    return {
      extraInfosList:[]
    }
  },
  getters: {
    
  },
  mutations: {
    
    [types.GET_LAST_MILE_EXTRA_INFOS](state,body){
      state.extraInfosList = body || [];
    }
  },
  actions: {
    
    loadGetLastMileExtraInfos({commit},payload){
      return getPromiseAction (api.getLastMileExtraInfos(payload),commit,types.GET_LAST_MILE_EXTRA_INFOS)
    },
    loadPostLastMileExtraInfos({commit},payload){
      return getPromiseActionNoMutations (api.postLastMileExtraInfos(payload))
    },
    loadPutLastMileExtraInfos({commit},payload){
      return getPromiseActionNoMutations (api.putLastMileExtraInfos(payload))
    },
    loadDeleltLastMileExtraInfos({commit},payload){
      return getPromiseActionNoMutations (api.deleltLastMileExtraInfos(payload))
    },
    
  }
}