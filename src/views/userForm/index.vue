<template>
  <div class="user-form mb-16">
    <layer-box v-if="showCompoennt">
      <CustomTitle title="头像" />
      <!-- 头像 -->
      <UploadAvatar />
      <CustomTitle title="用户名" class="mt-32" />
      <el-form ref="nameForm" :model="nameFormData" label-width="80px" :rules="nameRules" status-icon
        label-position="right" @submit.prevent>
        <el-form-item label="用户名：">
          <span class="name-box">{{ store.username }}</span>
        </el-form-item>
        <el-form-item label="新用户名" prop="username">
          <el-input v-model="nameFormData.username" />
        </el-form-item>
        <div class="flex-end-center">
          <el-button type="primary" @click="updateUserName(nameForm)" :loading="nameLoading">保存信息</el-button>
        </div>
      </el-form>

      <CustomTitle title="修改密码" class="mt-32" />
      <EditPasswordVue @success="passsSuccess" ref="EditPasswordVue" v-model:showEditBtn="showPass" />
    </layer-box>

    <layer-box v-if="!showCompoennt">
      小主，你还没有进行登录呦！
    </layer-box>
  </div>
</template>

<script lang="ts" setup>

import UploadAvatar from '@/components/UploadAvatar/index.vue'
import { reactive, ref, computed, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { ElMessage, ElLoading } from 'element-plus'
import { userNameValid, passWordValid } from '@/utils/validator'
import { userInfoStore } from '@/store/user'
import { updateName } from '@/api/login'
import EditPasswordVue from '@/components/EditorPassWord/EditPassword.vue'

//信息初始化
const store = userInfoStore()

//路由监听
const showCompoennt = computed(() => {
  return Boolean(store.username)
})
watch(showCompoennt, () => {
  console.log(showCompoennt)
})
//修改用户名
const nameFormData = reactive({
  username: '',
})
const nameLoading = ref(false)
const nameForm = ref<FormInstance>()

const sanmeValid = (rule: any, value: any, callback: any) => {
  if (nameFormData.username === store.username) {
    return callback(new Error('小主，新旧用户名不能相同哦！'))
  }
  return callback()
}

const nameRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator: userNameValid, trigger: ['blur', 'change'] },
    { validator: sanmeValid }
  ]
})

const updateUserName = (nameForm: FormInstance | undefined) => {
  if (!nameForm) return
  nameForm.validate(vlaid => {
    if (vlaid) {
      nameLoading.value = true
      updateName(nameFormData)
        .then((res: any) => {
          nameLoading.value = false
          if (res.code === 200) {
            ElMessage({
              message: res.Msg,
              type: 'success',
            })

            const laoding = ElLoading.service({
              lock: true,
              text: '正在切换信息中',
              background: 'rgba(0, 0, 0, 0.8)',
              customClass: 'laoding-login'
            })
            setTimeout(() => {
              store.username = res.data
              nameForm.resetFields()
              laoding.close()
            }, 1000)

          }
        })
        .catch(() => {
          nameLoading.value = false
        })
    }
  })
}


//修改密码
const showPass = false
const passsSuccess = () => {

}
</script>

<style lang="scss" scoped>
.name-box {
  font-weight: 700;
  color: red;
  font-size: 22px;
}

.upload-box {
  width: auto;
}

//图片回显
</style>