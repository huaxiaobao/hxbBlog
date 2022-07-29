<template>
	<el-card class="layer-box" :shadow="shadow">
		<slot></slot>
	</el-card>
</template>

<script lang="ts">
export default {
	props: {
		title: {
			type: String,
			default: '标题'
		},
		shadow: {
			type: String,
			default: 'always'
		}
	},
	components: {},
	name: 'layerbox',
	data() {
		return {}
	},
	computed: {},

	watch: {},

	created() {},

	mounted() {},

	destroyed() {},
	methods: {}
}
</script>
<style lang="scss" scoped>
.layer-box {
	border-radius: 20px;
	box-shadow: 0 8px 12px #ebedf0;
	//
	::v-deep .el-card__body {
		padding: 24px;
	}
}
</style>