<template>
  <div>
    <Card class="question-sta">
      <p slot="title">
        <Icon type="document-text">
        </Icon>
        问题
      </p>

      <div class="question-sta-content">
        <Row type="flex" :justify="justify" :gutter="12">
          <Col :span="column" class="question-sta-list-item" v-for="(item,index) in list" :key="item.status">
          <p class="question-sta-list-item-num" :style="{color:item.color}">{{item.num}}</p>
          <p class="question-sta-list-item-tag">{{item.name}}</p>
          <br v-if="index !== 0 && index % 2 === 0">
          </Col>
        </Row>
      </div>
    </Card>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
  export default {
    props: {
      col: {
        type: Number,
        default: 3
      },
      justify: {
        type: String,
        default: 'start',
        validator (val) {
          return val === 'start' || val === 'center' || val === 'end'
        }
      }
    },
    created () {

    },
    watch: {
      '$route.query': 'listQuestionStatusCount'
    },
    data () {
      return {
        spinShow:false,
        column: parseInt(24 / this.col),
        list: []
      }
    },
    methods: {
      listQuestionStatusCount () {
        this.spinShow = true
        this.$http.get('/api/sta/listQuestionStatusCount', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          this.list = data.data
          this.spinShow = false
        }).catch(e => {
          this.spinShow = false
          this.$Message.error(e.data.data)
        })
      }
    },
    mounted () {
      this.listQuestionStatusCount()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/project/project.styl"
  .question-sta
    .question-sta-content
      height 100%
      overflow scroll
      padding 20px 10px
      .question-sta-list
        display flex
        flex-wrap wrap
        flex-direction row
      .question-sta-list-item
        text-align center
        margin-top 10px
        .question-sta-list-item-num
          font-size 36px
          cursor pointer
        .question-sta-list-item-tag
          color #777
</style>
