<template>
  <div class="app-container presentation-audit">
    <h3>提现审核队列</h3>
    <span class="tip">(最早申请实名的越靠前， 先审核)</span>
    <TablePagination>
      <el-table-column
        label="序号"
        align="center"
        width="120px"
      >
        <template slot-scope="scope">
          <span>{{ Number(scope.row.id) + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户昵称"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="UID"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="超时"
        align="center"
      >
        <template>
          <span>5m 10s</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200px"
      >
        <template>
          <el-button
            type="primary"
            size="mini"
            @click="audit">
            审核
          </el-button>
        </template>
      </el-table-column>
    </TablePagination>

    <el-dialog
      title="提现审核"
      :visible.sync="dialog"
      width="500px"
      top="50px"
      center>
      <ul class="presentation-audit-content">
        <li>
          <span class="label">重置金额：</span>
          <span class="content">￥ 1000</span>
        </li>
        <li>
          <span class="label">距离上次提现，买⼊蓝晶总⽀付：</span>
          <span class="content">￥ 500</span>
        </li>
        <li>
          <span class="label">距离上次提现，卖出蓝晶总⾦额：</span>
          <span class="content">￥ 500</span>
        </li>
        <li>
          <span class="label">距离上次提现，向平台缴纳的手续费：</span>
          <span class="content">￥ 5</span>
        </li>
        <li>
          <span class="label">可提现金额为：</span>
          <span class="content">￥ 995</span>
        </li>
        <li>
          <span class="label">此次申请提现的金额为：</span>
          <span class="content">￥ 500</span>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog = false">审核通过</el-button>
        <el-button @click="dialog = false">审核不通过</el-button>
      </span>
      <span class="tip">审核结果反馈到列表和⽤户中⼼， 启动⽀付宝接⼝完成转当审核完成之后， 早审核的放在越后⾯账，并反馈⽀付宝到账结果到账户中⼼</span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TablePagination from '@/components/TablePagination/index.vue'

@Component({
  name: 'presentation-audit',
  components: {
    TablePagination
  }
})
export default class extends Vue {
  private dialog:boolean =  false

  private audit() {
    this.dialog = true
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
      width: 300px;
      display: inline-block;
    }
    .content img {
      width: 90%;
      padding-top: 5px;
    }
  }
}
</style>
