<template>
  <div class="flex-start-end">
    <el-upload class="avatar-uploader" :action="URLAction" :show-file-list="false" :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload" :with-credentials="true">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>

    <el-upload class="avatar-uploader-btn ml-32" :action="URLAction" :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload" :with-credentials="true">
      <el-button type="primary">修 改 头 像</el-button>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
//import { updateAvatar } from '@/api/login'
import type { UploadProps } from 'element-plus'
import { userInfoStore } from '@/store/user'
//获取 store
const store = userInfoStore()

//上传地址 
const URLAction = ref('http://localhost:4000/updateInfo/updateAvatar')
const imageUrl = ref(`http://localhost:4000${store.avatar}`)

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  res: any,
  uploadFile
) => {
  if (!(res.code === 200)) return

  //
  const laoding = ElLoading.service({
    lock: true,
    text: '加载中，请稍后',
    background: 'rgba(0, 0, 0, 0.8)',
    customClass: 'laoding-login'
  })

  setTimeout(() => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    store.avatar = res.data
    laoding.close()
  }, 1000)



}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {

  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  console.log(rawFile)
  return true
}
</script>



<style scoped>
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


.avatar-uploader-btn::v-deep .el-upload-list {
  display: none;
  visibility: hidden;
}
</style>