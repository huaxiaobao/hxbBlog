<template>
	<div class="small-box">
		<div class="small-box-date">{{ props.info.data }}</div>
		<div class="small-box-title">{{ props.info.title }}</div>
	</div>
</template>
<script lang="ts" setup>
const props = defineProps({
	info: {
		type: Object,
		default: {}
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