import * as types from '../mutation-types'
import api from '@/http/api'
import { getPromiseAction ,getPromiseActionNoMutations} from '@/utils/promiseUtils'

export default {
  namespaced: true,
  state() {
    return {
      exceptionList:{},
      orderStateList:[],
      queryAccount:{},
      agreementQueryPage:{},
      SERVICE:[],
      SALES:[],
      productLists:[],
      relationList:[],
      quotationsList:[],
      chargeItemList:[],
      costByProductList:[],
      examineList:[]
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
    },
    [types.GET_QUERY_ACCOUNT](state,body){
      state.queryAccount = body || {};
    },
    [types.PUT_AGREEMENT_QUERY_PAGE](state,body){
      state.agreementQueryPage = body || {};
    },
    [types.GET_USERS_BY_ROLE_CODE_SALES](state,body){
      state.SALES = body || [];
    },
    [types.GET_USERS_BY_ROLE_CODE_SERVICE](state,body){
      state.SERVICE = body || [];
    },
    [types.GET_FIND_ALL](state,body){
      state.productLists = body || [];
    },
    [types.GET_QUERY_RELATION](state,body){
      state.relationList = body || [];
    },
    [types.GET_PRODUCT_QUOTATIONS](state,body){
      state.quotationsList = body || [];
    },
    [types.GET_CHARGE_ITEM_ALL](state,body){
      state.chargeItemList = body || [];
    },
    [types.GET_COST_BY_PRODUCT](state,body){
      state.costByProductList = body || [];
    },
    [types.GET_EXAMINE_LOG](state,body){
      state.examineList = body || [];
    },
  },
  actions: {
    loadGetExamineLog({commit},payload){
      return getPromiseAction (api.getExamineLog(payload),commit,types.GET_EXAMINE_LOG)
    },
    loadGetCostByProduct({commit},payload){
      return getPromiseAction (api.getCostByProduct(payload),commit,types.GET_COST_BY_PRODUCT)
    },
    loadGetChargeItemAll({commit},payload){
      return getPromiseAction (api.getChargeItemAll(payload),commit,types.GET_CHARGE_ITEM_ALL)
    },
    loadGetProductQuotations({commit},payload){
      return getPromiseAction (api.getProductQuotations(payload),commit,types.GET_PRODUCT_QUOTATIONS)
    },
    loadPutAgreementfirstExamine({commit},payload){
      return getPromiseActionNoMutations (api.putAgreementfirstExamine(payload))
    },
    loadPutAgreementUpdate({commit},payload){
      return getPromiseActionNoMutations (api.putAgreementUpdate(payload))
    },
    loadPutProductQuotations({commit},payload){
      return getPromiseActionNoMutations (api.putProductQuotations(payload))
    },
    loadGetQueryRelation({commit},payload){
      return getPromiseAction (api.getQueryRelation(payload),commit,types.GET_QUERY_RELATION)
    },
    loadGetUsersByRoleCodeSALES({commit},payload){
      return getPromiseAction (api.getUsersByRoleCodeSALES(payload),commit,types.GET_USERS_BY_ROLE_CODE_SALES)
    },
    loadGetUsersByRoleCodeSERVICE({commit},payload){
      return getPromiseAction (api.getUsersByRoleCodeSERVICE(payload),commit,types.GET_USERS_BY_ROLE_CODE_SERVICE)
    },
    loadPostAgreementQueryPage({commit},payload){
      return getPromiseAction (api.postAgreementQueryPage(payload),commit,types.PUT_AGREEMENT_QUERY_PAGE)
    },
    loadGetFindAll({commit},payload){
      return getPromiseAction (api.getFindAll(payload),commit,types.GET_FIND_ALL)
    },

    loadPostAgreementCreate({commit},payload){
      return getPromiseActionNoMutations (api.postAgreementCreate(payload))
    },

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
    loadGetQueryAccount({commit},payload){
      return getPromiseAction (api.getQueryAccount(payload),commit,types.GET_QUERY_ACCOUNT)
    },

    loadPutInvestAccount({commit},payload){
      return getPromiseActionNoMutations (api.putInvestAccount(payload))
    },
  }
}