<template>
  <div class="app-container user-management">
    <h3>用户列表</h3>
    <div class="filter-condition">
      <el-input
        placeholder="请输入内容检索"
        style="width: 200px"
        class="filter-item-input"
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
        label="UID"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
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
        label="操作"
        align="center"
        width="200px"
      >
        <template>
          <el-button
            type="primary"
            size="mini"
            @click="manage"
          >
            管理
          </el-button>
        </template>
      </el-table-column>
    </TablePagination>

    <el-dialog
      class="user-management-dialog"
      title="账号信息"
      :visible.sync="dialog"
      width="500px"
      top="50px"
      center
    >
      <div class="header">
        <el-avatar
          class="img"
          size="large"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <div class="desc">
          <span>昵称：张三</span><br>
          <span>UID：1</span>
        </div>
      </div>
      <ul class="user-management-content">
        <li>
          <span class="label">手机号：</span>
          <span class="content">13813813813</span>
        </li>
        <li>
          <span class="label">安全邮箱：</span>
          <span class="content">13813813813@163.com</span>
        </li>
        <el-divider />
        <li>
          <span class="label">资金密码：</span>
          <span class="content">*******</span>
        </li>
        <li>
          <span class="label">实名认证：</span>
          <span class="content">张三，420***********3759</span>
        </li>
        <el-divider />
        <li>
          <span class="label">现金余额：</span>
          <span class="content">￥ 1000</span>
        </li>
        <li>
          <span class="label">支付宝：</span>
          <span class="content">13813813813@qq.com</span>
        </li>
        <li>
          <span class="label">银行卡：</span>
          <span class="content">62****324</span>
        </li>
        <el-divider />
        <li>
          <span class="label">接收账户变动提醒：</span>
          <span class="content">
            <el-switch
              v-model="accountChange"
            />
            {{ accountChange ? 'ON' : 'OFF' }}
          </span>
        </li>
        <li>
          <span class="label">接收最新挂单通知：</span>
          <span class="content">
            <el-switch
              v-model="billChange"
            />
            {{ billChange ? 'ON' : 'OFF' }}
          </span>
        </li>
        <li>
          <span class="label">接收交易信息通知：</span>
          <span class="content">
            <el-switch
              v-model="dealChange"
            />
            {{ dealChange ? 'ON' : 'OFF' }}
          </span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TablePagination from '@/components/TablePagination/index.vue'

@Component({
  name: 'user-management',
  components: {
    TablePagination
  }
})
export default class extends Vue {
  private dialog:boolean = false
  private accountChange:boolean = false
  private billChange:boolean = false
  private dealChange:boolean = false

  private manage() {
    this.dialog = true
  }

  private doSearch() {}

  private doClear() {}
}
</script>

<style lang="scss">
.user-management {
  h3 {
    text-align: center;
  }
  .filter-condition {
    text-align: center;
    margin-bottom: 10px;
    .filter-item-input {
      margin-right: 10px;
    }
  }
}

.user-management-content {
  li {
    list-style: none;
    font-size: 16px;
    padding: 5px;
    .label {
      width: 150px;
      display: inline-block;
      text-align: right;
    }
    .content img {
      width: 90%;
      padding-top: 5px;
    }
  }
}

.user-management-dialog {
  .header {
    text-align: center;
    .desc {
      text-align: left;
      display: inline-block;
      span {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .img {
      width: 60px;
      height: 60px;
      line-height: 60px;
    }
  }
}
</style>
