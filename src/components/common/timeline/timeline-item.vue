<template>
  <li class="timeline-item">
    <div class="timeline-head">
      <slot name="head">
        <!--<Icon type="ios-people"></Icon>-->

      </slot>
    </div>
    <div class="timeline-content">
      <slot>
      </slot>
    </div>
    <div class="timeline-line">
    </div>
  </li>
</template>

<script>
  export default {
    name: 'timeline-item',
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
    .timeline-item
      display flex
      flex-direction row
      justify-content flex-start
      width 100%
      position relative
      padding-bottom 50px
      &:last-child .timeline-line
        display none
      .timeline-line
        position absolute
        left 26px
        height 100%
        border-left 2px solid #eee
        z-index 3
      .timeline-head
        position absolute
        left 10px
        height 32px
        width 32px
        border-radius 50%
        background #fff
        z-index 4
        display flex
        justify-content center
        align-items center
      .timeline-content
        margin-left 50px
        width 100%

</style>
