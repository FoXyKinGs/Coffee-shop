import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/login', data).then((response) => {
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('access', response.data.data.dataUser.access)
          localStorage.setItem('name', response.data.data.dataUser.name)
          context.commit('setToken', response.data.data.token)
          resolve(response.data.message)
        }).catch((err) => {
          reject(err.message)
        })
      })
    },
    logout (context) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        context.commit('setToken', null)
        localStorage.removeItem('access')
        localStorage.removeItem('name')
        resolve(true)
      })
    }
  },
  getters: {
    getToken (state) {
      return state.token
    }
  }
}

export default moduleAuth
