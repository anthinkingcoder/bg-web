<template>
  <div class="file-container">
    <Card>
      <p slot="title">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/">
            <Icon type="ios-folder">
            </Icon>
            文件库
          </BreadcrumbItem>
          <BreadcrumbItem to="/components/breadcrumb">文件1</BreadcrumbItem>
          <BreadcrumbItem>文件2</BreadcrumbItem>
        </Breadcrumb>
      </p>

      <p slot="extra" class="card-extra">
        <ButtonGroup size="small">
          <Button type="ghost" icon="upload">上传文件</Button>
          <Button type="ghost" icon="ios-plus">新建文件夹</Button>
        </ButtonGroup>
      </p>

      <Table :columns="columns" :data="files" no-data-text="未上传文件">
      </Table>
    </Card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: '名称',
            key: 'name',
            width: '45%',
            render: (h, params) => {
              return h('a', {on: {click: () => { this.loadSubData() }}}, [
                h('Icon', {
                  props: {type: params.row.isFold ? 'ios-folder' : 'document-text'},
                  class: 'app-color'
                }),
                h('span', {style: {'margin-left': '5px'}}, params.row.name)])
            }
          },
          {
            title: '大小',
            key: 'size'
          },
          {
            title: '创建者',
            key: 'author'
          },
          {
            title: '更新时间',
            key: 'updateAt'
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
                      icon: 'upload'
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
        files: [
          {
            name: '111',
            size: '-',
            author: 'zhoulin',
            updateAt: '34分钟前',
            isFold: true
          }
        ]
      }
    },
    method: {
      onCurrentChange () {
        console.info('123123')
      },
      loadSubData () {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/project/project.styl"
  .file-container
    width 100%
    padding 30px 40px


</style>
