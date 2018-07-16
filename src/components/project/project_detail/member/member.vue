<template>
  <div>
    <Card class="member-list-container">
      <p slot="title">
        <Icon type="person">
        </Icon>
        成员列表
      </p>

      <p slot="extra" class="card-extra">
        <ButtonGroup size="small">
          <!--<Button type="ghost">管理成员</Button>-->
          <!--<Button type="ghost">邀请</Button>-->
        </ButtonGroup>
      </p>

      <div class="member-list-content-box">
        <ul class="member-list">
          <li class="member-item member-tag">
            管理员
          </li>
          <li class="member-item" v-for="item in admins" :key="item.user_id">
            <Row type="flex" align="middle">
              <Col span="3">
              <Avatar :src="!item.head_img? '/static/img/avatar/avatar2.jpg' : item.head_img"></Avatar>
              </Col>
              <Col>
              <p class="username">{{item.name}}</p>
              </Col>
            </Row>
            <hr>
          </li>
        </ul>
        <br>
        <ul class="member-list">
          <li class="member-item member-tag">
            成员({{members.length}})
          </li>
          <li class="member-item" v-for="(item,index) in members" :key="index">
            <Row type="flex" align="middle">
              <Col span="3">
              <Avatar :src="!item.head_img?'/static/img/avatar/avatar2.JPG':item.head_img"></Avatar>
              </Col>
              <Col>
              <p class="username">{{item.name}}</p>
              </Col>
            </Row>
            <hr>
          </li>
        </ul>
      </div>
    </Card>
    <div class="card-tip">
      <Icon type="person"></Icon>
      共 {{admins.length + members.length}} 名成员
    </div>

    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
  export default {
    created () {
      this.listMember()
    },
    watch: {
      '$route.query': 'listMember'
    },
    data () {
      return {
        admins: [],
        members: [],
        spinShow:false
      }
    },
    methods: {
      listMember () {
        this.spinShow = true
        this.$http.get('/api/project/member/listMembers', {
          params: {
            project_id: this.$route.query.project_id
          }
        })
          .then(response => {
            let data = response.data
            if (data.code = '00000') {
              let list = data.data
              this.members = list['list']
              this.admins = list['adminList']
            }
            this.spinShow = false
          }).catch(error => {
            this.spinShow = true
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/project/project.styl"

  .member-list-container
    height 400px
    .member-list-content-box
      padding 10px 10px
      max-height 300px
      overflow scroll
      .member-list
        .member-tag
          margin-bottom 20px

</style>
