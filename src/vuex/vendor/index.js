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
      schemasList:{},
      cyclesList:[],
      billList:[],
      billItems:null
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
    [types.GET_BILL_CYCLES](state,body){
      state.cyclesList = body || [];
    },
    [types.GET_AP_BILLS](state,body){
      state.billList = body || [];
    },
    [types.GET_AP_BILLS_ITEMS](state,body){
      state.billItems = body || '';
    },
    setVendorProductList(state,body){
      state.vendorProductList = body
    }
  },
  actions: {
    loadGetBillCycles({commit},payload){
      return getPromiseAction (api.getBillCycles(payload),commit,types.GET_BILL_CYCLES)
    },
    loadGetApBills({commit},payload){
      return getPromiseAction (api.getApBills(payload),commit,types.GET_AP_BILLS)
    },
    loadGetArBills({commit},payload){
      return getPromiseAction (api.getArBills(payload),commit,types.GET_AP_BILLS)
    },
    loadGetApBillsItems({commit},payload){
      return getPromiseAction (api.getApBillsItems(payload),commit,types.GET_AP_BILLS_ITEMS)
    },
    loadPostApBills({commit},payload){
      return getPromiseActionNoMutations (api.postApBills(payload))
    },
    loadGetArBillsItems({commit},payload){
      return getPromiseAction (api.getArBillsItems(payload),commit,types.GET_AP_BILLS_ITEMS)
    },
    loadPostArBills({commit},payload){
      return getPromiseActionNoMutations (api.postArBills(payload))
    },
    loadPutArBills({commit},payload){
      return getPromiseActionNoMutations (api.putArBills(payload))
    },

    loadGetLocations({commit},payload){
      return getPromiseAction (api.getLocations(payload),commit,types.GET_LOCATIONS)
    },
    loadGetPartitionSchemas({commit},payload){
      return getPromiseAction (api.getPartitionSchemas(payload),commit,types.GET_PARTITION_SHEMAS)
    },
    loadGetPartitionSchemasAll({commit},payload){
      return getPromiseAction (api.getPartitionSchemasAll(payload),commit,types.GET_PARTITION_SHEMAS)
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
    
    loadPostCostStatementsPrice({commit},payload){
      return getPromiseActionNoMutations (api.postCostStatementsPrice(payload))
    },
    loadDeleteCostStatementsPrice({commit},payload){
      return getPromiseActionNoMutations (api.deleteCostStatementsPrice(payload))
    },
  }
}