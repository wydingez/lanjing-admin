<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
      >
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon
            name="peoples"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总用户数
          </div>
          <count-to
            :start-val="0"
            :end-val="balanceData.memberNum"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
      >
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon
            name="message"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总访问量
          </div>
          <count-to
            :start-val="0"
            :end-val="balanceData.visitCounts"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
      >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon
            name="money"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            历史成交金额
          </div>
          <count-to
            :start-val="0"
            :end-val="balanceData.transSum"
            :duration="3200"
            :decimals="2"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
      >
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon
            name="shopping"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            历史成交量
          </div>
          <count-to
            :start-val="0"
            :end-val="balanceData.transNum"
            :duration="3600"
            class="card-panel-num"
          />
          蓝晶
        </div>
      </div>
    </el-col>

    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
      >
        <div class="card-panel-icon-wrapper icon-money per">
          <svg-icon
            name="money"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            当前挂单数
          </div>
          <count-to
            :start-val="0"
            :end-val="balanceData.agencyNum"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
      >
        <div class="card-panel-icon-wrapper icon-shopping per">
          <svg-icon
            name="shopping"
            class="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            当前挂单金额
          </div>
          <count-to
            :start-val="0"
            :end-val="balanceData.agencySum"
            :duration="3600"
            :decimals="2"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CountTo from 'vue-count-to'
import { getSysBalance } from '@/api/sys-status'

interface BalanceData {
  agencyNum: number,
  agencySum: string | number,
  memberNum: number,
  onlineCounts: number,
  transNum: number,
  transSum: string | number,
  visitCounts: number,
}

@Component({
  name: 'PanelGroup',
  components: {
    CountTo
  }
})
export default class extends Vue {
  private balanceData: BalanceData = {
    agencyNum: 0,
    agencySum: 0,
    memberNum: 0,
    onlineCounts: 0,
    transNum: 0,
    transSum: 0,
    visitCounts: 0
  }

  private handleSetLineChartData(type: string) {
    this.$emit('handleSetLineChartData', type)
  }

  async created() {
    const { data } = await getSysBalance()
    data.agencySum = Number(data.agencySum)
    data.transSum = Number(data.transSum)
    this.balanceData = data
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
      &.per {
        color: pink
      }
    }

    .icon-shopping {
      color: #34bfa3;
      &.per {
        color: green
      }
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
