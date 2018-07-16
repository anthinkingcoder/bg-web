<template>
  <Modal
    v-model="questionModelShow"
    title="新增问题"
    width="60%"
    :scrollable="false"
    @on-ok="createQuestion"
  >
    <div class="question-create">
      <Form :model="form" :label-width="80">
        <FormItem label="问题类型">
          <Select v-model="form.question_category" class="question-create-select" size="large">
            <Option v-for="(item,index) in categoryList" :key="index" :value="item.state">
              <Icon :type="item.icon" :color="item.color"></Icon>
              {{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="主题">
          <Input placeholder="此处填写问题的主题,最多不超过80个字符" v-model="form.question_name" size="large"></Input>
        </FormItem>
        <FormItem label="描述">
          <Ueditor :config="config" ref="ueditor"></Ueditor>
        </FormItem>
        <!--<FormItem label="附件">-->
          <!--<Button type="primary" icon="upload" size="small">上传</Button>-->
        <!--</FormItem>-->
        <Row>
          <Col span="12">
          <FormItem label="优先级">
            <Select v-model="form.question_priority" class="question-create-select" size="large">
              <Option v-for="(item,index) in levelList" :key="index" :value="item.value">
                <Icon :type="item.icon" :color="item.color"></Icon>
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="结束时间">
            <DatePicker :value="form.finished_at" format="yyyy-MM-dd" type="date" placeholder="请选择结束时间"
                        style="width: 100%" @on-change="updateFinishedAt" clearable></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="模块">
            <Select v-model="form.model_id" class="question-create-select" size="large" clearable>
              <Option v-for="(item,index) in models" :key="index" :value="item.id">
                {{item.model_name}}
              </Option>
            </Select>
          </FormItem>
          </Col>

          <Col span="12">
          <FormItem label="指派给">
            <Select v-model="form.pointer_user_id" class="question-create-select" size="large" clearable>
              <Option v-for="(item,index) in members" :key="index" :value="item.member_id">
                <Avatar :src="!item.head_img? '/static/img/avatar/avatar2.jpg' : item.head_img"></Avatar>
                {{item.name}}
              </Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" size="large" long @click="createQuestion">创建</Button>
    </div>

    <Spin size="large" fix v-if="spinShow"></Spin>
  </Modal>
</template>
<script>
  import Ueditor from '../../../common/ueditor/ueditor.vue'
  import qs from 'qs'

  export default {
    components: {
      Ueditor
    },
    created () {
      this.$store.dispatch('getQuestionLevels')
      this.$store.dispatch('getQuestionCategories')
      this.listMember()
      this.listModels()

    },
    computed: {
      levelList () {
        return this.$store.getters.allQuestionLevel
      },
      categoryList () {
        return this.$store.getters.allQuestionCategory
      }
    },
    data () {
      return {
        spinShow:false,
        form: {
          finished_at: '',
          question_summary: '',
          question_category: '',
          question_priority: '',
          pointer_user_id: '',
          question_name: '',
          project_id: this.$route.query.project_id,
          model_id: ''
        },
        models: [],
        members: [],
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 250
        },
        questionModelShow: false
      }
    },
    methods: {
      updateFinishedAt (m) {
        this.form.finished_at = m
      },
      validQuestion () {
        return new Promise((resolve, reject) => {
          console.info(this.form)
          if (!this.form.question_name) {
            reject('请输入问题名称')
          } else if (isNaN(parseInt(this.form.question_category))) {
            reject('请选择问题类型')
          } else if (!this.form.question_priority) {
            reject('请选择优先级')
          } else {
            resolve()
          }
        })
      },
      createQuestion () {
        this.validQuestion().then(() => {
          this.spinShow = true
          this.form.question_summary = this.$refs.ueditor.getContent()
          this.form.project_id = this.$route.query.project_id
          this.$http.post('/api/project/question/create', qs.stringify(this.form)).then(response => {
            let data = response.data
            if (data.code === '00000') {
              this.$Message.success('创建成功')
              this.show(false)
            }
            this.spinShow = false
          }).catch(error => {
            this.spinShow = false
            this.$Message.error(error.data.message)
          })
        }).catch(error => {

          this.$Message.error(error)
        })
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
              this.members = [...list['adminList'], ...list['list']]
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
              this.models = data.data
            }
          }).catch(error => {
          this.$Message.error(error.data.message)
        })
      },
      show (isShow = true) {
        this.questionModelShow = isShow
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .question-create
    width 100%
    padding-bottom 100px
    padding-right 30px
    overflow scroll
</style>
