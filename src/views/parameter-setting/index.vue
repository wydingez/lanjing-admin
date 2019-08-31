<template>
  <div class="parameter-setting">
    <el-row
      type="flex"
      justify="center"
    >
      <el-col
        :lg="6"
        :sm="12"
        :xs="24"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-card
            shadow="hover"
            class="parameter-setting-card"
          >
            <div
              slot="header"
              class="title clearfix"
            >
              <span>蓝晶挂单数量设定</span>
              <el-button
                style="float: right;"
                type="primary"
                size="small"
                @click="doSaveParams('amount')"
              >
                保存
              </el-button>
            </div>
            <el-form-item label="上限">
              <el-input-number
                v-model="form.amoutMin"
                :precision="0"
                :step="1"
              />
            </el-form-item>
            <el-form-item label="下限">
              <el-input-number
                v-model="form.amoutMax"
                :precision="0"
                :step="1"
              />
            </el-form-item>
          </el-card>

          <el-card
            shadow="hover"
            class="parameter-setting-card"
          >
            <div
              slot="header"
              class="title clearfix"
            >
              <span>蓝晶挂单金额设定</span>
              <el-button
                style="float: right;"
                type="primary"
                size="small"
                @click="doSaveParams('price')"
              >
                保存
              </el-button>
            </div>
            <el-form-item label="上限">
              <el-input-number
                v-model="form.priceMin"
                :precision="2"
                :step="0.1"
              />
            </el-form-item>
            <el-form-item label="下限">
              <el-input-number
                v-model="form.priceMax"
                :precision="2"
                :step="0.1"
              />
            </el-form-item>
          </el-card>

          <el-card
            shadow="hover"
            class="parameter-setting-card"
          >
            <div
              slot="header"
              class="title clearfix"
            >
              <span>蓝晶挂交易收益比例</span>
              <el-button
                style="float: right;"
                type="primary"
                size="small"
                @click="doSaveParams('rate')"
              >
                保存
              </el-button>
            </div>
            <el-form-item label="收益比例">
              <el-input-number
                v-model="form.priceRate"
                :precision="2"
                :step="0.01"
              />
            </el-form-item>
          </el-card>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getSysParamsList, doUpdateSysParam } from '@/api/sys-params'

@Component({
  name: 'parameter-setting'
})
export default class extends Vue {
  private form = {
    amoutMin: 0,
    amoutMax: 0,
    priceMin: 0,
    priceMax: 0,
    priceRate: 0
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

  private async doSaveParams(type: string) {
    if (type === 'amount') {
      await doUpdateSysParam({
        paramName: 'AGENCY_MIN_VALUE',
        paramValue: this.form.amoutMin
      })
      await doUpdateSysParam({
        paramName: 'AGENCY_MAX_VALUE',
        paramValue: this.form.amoutMax
      })
    } else if (type === 'price') {
      await doUpdateSysParam({
        paramName: 'AGENCY_MIN_UNIT_PRICE',
        paramValue: this.form.priceMin
      })
      await doUpdateSysParam({
        paramName: 'AGENCY_MAX_UNIT_PRICE',
        paramValue: this.form.priceMax
      })
    } else if (type === 'rate') {
      await doUpdateSysParam({
        paramName: 'AGENCY_TRADE_RATE',
        paramValue: this.form.priceRate
      })
    }
    this.$message.success('保存成功')
  }

  async created() {
    const { data } = await getSysParamsList()
    const params = data.rows
    this.form.amoutMin = params.find((item: any) => item.paramName === 'AGENCY_MIN_VALUE').paramValue
    this.form.amoutMax = params.find((item: any) => item.paramName === 'AGENCY_MAX_VALUE').paramValue
    this.form.priceMin = params.find((item: any) => item.paramName === 'AGENCY_MIN_UNIT_PRICE').paramValue
    this.form.priceMax = params.find((item: any) => item.paramName === 'AGENCY_MAX_UNIT_PRICE').paramValue
    this.form.priceRate = params.find((item: any) => item.paramName === 'AGENCY_TRADE_RATE').paramValue
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
