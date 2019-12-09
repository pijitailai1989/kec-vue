import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import channels from './channels'
import basic from './basic'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        home,
        channels,
        basic
    }
    // plugins: [createPersistedState()]
})