<template>
  <Card class="setting-card">
    <p slot="title">
      <Icon type="document-text"></Icon>
      项目信息
    </p>
    <br>
    <Row type="flex" justify="center">
      <Col span="23">
      <Form :label-width="80">
        <FormItem label="项目名称">
          <Input v-model="project.project_name"></Input>
        </FormItem>
        <FormItem label="项目背景">
          <ColorSelect v-model="project.project_bg" :datas="projectBgs">
          </ColorSelect>
        </FormItem>
        <FormItem label="项目描述">
          <Input type="textarea" v-model="project.project_summary" rows="5"></Input>
        </FormItem>

        <!--<FormItem label="项目pKey">-->
          <!--<span>{{question.key}}</span>-->
        <!--</FormItem>-->

        <FormItem label="">
          <Button type="primary" @click="updateProject">保存</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Card>
</template>

<script>
  import ColorSelect from '../../../../common/colorSelect.vue'
  import qs from 'qs'
  export default {
    created () {
      this.$store.dispatch('getProjectBgs')
      this.findDetail();
    },
    components: {
      ColorSelect
    },
    watch: {
      '$route.query': 'findDetail'
    },
    data () {
      return {
        spinShow:false,
        project: {
          project_bg: '',
          level: 1,
          project_summary: '',
          project_name: '',
          project_id: this.$route.query.project_id,
          key: 'f7f4ddb05b5f5af817a0b04c47394eef'
        },
      }
    },
    computed: {
      projectBgs () {
        return this.$store.getters.projectBgs
      },
    },
    methods: {
      findDetail () {
        this.$http.get('/api/project/findDetail', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          this.project = data.data
        }).catch(e => {
          this.$Message.error(e.data.data)
        })
      },
      validProject () {
        return new Promise((resolve, reject) => {
          if (!this.project.project_name) {
            reject('请输入项目名称')
          } else {
            resolve()
          }
        })
      },
      updateProject () {
        this.spinShow = true
        this.validProject().then(() => {
          this.$http.post('/api/project/update', qs.stringify(this.project))
            .then(response => {
              this.$Spin.hide()
              let data = response.data
              if (data.code === '00000') {
                this.$Message.success('更新成功')
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">

</style>
