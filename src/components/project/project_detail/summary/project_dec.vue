<template>
  <div>
    <Card class="project-dec">
      <p slot="title">
        <Icon type="ios-gear">
        </Icon>
        详情
      </p>
      <p slot="extra" class="card-extra">
        <ButtonGroup size="small">
          <Button type="ghost" @click="exitProject">退出项目</Button>
          <!--<Button type="ghost">设置</Button>-->
        </ButtonGroup>
      </p>

      <div class="project-dec-content">
        <div class="project-dec-content-item">
          <p class="dec-key">
            项目名称 ：
          </p>
          <p class="dec-value">
            {{project.project_name}}
          </p>
        </div>


        <div class="project-dec-content-item">
          <p class="dec-key">
            项目描述 ：
          </p>
          <p class="dec-value">
            {{project.project_summary}}
          </p>
        </div>

        <div class="project-dec-content-item">
          <p class="dec-key">
            创建时间 ：
          </p>
          <p class="dec-value">
            {{project.create_at|fromNow}}
          </p>
        </div>

        <div class="project-dec-content-item">
          <p class="dec-key">
            <!--项目空间 ：-->
          </p>
          <!--<p class="dec-value">-->
            <!--0B / 10GB-->
          <!--</p>-->
        </div>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
    created () {
      this.findDetail()
    },
    mounted () {

    },
    data () {
      return {
        spinShow: false,
        project: ''
      }
    },
    watch: {
      '$route.query': 'findDetail'
    },
    methods: {
      findDetail () {
        this.spinShow = true
        this.$http.get('/api/project/findDetail', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          this.project = data.data
          this.spinShow = false
        }).catch(e => {
          this.spinShow = true
          this.$Message.error(e.data.data)
        })
      },
      exitProject () {
        this.spinShow = true
        this.$http.post('/api/project/exit', qs.stringify({
          project_id: this.$route.query.project_id
        })).then(response => {
          let data = response.data
          if (data.code == '00000') {
            this.$Message.success('退出成功')
            setTimeout(() => {
              location.href = '/projects';
            },1000);
          } else {
            this.$Message.error(data.message)
          }
          this.spinShow = false
        }).catch(e => {
          this.spinShow = false
          this.$Message.error(e.data.data)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/project/project.styl"
  .project-dec
    min-height 300px

  .project-dec-content
    display block
    padding 5px
    .project-dec-content-item
      display block
      margin-top 10px
      .dec-key
      .dec-value
        display table-cell
        padding-right 10px
        padding-top 5px

</style>
