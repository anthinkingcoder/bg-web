<template>
  <Modal
    v-model="projectCreateModelShow"
    title="新增项目"
    width="40%"
    :scrollable="false"
  >
    <div class="question-create">
      <Form :model="form" :label-width="80" :rules="ruleValidate">
        <FormItem label="项目名称">
          <Input placeholder="" :maxlength="24" v-model="form.project_name"></Input>
        </FormItem>

        <FormItem label="项目背景">
          <ColorSelect v-model="form.project_bg" :datas="projectBgs">
          </ColorSelect>
        </FormItem>

        <FormItem label="项目描述">
          <Input type="textarea" v-model="form.project_summary" :autosize="{ minRows: 4, maxRows: 6 }"></Input>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" size="large" long @click="createProject">创建</Button>
    </div>

    <Spin size="large" fix v-if="spinShow"></Spin>
  </Modal>
</template>
<script>
  import Ueditor from '../../common/ueditor/ueditor.vue'
  import ColorSelect from '../../common/colorSelect.vue'
  import qs from 'qs'
  export default {
    props: {},
    components: {
      Ueditor,
      ColorSelect
    },
    data () {
      return {
        projectCreateModelShow: false,
        spinShow:false,
        form: {
          project_bg: '',
          level: 1,
          project_summary: '',
          project_name: ''
        },
        ruleValidate: {
          level: [
            {
              required: true
            }
          ]
        },
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 250
        }
      }
    },
    watch: {},
    computed: {
      projectBgs () {
        return this.$store.getters.projectBgs
      },
    },
    created () {
      this.$store.dispatch('getProjectBgs')
    },
    methods: {
      validProject () {
        return new Promise((resolve, reject) => {
          if (!this.form.project_name) {
            reject('请输入项目名称')
          } else {
            resolve()
          }
        })
      },
      createProject () {
        this.spinShow = true
        this.validProject().then(() => {
          this.$http.post('/api/project/create', qs.stringify(this.form))
            .then(response => {
              let data = response.data
              if (data.code === '00000') {
                this.$Message.success('创建成功')
                this.show(false)
                this.$emit('create-success','')
              } else {
                this.$Message.error(data.data)
              }
              this.spinShow = false
            }).catch(e => {
            this.spinShow = false
            this.$Message.error(e.data.data)
          })
        }).catch(e => {
          this.$Message.error(e);
        })
      },
      show (show) {
        this.projectCreateModelShow = show
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus">
  .question-create
    width 100%
    padding-bottom 100px
    padding-right 30px
    overflow scroll

  ivu-select-single .ivu-select-selection .ivu-select-placeholder {
    height: 100%;
    line-height: 32px;
    font-size: 12px;
    padding-left: 16px;
  }

  .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
    height: 100%;
    line-height: 32px;
    font-size: 12px;
    padding-left: 16px;
  }

  .ivu-select-single .ivu-select-selection {
    height: 32px;
    position: relative;
    text-align: start;
    border-radius: 6px;
    border: 1px solid #e4e5e7;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    height: 100%;
    line-height: 32px;
    font-size: 12px;
    color: #555;
    padding-left: 16px;
  }
</style>
