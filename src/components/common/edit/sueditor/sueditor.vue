<template>
  <div class="sueditor">
    <div class="sueditor-read" v-if="!writeSwitch" >
      <div class="sueditor-read-text" @click="toggleModel" :style="styles" ref="sueditorReadText" v-html="uContent">

      </div>
      <div class="sueditor-read-more">
        <a class="show-more" type="text" v-show="moreSwitch && !isMore" @click="toggleMore" >展开更多</a>
        <a class="show-more" type="text" v-show="moreSwitch && isMore" @click="closeMore">收起</a>
      </div>
    </div>
    <div class="sueditor-write" v-else>
      <Ueditor :config="config" :value="uContent" ref="ueditor"></Ueditor>
      <div class="sueditor-write-tool">
        <Button type="success" icon="checkmark" @click="submitContent" class="sueditor-write-tool-btn"></Button>
        <Button type="primary" icon="close" @click="toggleModel" class="sueditor-write-tool-btn"></Button>
      </div>
    </div>
  </div>
</template>
<script>
  import Ueditor from '../../ueditor/ueditor.vue'

  export default {
    props: {
      height: {
        type: Number,
        default: 200
      },
      content: {
        type: String
      }
    },
    components: {
      Ueditor
    },
    watch: {
      content () {
        this.uContent = this.content;
      }
    },
    data () {
      return {
        writeSwitch: false,
        isMore: false,
        styles: {
          'max-height': this.height + 'px'
        },
        moreSwitch: false,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 320
        },
        uContent: this.content
      }
    },
    methods: {
      submitContent () {
        this.uContent = this.$refs.ueditor.getContent()
        this.$emit('content-update', this.uContent)
        this.toggleModel()
      },
      toggleModel () {
        this.writeSwitch = !this.writeSwitch
      },
      toggleMore () {
        this.isMore = true
        this.styles = {}
      },
      closeMore () {
        this.isMore = false
        this.styles = {
          'max-height': this.height + 'px'
        }
        console.info(this.$refs.sueditorReadText.style)
      },
      getContent () {
        return this.$refs.ueditor.getContent()
      }
    },
    mounted () {
      let textHeight = this.$refs.sueditorReadText.offsetHeight
      if (textHeight >= this.height) {
        this.moreSwitch = true
      } else {
        this.moreSwitch = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">

  .sueditor
    width 100%
    .sueditor-read
      padding 5px
      .show-more
        margin-top 10px
      .sueditor-read-text
        width 100%
        font-size 14px
        color black
        background-color #fff
        padding 5px 20px
        margin-bottom 10px
        cursor text
        outline none
        word-wrap:break-word;
        overflow hidden
        border-radius 3px
        &:hover
          background-color #b2b2b2
      .sueditor-read-more
        padding 0 20px
    .sueditor-write
      margin-top 10px
      .sueditor-write-tool
        display flex
        margin-top 10px
        width 100%
        justify-content flex-end
        align-items flex-end
        .sueditor-write-tool-btn
          margin-left 5px
</style>
