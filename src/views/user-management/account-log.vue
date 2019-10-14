<template>
  <div>
    <div class="filter-condition">
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
    </div>
    <TablePagination
      ref="tp"
      :ajax="ajax"
      :page-params.sync="pageParams"
    >
      <el-table-column
        label="序号"
        align="center"
        width="120px"
      >
        <template slot-scope="scope">
          <span>{{ (pageParams.pageNum - 1 ) * pageParams.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="流水号"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.streamNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作类型"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.streamType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="金额"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.streamAmount }}</span>
        </template>
      </el-table-column>
    </TablePagination>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import TablePagination from '@/components/TablePagination/index.vue'
import { parseTime } from '@/utils/index'

function getLastMonth() {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
  return [start, end]
}

@Component({
  name: 'account-log',
  components: {
    TablePagination
  }
})
export default class extends Vue {
  @Prop({ required: true }) private userId!: number

  private pageParams = {}
  private rangeDate: any[] = getLastMonth()
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
      url: '/membership/fund-list',
      params: {
        userId: this.userId,
        startDate: parseTime(this.rangeDate[0]),
        endDate: parseTime(this.rangeDate[1])
      }
    }
  }

  private doSearch() {
    (this.$refs.tp as TablePagination).doSearch()
  }

  private doClear() {
    this.rangeDate = []
    this.$nextTick(() => {
      this.doSearch()
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
