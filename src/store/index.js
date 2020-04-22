import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: undefined,
    name: undefined,
    username: undefined
  },
  mutations: {
    set_role(state, role) {
      state.role = role
    },
    set_name(state, name) {
      state.name = name
    },
    set_username(state, username) {
      state.username = username
    }
  },
  actions: {
  },
  modules: {
  }
})
