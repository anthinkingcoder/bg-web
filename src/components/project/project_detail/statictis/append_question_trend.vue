<template>
  <div>
    <Card class="append_question_trend">
      <p slot="title">
        <Icon type="stats-bars">
        </Icon>
        新增问题趋势
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
    mounted () {
//      this.initCharts()
      this.listNewTrendOfQuestion();
    },
    watch: {
      '$route.query': 'listNewTrendOfQuestion'
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
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 60
            },
            data: []
          },
          yAxis: {
            minInterval: 5
          },
          series: [{
            name: '问题数量',
            type: 'line',
            smooth: true,
            symbolSize: 1,
            areaStyle: {normal: {}},
            data: []
          }]
        }
      }
    },
    beforeDestroy () {
      // 销毁echart
      if (this.chart) {
        this.chart.dispose()
      }
    },
    methods: {
      initCharts () {
        this.chart = echarts.init(this.$refs.aqt_echart)
        this.chart.setOption(this.option)
      },
      listNewTrendOfQuestion () {
        this.spinShow = true
        this.$http.get('/api/sta/listNewTrendOfQuestion', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          let list = data.data;
          if (list && list.length > 0) {
            this.option.xAxis.data = list.map(item =>item.date);
            this.option.series[0].data = list.map(item =>item.num);
            this.initCharts();
          }
          this.spinShow = false

        }).catch(e => {
          this.spinShow = false
          console.info(e);
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
    top 30px
    left -30px
</style>
