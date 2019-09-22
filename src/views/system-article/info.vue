<template>
  <div class="system-article-info">
    <div v-if="!preview">
      <div class="title">
        <el-input
          v-model="key"
          placeholder="Key"
          class="title-key"
        />
        <el-input
          v-model="title"
          placeholder="文章标题"
          class="title-value"
        />
      </div>
      <tinymce
        v-if="tinymceActive"
        v-model="tinymceContent"
        :height="800"
      />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-else
      class="editor-content"
      v-html="tinymceContent"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Tinymce from '@/components/Tinymce/index.vue'
@Component({
  name: 'TinymceDemo',
  components: {
    Tinymce
  }
})
export default class extends Vue {
  @Prop({ default: false }) private preview!: Boolean
  @Prop({ default: '' }) private value!: String

  private tinymceActive = true
  private key = ''
  private title = ''

  deactivated() {
    this.tinymceActive = false
  }
  activated() {
    this.tinymceActive = true
  }

  get tinymceContent() {
    return this.value
  }
  set tinymceContent(value) {
    this.$emit('input', value)
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
