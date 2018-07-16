<template>
  <div>
    <Card class="append_question_trend">
      <p slot="title">
        <Icon type="stats-bars">
        </Icon>
        新增问题类型趋势
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
    mounted () {
      this.initCharts()
      this.listNewTrendOfQuestionCategory();
    },
    watch: {
      '$route.query': 'listNewTrendOfQuestionCategory'
    },
    beforeDestroy () {
      // 销毁echart
      if (this.chart) {
        this.chart.dispose()
      }
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
              }]
          },
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 60
            },
            data: ['11-30', '12-01', '12-02', '12-03',
              '12-04', '12-05', '12-06', '12-07',
              '12-08', '12-09', '12-10', '12-11',
              '12-12', '12-13', '12-14', '12-15',
              '12-16', '12-17', '12-18', '12-19',
              '12-20', '12-21', '12-22', '12-23',
              '12-24', '12-25', '12-26', '12-27',
              '12-28', '12-29', '12-30']
          },
          yAxis: {
            minInterval: 5,
            type: 'value'
          },
          series: [
            {
              name: '功能',
              type: 'line',
              smooth: true,
              symbolSize: 1,
              areaStyle: {normal: {}},
              data: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0]
            },
            {
              name: '任务',
              type: 'line',
              smooth: true,
              symbolSize: 1,
              areaStyle: {normal: {}},
              data: [0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0]
            },
            {
              name: 'bug',
              type: 'line',
              smooth: true,
              symbolSize: 1,
              areaStyle: {normal: {}},
              data: [0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0]
            }
          ]
        }
      }
    },
    methods: {
      initCharts () {
        this.chart = echarts.init(this.$refs.aqt_echart)
        this.chart.setOption(this.option)
      },
      listNewTrendOfQuestionCategory () {
        this.$http.get('/api/sta/listNewTrendOfQuestionCategory', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          let list = data.data;
          if (list) {
            this.option.xAxis.data = list['bugs'].map(item =>item.date);
            this.option.series[0].data = list['fnc'].map(item =>item.num);

            this.option.series[1].data = list['tasks'].map(item =>item.num);

            this.option.series[2].data = list['bugs'].map(item =>item.num);
            this.initCharts();

          }

        }).catch(e => {
          console.info(e);
          this.$Message.error('数据错误')
        })
      }
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
