<template>
  <UAffix ref="affix" :isSwitch="uAffixSwitch" @on-change="affixChange">
    <div class="question-detail-container" :class="questionDetailContainerSpread"
         :style="questionDetailContainerStyle">
      <Card class="question-detail-card" ref="questionDetailCard">
        <div id="question_detail">
          <!-- 基本信息-->
          <div class="question-detail-base" ref="questionDetailBase">
            <Row type="flex" align="middle">
              <Col span="1">
              <Button icon="chevron-right" type="text"></Button>
              </Col>
              <Col span="2">
              <span>{{question.id}}</span>
              </Col>
              <Col span="21">
              <input v-model="question.question_name" class="question-title" @blur="updateQuestionName"/>
              </COl>
            </Row>
            <Row type="flex" justify="end">
              <Col span="23" class="question-detail-base-2">
              <span>{{question.create_user_name}}</span>
              <span>创建于 {{question.create_at| moment("YYYY-MM-DD HH:mm")}}</span>
              <!--<span>{{question.author}}更新于{{question.updateAt}}</span>-->
              </Col>
            </Row>
            <Row type="flex" justify="end" class="question-detail-base-3" :gutter="12">
              <Col span="2" style="text-align: right">
              <span>状态:</span>
              </Col>
              <Col span="6">
              <DropSelect :datas="statusList" v-model="question.question_status" :searchSwitch="false"
                          @change="updateQuestionStatus"></DropSelect>
              </Col>
              <!--<Col span="2" style="text-align: right">-->
              <span>优先级:</span>
              </Col>
              <Col span="6">
              <DropSelect :datas="levelList" v-model="question.question_priority"
                          @change="updateQuestionPriority"></DropSelect>
              </Col>
              <Col span="2" style="text-align: right">
              <span>类型:</span>
              </Col>
              <Col span="6">
              <DropSelect :datas="questionCategoryList" v-model="question.question_category"
                          @change="updateQuestionCategory"></DropSelect>
              </Col>
            </Row>
            <hr>
          </div>
          <!--问题描述-->
          <div class="question-summary" ref="questionSummary">
            <p>
              <Icon type="document-text" size="14"></Icon>
              <span>描述</span>
            </p>
            <Sueditor :content="question.question_summary" :height="50"
                      @content-update="updateQuestionSummary" ref="sueditor"></Sueditor>
            <hr>
          </div>

          <!--额外信息-->
          <div class="question-extra" ref="questionExtra">
            <Row>
              <Col span="12">
              <Icon type="document-text" size="14"></Icon>
              <span>指派</span>
              <DropSelect :datas="members" v-model="question.pointer_user_id" :searchSwitch="true"
                          ref="pointerSelect" @change="updatePointerId" :canNull="true"></DropSelect>
              </Col>
              <Col span="12">
              <Icon type="document-text" size="14"></Icon>
              <span>截止</span>
              <DatePicker class="remove-border" format="yyyy-MM-dd" placeholder="请选择截止" :value="question.finished_at"
                          @on-change="updateFinishedAt"
              ></DatePicker>

              </Col>
            </Row>
            <br>
            <Row>
              <Col span="12">
              <Icon type="document-text" size="14"></Icon>
              <span>模块</span>
              <DropSelect :datas="models" v-model="question.model_id" :searchSwitch="false" @change="updateModel" :canNull="true"
                         ></DropSelect>
              </Col>
              <!--<Col span="12">-->
              <!--<Icon type="document-text" size="14"></Icon>-->
              <!--<span>版本</span>-->
              <!--</Col>-->
            </Row>
          </div>
          <hr>
          <!-- 附件-->
          <!--<div class="question-attachment">-->
          <!--<p>-->
          <!--<Icon type="paperclip"></Icon>-->
          <!--<span>附件</span></p>-->
          <!--<Button type="ghost" size="small" icon="upload">上传</Button>-->
          <!--</div>-->
          <!--<hr>-->
          <!--评论载体 -->
          <CommentList :datas="dynamics" :height="commentHeight"></CommentList>
        </div>
      </Card>
      <CommentSend :left="commentSendSpread" elWidth="60%" @content-update="listDynamic" ref="commentSend"
                   :question_id="question_id"></CommentSend>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
  </UAffix>
</template>
<script>
  import DropSelect from '../../../common/select/drop-select.vue'
  import Sueditor from '../../../common/edit/sueditor/sueditor.vue'
  import CommentList from '../../../common/comment/comment.vue'
  import CommentSend from '../../../common/comment/commentSend.vue'
  import UAffix from '../../../common/UAffix.vue'
  import moment from 'moment'
  import qs from 'qs'

  export default {
    props: {
      panelSpread: {
        type: Boolean,
        default: false
      },
      uAffixSwitch: {
        type: Boolean,
        default: false
      },
      question_id: {},
    },
    components: {
      UAffix,
      DropSelect,
      Sueditor,
      CommentList,
      CommentSend
    },
    created () {
      this.$store.dispatch('getAllStatus')
      this.$store.dispatch('getQuestion')
      this.$store.dispatch('getQuestionLevels')
      this.$store.dispatch('getQuestionCategories')
      this.listMember()
      this.listModels()
    },
    mounted () {
      this.updateCommentSendSpread(this.panelSpread)
      this.commentHeight = window.innerHeight- this.$refs.questionSummary.clientHeight - this.$refs.questionExtra.clientHeight - this.$refs.questionDetailBase.clientHeight - 108
    },
    computed: {
      questionDetailContainerSpread () {
        return this.panelSpread ? 'question-detail-container-spread' : 'question-detail-container-hide'
      },
      statusList () {
        return this.$store.getters.allQuestionStatus
      },
      questionCategoryList () {
        return this.$store.getters.allQuestionCategory
      },
      levelList () {
        return this.$store.getters.allQuestionLevel
      }
    },
    data () {
      return {
        spinShow:false,
        question: '',
        dynamics: [],
        commentSendContainerStyle: {
          'left': 0
        },
        commentSendSpread: '100%',
        affixOffsetTop: 0,
        questionListLoading: false,
        questionDetailContainerStyle: {
          'width': '60%'
        },
        isSwitch: true,
        members: [],
        models: [],
        commentHeight: 0
      }
    },
    watch: {
      panelSpread (val) {
        this.updateCommentSendSpread(val)
      },
      question_id (n, o) {
        if (n !== o) {
          this.findDetail()
        }
      }
    },
    methods: {
      updateCommentSendSpread (val) {
        if (!val) {
          this.commentSendSpread = '100%'
        } else {
          this.commentSendSpread = '40%'
        }
      },
      updateModel (val) {
        this.updateQuestion(this.question.model_id, 'model_id')
      },
      updateQuestionStatus () {
        this.updateQuestion(this.question.question_status, 'question_status')
      },
      updateQuestionName () {
        this.updateQuestion(this.question.question_name, 'question_name')
      },
      updateQuestionCategory () {
        this.updateQuestion(this.question.question_category, 'question_category')
      },
      updateQuestionPriority () {
        this.updateQuestion(this.question.question_priority, 'question_priority')
      },
      updateQuestionSummary (content) {
        this.question.question_summary = content
        this.updateQuestion(this.question.question_summary, 'question_summary')
      },
      updatePointerId () {
        this.updateQuestion(this.question.pointer_user_id, 'pointer_user_id')
      },
      updateFinishedAt (n) {
        this.question.finished_at = n
        this.updateQuestion(this.question.finished_at, 'finished_at')
      },
      updateQuestion (data, field) {
        this.spinShow = true
        this.$http.post('/api/project/question/update', qs.stringify({
          question_id: this.question.id,
          field: field,
          value: data
        })).then(res => {
          let data = res.data
          if (data.code === '00000') {
            this.$Message.success('更新成功')
            this.listDynamic()
          } else {
            this.$Message.error(data.message)
          }
          this.spinShow = false
        }).catch(e => {
          this.spinShow = false
          this.$Message.error(e.data.message)
        })
      },
      handlerElChange (val, left) {
        // 打开
        if (val) {
          this.commentSendContainerStyle = {
            'left': 0
          }
        } else {
          this.commentSendContainerStyle = {
            'left': left
          }
        }
      },
      affixChange (val) {
        // 如果不是是固定状态,需计算定值高度
        if (val) {
          this.questionDetailContainerStyle = {
            'width': window.innerWidth * 0.6 + 'px'
          }
        } else {
          this.questionDetailContainerStyle = {
            'width': '60%'
          }
        }
      },
      findDetail () {
        this.spinShow = true;
        if (this.question_id) {
          this.$http.get('/api/project/question/findDetail', {params: {question_id: this.question_id}}).then(response => {
            let res = response.data
            if (res.code === '00000') {
              this.question = res.data
            } else {
              this.$Message.error(data.message)
            }
          }).catch(e => {
            this.$Message.error(e.data.message)
          })
          this.listDynamic()
        }
      },
      listMember () {
        this.$http.get('/api/project/member/listMembers', {
          params: {
            project_id: this.$route.query.project_id
          }
        })
          .then(response => {
            let data = response.data
            if (data.code = '00000') {
              let list = data.data
              let datas = [...list['adminList'], ...list['list']]
              this.members = datas.map(data => {
                return {
                  label: data.name,
                  value: data.member_id,
                  icon: 'record',
                  color: 'yellow'
                }
              })
            }
          }).catch(error => {
          this.$Message.error(error.data.message)
        })
      },
      listModels () {
        this.$http.get('/api/project/model/listAll', {
          params: {
            project_id: this.$route.query.project_id
          }
        })
          .then(response => {
            let data = response.data
            if (data.code = '00000') {
              this.models = data.data.map(item => {
                return {
                  label: item.model_name,
                  value: item.id,
                  icon: 'record',
                }
              })
              console.info(this.models);

            }
          }).catch(error => {
          this.$Message.error(error.data.message)
        })
      },
      listDynamic () {
        this.$http.get('/api/project/dynamic/listQuestionDynamic', {
          params: {
            question_id: this.question_id
          }
        })
          .then(response => {
            let data = response.data
            if (data.code = '00000') {
              this.dynamics = data.data
            }
            this.spinShow = false;
          }).catch(error => {
          this.spinShow = false;
          this.$Message.error(error.data.message)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus">
  @import '../../../../style/base.styl'
  .question-detail-container
    position absolute
    z-index 100
    overflow-x hidden
    overflow-y hidden
    transition right 0.3s ease
    top 0
    right 0
    .question-detail-card
      width 100%
      background-color #fff
      overflow-x hidden
      #question_detail
        overflow-x hidden
        overflow-y scroll
        transform translate(0, 0)
        .question-detail-base
          width 100%
          font-size 16px
          vertical-align middle
          .question-title
            outline none
            background none
            height 36px
            width 100%
            font-size 18px
            border none
            border-radius 6px
            padding 5px
            &:hover
              background-color $-sub-color
          .question-detail-base-2
            margin-bottom 5px
            font-size 12px
            color $-sub-color
          .question-detail-base-3
            font-size 14px
            color $-sub-color
            .question-detail-select
              background none
              border none
              outline none
              font-size 14px !important
            .form-title
              font-size 14px
              color $-sub-color
        .question-summary
          color $-sub-color
          p
            margin-left 10px
        .question-extra
          margin-left 10px
          color $-sub-color
        .question-attachment
          display flex
          justify-content space-between
          margin-left 10px
          color $-sub-color
          font-size 14px

      .ivu-select-selection
        border none !important

  .question-detail-container-spread
    right 0

  .question-detail-container-hide
    right -60%

  /*.ivu-input*/
    /*border 1px solid #fff*/
  .remove-border
    input
      border 1px solid #fff
</style>
