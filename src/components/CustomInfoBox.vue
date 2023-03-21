<template>
	<div class="custom-info-box">
		<!-- 	:style="{
			'border-left-color': borderColorObj[borderColor]
		}" -->
		1111
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'CustomInfoBox',
	setup() {
		const borderColorObj: object = {
			primary: 'blue'
		}
		return {
			borderColorObj
		}
	},
	props: {
		borderColor: {
			type: String,
			default: 'primary'
		}
	}
})
</script>
<style lang="scss" scoped>
.custom-info-box {
	padding: 24px;
	border-radius: 8px;
	border-left: 4px solid red;
	background: #ccc;
}
</style>