<template>
  <Card class="setting-card">
    <p slot="title">
      <Icon type="document-text"></Icon>
      项目成员
    </p>

    <Table :columns="columns" :data="datas">

    </Table>


    <p slot="extra" class="card-extra">
      <!--<Button type="primary" icon="ios-people" size="small">成员管理</Button>-->
    </p>
  </Card>
</template>

<script>
  import qs from 'qs'
  export default {
    created () {
      this.listMember()
    },
    watch: {
      '$route.query': 'listMember'
    },
    data () {
      return {
        columns: [
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '邮箱',
            key: 'email'
          },
          {
            title: '操作',
            key: '',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.removeMember(params.row.member_id)
                    }
                  }
                }, '移除成员')
              ])
            }
          }
        ],
        datas: [],
        removeMember (memberId) {
          this.spinShow = true
          this.$http.post('/api/project/removeMember', qs.stringify({
            project_id: this.$route.query.project_id,
            member_id: memberId
          })).then(response => {
            let data = response.data
            if (data.code == '00000') {
              this.$Message.success('移除成功')
              this.listMember();
            } else {
              this.$Message.error(data.message)
            }
            this.spinShow = false
          }).catch(e => {
            this.spinShow = false
            this.$Message.error(e.data.data)
          })
        },
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
                this.datas = list['list']
              }
              this.spinShow = false
            }).catch(error => {
            this.spinShow = true
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/project/project.styl"
</style>
