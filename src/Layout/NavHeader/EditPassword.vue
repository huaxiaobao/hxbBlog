
<template>
  <!-- 
 * @Author: hxb 
 * @Date: 2022-07-24 17:06:35 
 * @Last Modified by: hxb
 * @Last Modified time: 2022-07-24 17:23:46
 -->
  <el-form :model="form" :rules="rules" label-width="80px" ref="passwordForm" label-position="right"
    @keydown.enter="editorValide(passwordForm)">
    <el-form-item label="原密码" prop="rePassword">
      <el-input v-model="form.rePassword" show-password placeholder="原密码" />
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input v-model="form.password" show-password placeholder="新密码" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="form.confirmPassword" show-password placeholder="确认密码" />
    </el-form-item>
    <el-form-item v-if="props.showEditBtn">
      <el-button type="primary" style="width:100%;" @click="editorValide(passwordForm)" class="btn-edit">修改密码
      </el-button>
    </el-form-item>
    <div class="clearfix" v-if="!props.showEditBtn">
      <el-button type="primary" class="fr" @click="editorValide(passwordForm)">修改密码</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import { editPass, ensurePass } from '@/utils/validator'
import { userInfoStore } from '@/store/user'
import { editPassword } from '@/api/login';

//props
const props = defineProps({
  showEditBtn: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['success'])

//store
const store = userInfoStore()



//表单
const form = reactive({
  rePassword: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive<FormRules>({
  rePassword: [{ required: true, message: '请输入密码', trigger: ['blur'] }],
  password: [{
    required: true, validator: (rule: any, value: any, callback: any) => {
      editPass(rule, value, callback, form.rePassword)
    }, trigger: ['blur']
  }],
  confirmPassword: [{
    required: true, validator: (rule: any, value: any, callback: any) => {
      ensurePass(rule, value, callback, form.password)
    }, trigger: ['blur']
  }],
})
const passwordForm = ref<FormInstance>()
const resetForm = (form: FormInstance | undefined) => {
  if (!form) return
  form.resetFields()
}

//修改密码验证
const editorValide = (form: FormInstance | undefined) => {
  if (!form) return
  form.validate(valid => {
    if (valid) {
      editorPassword()
    }
  })
}


//修改密码
const editorPassword = () => {
  //调接口
  editPassword({
    username: store.username,
    password: form.rePassword,
    newPassword: form.password
  }).then((res: any) => {

    if (res.code === 401) {
      ElNotification({
        type: 'error',
        title: '提示',
        message: res.Msg,
        position: 'top-right'
      })
      resetForm(passwordForm.value)
    } else if (res.code === 200) {
      ElNotification({
        type: 'success',
        title: '提示',
        message: res.Msg,
        position: 'top-right'
      })
      resetForm(passwordForm.value)
      emit('success', false)
    }
  })
    .catch(() => { })
  //修改成功退出登录，或者下次登录  （可以任意选择）


}

</script>

<style lang="scss" scoped>
.btn-edit {
  letter-spacing: 16px;
  font-size: 16px;
}
</style>