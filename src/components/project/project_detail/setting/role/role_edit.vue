<template>
  <Modal v-model="visible" width="60%" title="添加角色">
    <div class="edit-role-container">
      <Form :label-width="80">
        <FormItem label="角色名">
          <Input placeholder="请输入角色名"></Input>
        </FormItem>
        <br>
        <table class="permission-table">
          <tr v-for="(item,index) in permissions" :key="item.name">
            <th class="permission-th">
              <Checkbox label="twitter">
                <span>{{item.name}}</span>
              </Checkbox>
            </th>
            <td class="permission-td">
              <CheckboxGroup v-model="social">
                <Checkbox label="twitter" v-for="(ch,index) in item.children" :key="ch.name">
                  <span>{{ch.name}}</span>
                </Checkbox>
              </CheckboxGroup>
            </td>
          </tr>
        </table>
      </Form>
      <br>
    </div>
    <div slot="footer">
      <Button type="primary" size="large"  @click="submit">提交</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        permissions: [
          {
            name: '成员和权限',
            children: [
              {
                name: '添加成员'
              },
              {
                name: '修改成员角色'
              },
              {
                name: '删除成员'
              },
              {
                name: '添加角色'
              },
              {
                name: '修改角色权限'
              },
              {
                name: '删除角色'
              }
            ]
          },
          {
            name: '项目设置',
            children: [
              {
                name: '修改项目 名称/描述/颜色'
              },
              {
                name: '删除项目'
              },
              {
                name: '回收项目'
              },
              {
                name: '管理模块'
              },
              {
                name: '管理问题类型'
              },
              {
                name: '管理问题状态'
              },
              {
                name: '导入问题'
              }
            ]
          },
          {
            name: '文件库',
            children: [
              {
                name: '上传 / 编辑文件'
              },
              {
                name: '删除文件'
              }
            ]
          },
          {
            name: 'Wiki',
            children: [
              {
                name: '创建 / 编辑Wiki'
              },
              {
                name: '删除Wiki'
              },
              {
                name: '添加/编辑Wiki附件'
              },
              {
                name: '删除Wiki附件'
              }
            ]
          },
          {
            name: '问题',
            children: [
              {
                name: '创建问题'
              },
              {
                name: '编辑问题 标题/描述'
              },
              {
                name: '编辑问题 指派/关注'
              },
              {
                name: '编辑问题 结束时间'
              },
              {
                name: '编辑问题 类型/ 模块 /状态 /优先级'
              },
              {
                name: '关闭问题'
              },
              {
                name: '删除问题'
              },
              {
                name: '添加/编辑问题附件'
              },
              {
                name: '删除问题附件'
              },
              {
                name: '导出问题'
              },
              {
                name: '移除问题/复制问题'
              }
            ]
          }
        ]
      }
    },
    mounted () {
      this.$on('open', () => {
        this.visible = true
      })
    },
    methods: {
      submit () {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .edit-role-container
    width 90%
    margin 0 auto
    .permission-table
      width 100%
      border-top 1px solid #eaeaea
      cellpadding 0
      cellspacing 0
      border-collapse 0
      border-spacing 0
      box-sizing border-box
      tr
        display flex
        width 100%
        border-spacing: 0;
        border-collapse: collapse;
        margin 0
        padding 0
        border-bottom 1px solid #eaeaea
        &:last-child
          border-bottom none
      .permission-th
        display flex
        justify-content center
        align-items center
        width 30%
        margin 0
        padding 20px 40px
        background-color #f7f9fb
        text-align center
        border-right 1px solid #eaeaea
      .permission-td
        width 70%
        padding 20px 0 20px 20px
        line-height 2
</style>
