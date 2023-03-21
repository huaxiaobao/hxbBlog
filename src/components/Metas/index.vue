<template>
  <!-- 文章小标签 -->
  <span :class="metaClass">
    <el-icon :color="color" :size="20">
      <slot />
    </el-icon>
    <span class="word" :style="{ 'color': color }">{{ title }}</span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
interface Props {
  title: string | number
  className?: string,
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 10,
  className: '',
  color: ''
})

const metaClass = computed(() => {
  return [
    'component-meata',
    'flex-center-center',
    props.className ? props.className : ''
  ]
})

</script>

<style lang="scss" scoped>
.component-meata {
  font-size: 14px;
  column-gap: 0.25em;
  padding-bottom: 2px;

  .word {
    font-size: 14px;
  }

  .el-icon {
    vertical-align: -0.125em
  }
}
</style>

