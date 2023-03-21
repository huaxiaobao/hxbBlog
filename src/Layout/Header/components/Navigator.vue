<template>
  <Sticky :stickyTop="0" :sticky-top-offset="160" :z-index="999" class-name="sticky-navigator">
    <div class="navigator-wrap">
      <!-- 网站logo -->
      <h1 class="blog-logo ft-hxb color-primary  fs-36">花小宝@hxb</h1>
      <!-- 菜单栏 -->
      <div class="menu-bar">
        <Menu />
      </div>

      <!-- 个人信息 -->
      <div class="login-wrap">
        <AvartarVue />
      </div>

    </div>
  </Sticky>
</template>

<script lang="ts" setup>
import Sticky from '@/components/Sticky/index.vue'
import Menu from './Menu.vue'
import AvartarVue from './Avartar.vue';
</script>

<style lang="scss" scoped>

</style>