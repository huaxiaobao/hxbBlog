<template>
	<div class="app-main">
		<!-- 导航栏 -->
		<NavHeader />
		<!-- 内容部分 -->
		<div class="app-content">
			<!-- 左边侧边栏 -->
			<SiderBar />
			<div class="main-box">
				<router-view />
			</div>
			<footer class="copy-right">我是网站备案部分</footer>
		</div>
	</div>
</template>
<script lang="ts" setup>
import NavHeader from '@/Layout/NavHeader/index.vue'
import SiderBar from '@/Layout/SideBar/index.vue'
</script>

<style lang="scss" scoped>
</style>
