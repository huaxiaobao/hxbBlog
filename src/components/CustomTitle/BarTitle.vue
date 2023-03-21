<template>
  <div class="component-bar-title">
    <slot name="pre" />
    <span class="title">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'


interface Props {
  title: string

}

const props = withDefaults(defineProps<Props>(), {
  title: '标题',

})

</script>

<style lang="scss" scoped>
.component-bar-title {
  display: flex;
  align-items: center;
  font-size: 20px;
  border-bottom: 1px solid #E5E9F2;
  margin: 0 -30px 2em;
  padding: 0 30px 8px;
  color: #8492A6;

  .title {
    margin-left: 0.5em;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      width: 2em;
      height: 3px;
      left: 0;
      background: #409eff;
      border-radius: 8px;
      box-shadow: 0 3px 4px rgba(31, 139, 255, .5);
      transition: .35s;
    }
  }
}
</style>