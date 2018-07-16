import project from '../../api/project'
import * as types from '../mutation-types'

const state = {
  allCreatedProject: [],
  projectLoading: true,
  projectBgs: []
}

const getters = {
  allCreatedProject: state => state.allCreatedProject,
  projectLoading: state => state.projectLoading,
  projectBgs: state => state.projectBgs
}

const actions = {
  getAllCreatedProject ({commit}) {
    project.getAllCreatedProject(projects => {
      commit(types.RECEIVE_CREATED_PROJECTS, {projects})
      commit(types.RECEIVE_CREATED_PROJECTS_LOADING, false)
    })
  },
  getProjectBgs ({commit}) {
    project.getProjectBgs(bgs => {
      commit(types.RECEIVE_PROJECT_BGS, {bgs})
    })
  }
}

const mutations = {
  [types.RECEIVE_CREATED_PROJECTS] (state, {projects}) {
    state.allCreatedProject = projects
  },
  [types.RECEIVE_CREATED_PROJECTS_LOADING] (state, loading) {
    state.projectLoading = loading
  },
  [types.RECEIVE_PROJECT_BGS] (state, {bgs}) {
    state.projectBgs = bgs
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
