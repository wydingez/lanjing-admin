<template>
  <div class="platform-benifit">
    <el-divider class="platform-benifit-split">平台利润收益</el-divider>
    <div class="filter-container">
      <el-date-picker
        class="filter-item-date"
        v-model="rangeDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="rangeDateOptions">
      </el-date-picker>
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
          <el-tag type="success" effect="dark">￥1000</el-tag>
        </span>
        <span class="filter-tip-right">
          平台累计收益：
          <el-tag type="success" effect="dark">￥1000</el-tag>
        </span>
      </div>
    </div>
  
    <table-pagenation :ajax="ajax" ref="tp">
      <el-table-column
        label="日期"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收益（元）"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>
    </table-pagenation>  
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TablePagenation from '@/components/TablePagination/index.vue'

@Component({
  name: 'ComplexTable',
  components: {
    TablePagenation
  }
})
export default class extends Vue {
  private rangeDate = ''
  private rangeDateOptions = {
    shortcuts: [{
      text: '最近一周',
      onClick(picker:Vue) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick(picker:Vue) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick(picker:Vue) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }]
  }

  private get ajax () {
    return {
      url: '/xxxx',
      params: {
        rangeDate: this.rangeDate
      }
    }
  }

  private doSearch () {
    (this.$refs.tp as TablePagenation).doSearch()
  }

  private doClear() {
    this.rangeDate = ''
    this.doSearch()
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

