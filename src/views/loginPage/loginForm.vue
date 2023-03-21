<template>
	<el-form ref="loginForm" :model="loginFormaData" label-width="80px" :rules="loginRules" label-position="top"
		@submit.prevent @keydown.enter="loginUserData(loginForm)" class="login-box input-noBored">
		<el-form-item>
			<el-input v-model="loginFormaData.username" clearable placeholder="用户名" @focus="inputFocus('user')"
				@blur="inputFocus('user', 'blur')" class="input-from">
				<template #prefix>
					<img :src="userSvg" alt="" style="height: 20px;width: 20px;">
				</template>
			</el-input>
		</el-form-item>

		<el-form-item>
			<el-input v-model="loginFormaData.password" show-password placeholder="密码" class="input-from"
				@focus="inputFocus('pass')" @blur="inputFocus('pass', 'blur')">
				<template #prefix>
					<img :src="passSvg" alt="" style="height: 22px;width: 22px;">
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="mt-48">
			<el-button type="primary" class="login-btn flex-1" round @click="loginUserData(loginForm)"
				:loading="login_loading" :disabled="isDiabledBtn" size="large">登录
			</el-button>

		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { userNameValid, passWordValid } from '@/utils/validator'
import { userInfoStore } from '@/store/user';
import usernameSvg from '@/icons/svg/username.svg'
import usernameActiveSvg from '@/icons/svg/usernameActive.svg'
import passSvgs from '@/icons/svg/pass.svg'
import passActiveSvg from '@/icons/svg/passActive.svg'
import router from '@/router';

const emit = defineEmits(['changeForm'])
/* 表单 */
const loginForm = ref<FormInstance>()
const loginFormaData = reactive({
	username: '',
	password: '',
})


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

const inputFocus = (type: string, params?: string) => {
	if (type === 'user') {
		isFocusUser.value = params ? false : true
	} else {
		isFocusPass.value = params ? false : true
	}

}

/* 登录按钮点击控制 */
let login_loading = ref(false)

const isDiabledBtn = computed(() => {
	const isComplete = loginFormaData.username && loginFormaData.password

	return !isComplete || (isComplete && login_loading.value)
})

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

/*登录逻辑  */
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
		emit('changeForm', 2)
	})
		.catch(() => { })
}

//登录成功
const logingSuccess = () => {

	const laoding = ElLoading.service({
		lock: true,
		text: '正在登录中',
		background: 'rgba(0, 0, 0, 0.8)',
		customClass: 'laoding-login'
	})
	store.isLogin = true
	setTimeout(() => {
		laoding.close()
		router.push('/')
	}, 1000)
}

</script>

<style lang="scss" scoped>

</style>