import * as types from '../mutation-types'
import api from '@/http/api'
import { getPromiseAction ,getPromiseActionNoMutations} from '@/utils/promiseUtils'

export default {
  namespaced: true,
  state() {
    return {
      vendorProductList:[],
      statementsList:[],
      versionstList:[],
      versionstTwoList:[],
      locationsList:{},
      schemasList:{}
    }
  },
  getters: {
    
  },
  mutations: {
    [types.GET_COST_STATEMENTS_VERSIONS](state,body){
      state.versionstList = body || [];
    },
    [types.GET_COST_STATEMENTS_VERSIONS_TWO](state,body){
      state.versionstTwoList = body || [];
    },
    [types.GET_VENDOR_PRODUCTS](state,body){
      state.vendorProductList = body || [];
    },
    [types.GET_COST_STATE_MENTS](state,body){
      state.statementsList = body || [];
    },
    [types.GET_LOCATIONS](state,body){
      state.locationsList = body || {};
    },
    [types.GET_PARTITION_SHEMAS](state,body){
      state.schemasList = body || {};
    },
    setVendorProductList(state,body){
      state.vendorProductList = body
    }
  },
  actions: {
    loadGetLocations({commit},payload){
      return getPromiseAction (api.getLocations(payload),commit,types.GET_LOCATIONS)
    },
    loadGetPartitionSchemas({commit},payload){
      return getPromiseAction (api.getPartitionSchemas(payload),commit,types.GET_PARTITION_SHEMAS)
    },
    loadPostPartitionSchemas({commit},payload){
      return getPromiseActionNoMutations (api.postPartitionSchemas(payload))
    },
    loadPutPartitionSchemas({commit},payload){
      return getPromiseActionNoMutations (api.putPartitionSchemas(payload))
    },
    loadDeletePartitionSchemas({commit},payload){
      return getPromiseActionNoMutations (api.deletePartitionSchemas(payload))
    },
    
    loadGetCostStatementsVersions({commit},payload){
      return getPromiseAction (api.getCostStatementsVersions(payload),commit,types.GET_COST_STATEMENTS_VERSIONS)
    },
    loadGetCostStatementsVersionsTwo({commit},payload){
      return getPromiseAction (api.getCostStatementsVersionsTwo(payload),commit,types.GET_COST_STATEMENTS_VERSIONS_TWO)
    },
    loadGetCostStatements({commit},payload){
      return getPromiseAction (api.getCostStatements(payload),commit,types.GET_COST_STATE_MENTS)
    },
    loadPutCostStatements({commit},payload){
      return getPromiseActionNoMutations (api.putCostStatements(payload))
    },

    loadGetVendorProducts({commit},payload){
      return getPromiseAction (api.getVendorProducts(payload),commit,types.GET_VENDOR_PRODUCTS)
    },
    loadPostVendorProducts({commit},payload){
      return getPromiseActionNoMutations (api.postVendorProducts(payload))
    },
    loadPutVendorProducts({commit},payload){
      return getPromiseActionNoMutations (api.putVendorProducts(payload))
    },

    loadPutRecall({commit},payload){
      return getPromiseActionNoMutations (api.putRecall(payload))
    },
    loadPutEexamine({commit},payload){
      return getPromiseActionNoMutations (api.putEexamine(payload))
    },
    loadPutSubmit({commit},payload){
      return getPromiseActionNoMutations (api.putSubmit(payload))
    },
    
  }
}