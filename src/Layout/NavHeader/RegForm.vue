<template>
	<el-form :model="regForm" label-width="80px" 	:rules="regRules" ref="regForms">
		<el-form-item label="用户名" prop="username">
			<el-input v-model="regForm.username" />
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="regForm.password"  show-password/>
		</el-form-item>
		<el-form-item label="确认密码" prop="confirmPassword">
			<el-input v-model="regForm.confirmPassword"  show-password/>
		</el-form-item>
		<el-form-item class="flex">
			<el-button type="primary" class="flex-1" @click="regUserDate(regForms)" :loading="reg_Loading">注册</el-button>
					<el-link type="danger" :underline="false" @click="regClick()" class="ml-16">快捷登录</el-link>
		</el-form-item>
	</el-form>
</template>
<script lang="ts" setup>
import { reactive,ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification,ElMessage, ElMessageBox,ElLoading } from 'element-plus'
import { userNameValid, passWordValid } from '@/utils/validator'
import { regUser } from 'api/login'
import { userInfoStore } from '@/store/user'
const emit = defineEmits(['changeForm','closeDlg'])

//store
const store = userInfoStore()

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
					return callback(new Error('请输入密码！'))
				}
				if (value !== regForm.password) {
				return callback(new Error('两次密码输入不一致'))
				} else {
				return callback()
			}
		}}
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
						position:'top-right'
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
		.then((res:any) => {
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
							 customClass:'laoding-login'
						})
						setTimeout(() => {
							laoding.close()
						},1000)
}

//切换按钮
const regClick = () => {
	emit('changeForm', false)
}

</script>
<style lang="scss" scoped>
</style>