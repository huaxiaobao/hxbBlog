<template>

  <div>
    <div class="mb-18">
      <ArticleBoxVue v-for="(item,index) in articleList" :props="item" :key="index" class="mb-16" />
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ArticleBoxVue from './comonents/ArticleBox.vue';
import { getArticle } from '@/api/Article'
let articleList = ref([])

onMounted(() => {
  getArticleData()
})

//查询文章信息
const getArticleData = () => {
  getArticle({})
    .then((res: any) => {
      if (res.code === 200) {
        articleList.value = res.data
        console.log(articleList.value)
      }
    })
    .catch()
}

</script>

<style lang="scss" scoped>

</style>
