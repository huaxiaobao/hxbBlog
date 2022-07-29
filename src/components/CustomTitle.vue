<template>
	<h3 
	class="custom-title"
	:class="{
		'active':titleBar
	}"
	>{{ title }}</h3>
</template>
<script lang="ts" setup>
const props = defineProps({
	title: {
		type: String,
		default:'标题'
	},
	titleBar: {
		type: Boolean,
		default:true
	}
})
// export default {
// 	setup() {},
// 	props: {
// 		title: {
// 			type: String,
// 			default: '标题'
// 		},

// 	}
// }
</script>
<style lang="scss" scoped>
.custom-title {
	cursor: pointer;
	padding-left: 12px;
	margin-top: 0;
	margin-bottom: 16px;
	font-weight: 600;
	font-size: 20px;
	line-height: 20px;
	color: #323233;
	position: relative;
	&.active::before{
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 20px;
		width: 0;
		border-left: 4px solid #409eff;
		border-radius: 8px;
	}
}
</style>