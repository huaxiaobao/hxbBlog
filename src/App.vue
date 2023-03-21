<template>
	<router-view />
</template>
<script setup lang="ts" >
import { onMounted } from 'vue';
import { loginStatus } from 'api/login'
import { userInfoStore } from './store/user';
const store = userInfoStore()
const loginChecked = () => {
	loginStatus()
		.then((res: any) => {
			const data = res.data
			if (data && data.username) {
				//存储vuex 用户信息
				store.SET_USERINFO(data)
			} else {

			}
		})
		.catch()
}
onMounted(() => {
	loginChecked()
})

</script>

