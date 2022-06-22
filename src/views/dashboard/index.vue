<template>
	<div class="app-main">
		<!-- 导航栏 -->
		<NavHeader />
		<!-- 内容部分 -->
		<div class="app-content">
			<!-- 左边侧边栏 -->
			<SiderBar />
			<div class="main-box">路由渲染区域</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import NavHeader from '@/Layout/NavHeader/index.vue'
import SiderBar from '@/Layout/SideBar/index.vue'

export default defineComponent({
	setup() {},
	components: { NavHeader, SiderBar }
})
</script>

<style lang="scss" scoped>
</style>
