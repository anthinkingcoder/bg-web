<template>
  <div style="overflow: hidden;height: 100%;">
    <div class="project-detail-header">
      <Row>
        <Col span="24">
        <Menu mode="horizontal" width="auto" class="project-detail-menu" :active-name="activeMenuName"
              @on-select="menuSelect">
          <MenuItem name="working">
            <Tooltip content="工作台">
              <Icon type="ios-monitor-outline"></Icon>
            </Tooltip>
          </MenuItem>
          <MenuItem name="summary">
            <Icon type="navicon"></Icon>
            概览
          </MenuItem>
          <MenuItem name="question">
            <Icon type="document-text"></Icon>
            问题
          </MenuItem>
          <MenuItem name="sta">
            <Icon type="stats-bars"></Icon>
            统计
          </MenuItem>
          <!--<MenuItem name="files">-->
          <!--<Icon type="ios-folder"></Icon>-->
          <!--文件-->
          <!--</MenuItem>-->
          <MenuItem name="wiki">
            <Icon type="document"></Icon>
            wiki
          </MenuItem>
          <MenuItem name="setting" v-show="hasJoin.isAdmin">
            <Icon type="ios-gear"></Icon>
            设置
          </MenuItem>
          <div class="project-detail-header-menu-tool">
            <Button type="text" icon="android-add-circle" class="tool-new-question" @click="openQuestionCreateModel">
              新增问题
            </Button>
            <Button type="text" icon="android-add-circle" class="tool-new-question" @click="openWikiCreateModel">新增wiki</Button>
            <Button type="text" icon="person-add" class="tool-invite-member" @click="inviteMember">邀请成员</Button>

          </div>
        </Menu>
        </Col>
      </Row>
    </div>
    <!-- 内容-->
    <div class="project-detail-container">
      <router-view></router-view>
    </div>
    <!--新增问题 -->
      <QuestionCreate ref="questionCreate"></QuestionCreate>

    <WikiCreate ref="wikiCreate"></WikiCreate>
    <!--成员邀请 -->

    <Modal
      v-model="memberInviteModelShow"
      title="成员邀请"
      width="600"
      :scrollable="false"
    >
      <MemberInvite ref="memberInvite"></MemberInvite>
      <p slot="footer"></p>
    </Modal>
  </div>
</template>
<script>
  import QuestionCreate from './question/question_create.vue'
  import MemberInvite from './member/member_invite.vue'
  import WikiCreate from './wiki/wiki_create.vue'
  export default {
    components: {
      QuestionCreate,
      MemberInvite,
      WikiCreate
    },
    data () {
      return {
        hasJoin: '',
        panelSpread: false,
        uAffixSwitch: false,
        activeMenuName: 'summary',
        menus: {
          'summary': {
            path: '/projects/detail/summary'
          },
          'question': {
            path: '/projects/detail/questions'
          },
          'sta': {
            path: '/projects/detail/sta'
          },
          'working': {
            path: '/projects/detail/working'
          },
          'files': {
            path: '/projects/detail/files'
          },
          'setting': {
            path: '/projects/detail/setting/info'
          },
          'wiki': {
            path: '/projects/detail/wiki'
          }
        },
        memberInviteModelShow: false
      }
    },
    mounted () {
      this.hasJoinProject();
      this.initActiveMenuName()
    },
    methods: {
      initActiveMenuName () {
        let path = this.$route.path
        Object.keys(this.menus).forEach((key) => {
          if (this.menus[key].path === path) {
            this.activeMenuName = key
          }
        })
      },
      hasJoinProject () {
        this.$http.get('/api/project/hasJoin', {
          params: {project_id: this.$route.query.project_id}
        }).then(res => {
          let data = res.data
          if (data.code == '00000') {
            console.info(data.data)
            this.hasJoin = data.data
          }else {
            this.$Message.error(data.message)
          }
        })
      },
      menuSelect (name) {
        this.$router.push({
          path: this.menus[name].path,
          query: {project_id: this.$route.query.project_id}
        })
      },
      openQuestionCreateModel () {
        this.$refs.questionCreate.show();
      },
      openWikiCreateModel () {

        this.$refs.wikiCreate.show();
      },
      createQuestion () {
        this.$refs.questionCreate.createQuestion()
      },
      inviteMember () {
        this.memberInviteModelShow = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import '../../../style/base.styl'

  .project-detail-header
    height 48px
    width 100%
    background-color #fff
    border-bottom 2px solid #eee;
    padding-left 30px
    padding-right 30px

  .project-detail-menu
    position relative
    height 48px !important
    line-height 48px
    border none
    .project-detail-header-menu-tool
      position absolute
      right 0
      .tool-new-question
        color $-success-color
      .tool-invite-member
        color $-info-color

  .project-detail-container
    height 100%

</style>
