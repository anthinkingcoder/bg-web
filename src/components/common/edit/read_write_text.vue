<template>
  <div class="read-write-text">
    <p @click="toggleModel" v-show="isRead" class="read-text" ref="readText">{{text}}</p>
    <div class="write-text" v-show="!isRead">
      <textarea rows="10" v-model="text"></textarea>
      <div class="write-tool">
        <Button type="success" icon="checkmark" @click="submitContent" class="write-tool-btn"></Button>
        <Button type="primary" icon="close" @click="toggleModel" class="write-tool-btn"></Button>
      </div>
    </div>
  </div>
</template>

<script>
  const READ_MODEL = 'read'
  const DEFAULT = 'all'
  export default {
    name: 'readWriteText',
    props: {
      value: {
        type: String
      },
      hoverColor: {
        type: String,
        default: '#b2b2b2'
      },
      maxRow: {
        type: Number,
        default: 1
      },
      model: {
        type: String,
        default: DEFAULT,
        validator (val) {
          return val === READ_MODEL || val === DEFAULT
        }
      }
    },
    data () {
      return {
        isRead: true,
        text: this.value,
        isLimit: false
      }
    },
    methods: {
      toggleModel () {
        if (this.model === READ_MODEL) {
          this.isRead = true
        } else {
          this.isRead = !this.isRead
        }
        console.log(this.isRead, this.isLimit)
        if (this.isLimit || !this.isRead) {
          this.$nextTick(() => {
            this.cancelLimit()
          })
        } else {
          this.$nextTick(() => {
            this.limit()
          })
        }
      },
      submitContent () {
        this.$emit('input', this.text)
        this.toggleModel()
      },
      cancelLimit () {
        this.text = this.value
        this.isLimit = false
      },
      limit () {
        if (this.text) {
          let row = (this.$refs.readText.offsetHeight - 10) / 20
          console.info(row)
          if (row > this.maxRow) {
            this.isLimit = true
            let singleRowWords = this.text.length / row
            this.text = this.text.substring(0, singleRowWords * this.maxRow) + '...'
          }
        }
      }
    },
    mounted () {
      this.limit()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">

  .read-write-text
    p
      outline none
      padding 5px
      line-height 20px
      cursor pointer
      &:hover
        background-color #b2b2b2
    textarea
      outline none
      border 1px solid #eee
      font-size 12px
      overflow scroll
      resize none
    .write-text
      .write-tool
        display flex
        justify-content flex-end
        align-items center
        .write-tool-btn
          margin-left 5px

</style>
