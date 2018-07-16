<template>
  <ul class="emoji-list">
    <a   class="emoji-item" v-for="(item,index) in emojiList" :key="item.index" @click="select(index)">
      <li>
        <span >{{item}}</span>
      </li>
    </a>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        emojiList: ['😏', '😂', '😱', '😭', '😘', '😳', '😏', '😄', '😔',
          '😉', '😜', '😁', '😝', '😰', '😓', '😌', '😊', '👍', '💪', '👏']
      }
    },
    methods: {
      select (index) {
        this.$emit('emoji-select', this.emojiList[index])
        console.info(this.emojiList[index])
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .emoji-list
    width:160px
    display flex
    flex-direction row
    flex-wrap wrap
    .emoji-item
      display inline-block
      font-size 24px
      width 25%
      height 40px
      line-height 40px
      text-align center
      vertical-align middle
</style>
