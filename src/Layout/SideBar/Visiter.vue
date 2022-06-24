<template>
	<LayerBox class="mt-8">
		<h3 class="c-h3">访客足迹</h3>
		<div class="flex-wrap">
			<el-avatar
				:size="36"
				:src="circleUrl"
				v-for="(item, index) in visitorsList"
				:key="index"
				class="mr-8 mb-8"
			/>
		</div>
	</LayerBox>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {},
	data() {
		return {
			circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
			visitorsList: [
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{},
				{}
			]
		}
	}
})
</script>
