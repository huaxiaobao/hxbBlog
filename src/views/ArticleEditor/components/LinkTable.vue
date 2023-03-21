<template>
  <el-table :data="tableData" style="width: 100%" stripe fit border highlight-current-row>
    <el-table-column prop="createTime" label="时间" min-width="180" />
    <el-table-column prop="linkName" label="链接名称" width="180" />
    <el-table-column prop="url" label="URL" width="180" show-overflow-tooltip />
    <el-table-column prop="icon" label="封面图标地址" min-width="180" show-overflow-tooltip />
    <el-table-column prop="description" label="描述" min-width="180" show-overflow-tooltip />
    <el-table-column prop="" label="操作" width="140" fixed="right">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <LinkDialogVue ref="LinkDialogVues" @linkChange="getLinkTableData" />
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { getLinkData, linkDelete } from 'api/Article'
import { onMounted, reactive, ref } from 'vue'
import LinkDialogVue from './LinkDialog.vue'

/* 弹窗 */
const LinkDialogVues = ref<InstanceType<typeof LinkDialogVue>>()

let tableData = ref([])

interface tableProp {
  _id: string,
  linkName: string,
  url: string,
  icon: string,
  description: string
}

//加载表格数据
onMounted(() => {

  getLinkTableData()
})

const getLinkTableData = () => {
  getLinkData({})
    .then((res: any) => {
      if (res.code === 200) {
        tableData.value = res.data
      }
    })
    .catch()
}


/* 编辑 */
const handleEdit = (rows: tableProp) => {
  if (!LinkDialogVues.value) return
  LinkDialogVues.value.linkForm = reactive(JSON.parse(JSON.stringify(rows)))
  LinkDialogVues.value.visible = true
}

/* 删除 */
const handleDelete = (row: tableProp) => {
  linkDelete({ id: row._id })
    .then((res: any) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: res.Msg
        })

        getLinkTableData()
      }
    })
    .catch()
}

//父组件暴露方法
defineExpose({
  getLinkTableData
})

</script>

<style lang="scss" scoped>
</style>