<template>
  <div>
    <Card class="append_question_trend">
      <p slot="title">
        <Icon type="stats-bars">
        </Icon>
        项目进度
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
      this.listWorkScheduleCount();
    },
    watch: {
      '$route.query': 'listWorkScheduleCount'
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
          color: ['#19be6b', '#ccc'],
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              animation: false
            }
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: [
              {
                name: '已完成',
                icon: 'circle'
              },
              {
                name: '待完成',
                icon: 'circle'
              }
            ]
          },
          series: [
            {
              name: '项目进度',
              type: 'pie',
              smooth: true,
              radius: ['55%', '65%'],
              symbolSize: 1,
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
              ]
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
      listWorkScheduleCount () {
        this.spinShow = true
        this.$http.get('/api/sta/listWorkScheduleCount', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          let list = data.data
          this.option.series[0].data = [{value:list['finished'].value,name: '已完成'},{value:list['unfinished'].value,name: '待完成'}]
          this.initCharts()
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
    height 450px
    position relative

  .aqt-echart
    width 100%
    height 400px
    position absolute
    top 0
    left -30px
</style>
