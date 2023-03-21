<template>
  <div class="article-link">
    <el-form ref="ruleFormRef" :model="linkForm" status-icon :rules="rules" label-position="top" class="demo-linkForm"
      :scroll-to-error="true">
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
        <el-button type="primary" @click="submitForm(ruleFormRef)">添加友链</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { linkAdd } from 'api/Article'
import { parseTime } from '@/utils/data'
const ruleFormRef = ref<FormInstance>()

const linkForm = reactive({
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
      addLinkData()
    }
  })
}

const addLinkData = () => {
  const params = JSON.parse(JSON.stringify(linkForm))
  params.createTime = parseTime(new Date())
  linkAdd(params)
    .then((res: any) => {
      if (res.code === 200) {
        ElMessage({
          message: res.Msg,
          type: 'success'
        })
        resetForm(ruleFormRef.value)
      }
    })
    .catch((res: any) => {

    })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.demo-linkForm ::v-deep .btn-group .el-form-item__content {
  justify-content: flex-end !important;
}
</style>