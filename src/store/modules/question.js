import question from '../../api/question'
import * as types from '../mutation-types'

const state = {
  allStatus: [],
  allLevel: [],
  allCategory: [],
  question: ''
}

const getters = {
  allQuestionStatus: state => state.allStatus,
  question: state => state.question,
  allQuestionLevel: state => state.allLevel,
  allQuestionCategory: state => state.allCategory
}

const actions = {
  getAllStatus ({commit}) {
    question.getStatusList(statusList => {
      commit(types.RECEIVE_QUESTION_STATUS, {statusList})
    })
  },
  getQuestion ({commit}) {
    question.getQuestion(question => {
      commit(types.RECEIVE_QUESTION, {question})
    })
  },
  getQuestionLevels ({commit}) {
    question.getQuestionLevels(levels => {
      commit(types.RECEIVE_QUESTION_LEVELS, {levels})
    })
  },
  getQuestionCategories ({commit}) {
    question.getQuestionCategories(categories => {
      commit(types.RECEIVE_QUESTION_CATEGORIES, {categories})
    })
  }
}

const mutations = {
  [types.RECEIVE_QUESTION_STATUS] (state, {statusList}) {
    state.allStatus = statusList
  },
  [types.RECEIVE_QUESTION] (state, {question}) {
    state.question = question
  },
  [types.RECEIVE_QUESTION_LEVELS] (state, {levels}) {
    state.allLevel = levels
  },
  [types.RECEIVE_QUESTION_CATEGORIES] (state, {categories}) {
    state.allCategory = categories
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
