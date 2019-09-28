<template>
  <div class="system-article-info">
    <div v-if="mode !== 'V'">
      <div class="title">
        <el-select 
          v-model="info.key" 
          placeholder="请选择文章类型"
          class="title-key">
          <el-option
            v-for="item in options"
            :key="item.categoryCode"
            :label="item.categoryName"
            :value="item.categoryCode">
          </el-option>
        </el-select>
        <el-input
          v-model="info.title"
          placeholder="文章标题"
          class="title-value"
        />
      </div>
      <tinymce
        v-if="tinymceActive"
        v-model="info.content"
        :height="800"
      />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-else
      class="editor-content"
      v-html="info.content"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Tinymce from '@/components/Tinymce/index.vue'

interface InfoType {
  key: string,
  title: string,
  content: string
}

@Component({
  name: 'TinymceDemo',
  components: {
    Tinymce
  }
})
export default class extends Vue {
  @Prop({ default: '' }) private mode!: string
  @Prop({ default: () => {} }) private value!: InfoType
  @Prop({ default: () => []}) private options!: Object

  private tinymceActive = true

  deactivated() {
    this.tinymceActive = false
  }

  activated() {
    this.tinymceActive = true
  }

  set info(val: InfoType) {
    this.$emit('input', val)
  }

  get info() {
    return this.value
  }
}
</script>

<style lang="scss">
.system-article-info {
  margin: 0 50px 30px 50px;
  position: relative;
  .editor-content {
    margin-top: 20px;
  }
  .title {
    margin-bottom: 10px;
    .title-key {
      width: 30%;
    }
    .title-value {
      width: 65%;
      float: right;
    }
  }
}
.tox-silver-sink {
  z-index: 9999 !important;
}
</style>
