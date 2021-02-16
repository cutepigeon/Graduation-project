import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/storeTest'
import collection from './modules/collection'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        test,
        collection
    }
})