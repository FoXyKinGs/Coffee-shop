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
    getAllProduct (context, data) {
      axios.get(`http://localhost:3000/product?name=${data.searching}&page=${data.page}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setListProduct', response.data.data)
        context.commit('setPagination', response.data.pagination)
      }).catch((err) => {
        console.log(err)
      })
    },
    getDetailProduct (context, data) {
      axios.get(`http://localhost:3000/detailproduct/${data}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setDetailProduct', response.data.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    insertProduct (context, data) {
      return new Promise((resolve, reject) => [
        axios.post('http://localhost:3000/product', data, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
      ])
    },
    updateProduct (context, data) {
      return new Promise((resolve, reject) => [
        axios.put(`http://localhost:3000/product/${data.id}`, data.data, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
      ])
    },
    deleteProduct (context, data) {
      return new Promise((resolve, reject) => [
        axios.delete(`http://localhost:3000/product/${data}`, { headers: { token: context.rootState.auth.token } }).then((response) => {
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
