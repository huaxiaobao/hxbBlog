<template>
	<div class="side-bar">
		<el-scrollbar>
			<!-- 博主信息 -->
			<BloggerInfo />
			<!-- 访客信息 -->
			<Visiter />
		</el-scrollbar>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BloggerInfo from './BloggerInfo.vue'
import Visiter from './Visiter.vue'
export default defineComponent({
	components: { BloggerInfo, Visiter },
	setup() {}
})
</script>
