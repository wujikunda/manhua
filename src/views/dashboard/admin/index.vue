<template>
  <div class="dashboard-editor-container">
    <div class="search-bar" style="display: flex">
      <div class="form-item">
        <span class="item-title">时间：</span>
        <el-date-picker
          v-model="tempDateRange"
          type="datetimerange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </div>
      <div class="form-item" style="margin-left: 30px;">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </div>
    </div>
    <panel-group :panel-data="panelData" @handleSetLineChartData="handleSetLineChartData" />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import { getHomeData } from '@/api/manhua'
import { parseTime } from '@/utils'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup
  },
  data() {
    return {
      tempDateRange: [
      ],
      dataQuery: {
        startTime: '',
        endTime: ''
      },
      panelData: {
        favorite: 0,
        recharge: 0,
        regmen: 0,
        withdraw: 0
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      lineChartData: lineChartData.newVisitis
    }
  },
  created() {
    this.initData()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    reset() {
      this.dataQuery = {
        timeType: 'D',
        beginDate: ''
      }
      this.tempDateRange = []
      this.search()
    },
    // 搜索
    search() {
      this.fetchData()
    },
    async fetchData() {
      const length = this.tempDateRange.length
      console.log('this.tempDateRange', this.tempDateRange)
      this.dataQuery.startTime = length ? this.tempDateRange[0] : ''
      this.dataQuery.endTime = length ? this.tempDateRange[1] : ''
      const res = await getHomeData(this.dataQuery)
      this.panelData = res.data
      console.log('this.panelData', this.panelData)
    },
    async initData() {
      this.dataQuery.startTime = parseTime(new Date().getTime() - 3600 * 1000 * 24 * 7)
      this.dataQuery.endTime = parseTime(new Date())
      const res = await getHomeData(this.dataQuery)
      this.panelData = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
