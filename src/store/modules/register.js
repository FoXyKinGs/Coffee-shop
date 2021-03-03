import axios from 'axios'

const moduleRegister = {
  namespaced: true,
  state () {
    return {
    }
  },
  mutations: {

  },
  actions: {
    addAccount (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.rootState.setURL}/register`, data).then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  },
  getters: {

  }
}

export default moduleRegister
