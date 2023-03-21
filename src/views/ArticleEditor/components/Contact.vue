<template>
  <el-table :data="filterTableData" style="width: 100%;height: 100%;" stripe v-loading="tabLaoding">
    <el-table-column label="用户姓名" prop="contactName" />
    <el-table-column label="邮箱" prop="email" />
    <el-table-column label="主题" prop="subject" />
    <el-table-column label="内容" prop="message" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="用户名" />
      </template>
      <template #default="scope">
        <!--  -->
        <el-button size="default" plain :icon="Edit" circle @click="handleEdit(scope.$index, scope.row)" />
        <el-button type="danger" :icon="Delete" circle @click="handleDelete(scope.$index, scope.row)"
          v-loading.fullscreen.lock="fullscreenLoading" />
      </template>
    </el-table-column>
  </el-table>
  <ContactVue ref="contactVues" @query-data="getContactData" />
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { contactQuery, contactDelete } from 'api/contact'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ContactVue from './ContactDialog.vue'

onMounted(() => {
  getContactData()
})

// api 返回数据规范
interface result {
  Msg?: string
  code?: number
  data?: null | [] //报错返回空值
}

/* 数据查询 */
const tableData = ref([])
let tabLaoding = ref(false)
let fullscreenLoading = ref(false)
const getContactData = () => {
  tabLaoding.value = true
  contactQuery({})
    .then((res: result) => {
      if (res.code === 200) {
        tableData.value = res.data || []
        tabLaoding.value = false
      }
    })
    .catch((res: result) => {
      if (res.code !== 200) {
        tableData.value = []
        tabLaoding.value = false
        ElMessage({
          type: 'error',
          message: res.Msg
        })
      }
    })
}

interface User {
  contactName: string
  email: string
  subject: string
  message: string,
  [property: string]: any
}

const search = ref('')

/* 表格数据源
  以及表格数据搜索
*/
const filterTableData = computed(() => {
  return tableData.value.filter(
    (data: any) => {
      console.log(data)
      return !search.value ||
        data.contactName.toLowerCase().includes(search.value.toLowerCase())
    }
  )
}
)

/* 弹窗组件 */
const contactVues = ref<InstanceType<typeof ContactVue>>()

/* 表格数据修改 */
const handleEdit = (index: number, row: User) => {
  if (!contactVues.value) return
  contactVues.value.dialogDataInit(row)
}

/*表格数据删除 */
const handleDelete = (index: number, row: User) => {
  ElMessageBox.confirm(
    '你确定要删除此条数据?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteData(row)
    })
}

const deleteData = (row: User) => {
  fullscreenLoading.value = true
  contactDelete({ id: row._id })
    .then((res: result) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: res.Msg
        })
        fullscreenLoading.value = false
        getContactData()
      }
    })
    .catch((res: result) => {
      fullscreenLoading.value = false
      ElMessage({
        type: 'error',
        message: res.Msg
      })
    })
}


</script>

<style lang="scss" scoped>
.icon {
  vertical-align: -8px;
  cursor: pointer;
  font-size: 22px;

  &.edit-icon {
    color: #409EFC;
    margin-right: 8px;
  }

  &.delete-icon {
    color: #f56c6c;
  }
}
</style>