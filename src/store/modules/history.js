import axios from 'axios'

const moduleHistory = {
  namespaced: true,
  state () {
    return {
      listHistory: [],
      detailHistory: {},
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  },
  mutations: {
    setListHistory (state, payload) {
      state.listHistory = payload
    }
  },
  actions: {
    getHistory (context) {
      axios.get(`${context.rootState.setURL}/history`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setListHistory', response.data.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    inputHistory (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.setURL}/history`, data, { headers: { token: context.rootState.auth.token } }).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  },
  getters: {
    resultDataHistory (state) {
      return state.listHistory
    }
  }
}

export default moduleHistory
