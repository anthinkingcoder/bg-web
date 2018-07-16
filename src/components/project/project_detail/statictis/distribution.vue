<template>
  <div>
    <Card class="append_question_trend">
      <p slot="title">
        <Icon type="stats-bars">
        </Icon>
        人员及问题分布
      </p>
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div ref="aqt_echart" class="aqt-echart"></div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts/lib/chart/line'

  export default {
    created () {
      this.$store.dispatch('getQuestionCategories')
    },
    watch: {
      '$route.query': 'listNewTrendOfQuestionCategory'
    },
    mounted () {
      this.initCharts()
      this.listNewTrendOfQuestionCategory()
    },
    beforeDestroy () {
      // 销毁echart
      if (this.chart) {
        this.chart.dispose()
      }
    },
    computed: {
      categoryList () {
        return this.$store.getters.allQuestionCategory
      },
    },
    data () {
      return {
        spinShow:false,
        chart: '',
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
                name: '功能',
                icon: 'circle'
              },
              {
                name: '任务',
                icon: 'circle'
              },
              {
                name: 'bug',
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
              name: '任务',
              type: 'bar',
              smooth: true,
              symbolSize: 1,
              areaStyle: {normal: {}},
              data: [1, 2, 3, 4, 1]
            },
            {
              name: 'bug',
              type: 'bar',
              smooth: true,
              symbolSize: 1,
              areaStyle: {normal: {}},
              data: [2, 2, 2, 4, 1]
            },
            {
              name: '功能',
              type: 'bar',
              smooth: true,
              symbolSize: 1,
              areaStyle: {normal: {}},
              data: [3, 1, 3, 3, 1]
            }
          ]
        }
      }
    },
    methods: {
      initCharts () {
        this.chart = echarts.init(this.$refs.aqt_echart)
        this.option.legend.data = this.categoryList.map((item) => {
          return {
            name: item.label,
            icon: 'circle'
          }
        })
        this.option.color = this.categoryList.map(item => item.color)
        this.chart.setOption(this.option)
      },
      listNewTrendOfQuestionCategory () {
        this.spinShow = true
        this.$http.get('/api/sta/listMemberAndQuestionDistribution', {
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
          this.option.series[0].data = list.map(item => {
            let value = 0;
            item.forEach(e => {
              if (e.question_category === 0) {
                value = e.num;
              }
            })
            return value;
          })

          this.option.series[1].data = list.map(item => {
            let value = 0;
            item.forEach(e => {
              if (e.question_category === 1) {
                value = e.num;
              }
            })
            return value;
          })

          this.option.series[2].data = list.map(item => {
            let value = 0;
            item.forEach(e => {
              if (e.question_category === 2) {
                value = e.num;
              }
            })
            return value;
          })
          this.initCharts()
          this.spinShow = false

        }).catch(e => {
          console.info(e);
          this.spinShow = false
          this.$Message.error(e)
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/stylus" lang="stylus">
  .append_question_trend
    height 300px
    position relative

  .aqt-echart
    width 100%
    height 250px
    position absolute
    top 50px
    left -30px
</style>
