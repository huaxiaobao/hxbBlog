<template>
  <el-table :data="tableData" style="width: 100%" stripe fit border highlight-current-row>
    <el-table-column prop="createTime" label="时间" min-width="180" />
    <el-table-column prop="articleTitle" label="文章标题" width="180" />
    <!-- <el-table-column prop="pictureUrl" label="封面图标" width="180" show-overflow-tooltip />
    <el-table-column prop="fileUrl" label="文件地址" min-width="180" show-overflow-tooltip /> -->
    <el-table-column prop="description" label="描述" min-width="180" show-overflow-tooltip />
    <el-table-column prop="readNum" label="点击量" min-width="80" show-overflow-tooltip />
    <el-table-column prop="" label="操作" width="140" fixed="right">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <ArticleDialogVue ref="ArticleDialogVues" @article-change="getArticleData" />
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { getArticle, deleteArticle } from 'api/Article'
import { onMounted, ref } from 'vue'
import ArticleDialogVue from './ArticleDialog.vue';

/* 弹窗 */
const ArticleDialogVues = ref<InstanceType<typeof ArticleDialogVue>>()

let tableData = ref([])

interface tableProp {
  _id: String,
  articleTitle: String,
  createTime: String,
  description: String,
  pictureUrl: String
}

//加载表格数据
onMounted(() => {
  getArticleData()
})

const getArticleData = () => {
  getArticle({})
    .then((res: any) => {
      if (res.code === 200) {
        tableData.value = res.data
      }
    })
    .catch()
}


/* 编辑 */
const handleEdit = (rows: Object) => {
  if (!ArticleDialogVues.value) return
  ArticleDialogVues.value.visible = true
  ArticleDialogVues.value.articleForm = JSON.parse(JSON.stringify(rows))
}

/* 删除 */
const handleDelete = (row: tableProp) => {
  deleteArticle(row)
    .then((res: any) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: res.Msg
        })

        getArticleData()
      }
    })
    .catch()
}

//父组件暴露方法
defineExpose({
  getArticleData
})

</script>

<style lang="scss" scoped>

</style>