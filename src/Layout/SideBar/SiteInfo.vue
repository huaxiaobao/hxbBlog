<template>
	<div class="small-box">
		<div class="small-box-date">{{ info.data }}</div>
		<div class="small-box-title">{{ info.title }}</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {},
	props: {
		info: {
			type: Object,
			default() {
				return {
					data: '1',
					title: '222'
				}
			}
		}
	}
})
</script>
<style lang="scss" scoped>
.small-box {
	text-align: center;
	padding: 0 4px;
}
.small-box-date {
	height: 22px;
	line-height: 22px;
}
.small-box-title {
	height: 28px;
	line-height: 28px;
}
</style>