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
        axios.post('http://localhost:3000/register', data).then((response) => {
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
