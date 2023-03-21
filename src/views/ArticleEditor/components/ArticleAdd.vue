<template>
  <div class="article-link pd-t-16">
    <el-form ref="ruleFormRef" :model="articleForm" status-icon :rules="rules" label-position="right"
      class="demo-articleForm" :scroll-to-error="true" label-width="80px" v-loading="formLoading">

      <el-row>
        <el-col :span="12">
          <el-form-item label="文章标题" prop="articleTitle">
            <el-input v-model="articleForm.articleTitle" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="创建时间" prop="createTime">
            <el-date-picker v-model="articleForm.createTime" type="date" placeholder="选择时间" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="标签" prop="tag">
        <el-tag v-for="tag in dynamicTags" :key="tag" class="mr-12" closable :disable-transitions="false"
          @close="handleClose(tag.label)" :type="tag.tagType">
          {{ tag.label }}
        </el-tag>
        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="m w-20" size="small"
          @keyup.enter="handleInputConfirm">
          <template #prepend>
            <el-select v-model="selectValue" v-if="inputVisible" class="w-15" placeholder="Select" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
          <template #append>

            <el-button type="primary" class="" size="small" @click="handleInputConfirm"
              :loading="btnLoading">添加标签</el-button>
          </template>
        </el-input>

        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
          + New Tag
        </el-button>
      </el-form-item>
      <el-form-item label="文章简介" prop="description">
        <el-input v-model.trim="articleForm.description" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="封面图片">
        <UploadAvatar ref="pictureUpoad" @pictUploadSuccess="pictUploadSuccess" />
      </el-form-item>

      <el-form-item label="文件上传">
        <el-row class="flex-1">
          <el-col>
            <UploadFileVue ref="fileUpoad" @fileChange="fileChange" @fileUploadSuccess="fileUploadSuccess"
              :show-file-list="true" :auto-upload="false" />
          </el-col>
        </el-row>
      </el-form-item>


      <el-form-item class="btn-group">
        <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="btnLoading">添加文章</el-button>
        <el-button @click="resetForm()">重置表单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElInput } from 'element-plus'
import { articleAdd } from 'api/Article'
import { parseTime } from '@/utils/data'
import UploadAvatar from './UplaodPicture.vue'
import UploadFileVue from './UploadFile.vue'


type a = {
  label: string,
  tagType: string
}
/* 表单 */
let formLoading = ref(false)
let btnLoading = ref(false)
const ruleFormRef = ref<FormInstance>()
const pictureUpoad = ref<InstanceType<typeof UploadAvatar>>()
const fileUpoad = ref<InstanceType<typeof UploadFileVue>>()
const articleForm = reactive({
  articleTitle: '',
  createTime: parseTime(new Date()),
  description: '',
  pictureUrl: '',
  fileUrl: '',
  tag: [{}]
})

const rules = reactive({
  articleTitle: [{ required: true, trigger: 'blur', message: '请填写文章标题' }],
  createTime: [{ required: true, trigger: 'blur', message: '请选择时间' }]
})

/**
 * 文件上传，修改标题
 * @params{ add-新增，remove-删除文件} status
 * 
*/

const fileChange = (title: string, status: string) => {
  //处理传过来的名字
  const titls: string = title.split('.')[0]
  if (status === 'add') {
    if (articleForm.articleTitle) return
    articleForm.articleTitle = titls
  } else {
    if (articleForm.articleTitle === titls) {
      articleForm.articleTitle = ''
    }
  }
}



/* 提交前的校验 */
const submitForm = (formEl: FormInstance | undefined) => {
  asyncFormTag()
  let errorArr = []
  //图片文件校验
  if (!pictureUpoad.value?.fileList || pictureUpoad.value.fileList.length === 0) {
    errorArr.push('未上传封面图片')
  }
  if (!fileUpoad.value?.fileList || fileUpoad.value.fileList.length === 0) {
    errorArr.push('未上传文章信息')
  }
  // //文章标签校验
  // if()
  if (errorArr.length > 0) {
    ElMessage({
      type: 'error',
      message: errorArr.join('、')
    })

    return
  }

  /* 表单校验 */
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      formLoading.value = true
      btnLoading.value = true
      uploadPicture()
    } else {
      ElMessage({
        type: 'error',
        message: '表单未填写完整!'
      })
    }
  })
}

//上传图片 pictureUpoad
const uploadPicture = () => {
  pictureUpoad.value?.submitUpload()
}
//图片上传成功
const pictUploadSuccess = (picturUrl: string) => {
  articleForm.pictureUrl = picturUrl
  fileUpoad.value?.submitUpload()
}
//文章上传成功
const fileUploadSuccess = (fileUrl: string) => {
  articleForm.fileUrl = fileUrl
  addArticleData()
}


/* 保存文章 */
const addArticleData = async () => {
  const params = JSON.parse(JSON.stringify(articleForm))

  try {
    //上传文章表单信息
    articleAdd(params)
      .then((res: any) => {
        if (res.code === 200) {
          //清除表单数据
          resetForm()
        }
      })
      .catch(res => {

      })

  } catch (error: any) {
    ElMessage({
      type: 'error',
      message: error
    })

  } finally {
    formLoading.value = false
    btnLoading.value = false
  }
}

const resetForm = () => {
  ruleFormRef.value!.resetFields()
  pictureUpoad.value?.clear()
  fileUpoad.value?.clear()
}



/* 标签 */
const options = [
  { label: 'success(绿色)', value: 'success' },
  { label: 'info（灰色）', value: 'info' },
  { label: 'warning（橙色）', value: 'warning' },
  { label: 'danger（红色）', value: 'danger' }
]
const selectValue = ref('success')
const inputValue = ref('')
const dynamicTags = ref([{ label: '前端', tagType: 'success' }])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

//
const asyncFormTag = () => {
  articleForm.tag = dynamicTags.value
}

const handleClose = (label: string) => {

  dynamicTags.value.splice(((): number => {
    let currentIndex = 0
    dynamicTags.value.forEach((item, index) => {
      if (item.label === label) {
        currentIndex = index
      }
    })
    return currentIndex
  })(), 1)

}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push({ label: inputValue.value, tagType: selectValue.value })

  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style lang="scss" scoped>
.demo-articleForm ::v-deep .btn-group .el-form-item__content {
  justify-content: flex-end !important;
}

.w-20 {
  width: 320px;
}

.w-15 {
  width: 128px;
}
</style>