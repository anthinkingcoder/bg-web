<template>
  <div>
    <Card class="append_question_trend">
      <p slot="title">
        <Icon type="stats-bars">
        </Icon>
        优先级
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
      this.$store.dispatch('getQuestionLevels')
    },
    watch: {
      '$route.query': 'listQuestionPriorityCount'
    },
    computed: {
      levelList () {
        return this.$store.getters.allQuestionLevel
      }
    },
    mounted () {
      this.initCharts()
      this.listQuestionPriorityCount();
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
                name: '高',
                icon: 'circle'
              },
              {
                name: '中',
                icon: 'circle'
              },
              {
                name: '低',
                icon: 'circle'
              }
            ]
          },
          series: [
            {
              name: '优先级',
              type: 'pie',
              smooth: true,
              radius: ['0', '65%'],
              symbolSize: 1,
              data: [
                {
                  value: 4, name: '高'
                },
                {
                  value: 3, name: '中'
                },
                {
                  value: 2, name: '低'
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
        this.option.legend.data = this.levelList.map((item) => {
          return {
            name: item.label,
            icon: 'circle'
          }
        })
        this.option.color = this.levelList.map(item => item.color)
        this.chart.setOption(this.option)
      },
      listQuestionPriorityCount () {
        this.spinShow = true
        this.$http.get('/api/sta/listQuestionPriorityCount', {
          params: {
            project_id: this.$route.query.project_id
          }
        }).then(response => {
          let data = response.data
          let list = data.data
           if (list && list.length > 0) {
             this.option.series[0].data = list.map(item => {
               let name = 0;
               this.levelList.forEach(level => {
                 if (item.question_priority === level.value) {
                   name = level.label;
                 }
               })
               return  {
                 name: name,
                 value:item.num
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
