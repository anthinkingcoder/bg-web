<template>
  <div class="setting-container">
    <Row type="flex">
      <Col span="6">
      <Card class="setting-card">
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          功能
        </p>

        <div class="setting-nav">
          <ul>
            <li v-for="(item,index) in navs1"
                :key="index"
                class="setting-nav-item"
                :class="{'setting-nav-item-selected': index === selectedIndex && selectedNavIndex === 0}"
                @click="navSelect(0,index,item)">
              <Icon :type="item.icon" size="14"></Icon>
              <span style="margin-left: 10px">{{item.label}}</span>
            </li>
          </ul>
          <hr>
          <ul>
            <li v-for="(item,index) in navs2"
                :key="index"
                class="setting-nav-item"
                :class="{'setting-nav-item-selected': index === selectedIndex && selectedNavIndex === 1}"
                @click="navSelect(1,index,item)">
              <Icon :type="item.icon"></Icon>
              <span style="margin-left: 10px">{{item.label}}</span>
            </li>
          </ul>
          <hr>
          <ul>
            <li v-for="(item,index) in navs3"
                :key="index"
                class="setting-nav-item"
                :class="{'setting-nav-item-selected': index === selectedIndex && selectedNavIndex === 2}"
                @click="navSelect(2,index,item)">
              <Icon :type="item.icon"></Icon>
              <span style="margin-left: 10px">{{item.label}}</span>
            </li>
          </ul>
          <hr>
          <ul>
            <li v-for="(item,index) in navs4"
                :key="index"
                class="setting-nav-item"
                :class="{'setting-nav-item-selected': index === selectedIndex && selectedNavIndex === 3}"
                @click="navSelect(3,index,item)">
              <Icon :type="item.icon"></Icon>
              <span style="margin-left: 10px">{{item.label}}</span>
            </li>
          </ul>
        </div>
      </Card>
      </Col>
      <Col span="18">
      <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navs1: [
          {
            'icon': 'navicon-round',
            'label': '项目信息',
            'path': '/projects/detail/setting/info'
          },
          {
            'icon': 'navicon-round',
            'label': '项目成员',
            'path': '/projects/detail/setting/user'
          },
//          {
//            'icon': 'navicon-round',
//            'label': '角色管理',
//            'path': '/projects/detail/setting/role'
//          }
          ],
        navs2: [
          {
            'icon': 'navicon-round',
            'label': '模块管理',
            'path': '/projects/detail/setting/module'
          }
//          {
//            'icon': 'navicon-round',
//            'label': '问题类型',
//            'path': '/projects/detail/setting/type'
//          },
//          {
//            'icon': 'navicon-round',
//            'label': '问题状态',
//            'path': '/projects/detail/setting/status'
//          }
 ],
//        navs3: [
//          {
//            'icon': 'navicon-round',
//            'label': '问题导入',
//            'path': '/projects/detail/setting/import'
//          }],
//        navs4: [
//          {
//            'icon': 'navicon-round',
//            'label': '高级设置',
//            'path': '/projects/detail/setting/advance'
//          }
//        ],
        selectedIndex: 0,
        selectedNavIndex: 0,
        selectedNav: ''
      }
    },
    methods: {
      navSelect (navIndex, index, nav) {
        if (navIndex !== this.selectedNavIndex || index !== this.selectedIndex) {
          this.selectedNavIndex = navIndex
          this.selectedIndex = index
          this.$router.push({path: nav.path,query:{project_id: this.$route.query.project_id}})
        }
      }
    },
    mounted () {
      this.selectedNav = this.navs1[0]
      this.navSelect(0, 0, this.selectedNav)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/base.styl"
  .setting-container
    width 100%
    height 100%
    padding 30px 40px
    .setting-card
      min-height 600px

  .setting-nav-item
    padding 10px 15px
    cursor pointer
    &:hover
      color $-app-color

  .setting-nav-item-selected
    background #f7f9fa
    border 1px solid $-border-color
    color $-app-color
</style>
