<template>
	<LayerBox class="blogger-wrap">
		<div class="flex">
			<el-avatar :size="50" :src="circleUrl" />
			<div class="ml-12">
				<p class="blog-name"><strong>花小宝</strong></p>
				<p class="code-age">码龄：99年</p>
			</div>
		</div>

		<!-- 网站信息 -->
		<div class="site-info mt-18 mb-18">
			<div class="flex-between-center">
				<SiteInfo v-for="(item, index) in siteLsit" :key="index" :info="item" />
			</div>
			<div class="divider"></div>
			<div class="flex-between-center">
				<SiteInfo
					v-for="(item, index) in siteList2"
					:key="index"
					:info="item"
				/>
			</div>
		</div>
		<!-- 联系方式 -->
		<div class="adress flex">
			<el-avatar :size="36" :src="circleUrl" />
			<el-avatar :size="36" :src="circleUrl" />
			<el-avatar :size="36" :src="circleUrl" />
		</div>

		<!-- 关注，粉丝 -->
		<div class="other mt-18">
			<svg-icon name="arrangement" />
		</div>
	</LayerBox>
</template>
<script setup lang="ts">
const circleUrl =
	'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
</script>
<script lang="ts">
import { defineComponent } from 'vue'
import SiteInfo from './SiteInfo.vue'
export default defineComponent({
	components: { SiteInfo },
	data() {
		return {
			siteLsit: [
				{
					data: 111,
					title: '访问数量'
				},
				{
					data: 99999,
					title: '文章数量'
				},
				{
					data: '5年',
					title: '网站时间'
				}
			],
			siteList2: [
				{
					data: 666,
					title: '点赞数量'
				},
				{
					data: 666,
					title: '粉丝数量'
				},
				{
					data: 666,
					title: '评论数量'
				}
			]
		}
	}
})
</script>

<style lang="scss" scoped>
// .blogger-wrap {
// 	// height: 1000px;
// 	// border-radius: 8px;
// }
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
}
.divider {
	height: 1px;
	width: 100%;
	border-top: 1px solid #dcdfe6;
}
</style>
