<template>
  <div class="head">
    <Row class-name="full-height" type="flex" justify="center">
      <Col :md="16" :xs="12" class="full-height">
      <Row type="flex" justify="start" class-name="full-height">
        <Col :md="4" :xs="22" class="full-height">
        <Logo page="/" height="48"></Logo>
        </Col>
      </Row>
      </Col>
      <Col :md="8" :xs="12" class="full-height">
      <Row type="flex" justify="end" class-name="full-height">
        <Col :md="5" :xs="10" class="full-height ver-middle">
        <Button n @click="login" shape="circle">登录</Button>
        </Col>
        <Col :md="5" :xs="10" class="full-height ver-middle" style="margin-left: 3px">
        <Button type="ghost" class="default-button" @click="register" shape="circle">注册</Button>
        </Col>
      </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  import Logo from './logo.vue'

  export default {
    data () {
      return {}
    },
    components: {
      Logo
    },
    methods: {
      login () {
        location.href = '/login'
      },
      register () {
        location.href = '/register'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head {
    width: 100%;
    height: 64px;
    background-color: #fff;
    padding-left: 16px;
    padding-right: 16px;
  }

  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 5px;
  }
</style>
