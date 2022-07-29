<template>
	<!-- 登录弹窗 -->
	<el-dialog
		v-model="visible"
		:title="title"
		width="30%"
		@closed="CancelDialog"
		append-to-body
		:close-on-click-modal="false"
	>
		<LoginForm v-if="!isRegStatus" @changeForm="changeForm" @closeDlg="CancelDialog"/>
		<!-- 注册 -->
		<RegForm v-else  @changeForm="changeForm" @closeDlg="CancelDialog"/>
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import LoginForm from './loginForm.vue'
import RegForm from './RegForm.vue'
import { computed } from '@vue/reactivity'

//组件接收参数
const props = defineProps({
	isShow: {
		type: Boolean,
		default: false
	},
	status: {
		type: String,
		default:'login'
	}
})

const emit = defineEmits(['update:isShow','update:status'])
//登录状态检测
let isRegStatus = ref(false)
watch(() => props.status, () => {
	console.log(props.status)
	if (props.status === 'login') {
		isRegStatus.value = false
	} else {
		isRegStatus.value = true
	}
}, {immediate:true})

//弹窗事件
const visible = ref(props.isShow)
const title = computed(() => {
	return isRegStatus.value?'注册':'登录'
})
watch(
	() => props.isShow,
	newValue => {
		visible.value = newValue
	}
)


//弹窗关闭
const CancelDialog = () => {
	emit('update:isShow', false)
	// resetForm(loginForm.value)
}

/* 切换表单 */
const changeForm = (isReg:boolean) => {
	isRegStatus.value = isReg
	emit('update:status',isReg? 'reg':'login')
	console.log(props.status)
}


</script>
