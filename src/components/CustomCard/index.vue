<template>
  <div class="compnent-card box-white-shadow">
    <!-- 标题栏 -->
    <bar-title class="header-title" :title="title">
      <template #pre>
        <el-icon :size="28" color="#8492A6">
          <slot name="icon">
            <StarFilled />
          </slot>
        </el-icon>
      </template>
    </bar-title>

    <!-- 内容栏目 -->
    <div class="card-content">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.compnent-card {
  padding-top: 32px;

  &:hover {
    ::v-deep .header-title {
      .el-icon {
        color: #409eff;
      }

      .title {
        color: #409eff;

        &::after {
          width: calc(100% + 36px);
          left: -0.5em;
        }
      }

    }
  }
}
</style>