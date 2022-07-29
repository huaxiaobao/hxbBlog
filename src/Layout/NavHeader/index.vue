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
					router
				>
					<!-- <el-menu-item :index="1">首页</el-menu-item>
					<el-menu-item :index="2">链接</el-menu-item>
					<el-menu-item :index="3">文章</el-menu-item>
					<el-menu-item :index="4">关于</el-menu-item>
					<el-menu-item :index="5">留言</el-menu-item> -->
					<el-menu-item 
					v-for="item in navList"
					:key="item.path"
					:index="item.path">{{item.title}}</el-menu-item>
				</el-menu>
			</div>
			<div class="login-box">
				<LoginAvatar />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref,watch } from 'vue'
import LoginAvatar from './Avartar.vue'
const activeIndex = ref('home')
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
	activeIndex.value = key
}


const navList = [
	{
		path:'home',
		title:'首页'
	},
		{
		path:'article',
		title:'文章'
	},
		{
		path:'remark',
		title:'留言'
	},
	{
		path:'link',
		title:'链接'
	},

	{
		path:'about',
		title:'关于'
	},

]
watch(activeIndex, () => {
	console.log(activeIndex.value)
})
onBeforeMount(() => {
	console.log(activeIndex.value);
})
</script>
<style lang="scss" scoped>
</style>