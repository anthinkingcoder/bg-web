<template>
  <div class="comment-send-container" :style="styles" v-clickoutside="hideAtList">
    <Row type="flex" justify="start" style="height:100%">
      <Col span="18">
      <textarea class="comment-text-input" :placeholder="placeholder" v-model="content" rows="1"
                ref="textContent" @keyup.enter="publishComment"
                onkeydown="if(event.keyCode == 13) return false" @click="hideAtList"></textarea>

      <AtList ref="atList" @at-select="selectAtList" :style="atListStyle" v-show="atListVisible"></AtList>
      </Col>
      <Col span="3" class="comment-plump-tool">
      <a>
        <Icon type="android-attach" :size="20"></Icon>
      </a>

      <a @click="at">
        <Icon type="at" :size="20"></Icon>
      </a>


      <!-- 表情-->
      <Tooltip placement="top" style="background-color: #fff">
        <Emoji slot="content" @emoji-select="emojiSelect">
        </Emoji>
        <a>
          <Icon type="android-happy" :size="20"></Icon>
        </a>
      </Tooltip>
      </Col>
      <Col span="2" class="comment-btn-box">
      <Button type="primary" icon="android-send" class="comment-btn comment-send-btn" @click="publishComment">发布
      </Button>
      </Col>

      <Col span="1" class="comment-btn-box">
      <Button type="primary" icon="chevron-down" class="comment-btn comment-send-more-btn"></Button>
      </Col>
    </Row>


  </div>
</template>
<script>
  import autosize from 'autosize'
  import Emoji from './emoji.vue'
  import clickoutside from '../../../directive/clickoutside'
  import AtList from './at_list.vue'
  //  const MAX_ROW = 5
  import qs from 'qs'
  export default {
    directives: {
      clickoutside
    },
    components: {
      Emoji,
      AtList
    },
    props: {
      question_id: {

      },
      left: {
        type: [Number, String],
        default: 0
      },
      elWidth: {
        type: [Number, String],
        default: '100%'
      },
      placeholder: {
        type: String,
        default: '@提及他人, 按Enter快速发布'
      },
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        styles: {
          left: this.left,
          width: this.elWidth
        },
        content: this.value,
        textContentStyles: '',
        atListVisible: false,
        atListStyle: ''
      }
    },
    watch: {
      left (val) {
        this.styles.left = val
      },
      content (val) {
        this.$nextTick(() => {
          let cursorPosition = this.$refs.textContent.selectionStart
          let position = this.getLastAtPosition(val, cursorPosition)
          console.info(position)
          if (position !== -1) {
            this.showAtList(position)
          } else {
            this.focusTextContent()
          }
          this.$refs.atList.$emit('search', val.substring(position + 1, cursorPosition))
        })
      }
    },
    mounted () {
      autosize(this.$refs.textContent)
    },
    methods: {
      getLastAtPosition (val, end) {
        return val.substring(0, end).lastIndexOf('@')
      },
      emojiSelect (emoji) {
        this.content += emoji
      },
      publishComment () {
        this.$http.post('/api/project/question/dynamic/comment/create', qs.stringify({
          question_id: this.question_id,
          comment_content: this.content
        })).then(res => {
          let data = res.data
          if (data.code === '00000') {
            this.$Message.success('发表成功')
            this.$emit('content-update', this.content)
            this.content = '';
          } else {
            this.$Message.error(data.message)
          }
        }).catch(e => {
          this.$Message.error(e.data.message)
        })
      },
      at () {
        this.atListVisible = !this.atListVisible
        if (this.atListVisible) {
          this.appendTextContent('@')
          this.setAtListStyle()
        }
      },
      appendTextContent (appendStr) {
        this.content += appendStr
        this.focusTextContent()
      },
      focusTextContent () {
//          this.$refs.textContent.setSelectionRange(this.content.length, this.content.length)
        this.$refs.textContent.focus()
      },
      hideAtList () {
        if (this.atListVisible) {
          this.atListVisible = false
          this.focusTextContent()
        }
      },
      showAtList (position) {
        this.atListVisible = true
        this.setAtListStyle(position)
      },
      setAtListStyle (position) {
        let caret = window.getCaretCoordinates(this.$refs.textContent, position)
        this.$nextTick(() => {
          this.atListStyle = {
            left: `${caret.left}px`
          }
        })
      },
      selectAtList (val) {
        // 将过滤后的val置于@后面
        let cursorPosition = this.$refs.textContent.selectionStart
        let position = this.getLastAtPosition(this.content, cursorPosition)
        let offset = cursorPosition - position - 1
        let contentArray = this.content.split('')
        contentArray.splice(position + 1, offset, val.split('').join('') + ' ')
        this.content = contentArray.join('')
        this.hideAtList()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../style/base.styl"
  .comment-send-container
    position fixed
    bottom 0
    left 0
    width 100%
    border 1px solid #e4e5e7
    border-radius 3px
    background-color #fff
    z-index: 9
    transition left 0.3s ease
    min-height 40px
    .comment-text-input
      cursor text
      outline none
      border none
      overflow hidden
      resize none
      vertical-align middle
      padding 10px
      height 100%
      font-size 14px
      &::-webkit-input-placeholder
        color #b2b2b2
    .comment-plump-tool
      display flex
      justify-content space-around
      align-items center
      padding-right 5px
      padding-left 5px
      height 40px
      a
        margin-left 10px
        vertical-align middle
    .comment-btn-box
      height 40px
      .comment-btn
        width 100%
        height 100%
        border-radius 0
        margin-top -1px
        text-align center
        padding 0
      .comment-send-more-btn
        padding-left 8px
        padding-right 5px
        border-left 2px solid #fff


</style>
