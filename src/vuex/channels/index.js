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
      productPartitionsItem:{},
      countryPartitionList:{
        countryList:[],
        partitionList:[]
      },
      productPricesList:[],
      productPrices:{},
      chargeItemsList:[]
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
      let arr = body || [];
      state.productPartitionsList = arr
    },
    [types.GET_PRODUCT_QUOTETION_ID](state,body){
      state.productPartitionsItem = body || {}
    },
    [types.GET_COUNTRY_PARTITION](state,body){
      
      state.countryPartitionList = body || {
        countryList:[],
        partitionList:[]
      };
    },
    [types.GET_PRODUCT_PRICES](state,body){
      
      state.productPricesList = body || [];
    },
    [types.POST_PRODUCT_PRICES](state,body){
      
      state.productPrices = body || {};
    },
    [types.GET_CHARGE_ITEMS](state,body){
      
      state.chargeItemsList = body || [];
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
    loadGetProductQuotationId({commit},payload){
      return getPromiseAction (api.getProductQuotationId(payload),commit,types.GET_PRODUCT_QUOTETION_ID)
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

    loadGetProductPrices({commit},payload){
      return getPromiseAction (api.getProductPrices(payload),commit,types.GET_PRODUCT_PRICES)
    },
    loadPostProductPrices({commit},payload){
      return getPromiseAction (api.postProductPrices(payload),commit,types.POST_PRODUCT_PRICES)
    },
    loadPutProductPrices({commit},payload){
      return getPromiseActionNoMutations (api.putProductPrices(payload))
    },
    loadPutProductPricesItem({commit},payload){
      return getPromiseActionNoMutations (api.putProductPricesItem(payload))
    },
    
    loadGetChargeItems({commit},payload){
      return getPromiseAction (api.getChargeItems(payload),commit,types.GET_CHARGE_ITEMS)
    },
    loadDeleteProductPricesPrice({commit},payload){
      return getPromiseActionNoMutations (api.deleteProductPricesPrice(payload))
    },
    loadPostProductPricesPrice({commit},payload){
      return getPromiseActionNoMutations (api.postProductPricesPrice(payload))
    },
    
  }
}