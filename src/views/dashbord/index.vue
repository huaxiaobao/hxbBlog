<template>
  <div class="dashbord-wrap  ">
    <div class="box-white-shadow">
      <custom-title title="hi  大家好：" font-type="fzktk" :size="28" />

      <custom-paragraph :size="18">
        各位小伙伴们，你们好，欢迎做客 <span class="ft-hxb fs-32 color-primary">花小宝</span>
        博客空间，感谢你的到来！哈哈哈，惊喜总是留给有心人的，整个博客中，隐藏着一些小秘密，各位看官，有兴趣的可以探索，期待有缘人的解密！
      </custom-paragraph>

      <custom-title title="Life motto:" font-type="fzktk" :size="28" :isRanBow="true" />

      <custom-paragraph :size="18">
        古希腊哲学家爱比克泰德曾经说过：我们登上并非我们所选择的舞台，演出并非我们所选择的剧本，各位同学有谁是自愿来到这个世界。有谁来到这个世界上，父母征求过你的意见。我们登上并非我们所选择的舞台，各位同学，有谁的人生剧本是你选择的，大家是不是很羡慕别人的剧本，老实说我有的时候也很羡慕别人的剧本。但是没有办法，你的剧本不是你选择的，你只有努力把你的剧本演好。虽然很痛苦但是只要努力的演好你的剧本，在痛苦中，也有精彩。每个人的人生剧本都是独特的，而每个人的人生剧本都是精彩的，不要去羡慕别人。
      </custom-paragraph>
    </div>


    <!-- 热门文章 -->
    <div class="hot-aticle-wrap">
      <Card title="热门文章">
        <template #icon>
          <svg-icon name="hot"></svg-icon>
        </template>
        <template #content>
          <el-row>
            <article-card v-for="(item, index) in articlHotList" :key="index" :articleInfo="item"></article-card>
          </el-row>
        </template>
      </Card>
    </div>

    <!-- 最近更新 -->
    <div class="last-article-wrap">
      <Card title="最近更新">
        <template #icon>
          <svg-icon name="fileupdate"></svg-icon>
        </template>
        <template #content>
          <el-row>
            <article-list-card v-for="(item, index) in articlLatestList" :key="index"
              :articleInfo="item"></article-list-card>
          </el-row>
        </template>
      </Card>
    </div>

    <!-- 留言模块 -->
    <div class="last-article-wrap">
      <Card title="留言寄语">
        <template #icon>
          <ChatLineSquare />
        </template>
        <template #content>
          <custom-paragraph :size="18">
            我们的缘分从这里开始，留下你的足迹吧！
          </custom-paragraph>
          <!-- 留言表单 -->
          <ContentForm />

        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ContentForm from '@/views/dashbord/components/Content-Form.vue';
import { hotArticle, lastUpdateQuery, articleRequest } from '@/api/Article'
import { onMounted, ref } from 'vue';

onMounted(() => {
  getHotArticleData()
  getlasteArticleData()
  articleRequest('/link/getLinkData', {})
    .then(res => {
      if (res.code === 200) {

      }
    })
    .catch((res) => {
      if (res.code !== 200) {

      }
    })

})

/* 热门文章查询 */
const articlHotList = ref<Array<any>>([])
const getHotArticleData = () => {
  hotArticle({})
    .then((res: any) => {
      if (res.code === 200) {
        //给文章添加字id 字段 
        res.data.forEach((element: any) => {
          element.articleId = element._id
        })
        articlHotList.value = res.data
      }
    })
    .catch(() => {

    })
}


/* 最近更新 */
const articlLatestList = ref<Array<any>>([])
const getlasteArticleData = () => {
  lastUpdateQuery({})
    .then((res: any) => {
      if (res.code === 200) {
        //给文章添加字id 字段 
        res.data.forEach((element: any) => {
          element.articleId = element._id
        })
        articlLatestList.value = res.data
      }
    })
    .catch((err) => {
    })
}
</script>

<style lang="scss" scoped></style>