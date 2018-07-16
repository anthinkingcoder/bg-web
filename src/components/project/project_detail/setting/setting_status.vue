<template>
  <Card class="setting-card">
    <p slot="title">
      <Icon type="document-text"></Icon>
      问题状态
    </p>

    <Table :columns="columns" :data="questionStatusList">

    </Table>

    <p slot="extra" class="card-extra">
      <Button type="primary" icon="ios-plus" size="small">创建状态</Button>
    </p>
  </Card>
</template>

<script>
  export default {
    data () {
      return {
        questionStatusList: [
          {status: 0, label: '新建', icon: 'social-twitter', color: '#45be95', questionNum: 1},
          {status: 1, label: '处理中', icon: 'social-facebook', color: '#ffbc00', questionNum: 1},
          {status: 2, label: '已解决', icon: 'social-github', color: '#5bc0de', questionNum: 1},
          {status: 3, label: '已忽略', icon: 'social-snapchat', color: '#a2d148', questionNum: 1},
          {status: 4, label: '待反馈', icon: 'social-snapchat', color: '#8b7cc5', questionNum: 1},
          {status: 5, label: '已关闭', icon: 'social-snapchat', color: '#bedad3', questionNum: 1},
          {status: 6, label: '重新打开', icon: 'social-snapchat', color: '#f1494e', questionNum: 1}
        ],
        columns: [
          {
            title: '类型名称',
            key: 'label',
            width: '50%',
            render: (h, params) => {
              return h('p', {}, [
                h('Icon', {
                  style: {'vertical-align': 'middle'},
                  props: {type: params.row.icon, color: params.row.color, size: 16}}),
                h('span', {style: {'vertical-align': 'middle'}}, ' ' + params.row.label)
              ])
            }
          },
          {
            title: '问题数',
            key: 'questionNum',
            width: '40%'
          },
          {
            title: ' ',
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
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/project/project.styl"
</style>
