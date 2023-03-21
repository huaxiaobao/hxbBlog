<template>
  <p :class="className" :style="style">
    <slot> {{ description }}</slot>
  </p>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { FontType } from '@/type'
interface Props {
  description?: string,
  color?: string,
  size?: number,
  fontType?: FontType
}

const props = withDefaults(defineProps<Props>(), {
  description: '段落描述',
  color: '#909399',
  size: 14,
  fontType: FontType.none
})

const className = computed(() => {
  return [
    'component-paragraph',
    props.size ? `fs-${props.size}` : '',
    props.fontType ? `ft-${props.fontType}` : ''
  ]
})

const style = computed(() => {
  return {
    'color': props.color
  }
})


</script>

<style lang="scss" scoped>
.component-paragraph {
  letter-spacing: 4px;
  text-indent: 2em;
  margin-bottom: 16px;
  line-height: 48px;
}
</style>