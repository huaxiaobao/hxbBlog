<template>
	<LayerBox class="mt-8">
		<h3 class="c-h3">访客足迹</h3>
		<div class="flex-wrap flex-start-center">
			<div v-for="(item, index) in visitorsList.dataList" :key="index" class="text-c mr-14 mb-8">
				<el-avatar :size="36" :src="baseUrl + item.visitorId.picture" />
				<div class="text-ellipsis W-40">
					{{ item.visitorId.username }}
				</div>
			</div>
		</div>
	</LayerBox>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { getVisitorquery } from "api/visitor";
import { userInfoStore } from '@/store/user';
import { baseUrl } from '@/utils/custom'

//登录状态监测
const store = userInfoStore()
watch(() => store.isLogin, (newVal) => {
	if (newVal) {
		getVisitorInfo()
	}
})


let visitorsList = reactive({
	dataList: [
		{
			visitorId: <any>{}
		}
	]
})

onMounted(() => {
	getVisitorInfo()
})

//查询访客信息
const getVisitorInfo = () => {
	getVisitorquery({})
		.then((res: any) => {
			if (res.code === 200) {
				visitorsList.dataList = res.data
				console.log(res.data)
			}
		})
		.catch((res: any) => {
			visitorsList.dataList = []
		})
}
</script>
<style scoped lang="scss">
.W-40 {
	width: 40px;
}
</style>
