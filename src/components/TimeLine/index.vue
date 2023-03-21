<template>
  <div class="component-time-line">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.component-time-line {
  position: relative;
  padding: 50px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 4px;
    height: calc(100%);
    background-color: #E6A23C;
    border-radius: 8px;
  }


}
</style>