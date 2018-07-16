<template>
  <div id="projects">
    <transition name="fade">
      <div class="project-container">
        <!--头部-->
        <div class="head">
          <Row type="flex" align="middle" justify="start">
            <Col span="12">
            <Row type="flex" justify="start" align="middle">
              <Col span="8">
              <Logo page="/projects" :height="60"></Logo>
              </Col>
              <Col span="10">
              <!--<Search v-model="search" placeholder="搜索项目"></Search>-->
              <Select v-model="project_id" size="large" @on-change="changeProject">
                <OptionGroup label="我创建的">
                  <Option v-for="item in list1" :value="item.project_id" :key="item.project_id">{{ item.project_name
                    }}
                  </Option>
                </OptionGroup>
                <OptionGroup label="我参与的">
                  <Option v-for="item in list2" :value="item.project_id" :key="item.project_id">{{ item.project_name
                    }}
                  </Option>
                </OptionGroup>
              </Select>
              </Col>
            </Row>
            </Col>
            <Col span="5" :offset="6">
            <Row type="flex" justify="end" align="middle">
              <Dropdown>
                <a class="user-info">
                  <Avatar src="/static/img/avatar/avatar2.JPG"></Avatar>
                  <strong class="username">{{user.name}} {{user.work}}</strong>
                  <Icon type="arrow-down-b" size="small" color="#fff"></Icon>
                </a>
                <Dropdown-menu slot="list">
                  <Dropdown-item>Signed in as
                    <span>{{user.name}}</span></Dropdown-item>
                  <Dropdown-item>
                    <Button @click="logout" type="text">注销</Button>
                  </Dropdown-item>
                </Dropdown-menu>
              </Dropdown>
            </Row>
            </Col>
          </Row>
        </div>
        <!--内容 -->
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>
<script>
  import Loading from '../common/loading.vue'
  import Search from '../common/search.vue'
  import Logo from '../common/logo.vue'

  export default {
    created () {
      this.init()
    },
    data () {
      return {
        show: true,
        search: '我爱的人',
        cityList: [
          {
            project_id: 16,
            project_name: 'New York'
          },
          {
            project_id: 17,
            project_name: 'London'
          },
          {
            project_id: 18,
            project_name: 'Sydney'
          }
        ],
        list1: [],
        list2: [],
        project_id: parseInt(this.$route.query.project_id)
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      search (val) {
      },
      '$route.query': 'updateProjectId'
    },
    components: {
      Loading,
      Search,
      Logo
    },
    mounted() {

    },
    methods: {
      init () {
        this.$store.dispatch('getUser')
        this.listByCreateId()
        this.listByMemberId()
      },
      logout () {
        this.$http.post('/api/user/logout', {})
          .then(response => {
            let data = response.data
            if (data.code === '00000') {
              location.href = '/login'
            }
          }).catch(e => {
          this.$Message.error(e.data.message)
        })
      },
      updateProjectId () {
        this.project_id = this.$route.query.project_id
      },
      changeProject (value) {
        value = value || this.$route.query.project_id
          this.$router.replace({
            path: this.$route.path,
            query: {
              project_id: value
            }
          })
        },
      listByMemberId () {
        return new Promise((resolve, reject) => {
          this.$http.get('/api/project/listByMemberId', {})
            .then(response => {
              let data = response.data
              if (data.code === '00000') {
                this.list2 = data.data
                resolve()
              } else {
                reject()
              }
            }).catch(e => {
            reject()
            this.$Message.error(e.data.message)
          })
        })
      },
      listByCreateId () {
        return new Promise((resolve, reject) => {
          this.$http.get('/api/project/listByCreateId', {})
            .then(response => {
              let data = response.data
              if (data.code === '00000') {
                this.list1 = data.data
                resolve()
              } else {
                reject()
              }
            }).catch(e => {
            reject()
            this.$Message.error(e.data.data)
          })
        })
      }
    }
  }
</script>
<style scoped type="text/stylus" lang="stylus">
  @import "../../style/base.styl"
  #projects
    width 100%
    height 100%
    overflow-y hidden

  .demo-spin-col
    height: 100px;
    position: relative;
    border: 1px solid #eee;

  .loading
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;

  .project-container
    margin-bottom 30px
    height 100%
    .head
      height: 60px;
      width: 100%;
      background-color: $-app-color;
      .user-info
        .username
          color #fff
          margin-left 3px
          margin-right 3px
</style>
