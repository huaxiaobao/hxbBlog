<template>
  <layer-box class="article-manegment mb-16" @tab-click="handleClick">

    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="发表文章" name="1">
        <ArticleAddVue />
      </el-tab-pane>
      <el-tab-pane label="文章管理" name="2">
        <ArticleTableVue />
      </el-tab-pane>
      <el-tab-pane label="添加友链" name="3">
        <LinkVue />
      </el-tab-pane>
      <el-tab-pane label="友链管理" name="4">
        <LinkTableVue ref="LinkTableInstance" />
      </el-tab-pane>
      <el-tab-pane label="反馈收集" name="5">
        <ContactVue />
      </el-tab-pane>
    </el-tabs>
  </layer-box>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import ArticleAddVue from './components/ArticleAdd.vue'
import LinkVue from './components/Link.vue'
import LinkTableVue from './components/LinkTable.vue'
import ArticleTableVue from './components/ArticleTable.vue'
import ContactVue from './components/Contact.vue'
const LinkTableInstance = ref<InstanceType<typeof LinkTableVue> | null>(null)

const activeName = ref('5')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.paneName, event)
  if (tab.paneName == '4') {
    LinkTableInstance.value?.getLinkTableData()
  }
}


</script>

<style lang="scss" scoped>
.article-manegment {
  min-height: calc(100vh - 146px);
  margin-bottom: 16px;
}
</style>