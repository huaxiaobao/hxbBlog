<template>
  <div class="component-custom-title">
    <slot>
      <h2 :class="[
        'title',
        `fs-${size}`,
        { 'ranbow': isRanBow },
        fontType ? `ft-${fontType}` : ''
      ]">{{ title }}</h2>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { FontType } from '@/type'
interface CustomTitleProps {
  title: string,
  isRanBow?: boolean,
  size: number,
  fontType?: FontType | undefined
}


const props = withDefaults(defineProps<CustomTitleProps>(), {
  title: '标题内容',
  isRanBow: false,
  size: 22,
  fontType: undefined
})


</script>

<style lang="scss" scoped>
.component-custom-title {
  .title {
    letter-spacing: 4px;
    text-indent: 2em;
  }
}
</style>