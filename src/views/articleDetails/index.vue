<template>
  <div class="article-wrap box-white-shadow">
    <Sticky :stickyTop="120" :zIndex="99999999999">
      <div id="article-toc-box" class="box-white-shadow">
        <h2>文章目录</h2>
        <div id="article-toc" />
      </div>
    </Sticky>

    <article id="test-editormd-view"></article>
  </div>
</template>

<script lang="ts">
declare const $: any
declare const editormd: any

</script>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'
import { addReadNum } from '@/api/Article';
import Sticky from '@/components/Sticky/index.vue'
import { baseUrl } from '@/utils/custom'
let props = defineProps({
  articleUrl: {
    type: String,
    reqired: true
  }
})



const route = useRoute()
onMounted(() => {

  $(function () {

    $.get(baseUrl + route.query.url, function (markdown: any) {

      editormd.markdownToHTML("test-editormd-view", {
        markdown: markdown,//+ "\r\n" + $("#append-test").text(),
        emoji: true,
        tocContainer: '#article-toc',	//指定目录容器的id
        tocDropdown: false
      });
    });

    //阅读量 +1
    addReadNum({ id: route.query.id })
      .then()
      .catch()
  });
})

</script>

<style lang="scss" scoped>
@import '@/style/hingilight/index.scss';

.article-wrap {
  position: relative;
}

#article-toc-box {
  position: absolute;
  left: calc(100% + 60px);
  top: 0;
  width: 300px;
  z-index: 9;
  box-shadow: 0 0 14px 7px rgb(220 220 220 / 30%);
}
</style>