<template>
  <Modal
    v-model="questionModelShow"
    title="wiki"
    width="60%"
    :scrollable="false"
  >
    <div class="question-create">
      <Form :model="wiki" :label-width="80">
        <FormItem label="名称">
          <Input placeholder="wiki名称" v-model="wiki.name" size="large"></Input>
        </FormItem>
        <FormItem label="描述">
          <Ueditor :config="config" ref="ueditor" :value="wiki.content"></Ueditor>
        </FormItem>
        <!--<FormItem label="附件">-->
        <!--<Button type="primary" icon="upload" size="small">上传</Button>-->
        <!--</FormItem>-->
        <Row>
          <Col span="24">
          <FormItem label="模块">
            <Select v-model="wiki.model_id" class="question-create-select" size="large" :clearable="true">
              <Option v-for="(item,index) in models" :key="index" :value="item.id">
                {{item.model_name}}
              </Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" size="large" long @click="submit">提交</Button>
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
        spinShow: false,
        id: '',
        wiki: {
          content: '',
          name: '',
          project_id: this.$route.query.project_id,
          model_id: ''
        },
        models: [],
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 250
        },
        questionModelShow: false
      }
    },
    methods: {
      submit () {
        if (this.id) {
          this.updateWiki();
        }else {
          this.createWiki();
        }
      },
      updateFinishedAt (m) {
        this.wiki.finished_at = m
      },
      validWiki () {
        return new Promise((resolve, reject) => {
          if (!this.wiki.name) {
            reject('请输入wiki名称')
          } else if (!this.wiki.content) {
            reject('请输入wiki内容')
          } else {
            resolve()
          }
        })
      },
      findDetail (id) {
        this.$http.get('/api/project/wiki/findDetail', {
          params: {
            id: id
          }
        }).then((response) => {
          let res = response.data
          if (res.code === '00000') {
            this.wiki = res.data
          } else {
            this.$Message.error('系统异常')
          }
        }).catch(() => {
          this.$Message.error('系统异常')
        })
      },
      updateWiki () {
        this.wiki.content = this.$refs.ueditor.getContent()
        this.wiki.id = this.id
        this.validWiki().then(() => {
          this.spinShow = true
          this.wiki.project_id = this.$route.query.project_id
          this.$http.post('/api/project/wiki/update', qs.stringify(this.wiki)).then(response => {
            let data = response.data
            if (data.code === '00000') {
              this.$Message.success('更新成功')
              this.show(false)
              this.$emit('update',this.id)
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
      createWiki () {
        this.wiki.content = this.$refs.ueditor.getContent()
        this.validWiki().then(() => {
          this.spinShow = true
          this.wiki.project_id = this.$route.query.project_id
          this.$http.post('/api/project/wiki/create', qs.stringify(this.wiki)).then(response => {
            let data = response.data
            if (data.code === '00000') {
              this.$Message.success('创建成功')
              this.show(false)
            }
            this.wiki = '';
            this.spinShow = false
          }).catch(error => {
            this.spinShow = false
            this.$Message.error(error.data.message)
          })
        }).catch(error => {
          this.$Message.error(error)
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
              console.info(this.models)
            }
          }).catch(error => {
          this.$Message.error(error.data.message)
        })
      },
      show (isShow = true, id) {
        if (id) {
          this.id = id
          this.findDetail(id)
        }
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
