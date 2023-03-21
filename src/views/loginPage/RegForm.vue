<template>
	<el-form :model="regForm" :rules="regRules" ref="regForms" @submit.prevent @keydown.enter="regUserDate(regForms)"
		class="input-noBored">
		<el-form-item prop="username">
			<el-input v-model="regForm.username" @focus="inputFocus('user')" @blur="inputFocus('user', 'blur')" clearable
				placeholder="请输入用户名">
				<template #prefix>
					<img :src="userSvg" alt="" style="height: 20px;width: 20px;">
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="regForm.password" show-password @focus="inputFocus('pass')" @blur="inputFocus('pass', 'blur')"
				placeholder="请输入密码">
				<template #prefix>
					<img :src="passSvg" alt="" style="height: 22px;width: 22px;">
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="confirmPassword">
			<el-input v-model="regForm.confirmPassword" show-password placeholder="请再次输入密码" @focus="inputFocus('ensurePass')"
				@blur="inputFocus('ensurePass', 'blur')">
				<template #prefix>
					<img :src="enPassSvg" alt="" style="height: 24px;width: 24px;">
				</template>
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" class="flex-1 mt-32" round size="large" @click="regUserDate(regForms)"
				:loading="reg_Loading">注册
			</el-button>

		</el-form-item>
	</el-form>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification, ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { userNameValid, passWordValid } from '@/utils/validator'
import { regUser } from 'api/login'
import { userInfoStore } from '@/store/user'
import usernameSvg from '@/icons/svg/username.svg'
import usernameActiveSvg from '@/icons/svg/usernameActive.svg'
import passSvgs from '@/icons/svg/pass.svg'
import passActiveSvg from '@/icons/svg/passActive.svg'
import ensurePassSvg from '@/icons/svg/ensurePass.svg'
import ensurePassActiveSvg from '@/icons/svg/ensurePassActive.svg'

const emit = defineEmits(['changeForm', 'closeDlg'])

//store
const store = userInfoStore()

/* input 样式控制 */
const userSvg = computed(() => {
	return isFocusUser.value ? usernameActiveSvg : usernameSvg
})
let isFocusUser = ref(false)

const passSvg = computed(() => {
	return isFocusPass.value ? passActiveSvg : passSvgs
})
let isFocusPass = ref(false)

const enPassSvg = computed(() => {
	return isFocusEnPass.value ? ensurePassActiveSvg : ensurePassSvg
})
let isFocusEnPass = ref(false)

const inputFocus = (type: string, params?: string) => {
	if (type === 'user') {
		isFocusUser.value = params ? false : true
	} else if (type === 'pass') {
		isFocusPass.value = params ? false : true
	} else {
		isFocusEnPass.value = params ? false : true
	}

}



/* 表单 */
const regForms = ref<FormInstance>()
const regForm = reactive({
	username: '',
	password: '',
	confirmPassword: '',
})

const regRules = reactive<FormRules>({
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ validator: userNameValid, trigger: ['blur', 'change'] }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ validator: passWordValid, trigger: ['blur', 'change'] }
	],
	confirmPassword: [
		{
			required: true, trigger: 'blur', validator: (rules: any, value: any, callback: any) => {
				if (!value) {
					return callback(new Error('请输入密码'))
				}
				if (value !== regForm.password) {
					return callback(new Error('两次密码输入不一致'))
				} else {
					return callback()
				}
			}
		}
	]
})

/* 注册按钮 */
const reg_Loading = ref(false)

/* 注册用户逻辑 */
const regUserDate = (regForms: FormInstance | undefined) => {

	if (!regForms) return
	regForms.validate((valid: boolean) => {
		if (valid) {
			reg_Loading.value = true
			regUser(regForm)
				.then((res: any) => {
					reg_Loading.value = false
					if (res.code === 200) {
						ElMessageBox.confirm('是否跳转到登录界面?', 'warning', {
							confirmButtonText: '直接登录',
							cancelButtonText: '取消',
							type: 'warning',
						}).then(() => {
							//直接登录
							loginUser()
						})
							.catch(() => {
								//跳转登录界面
								emit('changeForm', false)
							})
					} else {

						ElNotification({
							type: 'error',
							title: '提示',
							message: res.Msg,
							position: 'top-right'
						})
					}
				}).catch(() => {
					reg_Loading.value = false
				})
		}
	})
}

//直接登录
const loginUser = () => {
	store.loginUser(regForm)
		.then((res: any) => {
			if (res.code === 200) {
				logingSuccess()
			} else {
				emit('changeForm', false)
			}
		})
		.catch(() => {
			emit('changeForm', false)
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
	store.isLogin = true
	setTimeout(() => {
		laoding.close()
	}, 1000)
}


</script>
<style lang="scss" scoped>
.input-noBored:deep .el-input__wrapper {
	padding-bottom: 8px !important;
	padding-top: 8px !important;
}
</style>