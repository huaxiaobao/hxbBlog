<template>
  <el-upload ref="upload" class="upload-file flex-1" drag :action="filrUrl" :auto-upload="props.autoUpload" :limit="1"
    :on-exceed="handleExceed" :on-change="fileChange" :file-list="fileList" :before-remove="handleRemove"
    :on-success="handleSuccess" :show-file-list="props.showFileList">
    <el-icon class="el-icon--upload" list-type="text">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">
      拖拽文件或 <em>点击上传</em>
    </div>
    <!-- <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template> -->
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { UploadProps, UploadFile, UploadFiles, UploadInstance, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import { baseUrl } from '@/utils/custom'
const emit = defineEmits(['fileChange', 'fileUploadSuccess', 'update:fileUrl'])

let filrUrl = ref(baseUrl + '/article/savaFile')
const fileList = ref([])
const upload = ref<UploadInstance>()

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  actionUrl: {
    type: String,
    default: ''
  },
  fileUrl: {
    type: String,
    default: ''
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  showFileList: {
    type: Boolean,
    ddefault: true
  },
  actionType: {
    type: String,
    default: 'add'
  }
})

//监听 url 变化，动态修改接口 query 参数
watch(() => props.fileUrl, (newValue) => {

  if (newValue) {
    filrUrl.value = baseUrl + `/article/editorFile?id=${props.id}&fileUrl=${props.fileUrl}`
  }
})

/* 目的：修改完成之后，需要修改文件路径参数，一遍能够删除文件 */
/* 上传文件时限制只能上传单个文件 */
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const fileChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {

  //上传文件校验
  if (uploadFile.status === 'ready') {
    const reg = /^(.+)\.md$/
    if (!reg.test(uploadFile.name)) {
      fileList.value.pop();
      return
    }

    //校验通过
    emit('fileChange', uploadFile.name, 'add')
  }
}

/* 文件移除 */
const handleRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emit('fileChange', uploadFile.name, 'remove')
}

const submitUpload = () => {
  upload.value!.submit()
}

//文件上传成功
const handleSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  if (response.code === 200) {
    emit('fileUploadSuccess', response.data)

  }
}

//文件列表清除
const clear = () => {
  upload.value!.clearFiles()
  fileList.value = []
}


/* 暴露信息 */
defineExpose({
  fileList,
  submitUpload,
  clear
})
</script>



<style scoped lang="scss">
.upload-file {
  .el-upload--text {
    height: 160px;
  }

  ::v-deep .el-upload-dragger {
    padding: 20px !important;
    box-sizing: border-box;
  }
}
</style>