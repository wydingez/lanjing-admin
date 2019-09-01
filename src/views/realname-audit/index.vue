<template>
  <div class="app-container realname-audit">
    <h3>实名审核队列</h3>
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
        label="用户昵称"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.applyUser }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请人姓名"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.applyName }}</span>
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
        label="状态"
        align="center"
        width="200px"
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
      title="实名审核"
      :visible.sync="dialog"
      width="500px"
      top="50px"
      center
    >
      <ul class="realname-audit-content">
        <li>
          <span class="label">姓名：</span>
          <span class="content">{{ auditItem.applyName }}</span>
        </li>
        <li>
          <span class="label">身份证号：</span>
          <span class="content">{{ auditItem.applyIdCard }}</span>
        </li>
        <li>
          <span class="label">身份证正面：</span>
          <span class="content">
            <img
              :src="auditItem.idCardFrontPic"
              alt=""
            >
          </span>
        </li>
        <li>
          <span class="label">身份证反面：</span>
          <span class="content">
            <img
              :src="auditItem.idCardBackPic"
              alt=""
            >
          </span>
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
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TablePagination from '@/components/TablePagination/index.vue'
import { doAuditApprove, doAuditReject } from '@/api/audit'

@Component({
  name: 'realname-audit',
  components: {
    TablePagination
  }
})
export default class extends Vue {
  private pageParams = {}
  private dialog : boolean = false
  private auditDesc : string = ''
  private auditItem = {
    applyName: '',
    applyIdCard: '',
    idCardFrontPic: '',
    idCardBackPic: '',
    isView: false,
    recordNo: '',
    auditNo: ''
  }

  private audit(row: any, isView: Boolean) {
    this.dialog = true
    this.auditDesc = ''
    this.auditItem.applyName = row.applyName
    this.auditItem.applyIdCard = row.applyIdCard
    this.auditItem.idCardFrontPic = row.idCardFrontPic
    this.auditItem.idCardBackPic = row.idCardBackPic
    this.auditItem.isView = !!isView
    this.auditItem.recordNo = row.recordNo
    this.auditItem.auditNo = row.auditNo
    if (isView) {
      this.auditDesc = row.auditDesc
    }
  }

  private get ajax() {
    return {
      url: '/audit/realName-list'
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

  private doSearch() {
    (this.$refs.tp as TablePagination).doSearch()
  }

  private async approve() {
    await doAuditApprove(this.auditItem.recordNo)
    this.dialog = false
    this.doSearch()
    this.$message.success('操作成功')
  }
  private async reject() {
    await doAuditReject({
      recordNo: this.auditItem.recordNo,
      auditDesc: this.auditDesc
    })
    this.doSearch()
    this.dialog = false
    this.$message.success('操作成功')
  }
}
</script>

<style lang="scss">
.realname-audit {
  h3 {
    text-align: center;
  }
  .tip {
    display: block;
    text-align: center;
    margin-bottom: 5px;
    color: red;
  }
}

.realname-audit-content {
  li {
    list-style: none;
    font-size: 16px;
    padding: 5px;
    .label {
      width: 200px;
      display: inline-block;
    }
    .content img {
      width: 90%;
      padding-top: 5px;
    }
  }
}
</style>
