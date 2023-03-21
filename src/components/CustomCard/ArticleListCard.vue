<template>
  <el-col class="component-list-card" :span="10">
    <img :src="baseUrl + articleInfo.pictureUrl" alt="" class="img curson-p"
      @click="goTOArticle(router, articleDetails)" />

    <!-- 标题 -->
    <div class="right-box flex-coulum-center">

      <span class="title">
        <el-link :underline="false" @click="goTOArticle(router, articleDetails)">
          {{ articleInfo.articleTitle }}
        </el-link>
      </span>
      <div>
        {{ articleInfo.createTime }}
      </div>
      <div class="tag">
        <el-tag round :type="t.tagType" v-for="(t, index) in articleInfo.tag" :key="index" @click="tagClick"
          effect="light">{{
            t.label
          }}</el-tag>
      </div>
    </div>
  </el-col>
</template>

<script lang="ts" setup>
/* 文章 */
import { tagTypes, articleInfoInter } from '@/type/article'
import { goTOArticle } from '@/mixins/articleMixins';
import { useRouter } from 'vue-router'
import { baseUrl } from '@/utils/custom'


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

const router = useRouter()
const articleDetails = {
  id: props.articleInfo.articleId,
  url: props.articleInfo.fileUrl
}

const tagClick = () => {

}
</script>

<style lang="scss" scoped>
.component-list-card {
  font-size: 14px;
  height: 8em;
  margin: 0 2em 2em;
  background-color: #F2F6FC;
  border-radius: 4px;
  display: flex;

  .img {
    height: 8em;
    width: 10em;
    object-fit: cover;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
  }

  .right-box {
    padding: 0.5em 1em;
  }

  .title {
    margin-bottom: 0.8em;

    color: #909399;

    .el-link {
      font-size: 16px;

      &:hover {
        color: #f56c6c;
      }
    }
  }

  .el-tag {
    margin-right: 0.5em;
    margin-top: 8px;
    cursor: pointer;
    white-space: nowrap;
  }
}
</style>