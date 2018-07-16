<template>
  <div>
    <Card class="append_question_trend">
      <p slot="title">
        <Icon type="stats-bars">
        </Icon>
        人员工作进度
      </p>
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div ref="aqt_echart" class="aqt-echart"></div>
    </Card>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts/lib/chart/line'

  export default {
    created () {
      this.$store.dispatch('getAllStatus')
    },
    watch: {
      '$route.query': 'listMemberWorkSchedule'
    },
    mounted () {
      this.initCharts()
      this.listMemberWorkSchedule()
    },
    beforeDestroy () {
      // 销毁echart
      if (this.chart) {
        this.chart.dispose()
      }
    },
    computed: {
      statusList () {
        return this.$store.getters.allQuestionStatus
      }
    },
    data () {
      return {
        chart: '',
        spinShow:false,
        option: {
          color: ['#19be6b', '#f1494e', '#145587'],
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          legend: {
            data: [
              {
                name: '新建',
                icon: 'circle'
              },
              {
                name: '处理中',
                icon: 'circle'
              },
              {
                name: '已解决',
                icon: 'circle'
              },
              {
                name: '已忽略',
                icon: 'circle'
              },
              {
                name: '待反馈',
                icon: 'circle'
              },
              {
                name: '已关闭',
                icon: 'circle'
              },
              {
                name: '重新打开',
                icon: 'circle'
              }
            ]
          },
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 0
            },
            data: ['zhoulin', '周晟成', '可笑的霸王', '可笑的虞姬', '可笑的刘邦']
          },
          yAxis: {
            minInterval: 5,
            type: 'value'
          },
          series: [
            {
              name: '新建',
              type: 'bar',
              smooth: true,
              stack: '工作进度',
              data: [1, 2, 3, 4, 1]
            },
            {
              name: '处理中',
              type: 'bar',
              smooth: true,
              stack: '工作进度',
              data: [1, 2, 3, 4, 1]
            },
            {
              name: '已解决',
              type: 'bar',
              smooth: true,
              stack: '工作进度',
              data: [1, 2, 3, 4, 1]
            },
            {
              name: '已忽略',
              type: 'bar',
              smooth: true,
              stack: '工作进度',
              data: [1, 2, 3, 4, 1]
            },
            {
              name: '待反馈',
              type: 'bar',
              smooth: true,
              stack: '工作进度',
              data: [1, 2, 3, 4, 1]
            },
            {
              name: '已关闭',
              type: 'bar',
              smooth: true,
              stack: '工作进度',
              data: [1, 2, 5, 4, 1]
            },
            {
              name: '重新打开',
              type: 'bar',
              smooth: true,
              stack: '工作进度',
              data: [1, 2, 3, 4, 1]
            }
          ]
        }
      }
    },
    methods: {
      initCharts () {
        this.chart = echarts.init(this.$refs.aqt_echart)
        this.option.legend.data = this.statusList.map((item) => {
          return {
            name: item.label,
            icon: 'circle'
          }
        })
        this.option.color = this.statusList.map(item => item.color)
        this.chart.setOption(this.option)
      },
      listMemberWorkSchedule () {
        this.spinShow = true
        this.$http.get('/api/sta/listMemberWorkSchedule', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          let list = data.data
          this.option.xAxis.data = list.map(item => {
            if (item && item.length > 0) {
              if (!item[0].user_name) {
                return '未指派'
              } else {
                return item[0].user_name
              }
            }
          })
          for (let i = 0; i < 7; i++) {
            this.option.series[i].data = list.map(item => {
              let value = 0
              item.forEach(e => {
                if (e.question_status === i) {
                  value = e.num
                }
              })
              return value
            })
          }

          this.initCharts()
          this.spinShow = false

        }).catch(e => {
          console.info(e);
          this.spinShow = false
          this.$Message.error(e)
        })
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .append_question_trend
    height 450px
    position relative

  .aqt-echart
    width 100%
    height 400px
    position absolute
    top 50px
    left -30px
</style>
