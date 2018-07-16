<template>
  <div class="zl-drop-select" v-clickoutside="hideDropMenu">
    <div class="drop-selected-box" v-if="activeData">
      <Icon :type="activeData.icon" :color="activeData.color" size="14">
      </Icon>
      <strong class="drop-selected-title">{{activeData.label}}</strong>
      <a @click="dropOpen">
        <Icon type="arrow-down-b" :class="dropIconClass" class="drop-open"></Icon>
      </a>
    </div>
    <input hidden name="status" v-if="activeData" :value="activeData.value">
    <transition name="fade">
      <slot>
        <ul class="drop-list" v-show="isDropOpen">
          <!-- search-->
          <li class="drop-search-item" v-show="searchSwitch">
            <Search v-model="search" placeholder="搜索"></Search>
            <hr>
          </li>
          <li v-for="(item,index) in datas" :key="index" class="drop-list-item" @click="selectDropItem(index)"
              v-show="item.visible">
            <p>
              <Icon type="record" size="14" :color="item.color"></Icon>
              <span>{{item.label}}</span>
            </p>
            <Icon type="checkmark-round" v-show="index == activeIndex"></Icon>
          </li>
        </ul>
      </slot>
    </transition>
  </div>
</template>

<script>
  import clickoutside from '../../../directive/clickoutside'
  import Search from '../../common/search.vue'

  const dropIconClass = ['drop-open-down', 'drop-open-up']
  export default {
    components: {
      Search
    },
    directives: {
      clickoutside
    },
    props: {
      canNull: {
        type: Boolean,
        default: false
      },
      datas: {
        type: Array,
        default: null
      },
      value: {
        type: [String, Number],
        default: '',
        search: ''
      },
      searchSwitch: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        search: '',
        isDropOpen: false,
        dropIconClass: dropIconClass[0],
        activeIndex: 0,
        activeData: '',
        list: this.datas

      }
    },
    compute: {},
    watch: {
      search (val) {
        this.list = this.filter(val, this.list)
      },
      value (n, o) {
        this.initDatas()
      },
      datas () {

        this.initDatas()
      }
    },
    mounted () {
    },
    methods: {
      filter (val, data) {
        if (this.searchSwitch) {
          return data.filter((item) => {
            if (!val || item.label.indexOf(val) !== -1) {
              item.visible = true
            } else {
              item.visible = false
            }
            return true
          })
        }
      },
      dropOpen () {
        this.isDropOpen = !this.isDropOpen
        if (this.isDropOpen) {
          this.dropIconClass = dropIconClass[1]
        } else {
          this.dropIconClass = dropIconClass[0]
        }
      },
      hideDropMenu () {
        if (this.isDropOpen) {
          this.isDropOpen = false
          this.dropIconClass = dropIconClass[0]
        }
      },
      selectDropItem (index) {
        if (this.activeIndex !== index) {
          this.updateValue(index)
          this.hideDropMenu()
        }
      },
      updateValue (index) {
        this.setActiveItem(index, this.list[index])
        this.$emit('input', this.activeData.value)
        this.$emit('change', this.activeData.value)
      },
      setActiveItem (index, item) {
        this.activeData = item
        this.activeIndex = index
      },
      initDatas () {
        if (this.canNull) {
          let hasNull = this.list.some(item => {
            return item.value == null
          })
          if (!hasNull) {
            this.datas.unshift({label: '请选择', value: null, icon: 'record'})
          }
        }
        this.list = this.datas
        let flag = false
        this.activeIndex = 0
        this.activeData = ''
        if (this.list.length > 0) {
          this.list.forEach((item, index) => {
            if (item.value == this.value) {
              flag = true
              this.setActiveItem(index, item)
            }
          })
        }
        if (!flag) {
//          this.activeIndex = -1;
        }
        if (this.list) {
          this.list.forEach((data) => {
            data.visible = true
          })
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .zl-drop-select
    position relative
    display inline-block
    .drop-selected-box
      display flex
      align-items center
      justify-content flex-start
      .drop-selected-title
        color #337ab7
        font-size 14px
        padding 0 5px
      .drop-open
        display block !important
        transition: transform .3s ease !important
        cursor pointer
        color #337ab7
      .drop-open-down
        transform rotate(0deg) !important
      .drop-open-up
        transform rotate(180deg) !important
    .drop-list
      position absolute
      top 45px
      display flex
      flex-direction column
      min-width 180px
      padding 5px 0
      border 1px solid #ccc
      border-radius 3px
      background-color #fff
      box-shadow: 0 6px 12px rgba(0, 0, 0, .175)
      font-size 14px
      color black
      z-index 1000
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
