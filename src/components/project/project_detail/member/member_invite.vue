<template>
  <div class="member-invite">
    <Tabs value="通过邮箱邀请">
      <TabPane label="通过邮箱邀请" name="通过邮箱邀请">
        <Input v-model="inviteEmail" size="large" ref="inviteUrlInput" placeholder="输入邮箱">
        <Button slot="append" @click="sendEmail" class="cover-url-btn">发送邮箱</Button>
        </Input>

      </TabPane>
      <TabPane label="通过链接邀请" name="通过链接邀请">
        <div class="url-way">
          <span class="url-way-tip">访问此链接的用户可直接加入项目，链接的有效期是一天。</span>
          <Input v-model="inviteUrl" size="large" ref="inviteUrlInput" :disabled="disable">
          <span slot="prepend">邀请链接</span>
          <Button slot="append" @click="coverUrl" class="cover-url-btn" v-show="!isCover">复制链接</Button>
          <Button slot="append" @click="coverUrl" class="cover-url-btn" v-show="isCover">已复制</Button>
          </Input>
        </div>
      </TabPane>
    </Tabs>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
  import valid from '../../../../util/valid'
  export default {
    created () {
      this.findInvite()
    },
    data () {
      return {
        inviteUrl: '',
        isCover: false,
        disable: true,
        inviteEmail: '',
        spinShow:false
      }
    },
    methods: {
      coverUrl () {
        // 执行复制事件
        this.disable = false
        setTimeout(() => {
          this.$refs.inviteUrlInput.$refs.input.select()
          document.execCommand('copy')
          this.$Notice.success({
            title: '链接复制成功'
          })
          this.disable = true
        })
      },
      findInvite () {
        this.$http.get('/api/project/invite', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          if (data.code === '00000') {
            let invite = data.data
            this.inviteUrl = `http://localhost:8081/project/invite/${invite.project_id}/${invite.key}?inviteKey=1`

          }
        }).catch(e => {
          this.$Message.error(e.data.data)
        })
      },
      sendEmail () {
        if (!valid.validEmail(this.inviteEmail)) {
          this.$Message.error('请输入正确的邮箱');
          return;
        }
        this.spinShow = true
        this.$http.get('/api/email/invite', {
          params: {
            project_id: this.$route.query.project_id,
            invite_email: this.inviteEmail
          }
        }).then(response => {
          let data = response.data
          if (data.code === '00000') {
            this.$Message.success('发送成功')
          }else {
            this.$Message.error(data.message)
          }
          this.spinShow = false
        }).catch(e => {
          this.$Message.error(e.data.message)
          this.spinShow = false
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/base.styl"
  .member-invite
    .url-way
      height 100%
      padding 20px
      display flex
      flex-direction column
      justify-content center
      align-items flex-start
      .url-way-tip
        margin-bottom 10px
        color $-sub-color
        font-size 14px
</style>
