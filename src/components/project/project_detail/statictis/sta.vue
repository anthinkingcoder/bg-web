<template>
  <div class="project-statistics">
    <Row>
      <Col span="24">
      <QuestionSta ref="questionSta" col="7" justify="center"></QuestionSta>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
      <AppendQuestionTrend ref="appendQuestionTrend"></AppendQuestionTrend>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
      <AppendQuestionTypeTrend ref="appendQuestionTypeTrend"></AppendQuestionTypeTrend>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
      <Distribution ref="distribution"></Distribution>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
      <WorkSchedule ref="workSchedule"></WorkSchedule>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
      <ModuleQuestion ref="moduleQuestion"></ModuleQuestion>
      </Col>
    </Row>
    <br>
    <Row :gutter="12">
      <Col span="8">
      <QuestionLevel ref="questionLevel"></QuestionLevel>
      </Col>

      <Col span="8">
      <ProjectProcess ref="projectProcess"></ProjectProcess>
      </Col>

      <Col span="8">
      <PeopleQuestionRadio ref="peopleQuestionRadio"></PeopleQuestionRadio>
      </Col>
    </Row>
  </div>
</template>

<script>
  import QuestionSta from '../summary/question_sta.vue'
  import AppendQuestionTrend from './append_question_trend.vue'
  import AppendQuestionTypeTrend from './append_question_type_trend.vue'
  import Distribution from './distribution.vue'
  import WorkSchedule from './work_schedule.vue'
  import ModuleQuestion from './module_question.vue'
  import QuestionLevel from './question_level.vue'
  import ProjectProcess from './project_process.vue'
  import PeopleQuestionRadio from './people_question_radio.vue'
  export default {
    components: {
      QuestionSta,
      AppendQuestionTrend,
      AppendQuestionTypeTrend,
      Distribution,
      WorkSchedule,
      ModuleQuestion,
      QuestionLevel,
      ProjectProcess,
      PeopleQuestionRadio
    },
    data () {
      return {}
    },
    beforeDestroy () {
      // 销毁echart
      if (this.chart) {
        this.chart.dispose()
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .project-statistics
    width 100%
    height 100%
    padding 20px 20px
    overflow-y scroll
</style>
