<template>
  <layer-box class="article-box ">
    <CustomTitle :title="props.articleTitle" class="mb-24" />
    <div class="flex article-box-content">
      <img :src="baseUrl + props.pictureUrl" alt="">
      <div class="flex-1 ml-32 pd-t-8 pd-b-46">
        {{ props.description }}
      </div>
    </div>
    <div class="date-box">
      <div class="day color-primary fs-28 mb-8">{{ articleTime.date }}</div>
      <div class="t-dark">{{ articleTime.year + '-' + articleTime.month }}</div>
    </div>
    <div class="btn-box">
      <div class="mb-8 t-dark ml-3">阅读量：{{ props.readNum }}</div>
      <el-button type="primary" @click="readArticleClick">阅读全文</el-button>
    </div>
  </layer-box>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
import { baseUrl } from '@/utils/custom'
interface articleInfos {
  props: {
    _id: string,
    articleTitle: string,
    pictureUrl: string,
    fileUrl: string,
    description: string,
    createTime: string,
    readNum: string
  }
}
const { props } = defineProps<articleInfos>()

onMounted(() => {
  console.log(props.articleTitle)
})

//路由
const router = useRouter()

//计算日期 2022-09-07 21:01:31
const articleTime = computed(() => {
  return {
    year: props.createTime.slice(0, 4),
    month: props.createTime.slice(5, 7),
    date: props.createTime.slice(8, 10)
  }
})



//文章跳转
const readArticleClick = () => {
  // router.push('') {path: '/backend/order', query: {selected: "2"}}
  router.push({ path: `articledetails`, query: { id: props._id, url: props.fileUrl } })
}






</script>

<style lang="scss" scoped>
.article-box {
  position: relative;

  .article-box-content {
    img {
      width: 600px;
      height: 300px;
    }
  }

  .date-box {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .btn-box {
    position: absolute;
    right: 16px;
    bottom: 16px;
  }

}
</style>