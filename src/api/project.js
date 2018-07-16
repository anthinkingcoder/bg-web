const _projectList = [{'name': '欢迎使用BugFB', 'author': '周琳', 'member': 10}]

const _projectBgs = ['#75acd6', '#f28033', '#ebc656', '#a2d148', '#e85b72', '#7461c2']
export default {
  getAllCreatedProject (cb) {
    setTimeout(() => cb(_projectList), 3000)
  },
  getProjectBgs (cb) {
    setTimeout(() => cb(_projectBgs), 1000)
  }
}
