<template>
  <div class="parameter-setting">
    <el-row type="flex" justify="center">
      <el-col :lg="6" :sm="12" :xs="24">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-card shadow="hover" class="parameter-setting-card">
            <div slot="header" class="title clearfix">
              <span>蓝晶挂单数量设定</span>
              <el-button style="float: right;" type="primary" size="small">保存</el-button>
            </div>
            <el-form-item label="上限">
              <el-input-number v-model="form.amoutMin" :precision="0" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item label="下限">
              <el-input-number v-model="form.amoutMax" :precision="0" :step="1"></el-input-number>
            </el-form-item>
          </el-card>

          <el-card shadow="hover" class="parameter-setting-card">
            <div slot="header" class="title clearfix">
              <span>蓝晶挂单金额设定</span>
              <el-button style="float: right;" type="primary" size="small">保存</el-button>
            </div>
            <el-form-item label="上限">
              <el-input-number v-model="form.priceMin" :precision="2" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item label="下限">
              <el-input-number v-model="form.priceMax" :precision="2" :step="1"></el-input-number>
            </el-form-item>
          </el-card>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'parameter-setting'
})
export default class extends Vue {
  private form = {
    amoutMin: '',
    amoutMax: '',
    priceMin: '',
    priceMax: ''
  };

  private onSubmit() {
    this.$message('submit!')
  }

  private onCancel() {
    this.$message({
      message: 'cancel!',
      type: 'warning'
    })
  }
}
</script>

<style lang="scss">
.parameter-setting {
  &-card {
    margin-top: 50px;
    .title {
      line-height: 32px;
    }
  }
}
</style>
