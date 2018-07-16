<template>
  <div class="working-table-container">
    <div class="working-table-category-container">
      <ButtonGroup style="flex:1">
        <Button :type="activeIndex === 0 ? 'primary' : 'ghost'" @click="activeIndexSelect(0)">指给我的</Button>
        <Button :type="activeIndex === 1 ? 'primary' : 'ghost'" @click="activeIndexSelect(1)">我提出的</Button>
        <!--<Button>我关注的</Button>-->
      </ButtonGroup>
      <Button type="primary" icon="refresh" @click="listQuestion">刷新</Button>
      </Row>
    </div>


    <!--内容体-->
    <div class="working-table-content-container">
      <div class="working-table-content-item" v-for="(item,key) in questions" :key="key">
        <WorkList @open-question-detail="open" :name="key" :datas="item"
                   @dragEnter="dragEnter" @dragEnd="dragEnd" :tableCategory="activeIndex">
          <p slot="header">
          <Icon :type="item.icon" :color="item.color"></Icon>
          {{key}}({{item['list'].length}})
          <p/>
        </WorkList>
      </div>
    </div>
    <QuestionDetail :panelSpread="panelSpread" :uAffixSwitch="uAffixSwitch" :question_id="question_id"></QuestionDetail>
  </div>
</template>

<script>
  import WorkList from './work_list.vue'
  import QuestionDetail from '../question/question_detail.vue'
  import Emitter from '../../../mixin/emitter'
  export default {
    components: {
      WorkList,
      QuestionDetail
    },
    mixins: [Emitter],
    created () {
//      this.$store.dispatch('getAllStatus')
      this.listQuestion();
    },
    watch: {
      '$route.query': 'listQuestion'
    },
    data () {
      return {
        panelSpread: false,
        uAffixSwitch: false,
        activeIndex: 0,
        questions1: [],
        questions2: [],
        questions: [],
        question_id: ''
      }
    },
    computed: {
      questionStatusList () {
        return this.$store.getters.allQuestionStatus
      }
    },
    methods: {
      activeIndexSelect (index) {
        if (this.activeIndex !== index) {
          this.activeIndex = index
          this.listQuestion()
        }
      },
      open (id) {
        this.question_id = id
        this.panelSpread = !this.panelSpread
        this.uAffixSwitch = !this.uAffixSwitch
      },
      dragEnd (question) {
        this.broadcast('workList', 'submitUpdate',question);
      },
      dragEnter (par) {
        this.broadcast('workList', 'removeDrag',par);
      },
      listQuestion () {
        this.$Spin.show()
        if (this.activeIndex === 0) {
          this.listByProjectIdAndPointerId()
        } else {
          this.listByProjectIdAndCreateUserId()
        }
      },
      listByProjectIdAndCreateUserId () {
        this.$http.get('/api/project/question/listByProjectIdAndCreateUserId', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(res => {
          let data = res.data
          if (data.code === '00000') {
            this.questions1 = data.data
            this.questions = data.data;
          } else {
            this.$Message.error(data.message)
          }
          this.$Spin.hide()
        }).catch(e => {
          this.$Spin.hide()
          this.$Message.error(e.data.message)
        })
      },
      listByProjectIdAndPointerId () {
        this.$http.get('/api/project/question/listByProjectIdAndPointerId', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(res => {
          let data = res.data
          if (data.code === '00000') {
            this.questions2 = data.data
            this.questions = data.data;
          } else {
            this.$Message.error(data.message)
          }
          this.$Spin.hide()
        }).catch(e => {
          this.$Spin.hide()
          this.$Message.error(e.data.message)
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import '../../../../style/base.styl'
  .working-table-container
    position relative
    width 100%
    height 100%
    padding-bottom: 100px;
    overflow-y hidden
    overflow-x hidden
    .working-table-category-container
      position relative
      display flex
      justify-content flex-start
      padding 20px 40px
      background-color #fff
    .working-table-content-container
      display flex
      position relative
      padding 10px
      background-color #e2e7eb
      width 100%
      overflow-x scroll
      .working-table-content-item
        flex 0 0 300px
        margin-right 10px
    .button-select
      background-color #ccc
</style>
