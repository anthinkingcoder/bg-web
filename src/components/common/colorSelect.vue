<template>
  <div>
    <input @input="handleInput" hidden/>
    <div class="color-item" :class="{'color-item-select':index == selectIndex}" :style="{background:item}"
         v-for="(item,index) in colors" @click="select(index)">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default: 'small'
      },
      datas: {
        type: Array,
        default: []
      },
      value: {

      }
    },
    computed: {
      colors () {
        return this.datas
      },

    },
    watch: {
      colors (n, o) {
        this.select(0)
      },
      value (v) {
        let index;
        this.datas.forEach((item,i) => {
          if (v === item) {
            index = i;
          }
        })
        this.select(index);
      }
    },
    data () {
      return {
        selectIndex: ''
      }
    },
    methods: {
      handleInput () {

      },
      select (index) {
        this.selectIndex = index
        this.$emit('input', this.datas[index])
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .color-item
    display inline-block
    margin-left 5px
    border-radius 50%
    width 20px
    height 20px
    line-height 20px
    vertical-align middle
    cursor pointer

  .color-item-select
    width: 20px;
    height: 20px;
    border-width: 3px;
    border-style: solid;
    border-color: red;
    border-image: initial;
    border-radius: 17px;

</style>
