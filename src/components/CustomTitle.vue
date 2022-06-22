<template>
	<h3 class="custom-title">{{ title }}</h3>
</template>
<script>
export default {
	setup() {},
	props: {
		title: {
			type: String,
			default: '标题'
		}
	}
}
</script>
<style lang="scss" scoped>
.custom-title {
	cursor: pointer;
	margin-top: 0;
	margin-bottom: 16px;
	font-weight: 600;
	font-size: 20px;
	color: #323233;
}
</style>