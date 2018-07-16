<template>
  <div class="question-container">
    <div class="question-list-container" :class="questionListContainerSpread">
      <Row type="flex" justify="start">
        <Col span="6">
        <Card class="question-filter-card" :dis-hover="false">
          <div slot="title" style="height: 32px;line-height: 32px">筛选</div>

          <Form label-position="top">
            <FormItem label="类型">
              <Select v-model="queryInfo.question_category" class="question-create-select" size="large"
                      @on-change="listQuestion" :clearable="true">
                <Option v-for="(item,index) in categoryList" :key="index" :value="item.state">
                  <Icon :type="item.icon" :color="item.color"></Icon>
                  {{item.label}}
                </Option>
              </Select>
            </FormItem>

            <FormItem label="状态">
              <CheckboxGroup @on-change="listQuestion" v-model="queryInfo.question_status">
                <Row type="flex">
                  <Col span="8" v-for="(item,index) in statusList" :key="index">
                  <Checkbox :label="item.value">
                    <Icon :type="item.icon" :color="item.color"></Icon>
                    <span>{{item.label}}</span>
                  </Checkbox>
                  </Col>
                </Row>
              </CheckboxGroup>
            </FormItem>


            <FormItem label="优先级">
              <CheckboxGroup @on-change="listQuestion" v-model="queryInfo.question_priority">
                <Row type="flex">
                  <Col span="8" v-for="(item,index) in levelList" :key="index">
                  <Checkbox :label="item.value">
                    <Icon :type="item.icon" :color="item.color"></Icon>
                    <span>{{item.label}}</span>
                  </Checkbox>
                  </Col>
                </Row>
              </CheckboxGroup>


            </FormItem>

            <FormItem label="创建人">
              <Select v-model="queryInfo.create_user_id" size="large" multiple placeholder="请选择创建人"
                      @on-change="listQuestion">
                <OptionGroup label="管理员">
                  <Option v-for="item in members['adminList']" :value="item.member_id" :key="item.member_id">{{
                    item.name }}
                  </Option>
                </OptionGroup>
                <OptionGroup label="成员">
                  <Option v-for="item in members['list']" :value="item.member_id" :key="item.member_id">{{ item.name
                    }}
                  </Option>
                </OptionGroup>
              </Select>
            </FormItem>


            <FormItem label="指派">
              <Select v-model="queryInfo.pointer_user_id" size="large" multiple placeholder="请选择指派"
                      @on-change="listQuestion">
                <OptionGroup label="管理员">
                  <Option v-for="item in members['adminList']" :value="item.member_id" :key="item.member_id">{{
                    item.name }}
                  </Option>
                </OptionGroup>
                <OptionGroup label="成员">
                  <Option v-for="item in members['list']" :value="item.member_id" :key="item.member_id">{{ item.name
                    }}
                  </Option>
                </OptionGroup>
              </Select>
            </FormItem>

            <FormItem label="创建时间">
              <DatePicker format="yyyy-MM-dd" type="daterange" :value="queryInfo.create_at" size="large"
                          placeholder="请选择创建时间" style="width: 100%"
                          @on-change="updateQuestionCreateAt"></DatePicker>
            </FormItem>

            <FormItem label="最后更新时间" prop="passwd">
              <DatePicker format="yyyy-MM-dd" type="daterange" placeholder="请选择最后更新时间" :value="queryInfo.update_at"
                          style="width: 100%" @on-change="updateQuestionUpdateAt"></DatePicker>
            </FormItem>

            <FormItem label="结束时间" prop="passwd">
              <DatePicker format="yyyy-MM-dd" type="daterange" placeholder="请选择结束时间" :value="queryInfo.finish_at"
                          style="width: 100%" @on-change="updateQuestionFinishedAt"></DatePicker>
            </FormItem>

          </Form>
        </Card>
        <div class="card-tip">
          <Icon type="ios-lightbulb-outline"></Icon>
          技巧：筛选条件有点意思
        </div>
        </Col>

        <Col span="18">
        <Card class="question-list-card" :dis-hover="false">
          <div slot="title" style="padding: 0 !important;">
            <Input v-model="queryInfo.search" placeholder="搜索问题" style="width: 300px" @on-change="listQuestion">
            <Button slot="append" icon="ios-search"></Button>
            </Input>
          </div>

          <div slot="extra" class="question-list-card-tool">
            <Tooltip content="刷新">
              <Button type="text" class="btn-divider" size="small" @click="listQuestion">
                <Icon type="refresh" size="14"></Icon>
              </Button>
            </Tooltip>
            <Tooltip content="排序" placement="top">
              <TableFilterSelect @on-selected="orderSelected" :selectedValue="queryInfo.order.key" :sort="queryInfo.order.sort">
                <TableFilterOption v-for="(item,index) in orders" :key="index" :label="item.label" :value="item.value">

                </TableFilterOption>
              </TableFilterSelect>

            </Tooltip>
            <Tooltip content="显示数量">
              <Button type="text" class="btn-divider" size="small">
                <Icon type="android-menu" size="14"></Icon>
              </Button>
            </Tooltip>
            <!--<Tooltip content="导出内容">-->
            <!--<Button type="text" class="btn-divider" size="small" @click="exportData">-->
            <!--<Icon type="ios-download" size="14" ></Icon>-->
            <!--</Button>-->
            <!--</Tooltip>-->
          </div>
          <div class="question-list" style="height: 100%">
            <Table style="height: 100%" :columns="columns1" :data="questions" :show-header="false" :highlight-row="true"
                   :stripe="true" @on-row-click="questionSelect" :loading="questionListLoading" ref="table"></Table>
          </div>
        </Card>
        <div class="card-tip">
          <Row type="flex" justify="end">
            <Page :total="total" size="small" show-total></Page>
          </Row>
        </div>
        </Col>
      </Row>
    </div>
    <!--问题详情 -->
    <QuestionDetail :panelSpread="panelSpread" :uAffixSwitch="uAffixSwitch" :question_id="question_id"></QuestionDetail>
  </div>
</template>

<script>
  import QuestionDetail from '../../project_detail/question/question_detail.vue'
  import qs from 'qs'
  import TableFilterSelect from '../../../common/select/table_filter_select/table-filter-select.vue'
  import TableFilterOption from '../../../common/select/table_filter_select/table-filter-option.vue'

  export default {
    components: {
      QuestionDetail,
      TableFilterSelect,
      TableFilterOption
    },
    data () {
      return {
        queryInfo: {
          question_category: '',
          question_priority: [],
          question_status: [],
          search: '',
          create_user_id: [],
          pointer_user_id: [],
          order: {
            key: 'create_at',
            sort:'asc'
          },
          create_at: {
            start_at: '',
            end_at: ''
          },
          update_at: {
            start_at: '',
            end_at: ''
          },
          finished_at: {
            start_at: '',
            end_at: ''
          },
//          page: 1,
//          size: 10,
        },
        total: 0,
        questions: [],
        question_id: '',
        members: [],
        models: [],
        search: '',
        panelSpread: false,
        uAffixSwitch: false,
        questionListLoading: false,
        orders: [
          {
            label: '问题编号',
            value: 'id'
          },
          {
            label: '优先级',
            value: 'question_priority'
          },
          {
            label: '问题状态',
            value: 'question_status'
          },
          {
            label: '创建时间',
            value: 'create_at'
          },
          {
            label: '更新时间',
            value: 'update_at'
          },
          {
            label: '结束时间',
            value: 'finished_at'
          }
        ],
        columns1: [
          {
            title: '优先级',
            key: 'question_priority',
            width: 50,
            render: (h, params) => {
              let priority = params.row.question_priority
              let colors = this.levelList.filter((priority1) => { return priority1.value === priority })

              return h('Icon', {
                props: {type: 'record', color: colors[0].color}
              }, '')
            }
          },
          {
            title: '编号',
            key: 'id',
            width: 100,
            render: (h, params) => {
              return h('strong', {
                'class': {'app-color': true, 'base-font-size': true},
                style: {'font-size': '14px'}
              }, '#' + params.row.id)
            }
          },
          {
            title: '类型',
            key: '',
            render: (h, params) => {
              let category = params.row.question_category
              let status = params.row.question_status
              let tagColor = 'default'
              let tagName = ''
              let categories = this.categoryList.filter(c => c.state == category)
              if (categories.length > 0) {
                tagColor = categories[0].color
                tagName = categories[0].label
              }

              let statusText, statusColor
              let statusList = this.statusList.filter(c => c.value == status)
              if (statusList.length > 0) {
                statusText = statusList[0].label
                statusColor = statusList[0].color
              }
              return h('div', [
                h('p', {
                  'class': {'app-color': true, 'base-font-size': true},
                  style: {'margin-bottom': '10px', 'margin-top': '10px'}
                }, params.row.question_name),
                h('Row', {props: {type: 'flex', justify: 'start'}}, [
                  h('Col', {props: {span: 3}}, [
                    h('Tooltip', {props: {content: '问题类型', transfer: true, placement: 'top'}}, [
                      h('Tag', {
                        props: {color: tagColor},
                        'class': {'sub-color': true},
                        style: {'margin-bottom': '-10px'}
                      }, tagName)
                    ])
                  ]),
                  h('Col', {props: {span: 3}}, [
                    h('Tooltip', {props: {content: '问题状态', transfer: true, placement: 'top'}}, [

                      h('Button', {
                        props: {type: 'text', icon: 'eye'},
                        style: {'color': statusColor},
                        'class': {'base-font-size': true}
                      }, statusText)
                    ])
                  ]),
                  h('Col', {props: {span: 3}}, [
                    h('Tooltip', {props: {content: '创建人', transfer: true, placement: 'top'}}, [
                      h('Button', {
                        props: {type: 'text', icon: 'ios-person'},
                        'class': {'base-font-size': true, 'sub-color': true}
                      }, params.row.create_user_name)
                    ])
                  ]),
                  h('Col', {props: {span: 3}}, [
                    h('Tooltip', {props: {content: '指派人', transfer: true, placement: 'top'}}, [
                      h('Button', {
                        props: {type: 'text', icon: 'speakerphone'},
                        'class': {'base-font-size': true, 'sub-color': true}
                      }, !params.row.pointer_user_name ? '未指派' : params.row.pointer_user_name)
                    ])
                  ]),
                  h('Col', {props: {span: 3}}, [
                    h('Tooltip', {props: {content: '完成时间', transfer: true, placement: 'top'}}, [
                      h('Button', {
                        props: {type: 'text', icon: 'ios-clock-outline'},
                        'class': {'base-font-size': true, 'sub-color': true}
                      }, params.row.finished_at ? params.row.finished_at : '未设置')
                    ])
                  ]),
                  h('Col', {props: {span: 3, offset: 1}}, [
                    h('Tooltip', {props: {content: '更新时间', transfer: true, placement: 'top'}}, [
                      h('Button', {
                        props: {type: 'text', icon: 'ios-clock-outline'},
                        'class': {'base-font-size': true, 'sub-color': true}
                      }, params.row.update_at)
                    ])
                  ])
                ])
              ], '')
            }
          }
        ],

      }
    },
    watch: {
      '$route.query': 'init'
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.$store.dispatch('getQuestionLevels')
        this.$store.dispatch('getQuestionCategories')
        this.$store.dispatch('getAllStatus')
        this.listQuestion()
        this.listMember()
      },
      questionSelect (row) {
        this.question_id = row.id
        this.open()
      },
      open () {
        this.panelSpread = !this.panelSpread
        this.uAffixSwitch = !this.uAffixSwitch
      },
      listQuestion () {
        this.questionListLoading = true
        this.queryInfo['project_id'] = this.$route.query.project_id
        this.$http.post('/api/project/question/list', qs.stringify(this.queryInfo)).then(response => {
          let res = response.data
          this.questionListLoading = false
          if (res.code === '00000') {
            let data = res.data
            this.total = data.total
            this.questions = data.list
          } else {
            this.$Message.error(data.message)
          }
        }).catch(e => {
          console.info(e)
          this.questionListLoading = false
          this.$Message.error(e.data.message)
        })
      },
      listMember () {
        this.$http.get('/api/project/member/listMembers', {
          params: {
            project_id: this.$route.query.project_id
          }
        })
          .then(response => {
            let data = response.data
            if (data.code = '00000') {
              this.members = data.data
            }
          }).catch(error => {
          this.$Message.error(error.data.message)
        })
      },
      updateQuestionCreateAt (n, o) {
        this.queryInfo.create_at.start_at = n[0]
        this.queryInfo.create_at.end_at = n[1]
        this.listQuestion()
      },
      updateQuestionUpdateAt (n) {
        this.queryInfo.update_at.start_at = n[0]
        this.queryInfo.update_at.end_at = n[1]
        this.listQuestion()
      },
      updateQuestionFinishedAt (n) {
        this.queryInfo.finished_at.start_at = n[0]
        this.queryInfo.finished_at.end_at = n[1]
        this.listQuestion()
      },
      exportData () {
        this.$refs.table.exportCsv({
          filename: '问题列表'
        })
      },
      orderSelected (selectValue,asc) {
        this.queryInfo.order = {
          key:selectValue,
          sort:asc
        }
        this.listQuestion();
      }
    },
    computed: {
      questionListContainerSpread () {
        return this.panelSpread ? 'question-list-container-spread' : 'question-list-container-hide'
      },
      levelList () {
        return this.$store.getters.allQuestionLevel
      },
      categoryList () {
        return this.$store.getters.allQuestionCategory
      },
      statusList () {
        return this.$store.getters.allQuestionStatus
      },
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped type="text/stylus" lang="stylus">
  @import "../../../../style/base.styl"
  @import "../../../../style/project/project.styl"
  .question-container
    display flex
    width 100%
    position relative
    overflow-x hidden
    .question-list-container
      position relative
      z-index 9
      width 100%
      padding 20px 20px
      transition left 0.3s ease
      overflow-x hidden
      overflow-y scroll
      .question-filter-card
      .question-list-card
        height 95%
        position relative
        .question-list-card-tool
          position relative
          display flex
          left 0

  .btn-divider
    border-right 1px solid $-hr-color
    border-radius 0
    width 48px

  .question-list-container-spread
    left -40%

  .question-list-container-hide
    left 0

  .remove-border
    border 1px solid #fff !important

</style>
