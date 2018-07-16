/**
 * mock data
 * 问题状态
 */
const _statusList = [
  {value: 0, label: '新建', icon: 'social-twitter', color: '#45be95'},
  {value: 1, label: '处理中', icon: 'social-facebook', color: '#ffbc00'},
  {value: 2, label: '已解决', icon: 'social-github', color: '#5bc0de'},
  {value: 3, label: '已忽略', icon: 'social-snapchat', color: '#a2d148'},
  {value: 4, label: '待反馈', icon: 'social-snapchat', color: '#8b7cc5'},
  {value: 5, label: '已关闭', icon: 'social-snapchat', color: '#bedad3'},
  {value: 6, label: '重新打开', icon: 'social-snapchat', color: '#f1494e'}
]

/**
 * mock data
 * 问题
 *
 */
const _question = {
  title: '周琳完成',
  author: 'zhoulin',
  summary: '有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目有点意思的项目',
  assign: '',
  id: '#001',
  assigner: '',
  status: 1,
  level: 1,
  category: 1,
  updateAt: '2017-12-29 22:35',
  createAt: '2017-12-29 22:35'
}

/**
 * mock data
 * 问题种类
 */
const _questionCategoryList = [
  {
    value: 1,
    label: '任务',
    icon: 'record',
    color: 'green',
    state: 1
  },
  {
    value: 2,
    label: 'bug',
    icon: 'record',
    color: 'red',
    state: 2

  },
  {
    value: 0,
    label: '功能',
    icon: 'record',
    color: 'blue',
    state: 0

  }
]
/**
 * 问题优先级
 * @type {[null,null,null]}
 */
const _questionLevels = [
  {
    value: 0,
    label: '低',
    icon: 'record',
    color: '#5bc0de'
  },
  {
    value: 1,
    label: '中',
    icon: 'record',
    color: '#ffbc00'
  },
  {
    value: 2,
    label: '高',
    icon: 'record',
    color: '#45be95'
  }
]

export default {
  getStatusList (cb) {
    cb(_statusList)
  },
  getQuestion (cb) {
    cb(_question)
  },
  getQuestionCategories (cb) {
    cb(_questionCategoryList)
  },
  getQuestionLevels (cb) {
    cb(_questionLevels)
  }
}
