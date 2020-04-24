import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: undefined,
    name: undefined,
    username: undefined,
    evaluationValues: [
      {
        courseName: "软件工程",
        teacherName: "王二小",
        values: [
          { indexNo: "1-1", list: [0.1, 0.2, 0.3, 0.4, 0.5] },
          { indexNo: "1-2", list: [0.6, 0.2, 0.7, 0.4, 0.9] },
          { indexNo: "1-3", list: [0.2, 0.5, 0.8, 0.3, 0.2] }
        ]
      },
      {
        courseName: "软件工程",
        teacherName: "李小三",
        values: [
          { indexNo: "2-1", list: [0.2, 0.1, 0.4, 0.3, 0.1] },
          { indexNo: "2-2", list: [0.7, 0.1, 0.8, 0.2, 0.4] },
          { indexNo: "2-3", list: [0.3, 0.4, 0.9, 0.6, 0.6] }
        ]
      }
    ],
    currentEvalutionValue: undefined
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
    set_evalution_values(state, evalutionValues) {
      state.evalutionValues = evalutionValues
    },
    set_current_evalution_value(state, currentEvalutionValue) {
      state.currentEvalutionValue = currentEvalutionValue
    }
  },
  actions: {
  },
  modules: {
  }
})
