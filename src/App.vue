<template>
	<router-view />
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		const a = '222'
		return {
			a
		}
	},
	created() {
		console.log(this.a)
	}
})
</script>
