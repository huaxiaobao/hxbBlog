<template>
	<div class="side-bar">
		<el-scrollbar>
			<BloggerInfo />
			<svg-icon name="arrangement" />
		</el-scrollbar>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BloggerInfo from './BloggerInfo.vue'
export default defineComponent({
	components: { BloggerInfo },
	setup() {}
})
</script>
