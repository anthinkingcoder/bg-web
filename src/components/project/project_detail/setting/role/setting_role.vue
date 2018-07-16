<template>
  <div>
    <Card class="setting-card">
      <p slot="title">
        <Icon type="document-text"></Icon>
        角色管理
      </p>

      <Table :columns="columns" :data="datas">

      </Table>


      <p slot="extra" class="card-extra">
        <Button type="primary" icon="ios-people" size="small" @click="createRole">创建角色</Button>
      </p>
    </Card>
    <EditRole ref="editRole"></EditRole>
  </div>
</template>

<script>
  import EditRole from './role_edit.vue'
  export default {
    components: {
      EditRole
    },
    data () {
      return {
        columns: [
          {
            title: '角色名称',
            key: 'name'
          },
          {
            title: '成员数',
            key: 'memberNum'
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('div',
                {class: 'hover-show', style: {'width': '100%'}}, [h('ButtonGroup', {
                  props: {
                    size: 'small'
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'text',
                      icon: 'edit'
                    }
                  }),
                  h('Button', {
                    props: {
                      type: 'text',
                      icon: 'trash-b'
                    }
                  })
                ])])
            }
          }
        ],
        datas: [
          {
            name: '管理员',
            memberNum: 1
          },
          {
            name: '开发人员',
            memberNum: 0
          },
          {
            name: '测试人员',
            memberNum: 0
          }]
      }
    },
    methods: {
      createRole () {
        this.$refs.editRole.$emit('open', true)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../../style/project/project.styl"
</style>
