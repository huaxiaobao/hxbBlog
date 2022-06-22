<template>
	<div class="app-main">
		<layerbox class="cards">
			<CustomTitle title="标题" />
			<CustomInfoBox />
		</layerbox>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import layerbox from 'components/layerbox.vue'
import CustomTitle from 'components/CustomTitle.vue'
import CustomInfoBox from 'components/CustomInfoBox.vue'
export default defineComponent({
	setup() {
		const a = ref('0')
		interface Tree {
			label: string
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

		const defaultProps = {
			children: 'children',
			label: 'label'
		}
		const isHighlight = false
		return {
			a,
			handleNodeClick,
			data,
			defaultProps,
			isHighlight
		}
	},
	components: { layerbox, CustomTitle, CustomInfoBox },
	props: {
		isShow: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	created() {
		console.log(this.isShow)
		this.a = '555'
		console.log(this.a)
		this.getTableList(1, '2')()
	},
	methods: {
		getTableList(val: number, aaa: string): Function {
			const a = val
			console.log(val, aaa)
			return () => {
				console.log(a)
			}
		},
		btnClick() {
			this.isHighlight = false
			console.log(this.isHighlight)
		}
		// sum(s: number): Function {
		// 	const a = s
		// 	return a
		// }
	}
})
</script>
<style lang="scss" scoped>
.app-main {
	height: 100vh;
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