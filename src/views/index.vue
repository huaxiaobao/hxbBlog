<template>
	<div class="dashbord">

	</div>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
// import layerbox from 'components/layerbox.vue'
// import CustomTitle from 'components/CustomTitle.vue'
// import CustomInfoBox from 'components/CustomInfoBox.vue'

const props = defineProps({
	isShow: {
		type: Object,
		default: () => {
			return {}
		}
	}
})

interface Tree {
	label: string,
	children?: Tree[]
}
const handleNodeClick = (data: Tree) => {
	console.log(data)
}

const data: Tree[] = [
	{
		label: 'Level one 1',
		children: [
			{
				label: 'Level two 1-1',
				children: [
					{
						label: 'Level three 1-1-1'
					}
				]
			}
		]
	},
	{
		label: 'Level one 2',
		children: [
			{
				label: 'Level two 2-1',
				children: [
					{
						label: 'Level three 2-1-1'
					}
				]
			},
			{
				label: 'Level two 2-2',
				children: [
					{
						label: 'Level three 2-2-1'
					}
				]
			}
		]
	},
	{
		label: 'Level one 3',
		children: [
			{
				label: 'Level two 3-1',
				children: [
					{
						label: 'Level three 3-1-1'
					}
				]
			},
			{
				label: 'Level two 3-2',
				children: [
					{
						label: 'Level three 3-2-1'
					}
				]
			}
		]
	}
]

const isHighlight = ref(false)
const defaultProps = {
	children: 'children',
	label: 'label'
}

const getTableList = (val: number, aaa: string): Function => {
	const a = val
	console.log(defaultProps, data, props)

	return () => {
		console.log(a)
	}
}


const btnClick = () => {
	isHighlight.value = false
	console.log(isHighlight.value)
}


</script>
<style lang="scss" scoped>
.app-main {
	// height: 100vh;
	padding: 8px;
	background: #f7f8fa;
	box-sizing: border-box;
}

.cards {
	width: 800px;
	// height: 600px;
	margin: 100px auto 0;
}
</style>