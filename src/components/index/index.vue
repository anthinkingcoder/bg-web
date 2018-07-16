<template>
  <div class="index">
    <div class="head">
      <Row class-name="full-height" type="flex" justify="start">
        <Col :md="16" class="full-height" :xs="20">
        <Row type="flex" justify="start" class-name="left-head">
          <Col :md="4" :xs="13" class="full-height">
          <Logo page="/" height="50"></Logo>
          </Col>
          <Col :md="2" v-for="(item,index) in menus" :key="item.value" class="full-height" style="text-align: center"
               :xs="0">
          <span :class="{'tab-select': index === menusIndex,'tab': index !== menusIndex}"><a @click="menuSelect(index)">{{item.label}}</a></span>
          </Col>
        </Row>
        </Col>
        <Col :md="8" class="full-height" :xs="0">
        <Row type="flex" justify="end" class-name="full-height">
          <Col :md="5" :xs="10" :sm="5" class="full-height ver-middle">
          <Button type="ghost" @click="login" shape="circle">登录</Button>
          </Col>
          <Col :md="5" :xs="10" class="full-height ver-middle">
          <Button type="ghost" class="default-button" @click="register" shape="circle">注册</Button>
          </Col>
        </Row>
        </Col>
        <Col :md="0" :xs="4" class="text-al-c margin-top-15">
        <Button type="primary" @click="nav">
          <Icon type="navicon-round"></Icon>
        </Button>
        </Col>
      </Row>
    </div>
    <!--移动端适配-->
    <transition name="nav-xs">
      <div class="nav-xs" v-show="navVisible">
        <Row type="flex" justify="center">
          <Col v-for="(item,index) in menus" :key="item.value" class="full-height" style="text-align: center" :xs="24"
               :md="0">
          <span :class="{'tab-select': index === menusIndex,'tab': index !== menusIndex}"><a @click="menuSelect(index)">{{item.label}}</a></span>
          </Col>
          <Col :xs="24" :md="0" class="text-al-c mb-20 margin-top-20">
          <Button type="ghost" @click="login" shape="circle">登录</Button>
          </Col>

          <Col :xs="24" :md="0" class="text-al-c">
          <Button type="ghost" class="default-button" @click="register" shape="circle">注册</Button>
          </Col>
        </Row>
      </div>
    </transition>

    <div class="content">
      <div class="content-head">
        <div class="content-head-title-box">
          <Row type="flex" justify="center">
            <Col :md="16" :xs="23">
            <p class="content-head-title">用最优雅的方式追踪 Bug</p>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col :md="10" :xs="22">
            <p class="content-head-summary">简洁、高效的追踪 Bug，轻量、便捷的项目管理，免费、无限制空间放心使用，
              完美地将 Bug管理与团队协作结合在一起。
              项目管理，本就是一种优雅的艺术。</p>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col :md="12" class="margin-top-40" :xs="20">
            <Row type="flex" justify="center">
              <Col span="16" style="height: 48px">
              <input type="text" placeholder="输入邮箱" class="form-control r-border-h"/>
              </Col>
              <Col :md="4" style="height: 48px" :xs="8">
              <div style="height: 100%">
                <span type="success" class="primary-btn l-border-h">免费开始使用</span>
              </div>
              </Col>
            </Row>
            </Col>
          </Row>
        </div>

      </div>

      <div style="width: 100%">
        <div class="content-head-title-box">
          <Row type="flex" justify="center">
            <Col :md="16" :xs="23">
            <p class="content-head-title">一个平台满足更多功能</p>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col :md="12" :xs="22">
            <p class="content-head-other-summary">
              无论是修改 Bug，还是新增一个功能，我们都可以为您提供最理想的工作云平台。便捷的团队协作，轻量的项目管理， 完备的问题系统，大容量的文件存储，都是为让你更加优雅高效的工作。</p>
            </Col>
          </Row>
        </div>
        <br>
        <br>
        <br>
        <div class="margin-top-60">
          <Row type="flex" justify="center" :gutter="48">
            <Col :md="6" class="margin-top-40" :xs="22">
            <Row>
              <Col span="24">
              <div class="text-al-r">
                <Row type="flex" justify="center">
                  <Col :md="24">
                  <h5 class="color-333 font-16 text-al-r" style="width: 100%">问题系统</h5>
                  </Col>
                </Row>
                <p class="color-gray margin-top-20 lh-185 text-al-r">
                  灵活、多样化的对问题进行管理。触手可及的创建。多种状态，类型，优先级等属性更加直接的链接问题。随时随地添加评论和追踪问题的进度。</p>
              </div>
              </Col>
            </Row>
            <Row>
              <br>
              <Col span="24">
              <div>
                <Row type="flex" justify="center">
                  <Col :md="24">
                  <h5 class="color-333 font-16 text-al-r" style="width: 100%">项目管理</h5>
                  </Col>
                </Row>
                <p class="color-gray margin-top-20 lh-185 text-al-r">
                  轻量级的项目管理，只需要一个邮箱就可以在平台创建项目，管理项目。统计、动态、成员、问题都将一览无余，不同的颜色也为项目管理增加几分色彩。</p>
              </div>
              </Col>
            </Row>
            <br>
            <Row>
              <Col span="24">
              <div>
                <Row type="flex" justify="center">
                  <Col :md="24">
                  <h5 class="color-333 font-16 text-al-r" style="width: 100%">数据统计</h5>
                  </Col>
                </Row>
                <p class="color-gray margin-top-20 lh-185 text-al-r">
                  一份好的统计图是大多数项目出彩的重点，也是管理者和使用对项目进度最直观的把握。常用统计，让您可以一目了然的查看问题状态和完成情况。</p>
              </div>
              </Col>
            </Row>
            <br>
            <br>
            </Col>
            <Col :md="5" :xs="18">
            <div class="content-center">
              <div class="margin-top-40 mb-40">
                <h5 class="font-18 color-gray">Bug管理</h5>
              </div>
              <div class="content-center-item ">
                <Row type="flex" justify="center">
                  <Col span="24" class="middle">
                  <img src="/static/img/home-project-mgr.png" style="max-width: 28px;max-height: 28px">
                  <span class="pl-15">项目管理</span>
                  </Col>
                </Row>
              </div>
              <div class="content-center-item">
                <Row type="flex" justify="center">
                  <Col span="24" class="middle">
                  <img src="/static/img/home-file-share.png" style="max-width: 28px;max-height: 28px">
                  <span class="pl-15">文件共享</span>
                  </Col>
                </Row>
              </div>

              <div class="content-center-item">
                <Row type="flex" justify="center">
                  <Col span="24" class="middle">
                  <img src="/static/img/home-plug-in.png" style="max-width: 28px;max-height: 28px">
                  <span class="pl-15">插件系统</span>
                  </Col>
                </Row>
              </div>

              <div class="content-center-item">
                <Row type="flex" justify="center">
                  <Col span="24" class="middle">
                  <img src="/static/img/home-data-stats.png" style="max-width: 28px;max-height: 28px">
                  <span style="padding-left: 15px">数据统计</span>
                  </Col>
                </Row>
              </div>
              <br>
            </div>
            </Col>

            <Col :md="6" class="margin-top-40" :xs="22">
            <Row>
              <Col span="24">
              <div class="text-al-l">
                <Row type="flex" justify="center">
                  <Col :md="24">
                  <h5 class="color-333 font-16">文件共享</h5>
                  </Col>
                </Row>
                <p class="color-gray margin-top-20 lh-185">
                  无限制的文件共享是我们给所有用户的福利。高速的上传，无空间的限制，给你的项目足够的空间进行文件共享，在云端查看文件，让您随时随地查阅文件。</p>
              </div>
              </Col>
            </Row>
            <Row>
              <br>
              <Col span="24">
              <div class="text-al-l">
                <Row type="flex" justify="center">
                  <Col :md="24">
                  <h5 class="color-333 font-16">插件系统</h5>
                  </Col>
                </Row>
                <p class="color-gray margin-top-20 lh-185">
                  小小的插件，大大的用途。我们针对不同的浏览器制作了提出问题的插件，直接在网页内进行截图，我们会将截图创建成为问题直接建立在您的账户中。</p>
              </div>
              </Col>
            </Row>
            <br>
            <Row>
              <Col span="24">
              <div class="text-al-l">
                <Row type="flex" justify="center">
                  <Col :md="24">
                  <h5 class="color-333 font-16">团队协作</h5>
                  </Col>
                </Row>
                <p class="color-gray margin-top-20 lh-185">
                  云端的协作解决了协同办公、异地办公的大麻烦。高效的交流和项目的实时跟踪，让天涯海角的成员都可以无缝的合作，更加便捷和高效的工作方式。</p>
              </div>
              </Col>
            </Row>
            </Col>
          </Row>
        </div>
      </div>
      <br>
      <hr>
      <div style="width: 100%">
        <div class="content-head-title-box">
          <Row type="flex" justify="center">
            <Col :md="16" :xs="23">
            <p class="content-head-title">拓展更多可能性</p>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col :md="12" :xs="20">
            <p class="content-head-other-summary">
              我们提供了更多极客式的工作方式，链接常用的代码仓库，将问题和版本结合在一起。开放的 API 接口也为您提供了更多灵活使用的可能性。一个平台，拓展无限的使用可能。</p>
            </Col>
          </Row>
        </div>
        <br>
        <div class="margin-top-60 mb-40">
          <Row type="flex" justify="center" :gutter="48">
            <Col :md="8" :xs="20" class="mb-60">
            <div class="expand-item">
              <div class="expand-item-extra expand-item-extra-bg-cube">
                <img src="/static/img/home-cube.png">
              </div>
              <Row>
                <br>
                <Col span="24" style="padding-left: 115px">
                <div class="text-al-l">
                  <h5 class="color-333 font-18 weight-normal color-333">项目仓库</h5>
                  <p class="color-gray margin-top-20 lh-185">我们支持将 Github 和 Bitbucket 的项目在 Tracup 上同步版本控制，并可以获取到 Issues
                    通知和 Webhook 相关设置。</p>
                </div>
                </Col>
              </Row>
            </div>
            </Col>
            <Col :md="8" :xs="20">
            <div class="expand-item">
              <div class="expand-item-extra expand-item-extra-bg-api">
                <img src="/static/img/home-api.png">
              </div>
              <Row>
                <br>
                <Col span="24" style="padding-left: 115px">
                <div class="text-al-l">
                  <h5 class="color-333 font-18 weight-normal color-333">开放api</h5>
                  <p class="color-gray margin-top-20 lh-185">利用 Tracup 的 API 做更多的功能拓展。我们对用户开放了 API
                    体系，可以通过直接调用我们的接口来灵活的使用。</p>
                </div>
                </Col>
              </Row>
            </div>
            </Col>
          </Row>
        </div>
      </div>
      <br>
      <div class="content" style="background: #f2f2f2;">
        <div class="content-head-title-box">
          <Row type="flex" justify="center">
            <Col :md="16" :xs="23">
            <p class="content-head-title">安全保障，放心使用</p>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col :md="12" :xs="20">
            <p class="content-head-other-summary">
              基于云平台的服务，我们更加重视产品的安全性能。每一份数据都做了严格的加密和多种场景的备份，高防危机发生。出现数据问题及时进行恢复，让数据在云端更加安全。</p>
            </Col>
          </Row>
        </div>
        <br>
        <br>
        <div class="margin-top-40 mb-40">
          <Row type="flex" justify="center" :gutter="40">
            <Col :md="4" :xs="20" class="mb-40">
            <div class="card-item box-shadow">
              <Row type="flex" justify="center">
                <Col :md="24" :xs="16" class="middle">
                <img src="/static/img/home-stable.png" style="max-width: 50px">
                </Col>
              </Row>
              <h5 class="text-al-c mb-20 font-18 weight-normal color-333">稳定</h5>
              <p class="color-gray lh-185 text-al-j">云盘数据可靠性99.99%，
                自动宕机迁移，自动多线路备份，数据恢复安全方便。</p>
            </div>
            </Col>
            <Col :md="4" :xs="20" class="mb-40">
            <div class="card-item card-item-long box-shadow">
              <Row type="flex" justify="center">
                <Col :md="24" :xs="16" class="middle">
                <img src="/static/img/home-security.png" style="max-width: 50px">
                </Col>
              </Row>
              <h5 class="text-al-c mb-20 font-18 weight-normal color-333">安全</h5>
              <p class="color-gray lh-185 text-al-j">数据传输和存储都进行了严格的加密
                高防服务器，Web防火墙、防暴力破解技术确保数据安全。</p>
            </div>
            </Col>

            <Col :md="4" :xs="20" class="mb-40">
            <div class="card-item box-shadow">
              <Row type="flex" justify="center">
                <Col :md="24" :xs="16" class="middle">
                <img src="/static/img/home-protect.png" style="max-width: 50px">
                </Col>
              </Row>
              <h5 class="text-al-c mb-20 font-18 weight-normal color-333">保障</h5>
              <p class="color-gray lh-185 text-al-j">数据永久保存不丢失，
                可持续为业务发展提供完整的存储、安全解决方案，出现问题及时恢复。</p>
            </div>
            </Col>
          </Row>
        </div>
      </div>
      <div style="width: 100%">
        <div class="content-head-title-box">
          <Row type="flex" justify="center">
            <Col :md="16" :xs="22">
            <p class="content-head-title">细致铸造品质</p>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col :md="12" :xs="20">
            <p class="content-head-other-summary">
              我们在产品细节上做了更多的处理，不断地进行产品体验优化，在操作流程上更加简便的处理，在技术上更加有保障的实施。我们从细节苛求产品给每一位用户的承诺。</p>
            </Col>
          </Row>
        </div>
        <div class="mb-20 margin-top-60">
          <Row type="flex" justify="center" :gutter="40">
            <Col :md="4" :xs="16" class="margin-right-20">
            <div>
              <Row type="flex" justify="center">
                <Col :md="24" :xs="14" class="middle">
                <img src="/static/img/home-concise.png" style="max-width: 110px">
                </Col>
              </Row>
              <br>
              <h5 class="text-al-c mb-20 font-18 weight-normal color-333">简洁方便</h5>
              <p class="color-gray lh-185 text-al-j">零技术门槛，注册完成即可上手使用，帮您去除繁琐，我们只为更简单。</p>
              <br>
            </div>
            </Col>
            <Col :md="4" :xs="16" class="margin-right-20">
            <div>
              <Row type="flex" justify="center">
                <Col :md="24" :xs="14" class=" middle">
                <img src="/static/img/home-cloud.png" style="max-width: 110px">
                </Col>
              </Row>
              <br>
              <h5 class="text-al-c mb-20 font-18 weight-normal color-333">云端操作</h5>
              <p class="color-gray lh-185 text-al-j">无需进行部署，所有的操作和项目都在云端进行。不懂技术也可以立即拥有。</p>
            </div>
            <br>
            </Col>
            <Col :md="4" :xs="16" class="margin-right-20">
            <div>
              <Row type="flex" justify="center">
                <Col :md="24" :xs="14" class="middle">
                <img src="/static/img/home-service.png" style="max-width: 110px">
                </Col>
              </Row>
              <br>
              <h5 class="text-al-c mb-20 font-18 weight-normal color-333">在线解答</h5>
              <p class="color-gray lh-185 text-al-j">在您使用的过程中遇见任何问题，都可以在工单系统中提问。我们会及时为您答疑。</p>
            </div>
            </Col>
          </Row>
        </div>
      </div>
      <!--底部-->
      <div class="footer">
        <Row type="flex" justify="center">
          <Col :md="24" :xs="22" class="middle">
          <span class=" font-14">BugFB Copyright © 2016-2017 霸王科技 湘ICP备15010407号</span>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '../common/logo.vue'

  export default {
    data () {
      return {
        menusIndex: 0,
        navVisible: false,
        menus: [
          {
            label: '首页'
          },
          {
            label: '功能'
          },
          {
            label: '文档'
          },
          {
            label: '价格'
          },
          {
            label: 'SDK'
          }
        ]
      }
    },
    methods: {
      menuSelect (index) {
        this.menusIndex = index
      },
      login () {
        location.href = '/login'
      },
      register () {
        location.href = '/register'
      },
      nav () {
        this.navVisible = !this.navVisible
      }
    },
    components: {
      Logo
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .index {
    background: #fff;
    overflow-x: hidden;
    /*padding-top: 200px;*/
  }

  .head {
    width: 100%;
    height: 64px;
    background-color: #fff;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
  }

  .nav-xs {
    width: 100%;
    height: 450px;
    overflow: hidden;
    background-color: #fff;
  }

  .left-head {
    width: 100%;
    height: 100%;
  }

  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  }

  .tab, .tab-select {
    height: 100%;
    line-height: 64px;
    font-size: 14px;
    font-weight: bold !important;
    text-align: center;
  }

  .tab a {
    color: #90a0a5;
  }

  .tab a:hover {
    color: #2b3134;
  }

  .tab-select a {
    color: #2b3134;
  }

  .content-head {
    width: 100%;
    height: 450px;
    text-align: center;
    background-image: url(/static/img/home-bg.png);
    background-size: cover;
    background-position: center;
  }

  .content {
    width: 100%;
    height: auto;
    overflow-x: hidden;
  }

  .content-head-title-box {
    width: 100%;
    height: 200px;
    line-height: 100px;

  }

  .content-head-title {
    font-size: 33px;
    font-weight: 300;
    color: #333333 !important;
    margin-top: 30px;
    text-align: center;
  }

  .content-head-summary {
    width: 100%;
    line-height: 1.497;
    font-size: 16px;
    font-weight: 400;
    color: #666666
  }

  .content-head-other-summary {
    width: 100%;
    line-height: 1.497;
    font-size: 16px;
    font-weight: 400;
    color: #878f92 !important;

  }

  .footer {
    width: 100%;
    height: 64px;
    background: #EFF3F6;
    text-align: center;
    color: #999;
  }

  .content-center {
    border-radius: 6px;
    width: 100%;
    background-color: rgb(255, 255, 255);
    /*-webkit-box-shadow: 1px 1px 0px 2px rgba(0,0,0,.1);*/
    /*box-shadow: 1px 1px 0px 2px rgba(0,0,0,.1);*/
    box-shadow: 0 4px 36px 0 rgba(27, 27, 27, 0.14);
    overflow: auto;
    display: flex;

    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }

  .content-center-item {
    width: 75%;
    border-radius: 6px;
    border: 1px solid #eee;
    height: 64px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 15px;
    color: #878f92
  }

  .expand-item-extra {
    width: 110px;
    height: 170px;
    position: absolute;
    left: 0;
    top: -30px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .expand-item-extra-bg-api {
    background-image: -webkit-linear-gradient(90deg, rgb(116, 227, 191) 0%, rgb(159, 250, 221) 100%);
  }

  .expand-item-extra-bg-cube {
    background-image: -webkit-linear-gradient(90deg, rgb(94, 194, 252) 0%, rgb(139, 212, 255) 100%);

  }

  .expand-item-extra img {
    display: block;
    max-width: 90px;
    vertical-align: middle;
  }

  .expand-item {
    width: 100%;
    height: 250px;
    box-shadow: 0 4px 34px 0 rgba(27, 27, 27, 0.14);
    position: relative;
  }

  .card-item {
    width: 100%;
    height: 380px;
    background-color: #fff;
    border-radius: 6px;
    padding: 30px 30px 20px 30px;
  }

  .card-item-long {
    height: 400px;
  }

  .card-item-img {
    margin-left: 8px;
  }

  .card-item-big-img {
    margin-left: 14px;
  }

  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
  }

  .start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 64px;
  }

  .nav-hover:hover {
    color: #107ACB;
  }

  .nav-xs-leave-active, .nav-xs-enter-active {
    transition: height 0.5s ease-in;
  }

  .nav-xs-leave-active, .nav-xs-enter {
    height: 0 !important;
  }

  .nav-xs-leave, .nav-xs-enter-active {
    height: 450px;
  }

</style>
