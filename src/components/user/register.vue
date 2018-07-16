<template>
  <div style="width: 100%;height: 100%">
    <CommonMenu></CommonMenu>
    <Row type="flex" justify="center">
      <Col :md="8" :xs="22">
      <div class="register">
        <div class="register-panel">
          <div class="head">
            <div class="logo">
              <a href="/"><img src="/static/img/logo.png" height="50"></a>
            </div>
          </div>

          <div class="register-content-1" v-if="registerStep === 1">
            <Row type="flex" justify="center">
              <Col span="18">
              <input placeholder="请输入常用邮箱" type="email" v-model="form.email" class="form-control"
                     @keyup.enter="stepTwo"/>
              </Col>
              <Col span="18">
              <Button class="register-button" @click="stepTwo">
                <span class="register-text">注册</span>
              </Button>
              </Col>
              <Col span="18">
              <hr>
              </Col>
              <Col span="18">
              <div class="bottom-15">
                <Button type="ghost" class="other-button" @click="login">
                  <p>已有账号? <span class="tag-a">立即登录</span></p>
                </Button>
              </div>
              <br>
              </Col>
            </Row>
          </div>

          <div class="register-content" v-if="registerStep === 2">
            <Row type="flex" justify="center">
              <Col span="18">
              <input type="email" v-model="form.email" disabled class="form-control" style="background-color: #eee"/>
              </Col>
              <Col span="18">
              <input type="password" v-model="form.password" placeholder="请输入密码(8-12位,以字母开头,只包含数字与字母)"
                     class="form-control"
                     @keyup.enter="stepThree"/>
              </Col>
              <Col span="18">
              <input type="tel" v-model="form.tel" placeholder="请输入手机号" class="form-control"
                     @keyup.enter="stepThree"/>
              </Col>
              <Col span="18">
              <Row>
                <Col span="16">
                <input type="text" v-model="form.vcode" placeholder="验证码" class="form-control r-border-h"
                       @keyup.enter="stepThree"/>
                </Col>
                <Col span="8">
                <span type="success" class="captcha-btn l-border-h" v-show="!sendingMessage" @click="sendMessage">{{message}}</span>
                <span type="success" class="captcha-btn l-border-h time" v-show="sendingMessage">已发送({{time}})</span>
                </Col>
              </Row>
              </Col>
              <Col span="18">
              <Button class="register-button" @click="stepThree">
                <span class="register-text">下一步</span>
              </Button>
              </Col>
              <Col span="18">
              <hr>
              </Col>
              <Col span="18">
              <div class="bottom-15">
                <Button type="ghost" class="other-button" @click="stepOne">
                  <p class="register-text"><span class="tag-a">使用其他邮箱注册</span></p>
                </Button>
              </div>
              </Col>
            </Row>
            <br>
            <br>
            <br>
          </div>


          <div class="register-content" v-if="registerStep === 3">
            <Row type="flex" justify="center">
              <Col span="18">
              <input type="text" v-model="form.name" placeholder="请输入真实姓名" class="form-control"/>
              </Col>
              <Col span="18">
              <input type="text" v-model="form.company_name" placeholder="请输入公司名" class="form-control"/>
              </Col>
              <Col span="18" class="form-focus">
              <div class="bottom-15">
                <Select v-model="form.work" style="height: 46px" placeholder="请选择职位">
                  <Option v-for="item in workList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </Select>
              </div>
              </Col>
              <Col span="18">
              <Button class="register-button" @click="finishRegister">
                <span class="register-text">完成</span>
              </Button>
              </Col>
              <Col span="18">
              <hr>
              </Col>
              <Col span="18">
              <div class="bottom-15">
                <Button type="ghost" class="other-button" @click="stepOne">
                  <p class="register-text"><span class="tag-a">使用其他邮箱注册</span></p>
                </Button>
              </div>
              </Col>
            </Row>
            <br>
            <br>
            <br>
          </div>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import CommonMenu from '../common/menu.vue'
  import qs from 'qs'
  import valid from '../../util/valid'

  export default {
    name: 'login',
    components: {
      CommonMenu
    },
    data () {
      return {
        visible: true,
        registerStep: 1,
        time: 10,
        sendingMessage: false,
        message: '发送验证码',
        form: {
          email: '',
          tel: '',
          name: '',
          work: '',
          vcode: '',
          company_name: ''
        },
        workList: [
          {
            value: '部门经理'
          },
          {
            value: '前端工程师'
          },
          {
            value: '测试工程师'
          },
          {
            value: '后端工程师'
          },
          {
            value: '运维工程师'
          },
          {
            value: '其他'
          }
        ]
      }
    },
    methods: {
      login () {
        location.href = '/login'
      },
      register () {
      },
      sendMessage () {
        if (this.sendingMessage === true) {
          return
        }
        this.sendingMessage = true
        let timer = setInterval(() => {
          if (this.time === 0) {
            this.sendingMessage = false
            this.time = 11
            this.message = '重新发送'
            clearInterval(timer)
          }
          this.time -= 1
        }, 1000)
      },
      finishRegister () {
        this.validStepThree().then(() => {
          this.$http.post('/api/register', qs.stringify(this.form)
          ).then((response) => {
            let res = response.data
            if (res.code === '00000') {
              this.$Message.success('注册成功');
              setTimeout(() => {
                this.login();
              },1000);
            } else {
              reject(res.message)
            }
          })
        }).catch(e => {
          this.$Message.error(e)
        })
      },
      // todo 发送短信
      stepThree () {
        this.validStepTwo().then(() => {
          this.registerStep = 3
        }).catch(e => {
          this.$Message.error(e)
        })
      },
      stepTwo () {
        this.validEmail().then(() => {
          this.registerStep = 2
        }).catch(e => {
          this.$Message.error(e)
        })
      },
      stepOne () {
        this.registerStep = 1
        this.form = {
          email: '',
            tel: '',
            name: '',
            work: '',
            vcode: '',
            company_name: ''
        }
      },
      validStepThree() {
        return new Promise((resolve, reject) => {
          if (!this.form.name) {
              reject('请输入姓名');
              return;
          }

          if (!this.form.work) {
            reject('请选择职位');
            return;
          }

          if (!this.form.company_name) {
            reject('请输入公司名称');
            return;
          }
          resolve();
        })
      },
      validStepTwo () {
        return new Promise((resolve, reject) => {
          if (!valid.validPassword(this.form.password)) {
            reject('请输入正确的密码')
            return
          }

          if (!valid.validTel(this.form.tel)) {
            reject('请输入正确的手机号')
            return
          }

          this.validTel().then(() => {
            if (!this.sendingMessage || !this.form.vcode) {
              reject('请输入正确的验证码')
            } else {
              resolve()
            }
          }).catch(e => {
            reject(e)
          })
        })
      },

      validTel () {
        return new Promise((resolve, reject) => {
          this.$http.post('/api/valid/tel', qs.stringify({
              tel: this.form.tel
            })
          ).then((response) => {
            let res = response.data
            if (res.code === '00000') {
              resolve()
            } else {
              reject(res.message)
            }
          })
        })
      },
      validEmail () {
        return new Promise((resolve, reject) => {
          this.$http.post('/api/valid/email', qs.stringify({
              email: this.form.email
            })
          ).then((response) => {
            let res = response.data
            if (res.code === '00000') {
              resolve()
            } else {
              reject(res.message)
            }
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/stylus" lang="stylus">
  @import "../../style/base.styl"
  .register
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 60px;
    padding: 0;
    height: 100%;
    width: 100%;

  .head
    height: 136px;

  .register-panel
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #ccc;
    overflow: auto;

  .logo
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

  .register-panel p
    font-size: 14px;
    color: #a7afb8;

  .register-content
    text-align: center;

  .register-button
    width: 100%;
    height: 46px;
    background-color: $-app-color;
    border-color: #337ab7;
    color: white

  .other-button
    width: 100%;
    height: 46px;

  .other-button
    p
      font-size: 16px;

  .register-text
    font-size: 16px;
    font-weight: 500;

  .captcha-btn
    display: block;
    font-size: 14px;
    font-weight: 400;
    background-color: #F5FBFF;
    color: #107ACB;
    height: 48px;
    line-height: 48px;
    width: 100%;
    border: 1px solid #e4e5e7;
    border-left: none;
    cursor: pointer;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;

  .form-focus:hover .drop-menu
    display: block;

  .form-focus
    position: relative;

  .drop-menu
    display: none;
    min-height: 300px;
    width: 100%;
    font-size: 16px;
    border: 1px solid #eee;
    border-radius(6px)
    position: relative;
    text-align: start;

  .tag-a
    color: #337ab7;

  .time
    color: #a7afb8;

</style>
