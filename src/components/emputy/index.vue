<template>
  <el-empty :description="description" class="component-empty" />
</template>

<script lang="ts" setup>
const props = defineProps({
  description: {
    type: String,
    default: '暂无内容'
  }
})
</script>

<style lang="scss" scoped>
.component-empty {
  width: 100%;
  height: 100%;
}
</style>