<template>
  <div class="app-container system-article">
    <h3>系统文章列表</h3>
    <span class="tip">
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="openModal('C')"
      >
        新增文章
      </el-button>
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
            type="primary"
            size="mini"
            @click="openModal('U', scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="openModal('V', scope.row)"
          >
            预览
          </el-button>
        </template>
      </el-table-column>
    </table-pagination>

    <el-dialog
      :title="title"
      :visible.sync="dialog"
      width="80%"
      top="50px"
      center
    >
      <info :preview="mode === 'V'" />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="doSave"
        >
          保存
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TablePagination from '@/components/TablePagination/index.vue'
import { doAuditApprove, doAuditReject } from '@/api/audit'
import Info from './info.vue'

@Component({
  name: 'system-article',
  components: {
    TablePagination,
    Info
  }
})
export default class extends Vue {
  private pageParams = {}
  private dialog : boolean = false
  private mode : string = ''
  private title : string = ''

  private openModal(type: string, row: any) {
    this.dialog = true
    this.mode = type
    this.title = (row && row.applyUser) || '新增文章'
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

  private doSave() {}
}
</script>

<style lang="scss">
.system-article {
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

.system-article-content {
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
