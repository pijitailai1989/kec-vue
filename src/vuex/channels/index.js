import * as types from '../mutation-types'
import api from '@/http/api'
import { getPromiseAction ,getPromiseActionNoMutations} from '@/utils/promiseUtils'

export default {
  namespaced: true,
  state() {
    return {
      partitionsList:[],
      productTypeList:[],
      productPartitionsList:[],
      countryPartitionList:{
        countryList:[],
        partitionList:[]
      }
    }
  },
  getters: {
    
    
  },
  mutations: {
    [types.GET_SERVICE_PARTITIONS](state,body){
      
      state.partitionsList = body || [];
    },
    [types.GET_PRODUCT_TYPES](state,body){
      
      state.productTypeList = body || [];
    },

    [types.GET_PRODUCT_QUOTETION](state,body){
      
      state.productPartitionsList = body || [];
    },
    [types.GET_COUNTRY_PARTITION](state,body){
      
      state.countryPartitionList = body || {
        countryList:[],
        partitionList:[]
      };
    },
  },
  actions: {
    loadGetServicePartitions({commit},payload){
      return getPromiseAction (api.getServicePartitions(payload),commit,types.GET_SERVICE_PARTITIONS)
    },

    loadGetProductTypes({commit},payload){
      return getPromiseAction (api.getProductTypes(payload),commit,types.GET_PRODUCT_TYPES)
    },

    loadGetProductQuotation({commit},payload){
      return getPromiseAction (api.getProductQuotation(payload),commit,types.GET_PRODUCT_QUOTETION)
    },
    loadGetCountryPartition({commit},payload){
      return getPromiseAction (api.getCountryPartition(payload),commit,types.GET_COUNTRY_PARTITION)
    },
    loadPostProductQuotation({commit},payload){
      return getPromiseActionNoMutations (api.postProductQuotation(payload))
    },
    loadPutProductQuotation({commit},payload){
      return getPromiseActionNoMutations (api.putProductQuotation(payload))
    },
    
  }
}