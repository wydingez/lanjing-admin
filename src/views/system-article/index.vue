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
        label="文章类型"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <span>{{ getCategoryName(scope.row.categoryCode) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章标题"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.articleTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="300px"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="openModal('U', scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-s-promotion"
            @click="openModal('V', scope.row)"
          >
            预览
          </el-button>
          <el-button
            v-if="!['suggestion', 'problem', 'description'].includes(scope.row.articleKey)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="openModal('D', scope.row)"
          >
            删除
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
      <info
        v-if="dialog"
        ref="info"
        v-model="info"
        :mode="mode"
        :options="options"
      />
      <span
        v-if="mode !== 'V'"
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
import { addArticle, editArticle, deletArticle, detailArticle, getArticleTypes } from '@/api/article'
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
  private options: any[] = []

  private info = {
    key: '',
    title: '',
    content: ''
  }

  private async openModal(type: string, row: any) {
    if (type === 'D') {
      this.$confirm('确认删除该文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deletArticle({
          categoryCode: row.categoryCode,
          articleTitle: row.articleTitle
        })
        this.doSearch()
        this.$message.success('删除成功')
      })
    } else {
      this.mode = type
      this.title = type === 'C' ? '新增文章' : type === 'U' ? '编辑文章' : ''
      this.dialog = true
      if (['U', 'V'].includes(type)) {
        let res = await detailArticle({
          categoryCode: row.categoryCode,
          articleTitle: row.articleTitle
        })
        let { categoryCode, articleTitle, articleContent } = res.data
        this.info.key = categoryCode
        this.info.title = articleTitle
        this.info.content = articleContent
      } else {
        this.info.key = ''
        this.info.title = ''
        this.info.content = ''
      }
    }
  }

  private get ajax() {
    return {
      url: '/article/query/titles'
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

  private async doSave() {
    if (this.mode === 'C') {
      let res = await addArticle({
        categoryCode: this.info.key,
        articleTitle: this.info.title,
        articleContent: this.info.content
      })
      this.dialog = false
      this.doSearch()
      this.$message.success('保存成功')
    } else if (this.mode === 'U') {
      let res = await editArticle({
        categoryCode: this.info.key,
        articleTitle: this.info.title,
        articleContent: this.info.content
      })
      this.dialog = false
      this.doSearch()
      this.$message.success('编辑成功')
    }
  }

  private getCategoryName(code: string) {
    let find = this.options.find(item => item.categoryCode === code)
    return (find && find.categoryName) || ''
  }

  async created() {
    let res = await getArticleTypes()
    this.options = res.data
  }
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
