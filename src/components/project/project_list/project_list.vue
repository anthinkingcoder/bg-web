<template>
  <div id="project_list">
    <Loading ref="loading" v-show="loading"></Loading>
    <div class="project-wrapper">
      <div class="project-content-box">
        <Row type="flex" justify="center">
          <Col :md="4" :xs="22" :offset="1">
          <Icon type="navicon" size="16"></Icon>
          <span class="create-text">我创建的项目</span>
          </Col>
          <Col :md="19" :xs="0">
          <p class="project-hr"></p>
          </Col>
        </Row>
        <br>
        <Row type="flex">
          <Col :md="5" :xs="22" :offset="1" v-for="item in list1" :key="item.project_id" @click="updateProjectId">
          <div class="project-card">
            <router-link :to="{path:'/projects/detail/summary', query:{project_id: item.project_id}}">
              <div class="project-card-header project-card-header-bg-green" :style="{'background':item.project_bg}">
                <span>{{item.project_name}}</span>
              </div>
              <div class="project-content">
                <Row type="flex" justify="space-around">
                  <Col span="18" class="text-al-l">
                  <Icon type="android-star"></Icon>
                  <span :style="{color:item.project_bg}">{{item.name}}</span>
                  </Col>
                  <Col span="6" class="text-al-r">
                  <Icon type="android-person"></Icon>
                  <span>{{item.member_num}}</span>
                  </Col>
                </Row>
              </div>
            </router-link>
          </div>
          </Col>
          <!-- -->
          <Col :md="5" :xs="22" :offset="1">
          <div class="project-card-create">
            <a @click="showCreateProjectModel">
              <p class="project-create-icon">
                <Icon type="ios-plus-outline" size="64"></Icon>
              </p>
              <p>创建新项目</p>
            </a>
          </div>
          </Col>
        </Row>
      </div>


      <br>

      <div class="project-content-box">
        <Row type="flex" justify="center">
          <Col :md="4" :xs="22" :offset="1">
          <Icon type="navicon" size="16"></Icon>
          <span class="create-text">我参与的项目</span>
          </Col>
          <Col :md="19" :xs="0">
          <p class="project-hr"></p>
          </Col>
        </Row>
        <br>
        <Row type="flex">
          <Col :md="5" :xs="22" :offset="1" v-for="item in list2" :key="item.project_id">
          <div class="project-card">
            <router-link :to="{path:'/projects/detail/summary', query:{project_id: item.project_id}}">
              <div class="project-card-header project-card-header-bg-green" :style="{'background':item.project_bg}">
                <span>{{item.project_name}}</span>
              </div>
              <div class="project-content">
                <Row type="flex" justify="space-around">
                  <Col span="18" class="text-al-l">
                  <Icon type="android-star"></Icon>
                  <span :style="{color:item.project_bg}">{{item.name}}</span>
                  </Col>
                  <Col span="6" class="text-al-r">
                  <Icon type="android-person"></Icon>
                  <span>{{item.member_num}}</span>
                  </Col>
                </Row>
              </div>
            </router-link>
          </div>
          </Col>
        </Row>
      </div>
    </div>
    <ProjectCreate ref="projectCreate" :show="projectModelShow" @create-success="listByCreateId"></ProjectCreate>
  </div>
</template>

<script>
  import ProjectCreate from './project_create.vue'
  import Loading from '../../common/loading.vue'

  export default {
    created () {
      this.init()
    },
    data () {
      return {
        list1: [],
        list2: [],
        loading1: false,
        loading2: false
      }
    },
    computed: {
      loading () {
        return !this.loading1 && !this.loading2
      },
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      search (val) {
        console.info(val)
      }
    },
    components: {
      ProjectCreate,
      Loading
    },
    methods: {
      init () {
        this.listByCreateId()
        this.listByMemberId()
      },
      listByMemberId () {
        this.$http.get('/api/project/listByMemberId', {})
          .then(response => {
            let data = response.data
            if (data.code === '00000') {
              this.list2 = data.data
            }
            this.loading2 = true;

          }).catch(e => {
          this.$Message.error(e.data.message)
          this.loading2 = false;
        })
      },
      listByCreateId () {
        this.$http.get('/api/project/listByCreateId', {})
          .then(response => {
            let data = response.data
            if (data.code === '00000') {
              this.list1 = data.data
            }
            this.loading1 = false;
          }).catch(e => {
          this.$Message.error(e.data.data)
          this.loading1 = false;
        })
      },
      showCreateProjectModel () {
        this.$refs.projectCreate.show(true);
      },
      updateProjectId() {
        this.$emit('update-project', '')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../style/base.styl"

  .project-content-box
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;

  .create-text
    color: #6a6c6f;
    font-size: 16px;

  .project-index-hr
    background-color: $-hr-color;
    color: #dee2e6;
    height: 1px;

  .project-hr
    height: 1px;
    margin-top: 12px;
    border: 0;
    border-top: 1px solid $hr-color;

  .project-card
    transform: scale(1);
    transition: all 0.2s ease 0s;
    -webkit-font-smoothing: antialiased;
    bdr(6px)
    background: #fff;
    border: 1px solid #e4e5e7;
    width: 100%;

  .project-card, .project-card-create
    margin-bottom: 25px;

  .project-card-create
    transition: all 0.2s ease 0s;
    -webkit-font-smoothing: antialiased;
    border-radius(6px)
    background: #e5e9ec !important;
    border: 1px dashed #d4d8db !important;
    padding: 15px;
    text-align: center;

  .project-card
    &:hover
      transform: scale(1.1);

  .project-card-create
    &:hover
      background-color: #fff !important;

  .project-card-header
    height: 104px;
    padding: 10px 20px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    vertical-align: middle;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #fff !important;
    font-size: 16px;
    letter-spacing: 1px;
    overflow: hidden;

  .project-card-create, .project-card
    & > a
      color: #616d71 !important;

  /*.project-card-header-bg-green*/
    /*background: #a2d148 !important;*/

  .project-content
    padding: 10px 15px 10px 15px;
    color: #b0bec5 !important;

  .project-create-icon
    padding: 10px;
    color: #d4d8db !important;

</style>

