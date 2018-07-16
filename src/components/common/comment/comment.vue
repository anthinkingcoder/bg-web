<template>
  <div class="comment" :style="{'height': commentHeight}">
    <!--发表评论 -->
    <!--<p class="comment-more"><a><strong>显示较早的28条动态</strong></a></p>-->
    <Timeline>
    </Timeline>
    <div class="comment-container">
      <TimeLine>
        <TimeLineItem v-for="(item,index) in comments" :key="index">
          <Avatar icon="ios-people" slot="head"></Avatar>
          <div class="comment-item">
            <div class="comment-item-base">
              <span class="comment-item-title">{{item.create_user_name}}</span>
              <span class="comment-item-content">{{item.update_category}} {{item.update_content}}</span>
              <!--<Tooltip content="删除" placement="top" v-if="item.is_comment">-->
                <!--<a style="display: none">-->
                  <!--<Icon type="trash-b"></Icon>-->
                <!--</a>-->
              <!--</Tooltip>-->
              <span class="comment-item-extra">{{item.create_at | fromNow}}</span>
            </div>
            <div class="comment-item-detail">
              {{item.comment_content}}
              <!--<ReadWriteText v-model="item.update_content" ref=""></ReadWriteText>-->
            </div>
          </div>
        </TimeLineItem>
      </TimeLine>
    </div>
  </div>
</template>

<script>
  import TimeLine from '../../common/timeline/timeline.vue'
  import TimeLineItem from '../../common/timeline/timeline-item.vue'
  import ReadWriteText from '../../common/edit/read_write_text.vue'
  import UAffix from '../../common/UAffix.vue'
  import moment from 'moment'

  export default {
    props: {
      datas: {
        type: Array
      },
      height: {
        type: Number
      }
    },
    components: {
      TimeLine,
      TimeLineItem,
      ReadWriteText,
      UAffix
    },
    data () {
      return {
//        text: '@1',
        comments: this.datas
      }
    },
    computed: {
      commentHeight () {
        return this.height == 0 ? '300px' : `${this.height}px`
      }
    },
    watch: {
      datas () {
        this.comments = this.datas
      },
      height (v) {
        console.info(v)
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import '../../../style/base.styl'
  .comment
    background #fff
    padding 10px
    .comment-more
      margin-bottom 10px
      margin-top 10px
      padding-left 30px
      font-size 14px
    .comment-container
      width 100%
      overflow-y: auto
      height 100%
      padding-bottom 30px
      background #fff
      .comment-item
        font-size 12px
        &:hover
          a
            display inline-block !important
        .comment-item-base
          width 100%
          color $-sub-color
          display flex
          margin-top 6px
          .comment-item-content
            flex 10
            margin-left 15px
          .comment-item-title
            margin-left 5px
          .comment-item-extra
            margin-left 5px
        .comment-item-detail
          margin-top 10px


</style>
