<template>
  <div>
    <!-- 导航栏 -->
    <NavHeader />
    <!-- 内容部分 -->
    <div class="app-main">
      <div class="side-bar-left side-bar ">
        <side-bar-left></side-bar-left>
      </div>

      <div class="main-content">
        <transition enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__bounceOut">
          <router-view />
        </transition>
      </div>

      <div class="side-bar-right side-bar ">
        <!-- 右侧边栏内容 -->
      </div>
    </div>

    <footer class="footer">
      <p>
        <el-link type="info" :underline="false">版权所有：Copyright © 2023-2025 花小宝</el-link>
      </p>
      <p>
        <el-link :underline="false" type="info">
          备案号：
          <a href="https://beian.miit.gov.cn" target="_blank" class="el-link el-link--info">湘ICP备2023005296号-1</a>
        </el-link>
      </p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import NavHeader from '@/Layout/Header/index.vue'
import SideBarLeft from './SiderBarLeft/index.vue'
</script>

<style lang="scss" scoped></style>