<template>
	<div class="side-bar">
		<!-- <el-scrollbar> -->
		<!-- 博主信息 -->
		<BloggerInfo />
		<!-- 访客信息 -->
		<Visiters />
		<!-- </el-scrollbar> -->
	</div>
</template>
<script lang="ts" setup>
import BloggerInfo from './BloggerInfo.vue'
import Visiters from './Visiter.vue'
</script>
<style lang="scss" scoped>
.side-bar {
	overflow: hidden;
}
</style>