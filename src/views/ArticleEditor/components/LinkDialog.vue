<template>
  <el-dialog v-model="visible" :title="title" width="60%" @closed="CancelDialog" append-to-body
    :close-on-click-modal="false">
    <el-form ref="ruleFormRef" :model="linkForm" status-icon :rules="rules" label-position="top" class="demo-linkForm">
      <el-form-item label="名称" prop="linkName">
        <el-input v-model="linkForm.linkName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="URL 地址" prop="url">
        <el-input v-model="linkForm.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="封面图片" prop="icon">
        <el-input v-model="linkForm.icon" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="linkForm.description" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item class="btn-group">
        <el-button type="primary" @click="submitForm(ruleFormRef)">修改友链</el-button>
        <!-- <el-button @click="resetForm(ruleFormRef)">重置</el-button> -->
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { linkEditor } from '@/api/Article'

const $emit = defineEmits(['linkChange'])

const ruleFormRef = ref<FormInstance>()
let visible = ref(false)
let title = ref('友链编辑')
const CancelDialog = () => {
  visible.value = false
}

let linkForm = ref({
  linkName: '',
  url: '',
  icon: '',
  description: ''
})

const rules = reactive({
  linkName: [{ required: true, trigger: 'blur', message: '请填写文章标题' }],
  url: [{ required: true, trigger: 'blur', message: '请填链接地址', type: 'url' }],
  icon: [{ required: true, trigger: 'blur', message: '请填链接地址', type: 'url' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      editorLinkData(formEl)
    }
  })
}

const editorLinkData = (formEl: any) => {
  linkEditor(linkForm.value)
    .then((res: any) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: res.Msg
        })
        formEl.resetFields()
        visible.value = false
        $emit('linkChange', true)
      }
    })
    .catch()
}

defineExpose({
  visible,
  title,
  linkForm,
  CancelDialog
})
</script>

<style lang="scss" scoped>
::v-deep .btn-group .el-form-item__content {
  justify-content: flex-end !important;
}
</style>