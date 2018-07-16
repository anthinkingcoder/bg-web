<template>
  <li class="drop-list-item" @click="selectIndex"
  >
    <slot><span>{{showLabel}}</span></slot>
    <Icon :type="asc ? 'arrow-up-c' : 'arrow-down-c'" v-show="selected"></Icon>
  </li>
</template>

<script>
  import Emitter from '../../../../../static/js/emitter'

  export default {
    name: 'table-filter-option',
    props: {
      value: {},
      label: {}
    },
    computed: {
      showLabel () {
        return (this.label) ? this.label : this.value
      }
    },
    mixins: [Emitter],
    mounted () {
      this.$on('selected', (selectValue) => {
        if (selectValue === this.value) {
          if (this.selected) {
            this.asc = !this.asc
          } else {
            this.selected = true
          }
          this.dispatch('table-filter-select','option-selected', [selectValue,this.asc])
        }else if(this.selected) {
          this.selected = false;
          this.asc = true;
        }
      })
    },
    data () {
      return {
        selected: false,
        index: 0,
        asc: true
      }
    },
    methods: {
      selectIndex () {
        console.info('se')
        this.dispatch('table-filter-select', 'update-select-notify', this.value)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .drop-list-item
    display flex
    align-items center
    justify-content space-between
    cursor pointer
    font-weight: 400;
    line-height: 1.42857143;
    color: #333
    padding 5px 10px
    &:hover
      background #145587
      color #fff
</style>
