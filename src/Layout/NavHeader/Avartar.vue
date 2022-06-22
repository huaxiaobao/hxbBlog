<template>
	<!-- 登录头像 -->
	<div class="flex login-wrap">
		<el-dropdown>
			<span>
				<img :src="avatarSrc" alt="" class="avatar-img" />
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>登 录</el-dropdown-item>
					<el-dropdown-item divided>注册</el-dropdown-item>
					<!-- <el-dropdown-item>Action 3</el-dropdown-item>
				<el-dropdown-item divided>Action 5</el-dropdown-item> -->
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<div class="ml-8">未登录</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import avatarURL from '@/image/avatar.png'
export default defineComponent({
	setup() {},
	data() {
		return {
			avatarSrc: avatarURL
		}
	}
})
</script>

