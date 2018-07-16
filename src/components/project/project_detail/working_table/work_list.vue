<template>
  <div class="work-list-container">
    <div class="work-list-title">
      <slot name="header">
        <Icon type="document-text"></Icon>
        新建(1)
      </slot>
    </div>
    <!---->
    <ul class="work-list" ref="workList">
      <a @click="open(item.id)" v-for="(item,index) in questions" :key="index"
      >
        <li class="work-list-item work-list-item-drag"
            v-if="item.isDrag && item.noQuestion">
        </li>
        <li class="work-list-item" draggable="true" :style="{'border-left-color':item.question_priority_color}"
            v-if="!item.isDrag && !item.noQuestion">
          <a class="work-title">
            {{item.question_name}}
          </a>
          <div class="work-time">
            <Icon type="eye" size="12"></Icon>
            <span>{{item.update_at | moment('YYYY-MM-DD')}}</span>
          </div>
          <ul class="work-list-content">
            <li>
              <Tag type="border" color="#e4e5e7">#{{item.id}}</Tag>
            </li>
            <li>
              <Tag :color="item.question_category_color">{{item.question_category_name}}</Tag>
            </li>
            <li>
              <Icon type="speakerphone" size="12"></Icon>
              <span class="ellipsis-text">{{item.pointer_user_name}}</span>
            </li>
          </ul>
        </li>
      </a>
    </ul>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    name: 'workList',
    props: {
      name: {
        default: Math.random()
      },
      datas: {
        type: Array
      }
    },
    watch: {
      datas (n) {
        let v = n.list
        this.questionStatus = n.status
        v.forEach(item => {
          this.categoryList.forEach(ca => {
            if (ca.value == item.question_category) {
              item.question_category_name = ca.label
              item.question_category_color = ca.color
            }
          })
        })
        v.forEach(item => {
          this.levelList.forEach(ca => {
            if (ca.value == item.question_priority) {
              item.question_priority_color = ca.color
            }
          })
        })
        this.questions = [{isDrag: false, noQuestion: true}, ...v]
        this.$nextTick(() => {
          this.init()
        })
      }
    },
    components: {},
    data () {
      return {
        dragIndex: -1,
        isDragEnter: false,
        questions: [],
        questionStatus: '',
        isDragMe: false,
        noQuestion: {
          isDrag: false,
          noQuestion: true
        }
      }
    },
    created () {
      this.$store.dispatch('getQuestionLevels')
      this.$store.dispatch('getQuestionCategories')
    },
    computed: {
      levelList () {
        return this.$store.getters.allQuestionLevel
      },
      categoryList () {
        return this.$store.getters.allQuestionCategory
      }
    },
    methods: {
      open (id) {
        this.$emit('open-question-detail', id)
      },
      init () {
        this.$on('removeDrag', (name) => {
          if ((!this.isDragMe && this.isDragEnter && name !== this.name) || this.isDragMe) {
            this.isDragEnter = false
            this.$set(this.questions, 0, {isDrag: false, noQuestion: true})
          }
        })
        this.$on('submitUpdate', (question) => {
          if (this.isDragEnter) {
            this.$set(this.questions, 0, {isDrag: false, noQuestion: true})
            this.$set(this.questions, this.questions.length, question)
            this.$parent.broadcast('workList', 'updateFinished')
            this.updateQuestion(this.questionStatus,question.id)
            this.$nextTick(() => {
              this.init()
            })
            this.isDragEnter = false
          }
          this.isDragMe = false
        })

        this.$on('updateFinished', () => {
          if (this.dragIndex !== -1) {
            let q = this.questions
            q.splice(this.dragIndex, 1)

            this.questions = q
            this.dragIndex = -1
            this.$nextTick(() => {
              this.init()
            })
          }
        })
        this.initDragEvents()
      },
      initDragEvents () {
        let dragItems = Array.from(this.$refs.workList.getElementsByClassName('work-list-item'))
        let dragContainer = this.$refs.workList
        dragItems.forEach((item, index) => {
          this.registerDragItemEvent(item, index)
        })
        this.registerDragContainerEvent(dragContainer, 0)
      },
      registerDragItemEvent (item, index) {
        let e = item
        let question = this.questions[index + 1]
        e.ondragstart = () => {
          this.isDragMe = true
        }
        e.ondragend = () => {
          this.dragIndex = index + 1
          this.$emit('dragEnd', question)
        }
      },
      registerDragContainerEvent (item) {
        let e = item
        e.ondragenter = () => {
          if (!this.isDragMe) {
            if (!this.isDragEnter) {
              this.isDragEnter = true
              this.$emit('dragEnter', this.name)
              this.$set(this.questions, 0, {isDrag: true, noQuestion: true})
            }
          } else {
            this.$emit('dragEnter', this.name)
          }
        }
      },
      updateQuestion (data, questionId) {
        this.$http.post('/api/project/question/update', qs.stringify({
          question_id: questionId,
          field: 'question_status',
          value: data
        })).then(res => {
          let data = res.data
          if (data.code === '00000') {
            this.$Message.success('更新成功')
          } else {
            this.$Message.error(data.message)
          }
        }).catch(e => {
          this.$Message.error(e.data.message)
        })
      }
    },
    mounted () {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .work-list-container
    position relative
    width 100%
    height 100%
    background-color #fff
    .work-list-title
      padding 10px
      background-color #fff
      border-bottom 1px solid #eee
    .work-list
      position relative
      margin-top 10px
      padding 0 10px 0 10px
      height 500px
      width 100%
      overflow-y scroll
      a
        display block
        position relative
      .work-list-item
        display block
        margin-bottom 10px
        padding 20px 10px
        border-left 5px solid #f8ac59
<<<<<<< HEAD
=======

>>>>>>> 6a661e31606575fbf3c627438e734f2dac7f2e43
        border-top 1px solid #eee
        border-bottom 1px solid #eee
        border-right 1px solid #eee
        border-radius 3px
        background-color #fff
        .work-list-content
          display flex
          align-items center
          margin-top 10px
          li
            margin-right 10px
            font-size 12px
            color #b2b2b2
            .ellipsis-text
              display inline-block
              overflow: hidden;
              vertical-align top
        .work-time
          margin-top 10px
          text-align left
          font-size 12px
          color #b2b2b2

  .work-list-item-drag
    border 1px dashed #b2b2b2 !important
    height 129px
</style>
