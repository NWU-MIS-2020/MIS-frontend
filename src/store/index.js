import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: undefined, // 角色
    name: undefined, // 姓名
    username: undefined,
    requirements: undefined, // 毕业要求及指标点
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
    },
    set_requirements(state, requirements) {
      state.requirements = requirements
    },
  },
  actions: {
  },
  modules: {
  }
})
