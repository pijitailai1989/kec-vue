import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import channels from './channels'
import basic from './basic'
import order from './order'
import customer from './customer'
import vendor from './vendor'
import fidle from './fidle'
import createPersistedState from 'vuex-persistedstate'
const requireJs = require.context('.',true,/.js$/)
let modules = {}
requireJs.keys().forEach((item,index) =>{
    if(item === './mutation-types.js' || item === './store.js') return ;
    let obj = requireJs(item)
    let {name} = obj.default;
    modules[name] = obj.default;
})
Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    plugins: [createPersistedState()]
})