<template>
	<LayerBox class="blogger-wrap">
		<div class="flex">
			<el-avatar :size="50" :src="myAvatar" class="my-avatar" />
			<div class="ml-12">
				<p class="blog-name"><span class="ft-hxb fs-28 color-primary">花小宝</span></p>
				<p class="code-age mt-8 ">码龄： {{ codeAge }} 年</p>
			</div>
		</div>

		<!-- 网站信息 {{codeAge}}-->
		<div class="site-info mt-18 mb-18">
			<div class="flex-between-center">
				<SiteInfo v-for="(item, index) in siteLsit" :key="index" :info="item" />
			</div>
			<div class="divider"></div>
			<div class="flex-between-center">
				<SiteInfo v-for="(item, index) in siteList2" :key="index" :info="item" />
			</div>
		</div>
		<!-- 联系方式 -->
		<div class="adress flex">
			<el-popover :width="150">
				<template #reference>
					<el-avatar :size="36" :src="qqIcon" />
				</template>
				<template #default>
					<div>欢迎加入QQ群</div>
					<div>
						<img :src="qqCode" style="width:150px;height:auto">
					</div>
				</template>
			</el-popover>
			<el-popover :width="150">
				<template #reference>
					<el-avatar :size="36" :src="weixinIcon" />
				</template>
				<template #default>
					<div>欢迎加入<strong>微信群</strong></div>
					<div>
						<img :src="weixinCode" style="width:150px;height:auto">
					</div>
				</template>
			</el-popover>

			<el-avatar :size="36" :src="gitIcon" />
		</div>

		<!-- 关注，粉丝 -->
		<div class="other mt-18 flex">
			<div class="icon-box">
				<el-button type="primary" title="点赞" round :plain="isLikes" class="btn primary-btn" @click="likesClick">
					{{ isLikes ? '点赞' : '已赞' }}
				</el-button>

			</div>
			<div class="icon-box">
				<el-button type="danger" round :plain="isAttention" class="btn danger-btn" @click="attentionClick">
					{{ isAttention ? '关注' : '取消关注' }}
				</el-button>
			</div>
		</div>
	</LayerBox>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import { userInfoStore } from '@/store/user'
import SiteInfo from './SiteInfo.vue'
import { siteQuery } from 'api/site'
import myAvatar from '@/assets/myAvatar.jpg'
import qqIcon from '@/icons/svg/qq.svg'
import weixinIcon from '@/icons/svg/weixin.svg'
import gitIcon from '@/icons/svg/github.svg'
import qqCode from '@/assets/qqcode.jpg'
import weixinCode from '@/assets/weixin.jpg'
import { userLikeAttentChange } from 'api/login'

const store = userInfoStore()

/* 页面加载钩子 */
onMounted(() => {
	getSiteData()
	console.log(store.attention, store.likes)
	console.log(likesValue.value, attentionValue.value)
})

/* 网站信息查询 */
let siteLsit = ref([])
let siteList2 = ref([])

const codeAge = computed(() => {
	const time = Number(new Date().getFullYear()) - 2021
	return time
})


//网站信息查询
const getSiteData = () => {
	siteQuery({})
		.then((res: any) => {
			if (res.code === 200) {
				siteLsit.value = res.data1
				siteList2.value = res.data2
			}
		})
		.catch()
}


/* 网站点赞 && 关注 */
let likesValue = ref(store.likes)
let attentionValue = ref(store.attention)


const isLikes = computed(() => {
	console.log(store.likes)
	return store.likes === 0
})

let isAttention = computed(() => {
	console.log(store.attention)
	return store.attention === 0
})
/* 统一登录检测 */
const getLoaginStatus = (): Boolean => {
	if (!store.id) {
		ElMessage({
			type: 'warning',
			message: '小主，你还没有登录哟！'
		})
	}
	return !!store.id
}

/* 点赞 */
const likesClick = () => {
	if (!getLoaginStatus()) return
	likesValue.value = likesValue.value === 1 ? 0 : 1
	console.log(likesValue.value)
	likeAttenChange(1)
}

/* 关注 */
const attentionClick = () => {
	attentionValue.value = attentionValue.value === 1 ? 0 : 1
	if (!getLoaginStatus()) return
	likeAttenChange(2)
}

/**
 *  修改 点赞和 关注 状态 
 * types:1--点赞 2 ---关注
 **/
const likeAttenChange = (types: number) => {
	console.log(likesValue.value, attentionValue.value)
	userLikeAttentChange({
		types,
		likes: likesValue.value,
		attention: attentionValue.value
	})
		.then((res: any) => {
			if (res.code === 200) {
				ElMessage({
					type: 'success',
					message: res.Msg
				})
				console.log(res.data)
				//修改 store 状态
				if (types === 1) {

					store.likes = res.data.likes
				} else {
					store.attention = res.data.attention
				}
				console.log(res.data, store)
				console.log(likesValue.value, attentionValue.value)
			}
		})
		.catch(() => {
			if (types === 1) {
				likesValue.value = likesValue.value === 1 ? 0 : 1
			} else {
				attentionValue.value = attentionValue.value === 1 ? 0 : 1
			}
		})
}

</script>

<style lang="scss" scoped>
.my-avatar {
	:deep img {
		border-radius: 50%;
	}
}

.blog-name {
	height: 36px;
	line-height: 36px;
	font-size: 20px;
}

.code-age {
	height: 14px;
	line-height: 14px;
}

.adress {
	justify-content: space-between;

	:deep .el-avatar {
		background: none !important;

	}
}

.divider {
	height: 1px;
	width: 100%;
	border-top: 1px solid #dcdfe6;
}

.other {
	.icon-box {
		width: 50%;
		text-align: center;
		height: 32px;
		line-height: 32px;

		.svg-icon {
			vertical-align: middle;
		}
	}
}

.btn {
	width: 80px;
	// color: #303133 !important;

	&.is-plain:hover {
		background-color: #fff;

		&.primary-btn {
			color: #1da1ed;
		}

		&.danger-btn {
			color: #ff4949;
		}
	}
}
</style>
