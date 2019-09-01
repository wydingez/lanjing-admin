<template>
  <div class="app-container presentation-audit">
    <h3>提现审核队列</h3>
    <span class="tip">
      (最早申请实名的越靠前， 先审核)
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-refresh"
        @click="doSearch"
      >
        刷新
      </el-button>
    </span>
    <table-pagination
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
        label="审核用户"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.auditUser }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="¥ 提现金额"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.withdrawAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="提现时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.withdrawDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核意见"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.auditDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="提现状态"
        align="center"
      >
        <template slot-scope="scope">
          <span :style="{color: getColors(scope.row.status)}">{{ getStatusDesc(scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 'TO_BE_AUDIT'"
            type="primary"
            size="mini"
            @click="audit(scope.row)"
          >
            审核
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="audit(scope.row, true)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </table-pagination>

    <el-dialog
      title="提现审核"
      :visible.sync="dialog"
      width="500px"
      top="50px"
      center
    >
      <ul class="presentation-audit-content">
        <li>
          <span class="label">流水单号：</span>
          <span class="content">{{ auditItem.streamNo }}</span>
        </li>
        <li>
          <span class="label">单据状态：</span>
          <span class="content">{{ getStatusDesc(auditItem.status) }}</span>
        </li>
        <li>
          <span class="label">审核用户：</span>
          <span class="content">{{ auditItem.auditUser }}</span>
        </li>
        <li>
          <span class="label">提现金额：</span>
          <span class="content">￥ {{ auditItem.withdrawAmount }}</span>
        </li>
        <li>
          <span class="label">提现时间：</span>
          <span class="content">{{ auditItem.withdrawDate }}</span>
        </li>
        <li>
          <span class="label">提现备注：</span>
          <span class="content">{{ auditItem.withdrawDesc }}</span>
        </li>
        <li>
          <span class="label">审核意见：</span>
          <span class="content">
            <span v-if="auditItem.isView">{{ auditDesc }}</span>
            <el-input
              v-else
              v-model="auditDesc"
              style="width: 200px;"
            />
          </span>
        </li>
      </ul>
      <span
        v-if="!auditItem.isView"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="approve"
        >审核通过</el-button>
        <el-button @click="reject">审核不通过</el-button>
      </span>
      <span class="tip">审核结果反馈到列表和⽤户中⼼， 启动⽀付宝接⼝完成转当审核完成之后， 早审核的放在越后⾯账，并反馈⽀付宝到账结果到账户中⼼</span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TablePagination from '@/components/TablePagination/index.vue'
import { doAuditWithdrawApprove, doAuditWithdrawReject } from '@/api/audit'

@Component({
  name: 'presentation-audit',
  components: {
    TablePagination
  }
})
export default class extends Vue {
  private pageParams = {}
  private dialog:boolean = false
  private auditDesc : string = ''
  private auditItem = {
    auditUser: '',
    status: '',
    streamNo: '',
    withdrawAmount: '',
    withdrawDate: '',
    withdrawDesc: '',
    isView: false
  }

  private audit(row: any, isView: Boolean) {
    this.dialog = true
    this.auditDesc = ''
    this.auditItem.auditUser = row.auditUser
    this.auditItem.status = row.status
    this.auditItem.streamNo = row.streamNo
    this.auditItem.withdrawDate = row.withdrawDate
    this.auditItem.isView = !!isView
    this.auditItem.withdrawAmount = row.withdrawAmount
    this.auditItem.withdrawDesc = row.withdrawDesc
    if (isView) {
      this.auditDesc = row.auditDesc
    }
  }

  private get ajax() {
    return {
      url: '/audit/withdraw-list'
    }
  }

  private getStatusDesc(status: string) : string {
    let desc = ''
    switch (status) {
      case 'APPROVAL':
        desc = '已通过'
        break
      case 'REJECT':
        desc = '已拒绝'
        break
      case 'TO_BE_AUDIT':
        desc = '待审核'
        break
    }
    return desc
  }

  private getColors(status: string) : string {
    let color = ''
    switch (status) {
      case 'APPROVAL':
        color = 'green'
        break
      case 'REJECT':
        color = 'red'
        break
      case 'TO_BE_AUDIT':
        color = 'grey'
        break
    }
    return color
  }

  private async approve() {
    await doAuditWithdrawApprove(this.auditItem.streamNo)
    this.dialog = false
    this.doSearch()
    this.$message.success('操作成功')
  }
  private async reject() {
    await doAuditWithdrawReject({
      recordNo: this.auditItem.streamNo,
      auditDesc: this.auditDesc
    })
    this.doSearch()
    this.dialog = false
    this.$message.success('操作成功')
  }

  private doSearch() {
    (this.$refs.tp as TablePagination).doSearch()
  }
}
</script>

<style lang="scss">
@mixin tip() {
  display: block;
  text-align: center;
  margin-bottom: 5px;
  color: red;
}

.presentation-audit {
  h3 {
    text-align: center;
  }
  .tip {
    @include tip;
  }
}

.presentation-audit-content {
  .tip {
    @include tip;
  }
  li {
    list-style: none;
    font-size: 16px;
    padding: 5px;
    .label {
      width: 100px;
      display: inline-block;
    }
    .content img {
      width: 90%;
      padding-top: 5px;
    }
  }
}
</style>
