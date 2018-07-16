import user from '../../api/user'
import * as types from '../mutation-types'

const state = {
  user: '',
}
const getters = {
  user: state => state.user,
}
const actions = {
  getUser ({commit}) {
    user.getDetail(user => {
      commit(types.RECEIVE_USER, {user})
    })
  }
}
const mutations = {
  [types.RECEIVE_USER] (state, {user}) {
    state.user = user
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
