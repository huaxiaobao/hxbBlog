<template>
  <div class="flex-start-end">

    <div class="avatar">
      <el-image style="width: 100%; height: 100%" :src="baseUrl + imageUrl" fit="cover" title="点击预览"
        :preview-src-list="srcList" :initial-index="4" />
    </div>
    <el-upload class="avatar-uploader-btn ml-32" :action="URLAction" :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload" :with-credentials="true" :show-file-list="false">
      <el-button type="primary">修 改 封 面 </el-button>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { baseUrl } from '@/utils/custom'
const emit = defineEmits(['uploadSuccess'])

/* 父组件传 Url 地址 */
let props = defineProps({
  pictureUrl: {
    type: String,
    required: true
  },
  id: {
    type: String
  }
})


/* 图片预览 */
let imageUrl = ref('')
const srcList = ref<string[]>([])



watch(() => props.pictureUrl, (newValue) => {
  const url = baseUrl + newValue
  imageUrl.value = newValue
  srcList.value = [url]
}, { immediate: true })

/* upload */

let URLAction = computed(() => {
  return baseUrl + `/article/editorPictrue?Url=${imageUrl.value}&id=${props.id}`
})//上传地址


//图片上传
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {

  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  // urlParams.value = { url: props.pictureUrl }
  return true
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  res: any,
  uploadFile
) => {
  emit('uploadSuccess')
  if (!(res.code === 200)) return
  const url = baseUrl + res.data
  imageUrl.value = res.data
  srcList.value = [url]


}




defineExpose({

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

.avatar {
  width: 146px;
  height: 146px;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 4px
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