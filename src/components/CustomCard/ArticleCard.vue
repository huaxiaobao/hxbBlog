<template>
  <el-col class="component-article-card" :span="7" :lg="7" :sm="10" :xm="12">
    <!-- 图片展示 -->
    <a class="img" @click="goTOArticle(router, articleQuery)" :style="{
      'background-image': `url(${baseUrl + articleInfo.pictureUrl})`
    }">
      <span class="date">
        <el-icon>
          <Clock />
        </el-icon>
        {{ articleInfo.createTime }}
      </span>
    </a>

    <!-- 文章标题 -->
    <div class="article-title">{{ articleInfo.articleTitle }}</div>
    <!-- 展示文章其他信息 -->
    <div class="metas flex-center">
      <Metas color="#f7ba2a" :title="articleInfo.likesNum">
        <!-- 点赞 -->
        <Star />
      </Metas>
      <Metas color="#409eff" :title="articleInfo.commentNum">
        <!-- 评论 -->
        <ChatDotRound />
      </Metas>
      <Metas color="#409eff" :title="articleInfo.readNum">
        <!-- 阅读 -->
        <View />
      </Metas>
    </div>

    <div class="tag">
      <el-tag round :type="t.tagType" v-for="(t, index) in articleInfo.tag" :key="index" @click="tagClick"
        effect="light">{{
          t.label
        }}</el-tag>
    </div>

    <el-button type="primary" size="large" round class="btn" @click="goTOArticle(router, articleQuery)">阅读全文</el-button>
  </el-col>
</template>

<script lang="ts" setup>
import Metas from '@/components/Metas/index.vue'
import { articleInfoInter } from '@/type/article'
import { goTOArticle } from '@/mixins/articleMixins'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';
const baseUrl = import.meta.env.VITE_VUE_APP_BASE_URL
onMounted(() => {
  console.log(baseUrl)
})
interface ArticleAPIKeyWord {
  articleInfo: articleInfoInter
}

const props = withDefaults(defineProps<ArticleAPIKeyWord>(), {
  articleInfo: (): articleInfoInter => {
    return {
      articleId: '',
      articleTitle: '',
      pictureUrl: '',
      fileUrl: '',
      createTime: '',
      tag: [],
      likesNum: 12,
      commentNum: 6,
      readNum: 50
    }
  }
})

/* 标签点击事件 */
const tagClick = () => {
  alert('标签点击')
}

/* 文章阅读点击 */
const articleQuery = {
  id: props.articleInfo.articleId,
  url: props.articleInfo.fileUrl
}
const router = useRouter()
// const goTOArticle = (params:
//   any) => {
//   router.push({ path: `articledetails`, query: params })
// }

</script>

<style lang="scss" scoped>
@import './index.scss'
</style>