<template>
  <div id="search">
    <div class="search" :class="{'box-shadow': showBorder}">
      <input type="text" :placeholder="placeholder" :value="currentValue" @input="handleInput">
      <Icon :type="icon" class="search-icon" size="20"></Icon>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索'
      },
      icon: {
        type: String,
        default: 'ios-search'
      },
      value: {
        type: [String, Number],
        default: ''
      },
      showBorder: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    watch: {
      value (val) {
        this.setCurrentValue(val)
      }
    },
    methods: {
      setCurrentValue (value) {
        if (value !== this.currentValue) {
          this.currentValue = value
        }
      },
      handleInput (event) {
        let value = event.target.value
        console.info(value)
        if (this.number) value = Number.isNaN(Number(value)) ? value : Number(value)
        this.$emit('input', value)
        this.setCurrentValue(value)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../style/base.styl";
  .search-icon
    color #bbc7cd
  .search
    display flex
    padding 6px 12px
    align-items center
    min-height  30px
    background #fff
    border-radius 18px
    border-color $-border-color
    overflow hidden
    & > input
      @extends .search-icon
      margin-right 20px
      background none
      border none
      font-size $-base-font-size
      outline none
      &:focus,&:focus + .search-icon
        color #555
  .box-shadow
    box-shadow inset 0 1px 1px rgba(0, 0, 0, .075);
</style>
