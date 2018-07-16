<template>
  <div class="table-filter-select" v-clickoutside="hideDrop">
    <Button type="text" class="btn-divider" size="small" @click="showDrop">
      <Icon type="funnel" size="14"></Icon>
    </Button>
    <transition name="fade">
      <ul class="drop-down" v-show="dropShow">
        <li class="drop-label">
          <span>选择排序方式</span>
        </li>
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script>
  import clickoutside from '../../../../directive/clickoutside'
  import Emitter from '../../../../../static/js/emitter'

  export default {
    name: 'table-filter-select',
    mixins: [Emitter],
    props: {
      selectedValue: {

      },
      sort: {

      }
    },
    watch: {
      selectedValue(v) {
      },
      sort(s) {
      }
    },
    data () {
      return {
        dropShow: false
      }
    },
    directives: {clickoutside},
    mounted () {
      this.$on('update-select-notify', selectValue => {
        console.info(selectValue)
        this.broadcast('table-filter-option', 'selected', selectValue)
      })

      this.$on('option-selected', (selectValue, asc) => {
        this.$emit('on-selected', selectValue, asc ? 'asc' : 'desc')
      })
      this.broadcast('table-filter-option', 'selected', this.selectedValue)
    },
    methods: {
      showDrop () {
        this.dropShow = true
      },
      hideDrop () {
        this.dropShow = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">

  .table-filter-select
    position relative
    .btn-divider
      border-right 1px solid #dee2e6
      border-radius 0
      width 48px
    .drop-down
      position absolute
      display block
      right 0
      padding-top 10px
      padding-bottom 10px
      background #fff
      border-radius 3px
      border 1px solid #ccc
      box-shadow: 0 6px 12px rgba(0, 0, 0, .175)
      z-index 1000
      min-width 160px
      font-size 13px
      .drop-label
        width 100%
        font-size 12px
        color #777
        overflow hidden
        padding 5px 10px

</style>
