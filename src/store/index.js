import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './modules/auth'
import moduleHistory from './modules/history'
import moduleRegister from './modules/register'
import moduleProduct from './modules/product'
import moduleCategory from './modules/category'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    setURL: process.env.VUE_APP_BACKEND
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: moduleAuth,
    history: moduleHistory,
    regis: moduleRegister,
    product: moduleProduct,
    category: moduleCategory
  }
})

export default store
