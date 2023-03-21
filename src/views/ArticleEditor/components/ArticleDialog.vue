<template>
  <el-dialog v-model="visible" :title="title" width="60%" @closed="CancelDialog" append-to-body
    :close-on-click-modal="false">
    <div v-if="visible">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="主要信息" name="first">
          <el-form ref="ruleFormRefs" :model="articleForm" status-icon :rules="rules" label-position="right"
            class="demo-articleForm" :scroll-to-error="true" label-width="80px" v-loading="formLoading">

            <el-form-item label="文章标题" prop="articleTitle">
              <el-input v-model="articleForm.articleTitle" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker v-model="articleForm.createTime" type="date" placeholder="选择时间" style="width: 100%" />
            </el-form-item>
            <el-form-item label="文章简介" prop="description">
              <el-input v-model.trim="articleForm.description" type="textarea" :rows="4" />
            </el-form-item>
            <el-form-item label="封面图片">
              <ArticleDialogUploadVue :pictureUrl="articleForm.pictureUrl" :id="articleForm._id"
                @uploadSuccess="handleSuccess" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="文章预览" name="second">
          <ArticlePreviewVue :id="articleForm._id" @hanlde-success="handleSuccess" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <template #footer>
      <el-button type="primary" @click="submitArticle" :loading="btnLoading">提交</el-button>
      <el-button type="primary" plain @click="CancelDialog">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import ArticleDialogUploadVue from './ArticleDialogUpload.vue';
import ArticlePreviewVue from './ArticlePreview.vue';
import type { TabsPaneContext } from 'element-plus'
import { editorArticle } from 'api/Article'

/* 事件发送 */
const emit = defineEmits(['articleChange'])

/* 弹窗 */
let visible = ref(false)
let title = ref('文章编辑')
const CancelDialog = () => {
  visible.value = false
}
/* tab 页 */
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


/* 表单 */
let formLoading = ref(false)
let btnLoading = ref(false)
const ruleFormRefs = ref<FormInstance>()
let articleForm = ref({
  _id: '',
  articleTitle: '',
  createTime: '',
  description: '',
  pictureUrl: '',
  fileUrl: ''
})

const rules = reactive({
  articleTitle: [{ required: true, trigger: 'blur', message: '请填写文章标题' }],
  createTime: [{ required: true, trigger: 'blur', message: '请选择时间' }]
})

//表单数据修改
const submitArticle = () => {
  ruleFormRefs.value?.validate(valid => {
    if (valid) {
      editorData()
    }
  })
}

const editorData = () => {
  formLoading.value = true
  btnLoading.value = true
  editorArticle(articleForm.value)
    .then((res: any) => {
      if (res.code === 200) {
        resetFileds()
        setTimeout(() => {
          articleForm.value = res.data
          formLoading.value = false
          btnLoading.value = false
        }, 1000)
      }
    })
    .catch((res: any) => {
      formLoading.value = false
      btnLoading.value = false
    })
}



/* 表单数据清空 */
const resetFileds = () => {
  ruleFormRefs.value?.resetFields()
}

/* 成功回调 */
const handleSuccess = () => {
  emit('articleChange')
}

/* 组件暴露 */
defineExpose({
  visible,
  title,
  CancelDialog,
  articleForm,
  resetFileds
})
</script>

<style lang="scss" scoped>
::v-deep .btn-group .el-form-item__content {
  justify-content: flex-end !important;
}
</style>