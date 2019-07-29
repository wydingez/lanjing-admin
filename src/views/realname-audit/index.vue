<template>
  <div class="app-container realname-audit">
    <h3>实名审核队列</h3>
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
      title="实名审核"
      :visible.sync="dialog"
      width="500px"
      top="50px"
      center>
      <ul class="realname-audit-content">
        <li>
          <span class="label">姓名：</span>
          <span class="content">张三</span>
        </li>
        <li>
          <span class="label">身份证号：</span>
          <span class="content">42070319828382829</span>
        </li>
        <li>
          <span class="label">身份证正面：</span>
          <span class="content">
            <img :src="require('@/assets/imgs/idcard-A.png')" alt="">
          </span>
        </li>
        <li>
          <span class="label">身份证反面：</span>
          <span class="content">
            <img :src="require('@/assets/imgs/idcard-B.png')" alt="">
          </span>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog = false">审核通过</el-button>
        <el-button @click="dialog = false">审核不通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TablePagination from '@/components/TablePagination/index.vue'

@Component({
  name: 'realname-audit',
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
