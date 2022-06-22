<template>
	<div class="app-header">
		<div class="app-wrapp flex-just-around">
			<div class="logo">
				<img src="@/image/logo.png" alt="" />
			</div>
			<div class="header-nav">
				<el-menu
					:default-active="activeIndex"
					mode="horizontal"
					@select="handleSelect"
					class="el-menu-demo"
					:ellipsis="false"
				>
					<el-menu-item index="1">首页</el-menu-item>
					<el-menu-item index="2">链接</el-menu-item>
					<el-menu-item index="3">文章</el-menu-item>
					<el-menu-item index="4">关于</el-menu-item>
					<el-menu-item index="5">留言</el-menu-item>
				</el-menu>
			</div>
			<div class="login-box">
				<LoginAvatar />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
</script>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginAvatar from './Avartar.vue'
export default defineComponent({
	components: { LoginAvatar },
	setup() {},
	data() {
		return {}
	}
})
</script>
<style lang="scss" scoped>
</style>