<template>
      <div class="projects-detail-content">
        <Row type="flex" :gutter="48">
          <Col span="16">
          <!--新增问题趋势 -->
          <AppendQuestionTrend ref="appendQuestionTrend"></AppendQuestionTrend>
          </Col>

          <Col span="8" >
          <!--详情 -->
          <ProjectDec ref="projectDec"></ProjectDec>
          </Col>
        </Row>
        <br>
        <br>
        <Row type="flex" :gutter="48">
          <Col span="8">
          <!--问题 -->
          <QuestionSta ref="questionSta"></QuestionSta>
          </Col>
          <Col span="8" >
          <!--成员 -->
          <MemberList ref="memberList"></MemberList>
          </Col>

          <Col span="8">
          <!--详情 -->
          <Dynamics ref="dynamics"></Dynamics>
          </Col>
        </Row>
      </div>
</template>

<script>
  import AppendQuestionTrend from '../statictis/append_question_trend.vue'
  import ProjectDec from './project_dec.vue'
  import MemberList from '../member/member.vue'
  import QuestionSta from './question_sta.vue'
  import Dynamics from './dynamics.vue'
  export default {
    components: {
      AppendQuestionTrend,
      ProjectDec,
      MemberList,
      QuestionSta,
      Dynamics
    },
    data () {
      return {

      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import '../../../../style/base.styl'

  .projects-detail-content
    width 100%
    height 100%
    padding 30px 40px
    background-color tr
    overflow-y scroll
</style>
