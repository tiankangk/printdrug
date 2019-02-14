const state = {
  intSwitch: false,
  stutas: true,
  editData: {},
  selectList: []
}

const getters = {
  getIntSwitch(state) {
    return state.intSwitch
  },
  getSelectList(state) {
    return state.selectList
  },
  getStutas(state) {
    return state.stutas
  },
  getEditData(state) {
    return state.editData
  }
}

const mutations = {
  setIntSwitch(state, data) {
    state.intSwitch = data
  },
  setSelectList(state, data) {
    state.selectList = data
  },
  setStutas(state, data) {
    state.stutas = data
  },
  setEditData(state, data) {
    state.editData = data
  }
}

export default {
  state,
  getters,
  mutations
}
