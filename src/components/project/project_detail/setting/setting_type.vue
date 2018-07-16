<template>
  <Card class="setting-card">
    <p slot="title">
      <Icon type="document-text"></Icon>
      问题类型
    </p>

    <Table :columns="columns" :data="questionCategoryList">

    </Table>


    <p slot="extra" class="card-extra">
      <Button type="primary" icon="ios-people" size="small">创建类型</Button>
    </p>
  </Card>
</template>

<script>
  export default {
    data () {
      return {
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
    },
    computed: {
      questionCategoryList () {
        return [
          {
            status: 0,
            label: '任务',
            icon: 'stop',
            color: 'blue',
            questionNum: 1
          },
          {
            status: 1,
            label: 'bug',
            icon: 'stop',
            color: 'green',
            questionNum: 1
          },
          {
            status: 2,
            label: '功能',
            icon: 'stop',
            color: 'red',
            questionNum: 1
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
