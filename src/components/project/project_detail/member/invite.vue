<template>
  <div style="width:100%;height: 100%">
    <Row type="flex" justify="center">
      <Col :md="6" :xs="22">
      <div class="invite">
        <div class="invite-panel">
          <div class="invite-head">
            <div class="invite-title">
              <!--<h4>账户登录</h4>-->
              <a href="/"><img src="/static/img/logo.png" height="50"></a>
            </div>
            <br>
            <br>
          </div>
          <Row type="flex" justify="center">
            <Col span="18">
            <div class="invite-content">
              <p class="invite-people">{{project.name}}</p>
              <p class="invite-dec">邀请您加入项目 <span class="project-name">{{project.project_name}}</span></p>
            </div>
            </Col>
            <Col span="18" style="margin-top: 30px">
            <Button type="primary" long size="large" v-if="!project.isMe" @click="joinProject">确定加入</Button>
            <Button type="primary" long size="large" v-else @click="joinProject">您已经加入该项目，点击直接进入</Button>
            </Col>
          </Row>

        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import valid from '../../../../util/valid'
  import qs from 'qs'

  export default {
    name: 'login',
    created () {
      this.findProject()
    },
    data () {
      return {
        project: ''
      }
    },
    watch: {
      prop1 (val) {
        this.$refs.video.play()
      }
    },
    methods: {
      joinProject () {
        let isMe = this.project.isMe
        let projectId = this.project.project_id
        console.info(projectId)
        if (isMe) {
          this.$router.push({
            path: '/projects/detail/summary',
            query: {
              project_id: projectId
            }
          })
        } else {
          this.$http.post('/api/project/member/create', qs.stringify({
            project_id: projectId,
            key: this.$route.params.inviteKey
          })).then(response => {
            let data = response.data
            if (data.code === '00000') {
              this.$Message.success('加入成功')
              setTimeout(() => {
                this.$router.push({
                  path: '/projects/detail/summary',
                  query: {
                    project_id: projectId
                  }
                })
              })
            } else {
              this.$Message.error(data.message)
            }
          }).catch(error => {
            this.$Message.error(error.data.message)
          })
        }
      },
      findProject () {
        this.$http.get('/api/project/findDetail', {
          params: {
            project_id: this.$route.params.projectId
          }
        })
          .then(response => {
            let data = response.data
            if (data.code = '00000') {
              this.project = data.data
            }
          }).catch(error => {
        })
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" type="text/stylus">
  @import "../../../../style/base.styl"
  .invite
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin-top: 60px;

  .invite-panel
    width 100%;
    height: 500px;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #ccc;
    overflow: auto;

  .invite-head
    text-align: center;
    height: 128px;
    width: 100%;
    position: relative;

  .invite-title
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 128px;
    text-align: center;

  .invite-tip
    width: 100%;
    height: 48px;
    font-size: 14px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: 30px;

  .invite-head
    h4
      font-size: 22px;
      font-weight: 600;

  .invite-panel
    p
      font-size: 14px;
      color: #a7afb8;

  .invite-content
    width: 100%;
    text-align: center;
    background-color: #f5f6f7;
    padding-top: 20px;
    padding-bottom: 20px;
    .invite-people
      font-size 18px;
      color black
      font-weight bold
    .invite-dec
      padding-top 10px;
      color #a7afb8;
    .project-name
      color #337ab7

  .invite-button
    width: 100%;
    height: 48px;
    background-color: $-app-color;
    border-color: #337ab7;
    color #fff

  .other-button
    width: 100%;
    height: 48px;

  .other-button
    p
      font-size: 16px;

  .invite-text
    color: inherit
    font-size: 14px;
    font-weight: 500;

  .tag-a
    color: $-a-color;
</style>
