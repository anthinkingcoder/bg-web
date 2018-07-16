<template>
  <div>
    <Card class="append_question_trend">
      <p slot="title">
        <Icon type="stats-bars">
        </Icon>
        人员问题占比
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
      this.listMemberQuestionRadio()
    },
    watch: {
      '$route.query': 'listMemberQuestionRadio'
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
          color: ['#19be6b', '#f1494e', '#145587', '#115527'],
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
            left: 'center',
            bottom: '10',
            data: [
              {
                name: '未指派',
                icon: 'circle'
              },
              {
                name: 'zhoulin',
                icon: 'circle'
              }
            ]
          },
          series: [
            {
              name: '问题',
              type: 'pie',
              smooth: true,
              radius: ['0', '65%'],
              symbolSize: 1,
              data: [
                {
                  value: 10, name: '未指派'
                },
                {
                  value: 3, name: 'zhoulin'
                }
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
      listMemberQuestionRadio () {
        this.spinShow = true
        this.$http.get('/api/sta/listMemberQuestionRadio', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          let list = data.data
          if (list && list.length > 0) {
            this.option.legend.data = list.map(item => {
              if (!item.name) {
                return '未指派'
              } else {
                return item.name
              }
            })
            this.option.series[0].data = list.map(item => {
              return {
                name: item.name ? item.name : '未指派',
                value: item.num
              }
            })
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
    height 450px
    position relative

  .aqt-echart
    width 100%
    height 400px
    position absolute
    top 0
    left -30px
</style>
