import axios from 'axios'
const moduleCategory = {
  namespaced: true,
  state: () => {
    return {
      dataCategory: []
    }
  },
  mutations: {
    setDataCategory (state, payload) {
      state.dataCategory = payload
    }
  },
  actions: {
    getAllCategory (context, data) {
      axios.get(`${context.rootState.setURL}/category`, { headers: { token: context.rootState.auth.token } }).then((response) => {
        context.commit('setDataCategory', response.data.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  getters: {
    getDataCategory (state) {
      return state.dataCategory
    }
  }
}

export default moduleCategory
