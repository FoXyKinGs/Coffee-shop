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
      axios.get('http://localhost:3000/history', { headers: { token: context.rootState.auth.token } }).then((response) => {
        console.log(response.data.data)
        context.commit('setListHistory', response.data.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    inputHistory (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/history', data, { headers: { token: context.rootState.auth.token } }).then((response) => {
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
