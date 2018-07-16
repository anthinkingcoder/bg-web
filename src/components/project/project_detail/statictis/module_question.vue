<template>
  <div>
    <Card class="append_question_trend">
      <p slot="title">
        <Icon type="stats-bars">
        </Icon>
        各模块问题统计
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
      this.listModel()
      this.initCharts()
    },
    watch: {
      '$route.query': 'listModel'
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
          color: ['#145587'],
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
            data: []
          },
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 0
            },
            data: ['用户管理', '菜单管理', '新闻管理', '统计模块', 'review']
          },
          yAxis: {
            minInterval: 5,
            type: 'value'
          },
          series: [
            {
              name: '问题数量',
              type: 'bar',
              smooth: true,
              data: [1, 2, 3, 4, 1]
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
      listModel () {
        this.spinShow = true
        this.$http.get('/api/sta/listModel', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          let list = data.data
          if (list && list.length > 0) {
            this.option.xAxis.data = list.map(item => {
              if (!item.model_name) {
                return '公共模块'
              } else {
                return item.model_name
              }
            })
            this.option.series[0].data = list.map(item => item.num)
            this.initCharts()
          }
          this.spinShow = false

        }).catch(e => {
          console.info(e);
          this.spinShow = false
          this.$Message.error(e)
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
