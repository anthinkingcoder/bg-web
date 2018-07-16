<template>
    <div class="loading" v-show="show">
      <Row type="flex" justify="center" align="middle">
        <Col  span="24">
        <Spin fix>
          <Icon type="load-c" size=64 class="demo-spin-icon-load"></Icon>
        </Spin>
        </Col>
        <br>
        <br>
        <br>
        <br>
        <Col span="24">
        <p class="loading-title">正在进入BugFB...</p>
        </Col>
      </Row>
    </div>
</template>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../style/base.styl"
  .demo-spin-icon-load
    animation: ani-demo-spin 1s linear infinite;

  @keyframes ani-demo-spin
    from
      transform: rotate(0deg);

    50%
      transform: rotate(180deg);

    to
      transform: rotate(360deg);


  .loading
    width: 100%;
    height: 100%;
    position absolute;
    left 0;
    top 0;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    z-index 1000;


  .demo-spin-col
    width: 30%;
    height: 200px;

  .loading-title
    font-size: 24px;
    color: $-app-color;


</style>
