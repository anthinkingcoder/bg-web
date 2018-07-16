<template>
  <transition name="fade">
    <ul class="at-list">
      <a v-for="(item,index) in users" :key="index" v-show="item.visible">
        <li class="at-list-item" @click="selectAtList(index)">
          <Avatar :src="item.avatar" slot="head"></Avatar>
          <span>{{item.username}}</span>
        </li>
      </a>
    </ul>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        users: [
          {
            'avatar': '/static/img/avatar/avatar1.jpg',
            'username': 'zhoulin'
          },
          {
            'avatar': '/static/img/avatar/avatar2.jpg',
            'username': '可笑的霸王'
          },
          {
            'avatar': '/static/img/avatar/avatar1.jpg',
            'username': '周晟成'
          },
          {
            'avatar': '/static/img/avatar/avatar2.png',
            'username': '可笑的虞姬'
          },
          {
            'avatar': '/static/img/avatar/avatar3.png',
            'username': '可笑的刘邦'
          }
        ]
      }
    },
    mounted () {
      // 过滤匹配
      this.$on('search', (content) => {
        console.info(typeof content)
        if (content && content.length > 0) {
          this.users = this.users.filter((item) => {
            if (item.username && item.username.indexOf(content) !== -1) {
              item.visible = true
              console.info(item.username)
            } else {
              item.visible = false
            }
            return true
          })
        } else {
          this.users = this.users.filter(item => {
            item.visible = true
            return true
          })
        }
      })
    },
    methods: {
      selectAtList (index) {
        console.info(this.users[index].username)
        this.$emit('at-select', this.users[index].username)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../style/base.styl"
  .at-list
    position absolute
    top 0
    left 0
    transform translate(0, -100%)
    width 200px
    max-height 400px
    overflow scroll
    border-radius 3px
    background-color $-app-color
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175)
    z-index 1000
    .at-list-item
      padding 10px
      color #fff
    a
      &:last-child .at-list-item
        border-bottom none
  .at-text
    color $-app-color
</style>
