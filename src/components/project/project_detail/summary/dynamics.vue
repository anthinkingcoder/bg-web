<template>
  <div class="dynamics">
    <Card class="dynamics">
      <p slot="title">
        <Icon type="navicon">
        </Icon>
        动态
      </p>
      <p slot="extra" class="card-extra">
        <!--<Button type="ghost" size="small">更多</Button>-->
      </p>

      <div class="dynamics-list-content-box">
        <ul class="dynamics-list">
          <Scroll :on-reach-bottom="handleReachBottom">
            <li class="dynamics-item" v-for="(item,index) in dynamics" :key="index">
              <Row type="flex">
                <Col span="3">
                <Avatar :src="!item.head_img ? '/static/img/avatar/avatar2.jpg' : item.head_img"></Avatar>
                </Col>
                <Col span="16">
                <p class="username" style="font-size: 12px">{{item.name}}</p>
                <p>{{item.dynamic_category}}</p>
                </Col>
                <Col span="5" style="text-align: right">
                <span style="font-size: 12px">{{item.create_at| fromNow}}</span>

                </Col>
              </Row>
              <hr>
            </li>
          </Scroll>

        </ul>
        <br>
      </div>
    </Card>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
  export default {
    created () {
      this.listDynamic()
    },
    data () {
      return {
        spinShow: false,
        dynamics: [],
        page: 1,
        size: 5
      }
    },
    watch: {
      '$route.query': 'listDynamic'
    },
    methods: {
      handleReachBottom () {
        this.page++;
        this.listDynamic();
      },
      listDynamic () {
        return new Promise((resolve, reject) => {
          this.$http.get('/api/project/dynamic/listProjectDynamic', {
            params: {
              project_id: this.$route.query.project_id,
              page: this.page,
              size: this.size
            }
          })
            .then(response => {
              let data = response.data
              if (data.code = '00000') {
                if (data.data && data.data.length > 0) {
                  let array = this.dynamics.concat(data.data)
                  this.dynamics = array
                }
              }
              resolve()
            }).catch(error => {
              reject()
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/project/project.styl"
  .dynamics-container
    .dynamics-list-content-box
      padding 10px 10px
      overflow scroll
</style>
