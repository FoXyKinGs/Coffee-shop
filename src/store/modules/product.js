import axios from 'axios'

const moduleProduct = {
  namespaced: true,
  state: () => {
    return {
      listProduct: [],
      detailProduct: [],
      pagination: {}
    }
  },
  mutations: {
    setListProduct (state, payload) {
      state.listProduct = payload
    },
    setPagination (state, payload) {
      state.pagination = payload
    },
    setDetailProduct (state, payload) {
      state.detailProduct = payload
    }
  },
  actions: {
    getAllProductDB (context, data) {
      axios.get(`${context.rootState.setURL}/product`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setListProduct', response.data.data)
        context.commit('setPagination', response.data.pagination)
      }).catch((err) => {
        alert(err)
      })
    },
    getAllProduct (context, data) {
      axios.get(`${context.rootState.setURL}/product?name=${data.searching}&page=${data.page}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setListProduct', response.data.data)
        context.commit('setPagination', response.data.pagination)
      }).catch((err) => {
        alert(err)
      })
    },
    getDetailProduct (context, data) {
      axios.get(`${context.rootState.setURL}/detailproduct/${data}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setDetailProduct', response.data.data)
      }).catch((err) => {
        alert(err)
      })
    },
    insertProduct (context, data) {
      return new Promise((resolve, reject) => [
        axios.post(`${context.rootState.setURL}/product`, data, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err.response.data.message)
        })
      ])
    },
    updateProduct (context, data) {
      return new Promise((resolve, reject) => [
        axios.put(`${context.rootState.setURL}/product/${data.id}`, data.data, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err.response.data.message)
        })
      ])
    },
    deleteProduct (context, data) {
      return new Promise((resolve, reject) => [
        axios.delete(`${context.rootState.setURL}/product/${data}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
      ])
    }
  },
  getters: {
    resultDataProduct (state) {
      return state.listProduct
    },
    resultPagination (state) {
      return state.pagination
    },
    resultDetailProduct (state) {
      return state.detailProduct
    }
  }
}

export default moduleProduct
