<template>
  <div ref="editor">
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    data() {
      return {
        id: 'marketform' + (new Date() - 0) + Math.random() * 100
      }
    },
    props: {
      value: {
        type: String,
        default: null,
      },
      value2: {
        type: String,
        default: null,
      },
      config: {
        type: Object,
        default: {},
      }
    },
    methods: {
      setContent(content) {
        this.$nextTick(() => {
          this.editor = UE.getEditor(this.id, this.config)
          this.editor.setContent(content)
        })
      },
      getContent() {
        return this.editor.getContent()
      },
      getPlainTxt () {
        return this.editor.getPlainTxt()
      },
      cleanContent() {
        return this.editor.reset()
      }
    },
    watch: {
      value: function value(val, oldVal) {
        this.editor = UE.getEditor(this.id, this.config);
        if (val !== null && this.editor) {
          this.editor.setContent(val);
        }
      },
    },
    mounted() {
      this.$nextTick(function f1() {
        this.$refs.editor.id = this.id
        this.editor = UE.getEditor(this.id, this.config)
        this.editor.ready(function f2() {
          this.editor.setContent(this.value)
          if (this.value2) {
            this.editor.setContent(this.value2)
          }
          this.editor.addListener("contentChange", function() {
            const wordCount = this.editor.getContentLength(true)
            const content = this.editor.getContent()
            const plainTxt = this.editor.getPlainTxt()
            this.$emit('input', {
              wordCount: wordCount,
              content: content,
              plainTxt: plainTxt
            })

          }.bind(this))
          this.$emit('ready', this.editor)
        }.bind(this))
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
