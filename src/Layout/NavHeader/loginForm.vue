<template>
	<el-form ref="loginForm" :model="loginFormaData" label-width="80px" :rules="loginRules" status-icon
		label-position="right" @submit.prevent @keydown.enter="loginUserData(loginForm)">
		<el-form-item label="账号" prop="username">
			<el-input v-model="loginFormaData.username" />
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="loginFormaData.password" show-password />
		</el-form-item>
		<el-form-item class="flex">
			<el-button type="primary" class="login-btn flex-1" @click="loginUserData(loginForm)" :loading="login_loading">登录
			</el-button>
			<el-link type="danger" :underline="false" @click="regClick()" class="ml-16">快捷注册</el-link>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { userNameValid, passWordValid } from '@/utils/validator'
import { userInfoStore } from '@/store/user';
//定义props
const emit = defineEmits(['changeForm', 'closeDlg'])
/* 表单 */
const loginForm = ref<FormInstance>()
const loginFormaData = reactive({
	username: '',
	password: '',
})

//store
const store = userInfoStore()

//表单校验
const loginRules = reactive<FormRules>({
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ validator: userNameValid, trigger: ['blur', 'change'] }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' }
	]
})

//重置表单
const resetForm = (loginForm: FormInstance | undefined) => {
	if (!loginForm) return
	loginForm.resetFields()
}

//登录按钮
let login_loading = ref(false)

/*登录逻辑  */
//登录表单校验
const loginUserData = (loginForm: FormInstance | undefined) => {
	if (!loginForm) return
	loginForm.validate((valid: Boolean) => {
		if (valid) {
			login_loading.value = true
			store.loginUser(loginFormaData)
				.then((res: any) => {
					login_loading.value = false
					if (res.code === 405) {
						regTips()
					}
					else if (res.code === 201) {
						return false
					}
					else {
						//登录成功
						logingSuccess()
					}

				})
				.catch(() => {
					login_loading.value = false
				})
		}
	})
}

//注册提示
const regTips = () => {
	ElMessageBox.confirm('小主，你还没有进行注册，要不先注册个账号，方便以后玩耍！', { confirmButtonText: '好的，注册账号', cancelButtonText: '不了', type: 'warning' }).then(() => {
		emit('changeForm', true) //返回注册界面
	})
		.catch(() => {
			emit('closeDlg', false)
			ElMessage({
				type: 'info',
				message: '已关闭弹窗！'
			})
		})
}

//登录成功
const logingSuccess = () => {
	emit('closeDlg', false)
	const laoding = ElLoading.service({
		lock: true,
		text: '正在登录中',
		background: 'rgba(0, 0, 0, 0.8)',
		customClass: 'laoding-login'
	})
	setTimeout(() => { laoding.close() }, 1000)
}

const regClick = () => {
	emit('changeForm', true)
	// isRegStatus.value = val
}
</script>

<style lang="scss" scoped>
</style>