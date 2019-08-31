<template>
  <div class="table-pagination">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <slot />
    </el-table>

    <pagination
      v-show="total>0"
      class="pagination"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import { IArticleData } from '@/api/types'
import request from '@/utils/request'

interface ajax {
  url: string,
  params: object
}

@Component({
  name: 'table-pagination',
  components: {
    Pagination
  }
})
export default class extends Vue {
  @Prop({ default: () => {} }) private ajax!: ajax
  @Prop({ default: 1 }) private page!: number

  private tableKey = 0
  private list: IArticleData[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    pageNum: 1,
    pageSize: 20
  }

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await request({
      url: this.ajax.url,
      method: 'post',
      data: Object.assign({}, this.listQuery, this.ajax.params || {})
    })
    this.listLoading = false
    this.list = data.rows
    this.total = data.total
  }

  public doSearch() {
    this.listQuery.pageNum = 1
    this.getList()
  }

  @Watch('listQuery', { immediate: true, deep: true })
  private changePageNumber() {
    this.$emit('update:pageParams', this.listQuery)
  }
}
</script>

<style lang="scss" scoped>
.table-pagination {
  .pagination {
    text-align: center;
  }
}
</style>
