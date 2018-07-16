<template>
  <div>
    <Card class="setting-card">
      <p slot="title">
        <Icon type="document-text"></Icon>
        模块管理
      </p>

      <Table :columns="columns" :data="datas">

      </Table>


      <p slot="extra" class="card-extra">
        <Button type="primary" icon="ios-people" size="small" @click="openCreateModal">创建模块</Button>
      </p>
    </Card>
    <Modal
      v-model="createModelLoading"
      title="新增模块"
      width="40%"
      :scrollable="false">
      <Form :model="model" :label-width="80">
        <FormItem label="模块名称">
          <Input placeholder="请输入模块名称" :maxlength="24" v-model="model.model_name" size="large" @keyup.enter="createModel"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="createModel">创建</Button>
      </div>
    </Modal>

    <Modal
      v-model="editModalLoading"
      title="编辑模块"
      width="40%"
      :scrollable="false">
      <Form :model="model" :label-width="80">
        <input v-model="editedModel.id" hidden>
        <FormItem label="模块名称">
          <Input placeholder="请输入模块名称" :maxlength="24" v-model="editedModel.model_name" size="large" @keyup.enter="editModel"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="editModel">编辑</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    created () {
      this.listAll();
    },
    watch: {
      '$route.query': 'listAll'
    },
    data () {
      return {
        createModelLoading: false,
        model: {
          model_name: '',
          project_id: this.$route.query.project_id
        },
        columns: [

          {
            title: '#',
            key: 'id',
            width: '40%'
          },
          {
            title: '模块名称',
            key: 'model_name',
            width: '50%'
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
                    },
                    on: {
                      click: () => {
                        this.editedModel = params.row;
                        this.openEditModal()
                      }
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
        datas: [],
        editedModel: '',
        editModalLoading:false
      }
    },
    methods: {
      openCreateModal () {
        this.createModelLoading = true
      },
      validModel (model) {
        return new Promise((resolve, reject) => {
          if (!model.model_name) {
            reject('请输入模块名称')
          } else {
            resolve()
          }
        })
      },
      listAll () {
        this.$http.get('/api/project/model/listAll', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          this.$Spin.hide()
          let data = response.data
          if (data.code === '00000') {
            this.datas = data.data
          } else {
            this.$Message.error(data.message)
          }
        }).catch(e => {
          console.info(e);
          this.$Spin.hide()
          this.$Message.error(e.data.message)
        })
      },
      editModel () {
        this.validModel(this.editedModel).then(() => {
          this.$Spin.show()
          this.$http.post('/api/project/model/update', qs.stringify(this.editedModel))
            .then(response => {
              this.$Spin.hide()
              let data = response.data
              if (data.code === '00000') {
                this.$Message.success('编辑成功')
                this.listAll();
              } else {
                this.$Message.error(data.message)
              }
              this.editModalLoading = false
            }).catch(e => {
            this.$Spin.hide()
            this.$Message.error(e.data.data)
          })
        }).catch(e => {
          this.$Message.error(e)
        })
      },
      createModel () {
        this.validModel(this.model).then(() => {
          this.$Spin.show()
          this.$http.post('/api/project/model/create', qs.stringify(this.model))
            .then(response => {
              this.$Spin.hide()
              let data = response.data
              if (data.code === '00000') {
                this.$Message.success('创建成功')
                this.listAll();
              } else {
                this.$Message.error(data.message)
              }
              this.createModelLoading = false
            }).catch(e => {
            this.$Spin.hide()
            this.$Message.error(e.data.message)
          })
        }).catch(e => {
          this.$Message.error(e)
        })
      },
      openEditModal() {
        this.editModalLoading = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/project/project.styl"
</style>
