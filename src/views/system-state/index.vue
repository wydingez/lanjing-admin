<template>
  <div class="system-state-container">
    <panel-group />

    <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <radar-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <PlatformBenifit></PlatformBenifit>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import PanelGroup from './components/PanelGroup.vue'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'
import RadarChart from './components/RadarChart.vue'
import PlatformBenifit from './components/PlatformBenifit.vue'

@Component({
  name: 'system-state',
  components: {
    BarChart,
    PieChart,
    RadarChart,
    PanelGroup,
    PlatformBenifit
  }
})
export default class extends Vue {
}
</script>

<style lang="scss">
.system-state-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

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
