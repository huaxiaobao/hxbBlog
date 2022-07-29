
<template>
	<!-- 登录头像 -->
	<div class="flex login-wrap">
		<el-dropdown>
			<span>
				<img :src="avatarSrc" alt="" class="avatar-img" />
			</span>

			<template #dropdown>
				<!-- 未登录的显示 -->
				<el-dropdown-menu v-if="!isLogin">
					<el-dropdown-item @click="getloginData('login')">登 录</el-dropdown-item>
					<el-dropdown-item divided @click="getloginData('reg')">注册</el-dropdown-item>
				</el-dropdown-menu>
				<!-- 登录显示 -->
				<el-dropdown-menu v-else>
					<el-dropdown-item @click="toPersonCenter()">个人信息</el-dropdown-item>
					<el-dropdown-item @click="rePasswordClick">修改密码</el-dropdown-item>
					<el-dropdown-item divided @click="loginOut">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<div class="ml-8">{{ store.username || '未登录' }}</div>

		<!-- 登录 -->
		<LoginDialog v-if="isShowlogin" v-model:isShow="isShowlogin" v-model:status="status" />

		<ModifyPassword v-if="isShowRepass" v-model:isShow="isShowRepass" />
	</div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoginDialog from './LoginDialog.vue'
import ModifyPassword from './ModifyPassword.vue'
import { userInfoStore } from '@/store/user'
import { ElMessageBox, ElLoading, ElMessage } from 'element-plus'
//状态初始化
const route = useRouter()
//用户登录状态
const isLogin = computed(() => {
	return store.username
})

//头像数据
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const avatarSrc = computed(() => {
	return store.avatar ? `http://localhost:4000${store.avatar}` : circleUrl
})

//弹窗
const isShowlogin = ref(false)

const status = ref('login')

const getloginData = (statu: string) => {
	status.value = statu
	isShowlogin.value = true

}


//用户信息
const store = userInfoStore()

//个人信息中心
const toPersonCenter = () => {
	console.log(route)
	route.push('user')
}

//修改密码
const isShowRepass = ref(false)
const rePasswordClick = () => {
	console.log('123')
	isShowRepass.value = true
}

//退出登录
const loginOut = () => {

	ElMessageBox.confirm(
		'受否退出登录?',
		'提示',
		{
			distinguishCancelAndClose: true,
			confirmButtonText: '退出',
			cancelButtonText: '取消',
		}
	)
		.then(() => {
			//调用 store 退出登录 清空 vuex
			const laoding = ElLoading.service({
				lock: true,
				text: '加载中，请稍后',
				background: 'rgba(0, 0, 0, 0.8)',
				customClass: 'laoding-login'
			})
			store.loginDispatch()
				.then(() => {
					setTimeout(() => {
						laoding.close()
						ElMessage({
							type: 'success',
							message: '已退出登录！',
						})
					}, 1000)
				})
				.catch(() => {
					laoding.close()
				})

		})
		.catch(() => {
			return
		})
}


</script>


