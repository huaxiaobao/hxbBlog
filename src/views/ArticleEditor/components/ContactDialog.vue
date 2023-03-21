<template>
  <el-dialog v-model="visible" :title="title" width="60%" @closed="CancelDialog" append-to-body
    :close-on-click-modal="false">

    <ContactFromVue :froms='from' @successEdit="successEdit" :status='2' />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import ContactFromVue from '@/views/dashbord/components/Content-Form.vue'

const emit = defineEmits(['queryData'])

/* from 表单数据类型定义 */
interface formData {
  contactName: string
  email: string
  subject: string
  message: string
  [property: string]: any
}

let visible = ref(false)
let title = ref('反馈编辑')
const CancelDialog = () => {
  visible.value = false
}
let from = ref<formData>()

/* 表单数据初始化 */
const dialogDataInit = (params: formData) => {
  visible.value = true
  from.value = JSON.parse(JSON.stringify(params))
  console.log(from.value)
}

/* 修改成功 */
const successEdit = () => {
  visible.value = false
  emit('queryData')
}

/* 组件暴露 */
defineExpose({
  dialogDataInit
})
</script>

<style lang="scss" scoped>

</style>