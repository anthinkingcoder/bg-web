<template>
  <li class="drop-list-item">
      <slot></slot>
    <Icon type="checkmark-round"></Icon>
  </li>

  <!--<li v-for="(item,index) in data" :key="index" class="drop-list-item">-->
    <!--<p>-->
      <!--<Icon :type="item.icon ? item.icon : 'record'" size="14"></Icon>-->
      <!--<span>{{item.label}}</span>-->
    <!--</p>-->
    <!--<Icon type="checkmark-round" v-show="index === activeIndex"></Icon>-->
  <!--</li>-->
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .drop-list-item
    display flex
    align-items center
    justify-content space-between
    padding 2px 15px
    cursor pointer
    line-height: 1.42857143;
    &:hover
      background-color #2b85e4
</style>
