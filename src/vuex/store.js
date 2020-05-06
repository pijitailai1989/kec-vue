import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import channels from './channels'
import basic from './basic'
import order from './order'
import customer from './customer'
import vendor from './vendor'
import fidle from './fidle'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        home,
        channels,
        basic,
        customer,
        order,
        vendor,
        fidle
    },
    // plugins: [createPersistedState()]
})