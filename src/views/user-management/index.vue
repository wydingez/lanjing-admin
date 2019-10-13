<template>
  <div class="app-container user-management">
    <h3>用户列表</h3>
    <div class="filter-condition">
      <el-input
        v-model="condition"
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
    <TablePagination
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
        label="UID"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.userUuid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户昵称"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="真实姓名"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="manage(scope.row.userId)"
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
      width="700px"
      top="50px"
      center
    >
      <div class="header">
        <el-avatar
          class="img"
          size="large"
          :src="userInfo.portraitPicUrl"
        />
        <div class="desc">
          <span>昵称：{{ userInfo.nickName }}</span><br>
          <span>UID：{{ userInfo.userUuid }}</span>
        </div>
      </div>
      <ul class="user-management-content">
        <li>
          <span class="label">手机号：</span>
          <span class="content">{{ userInfo.phone }}</span>
        </li>
        <li>
          <span class="label">安全等级：</span>
          <span class="content">{{ userInfo.securityLevel === 'low' ? '低' : userInfo.securityLevel === 'middle' ? '中' : '高' }}</span>
        </li>
        <li>
          <span class="label">禁止登陆：</span>
          <span class="content">
            <el-switch
              v-model="userInfo.loginForbid"
              @change="doForbidLogin"
            />
          </span>
        </li>
        <el-divider />
        <li>
          <span class="label">实名认证：</span>
          <span class="content">{{ userInfo.realName }}，{{ userInfo.cardNo }} &nbsp; 【{{ userInfo.realVerifyStatus }}】</span>
        </li>
        <li>
          <span class="label">支付宝：</span>
          <span class="content">{{ userInfo.zfbAcct }}</span>
        </li>

        <el-divider />

        <li>
          <span class="label">坚果（JG）剩余：</span>
          <span class="content">￥ {{ userInfo.acctBalance }}</span>
        </li>
        <li>
          <span class="label">可用坚果（JG）剩余：</span>
          <span class="content">￥ {{ userInfo.usableAmount }}</span>
        </li>
        <li>
          <span class="label">冻结坚果（JG）剩余：</span>
          <span class="content">￥ {{ userInfo.freezeAmount }}</span>
        </li>
        <li>
          <span class="label">历史记录：</span>
          <span class="content">
            <el-button
              type="primary"
              @click="openDealModal"
            >
              明细查询
            </el-button>
          </span>
        </li>
      </ul>
    </el-dialog>

    <el-dialog
      title="交易历史记录"
      :visible.sync="dealDialog"
      width="80%"
      top="50px"
      center
    >
      <account-log
        v-if="dealDialog"
        :user-id="userInfo.userId"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TablePagination from '@/components/TablePagination/index.vue'
import { getMemberDetail, forbidLogin } from '@/api/membership'
import AccountLog from './account-log.vue'

@Component({
  name: 'user-management',
  components: {
    TablePagination,
    AccountLog
  }
})
export default class extends Vue {
  private pageParams = {}
  private dialog:boolean = false
  private condition:string = ''
  private dealDialog:boolean = false

  private userInfo:any = {}

  private get ajax() {
    return {
      url: '/membership/list',
      params: {
        condition: this.condition
      }
    }
  }

  private async manage(userId: string) {
    this.dialog = true
    let { data } = await getMemberDetail(userId)
    this.userInfo = data
    this.userInfo.securityLevel = data.securityLevel.toLowerCase()
    this.userInfo.realVerifyStatus = this.realVertifyDesc(this.userInfo.realVerifyStatus)
  }

  private realVertifyDesc(realVertifyStatus: string) {
    switch (realVertifyStatus) {
      case '00':
        return '认证完成'
      case '01':
        return '认证中'
      case '02':
        return '认证失败'
      case '99':
        return '未认证'
      default:
        return '未认证'
    }
  }

  private doSearch() {
    (this.$refs.tp as TablePagination).doSearch()
  }

  private doClear() {
    this.condition = ''
    this.$nextTick(() => {
      this.doSearch()
    })
  }

  private doForbidLogin(value: boolean) {
    forbidLogin({
      userId: this.userInfo.userId,
      isLoginForbid: value
    })
  }

  private openDealModal() {
    this.dealDialog = true
  }
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
      width: 180px;
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
      margin-right: 20px;
    }
  }
}
</style>
