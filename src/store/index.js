import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import question from './modules/question'
import project from './modules/project'
import user from './modules/user'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  actions,
  modules: {
    question,
    project,
    user
  },
  strict: debug
})
