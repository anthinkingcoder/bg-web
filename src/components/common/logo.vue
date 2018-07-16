<template>
  <div class="logo" :style="{'height': height + 'px'}">
    <a :href="page"><img src="/static/img/logo.png" :height="height"></a>
  </div>
</template>

<script>
  export default {
    props: {
      page: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 54
      }
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .logo
    display flex;
    align-items center;
    justify-content center;
    flex-direction row;
    a
      display block
      height 100%
    img
      max-width 100%
      max-height 100%


</style>
