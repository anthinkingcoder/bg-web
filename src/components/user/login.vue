<template>
  <div style="width:100%;height: 100%">
    <audio src="/static/music.mp3" ref="video">
      您的浏览器不支持 video 标签。
    </audio>
    <CommonMenu ref="commonMenu"></CommonMenu>
    <Row type="flex" justify="center">
      <Col :md="6" :xs="22">
      <div class="login">
        <div class="login-panel">
          <div class="login-head">
            <div class="login-title">
              <!--<h4>账户登录</h4>-->
              <a href="/"><img src="/static/img/logo.png" height="50"></a>
            </div>
            <div class="login-tip" v-if="loginTipVisible">
              <span>该账户已经存在,请直接登录</span>
            </div>
            <br>
            <br>
          </div>
          <div class="login-content">
            <Row type="flex" justify="center">
              <Col span="22">
              <input placeholder="邮箱" type="email" class="form-control" v-model="email" @keyup.enter="login"/>
              </Col>
              <Col span="22">
              <div>
                <input placeholder="密码" type="password" class="form-control" v-model="password" @keyup.enter="login"/>
              </div>
              </Col>
              <Col span="22">
              <Button class="login-button" type="ghost" @click="login" @keyup.enter="login">
                <span class="login-text">登录</span>
              </Button>
              </Col>
              <Col span="22">
              <hr>
              </Col>
              <Col span="22">
              <div class="bottom-15">
                <Button type="ghost" class="other-button" @click="register">
                  <p>还没有账号? <span class="tag-a">立即注册</span></p>
                </Button>
              </div>
              <!--<div class="bottom-15">-->
              <!--<Button type="ghost" class="other-button">-->
              <!--<p>忘记密码? <span class="tag-a">重置</span></p>-->
              <!--</Button>-->
              <!--</div>-->
              </Col>
            </Row>
          </div>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import CommonMenu from '../common/menu.vue'
  import valid from '../../util/valid'
  import qs from 'qs'

  export default {
    name: 'login',
    components: {
      CommonMenu
    },
    data () {
      return {
        loginTipVisible: false,
        prop1: false,
        email: '',
        password: ''
      }
    },
    watch: {
      prop1 (val) {
        this.$refs.video.play()
      }
    },
    methods: {
      register () {
        this.$router.replace({path: '/register',query: this.$router.query})
      },
      login () {
        this.validLogin().then(() => {
          this.$Spin.show()
          this.$http.post('/api/login', qs.stringify({
            email: this.email,
            password: this.password
          })).then(response => {
            let res = response.data
            if (res.code === '00000') {
              setTimeout(() => {
                this.$Spin.hide()
                if (this.$route.query.goTo && this.$route.query.inviteKey) {
                  location.href = this.$route.query.goTo
                }else {
                  location.href = '/projects'
                }
              }, 1000)
            } else {
              this.$Spin.hide()
              this.$Message.error(res.message)
            }
          })
        }).catch(e => {
          this.$Spin.hide()
          this.$Message.error(e)
        })
      },
      validLogin () {
        return new Promise((resolve, reject) => {
          if (!valid.validEmail(this.email)) {
            reject('请输入正确的邮箱')
            return
          }

          if (!this.password) {
            reject('请输入正确的密码')
            return
          }
          resolve()
        })
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" type="text/stylus">
  @import "../../style/base.styl"
  .login
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin-top: 60px;

  .login-panel
    height: 500px;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #ccc;
    overflow: auto;

  .login-head
    text-align: center;
    height: 128px;
    width: 100%;
    position: relative;

  .login-title
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 128px;
    text-align: center;

  .login-tip
    width: 100%;
    height: 48px;
    font-size: 14px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: 30px;

  .login-head
    h4
      font-size: 22px;
      font-weight: 600;

  .login-panel
    p
      font-size: 14px;
      color: #a7afb8;

  .login-content
    text-align: center;

  .login-button
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

  .login-text
    color: inherit
    font-size: 14px;
    font-weight: 500;

  .tag-a
    color: $-a-color;


</style>
