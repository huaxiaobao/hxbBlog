<template>
  <div class="flex">
    <el-upload class="avatar-uploader" ref="upload" :show-file-list="true" :on-change="fileChange" :action="pictureUrl"
      :with-credentials="true" :auto-upload="false" list-type="picture-card" :file-list="fileList"
      v-show="!fileList.length" :limit="1" :on-exceed="handleExceed" :before-remove="handleRemove">
      <el-icon class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>

    <el-upload v-show="fileList.length" ref="upload1" class="avatar-uploader-btn " :on-change="fileChange"
      :action="pictureUrl" :with-credentials="true" :show-file-list="true" :file-list="fileList" :auto-upload="false"
      list-type="picture-card" :limit="1" :on-exceed="handleExceed" :before-remove="handleRemove"
      :on-success="handleSuccess">
      <el-button type="primary">修改封面图片</el-button>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import type { UploadProps, UploadFile, UploadFiles, UploadRawFile, UploadInstance } from 'element-plus'
import { genFileId } from 'element-plus'
import { baseUrl } from '@/utils/custom'

const emit = defineEmits(['pictUploadSuccess'])
const pictureUrl = ref(baseUrl + '/api/article/savaPictrue')

let fileList = ref([])

const upload = ref<UploadInstance>()
const upload1 = ref<UploadInstance>()

/* 上传文件时限制只能上传单个文件 */
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  upload1.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
  upload1.value!.handleStart(file)
}

const fileChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(fileList.value)
  const errorArr: string[] = []
  //图片格式校验
  const reg1: Boolean = /^(.+)\.jpg$/.test(uploadFile.name)
  if (!reg1) {
    errorArr.push('文件格式不正确')
  }

  const reg2: Boolean | number | undefined = uploadFile.size && uploadFile.size / 1024 / 1024 > 2
  if (uploadFile.size) {
    errorArr.push('文件大小不正确')
  } else {
    if (typeof (reg2) === 'boolean' && reg2) {
      errorArr.push('文件大小超出限制,最大为 2MB')
    }
  }

  if (!reg1 || (typeof (reg2) === 'boolean' && reg2)) {
    fileList.value.pop()
    return
  }
}

/* 文件移除 */
const handleRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {

  fileList.value = []
}


const submitUpload = () => {
  upload1.value!.submit()
}

//文件上传成功
const handleSuccess = (response: any) => {
  console.log(response)
  if (response.code === 200) {
    emit('pictUploadSuccess', response.data)
  }
}


//文件列表清除
const clear = () => {
  upload1.value!.clearFiles()
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
.avatar-uploader::v-deep .el-upload {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader::v-deep .el-upload:hover {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}


.avatar-uploader-btn {
  ::v-deep .el-upload.el-upload--picture-card {
    position: relative;
    top: 116px;
    width: 132px;
    height: 32px;
    border: none;
  }

}
</style>