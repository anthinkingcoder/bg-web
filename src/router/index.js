import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/user/login.vue'
import Register from '../components/user/register.vue'
import Index from '../components/index/index.vue'
import Project from '../components/project/projects.vue'
import Question from '../components/project/project_detail/question/question.vue'
import Comment from '../components/common/comment/comment.vue'
import Emoji from '../components/common/comment/emoji.vue'
import File from '../components/project/project_detail/file/file.vue'
import Setting from '../components/project/project_detail/setting/setting.vue'
import SettingInfo from '../components/project/project_detail/setting/info/setting_info.vue'
import SettingUser from '../components/project/project_detail/setting/setting_user.vue'
import SettingRole from '../components/project/project_detail/setting/role/setting_role.vue'
import SettingModule from '../components/project/project_detail/setting/setting_module.vue'
import SettingType from '../components/project/project_detail/setting/setting_type.vue'
import SettingStatus from '../components/project/project_detail/setting/setting_status.vue'
import SettingImport from '../components/project/project_detail/setting/setting_import.vue'
import SettingAdvance from '../components/project/project_detail/setting/setting_advance.vue'
import ProjectList from '../components/project/project_list/project_list.vue'
import ProjectDetail from '../components/project/project_detail/project_detail.vue'
import Summary from '../components/project/project_detail/summary/summary.vue'
import Sta from '../components/project/project_detail/statictis/sta.vue'
import WorkingTable from '../components/project/project_detail/working_table/working_table.vue'
import Invite from '../components/project/project_detail/member/invite.vue'
import Wiki from '../components/project/project_detail/wiki/wiki.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/emoji',
      component: Emoji
    },
    {
      path: '/comment',
      component: Comment
    },
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/project/invite/:projectId/:inviteKey',
      component: Invite
    },
    {
      path: '/projects',
      component: Project,
      children: [
        {
          path: '/projects',
          component: ProjectList
        }, {
          path: '/projects/detail',
          component: ProjectDetail,
          children: [
            {
              path: '/projects/detail/summary',
              component: Summary
            },
            {
              path: '/projects/detail/questions',
              component: Question
            },
            {
              path: '/projects/detail/sta',
              component: Sta
            },
            {
              path: '/projects/detail/working',
              component: WorkingTable
            },
            {
              path: '/projects/detail/files',
              component: File
            },
            {
              path: '/projects/detail/setting',
              component: Setting,
              children: [
                {
                  path: '/projects/detail/setting/info',
                  component: SettingInfo
                },
                {
                  path: '/projects/detail/setting/user',
                  component: SettingUser
                },
                {
                  path: '/projects/detail/setting/role',
                  component: SettingRole
                },
                {
                  path: '/projects/detail/setting/module',
                  component: SettingModule
                },
                {
                  path: '/projects/detail/setting/type',
                  component: SettingType
                },
                {
                  path: '/projects/detail/setting/status',
                  component: SettingStatus
                },
                {
                  path: '/projects/detail/setting/import',
                  component: SettingImport
                },
                {
                  path: '/projects/detail/setting/advance',
                  component: SettingAdvance
                }
              ]
            },
            {
              path: '/projects/detail/wiki',
              component: Wiki
            }
          ]
        }]
    }]
})
