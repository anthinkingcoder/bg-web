<template>
  <div class="comment">
    <!--发表评论 -->
    <p class="comment-more"><a><strong>显示较早的28条动态1</strong></a></p>
    <Timeline>
    </Timeline>
    <div class="comment-container">
      <TimeLine>
        <TimeLineItem>
          <Avatar icon="ios-people" slot="head"></Avatar>
          <div class="comment-item">
            <div class="comment-item-base">
              <span class="comment-item-title">zhoulin</span>
              <span class="comment-item-content">修改状态为新建</span>
              <Tooltip content="删除"  placement="top">
                <a style="display: none"><Icon type="trash-b"></Icon></a>
              </Tooltip>
              <span class="comment-item-extra">1小时前</span>
            </div>
            <div class="comment-item-detail">
                <ReadWriteText v-model="text" ref=""></ReadWriteText>
            </div>
          </div>

        </TimeLineItem>
        <TimeLineItem>
        <Avatar icon="ios-people" slot="head"></Avatar>
        <div class="comment-item">
          <div class="comment-item-base">
            <span class="comment-item-title">zhoulin</span>
            <span class="comment-item-content">修改状态为新建</span>
            <span class="comment-item-extra">1小时前</span>
          </div>
          <div class="comment-item-detail">
            <ReadWriteText v-model="text" ref=""></ReadWriteText>
          </div>
        </div>
      </TimeLineItem>

        <TimeLineItem>
          <Avatar icon="ios-people" slot="head"></Avatar>
          <div class="comment-item">
            <div class="comment-item-base">
              <span class="comment-item-title">zhoulin</span>
              <span class="comment-item-content">修改状态为新建</span>
              <span class="comment-item-extra">1小时前</span>
            </div>
            <div class="comment-item-detail">
              <ReadWriteText v-model="text" ref=""></ReadWriteText>
            </div>
          </div>
        </TimeLineItem>


        <TimeLineItem>
          <Avatar icon="ios-people" slot="head"></Avatar>
          <div class="comment-item">
            <div class="comment-item-base">
              <span class="comment-item-title">zhoulin</span>
              <span class="comment-item-content">修改状态为新建</span>
              <span class="comment-item-extra">1小时前</span>
            </div>
            <div class="comment-item-detail">
              <ReadWriteText v-model="text" ref=""></ReadWriteText>
            </div>
          </div>
        </TimeLineItem>
        <TimeLineItem>
          <Avatar src="/static/img/avatar/avatar2.jpg" slot="head"></Avatar>
          <div class="comment-item">
            <div class="comment-item-base">
              <span class="comment-item-title">zhoulin</span>
              <span class="comment-item-content">修改状态为新建</span>
              <span class="comment-item-extra">1小时前</span>
            </div>
            <div class="comment-item-detail">
              <ReadWriteText v-model="text" ref=""></ReadWriteText>
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
  export default {
    components: {
      TimeLine,
      TimeLineItem,
      ReadWriteText,
      UAffix
    },
    data () {
      return {
        text: '@1'
      }
    },
    watch: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import '../../../style/base.styl'
  .comment
    background #fff
    padding 10px
    overflow-y scroll
    .comment-more
      margin-bottom 10px
      margin-top 10px
      padding-left 30px
      font-size 14px
    .comment-container
      width 100%
      min-height 376px
      overflow-y: auto
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
