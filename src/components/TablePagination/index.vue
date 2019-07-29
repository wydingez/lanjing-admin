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
      <slot></slot>
    </el-table>

    <pagination
      class="pagination"
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Pagination from '@/components/Pagination/index.vue'
  import { getArticles } from '@/api/articles'
  import { IArticleData } from '@/api/types'

  @Component({
    name: 'table-pagination',
    components: {
      Pagination
    }
  })
  export default class extends Vue {
    @Prop({ default: () => {} }) private ajax!: object

    private tableKey = 0
    private list: IArticleData[] = []
    private total = 0
    private listLoading = true
    private listQuery = {
      page: 1,
      limit: 20
    }

    created() {
      this.getList()
    }

    private async getList() {
      this.listLoading = true
      const { data } = await getArticles(this.listQuery)
      this.list = data.items
      this.total = data.total
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    }

    public doSearch() {
      this.listQuery.page = 1
      this.getList()
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
