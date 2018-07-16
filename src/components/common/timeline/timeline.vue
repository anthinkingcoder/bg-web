<template>
  <div>
    <ul class="timeline">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  //  import emitter from '/static/js/emitter'
  export default {
    name: 'timeline',
    data () {
      return {}
    },
    mounted () {
      this.$nextTick(() => {
        let timeLineItemLength
        if (this.$children) {
          timeLineItemLength = this.$children.filter((item) => {
            return item.$options.name === this.$options.name
          })
        }
        console.info(timeLineItemLength)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .timeline
    padding 10px
    position relative
</style>
