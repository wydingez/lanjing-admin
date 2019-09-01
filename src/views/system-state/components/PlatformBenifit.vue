<template>
  <div class="platform-benifit">
    <el-divider class="platform-benifit-split">
      平台利润收益
    </el-divider>
    <div class="filter-container">
      <el-date-picker
        v-model="rangeDate"
        class="filter-item-date"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="rangeDateOptions"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="doSearch"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="default"
        icon="el-icon-delete"
        @click="doClear"
      >
        清空
      </el-button>
      <div class="filter-tip">
        <span class="filter-tip-left">
          所选时间段平台累计收益：
          <el-tag
            type="success"
            effect="dark"
          >￥ {{ periodProfit }}</el-tag>
        </span>
        <span class="filter-tip-right">
          平台累计收益：
          <el-tag
            type="success"
            effect="dark"
          >￥ {{ totalProfit }}</el-tag>
        </span>
      </div>
    </div>

    <table-pagenation
      ref="tp"
      :ajax="ajax"
    >
      <el-table-column
        label="日期"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.statisticsDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收益（元）"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.income }}</span>
        </template>
      </el-table-column>
    </table-pagenation>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TablePagenation from '@/components/TablePagination/index.vue'
import { parseTime } from '@/utils/index'
import { getSysTotalProfit, getSysPeriodProfit } from '@/api/sys-status'

function getLastMonth() {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
  return [start, end]
}

@Component({
  name: 'ComplexTable',
  components: {
    TablePagenation
  }
})
export default class extends Vue {
  private rangeDate: any[] = getLastMonth()
  private totalProfit: number = 0
  private periodProfit: number = 0

  private rangeDateOptions = {
    shortcuts: [{
      text: '最近一周',
      onClick(picker:Vue) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick(picker:Vue) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick(picker:Vue) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }]
  }

  private get ajax() {
    return {
      url: '/sys-status/query/profit',
      params: {
        startDate: parseTime(this.rangeDate[0]),
        endDate: parseTime(this.rangeDate[1])
      }
    }
  }

  private doSearch() {
    this.getTPProfit();
    (this.$refs.tp as TablePagenation).doSearch()
  }

  private doClear() {
    this.rangeDate = []
    this.doSearch()
  }

  private async getTPProfit() {
    const res2 = await getSysPeriodProfit({
      startDate: parseTime(this.rangeDate[0]),
      endDate: parseTime(this.rangeDate[1])
    })
    this.periodProfit = res2.data
    const res1 = await getSysTotalProfit()
    this.totalProfit = res1.data
  }

  async created() {
    this.getTPProfit()
  }
}
</script>

<style lang="scss">
.platform-benifit {
  .el-divider__text {
    background-color: transparent;
    font-size: 20px;
  }
  .filter-container {
    text-align: center;
    margin: 10px;
    .filter-tip {
      margin-top: 10px;
      &-left {
        margin-right: 20px;
      }
    }
    .filter-item-date {
      margin-right: 10px;
    }
  }
}

@media (max-width:550px) {
  .platform-benifit .el-divider__text {
    font-size: 14px;
  }
}
</style>
