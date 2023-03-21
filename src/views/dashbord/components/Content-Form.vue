<template>

  <el-form :model="form" label-width="120px" :rules="rules" ref="remarkForm">
    <el-row class="mb-24">
      <el-col :span="12">
        <el-form-item prop="subject" class="el-form-bottom-border ">
          <template #label>
            <el-icon :size="28" color="#409eff">
              <WindPower />
            </el-icon>
          </template>
          <el-input type="input" placeholder="主题" v-model="form.subject" class="subject-input" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="email" class="el-form-bottom-border">
          <template #label>
            <el-icon :size="28" color="#409eff">
              <Message />
            </el-icon>
          </template>
          <el-input type="input" placeholder="邮箱" v-model="form.email" class="email-input" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item prop="message" class="content-input">
      <template #label>
        <el-icon :size="28" color="#409eff">
          <Edit />
        </el-icon>
      </template>
      <el-input v-model="form.message" type="textarea" :rows="6" placeholder="留下你的足迹吧!" />
    </el-form-item>

    <el-form-item class="clearfix">
      <div class="flex-1">

        <el-button type="primary" round @click="onSubmit" class="fr" :loading="btnLoading"
          :disabled="isDisabled">提交留言</el-button>
        <el-button class="fr mr-8" plain round @click="resetFormFileds">清空</el-button>
      </div>
    </el-form-item>
  </el-form>

</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { contactAdd, contactEditor } from 'api/contact'
//表单数据定义
interface formData {
  email: string
  subject: string
  message: string
  [property: string]: any
}

//父子组件数据定义
const props = defineProps({
  froms: {
    type: null || Object,
    default: null
  },
  status: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['successEdit'])


let form: formData = reactive({

  email: '',
  subject: '',
  message: ''
})

watch(() => props.froms, () => {
  if (!props.froms) return
  Object.assign(form, props.froms)
}, { immediate: true })

let btnLoading = ref(false)
const isDisabled = computed(() => {
  const formComplete = form.subject && form.email && form.message
  return (!formComplete && btnLoading.value) || !formComplete
})

//表单数据
const remarkForm = ref<FormInstance>()
const rules = reactive<FormRules>({
  subject: [
    { required: true, message: '请填写主题', trigger: 'change' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'change' },
    { required: true, message: '邮箱格式不正确', trigger: 'change', type: 'email' }
  ]
})

//表单清空
const resetFormFileds = () => {
  if (!remarkForm.value) return
  remarkForm.value.resetFields()
}


/* 留言提交 */
const onSubmit = () => {
  if (!remarkForm.value) return
  remarkForm.value.validate((isValid) => {
    if (isValid) {
      if (props.status === 1) {
        addContact()
      } else {
        editContact()
      }

    }
  })
}

/* 新增留言 */
const addContact = () => {
  btnLoading.value = true
  contactAdd(form)
    .then((res: any) => {
      setTimeout(() => {
        btnLoading.value = false
      }, 2000)
      if (res.code === 200) {
        resetFormFileds()
        ElMessage({
          type: 'success',
          message: res.Msg
        })
      }
    })
    .catch((res: any) => {
      btnLoading.value = false
      ElMessage({
        type: 'error',
        message: res.Msg
      })
    })
}

//修改留言
const editContact = () => {
  btnLoading.value = true
  contactEditor(form)
    .then((res: any) => {
      btnLoading.value = false
      if (res.code === 200) {
        resetFormFileds()
        ElMessage({
          type: 'success',
          message: res.Msg
        })
        emit('successEdit')
      }
    })
    .catch((res: any) => {
      btnLoading.value = false
      ElMessage({
        type: 'error',
        message: res.Msg
      })
    })

}


</script>

<style lang="scss" scoped>
.subject-input ::v-deep .el-input__inner {
  color: #409eff;
  font-weight: 600;
  font-family: 'cus';
  font-size: 22px;
  letter-spacing: 3px;
  padding-left: 8px;
}

.email-input::v-deep .el-input__inner {
  color: #f89898;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 3px;
  padding-left: 8px;
}

.content-input::v-deep .el-textarea__inner {
  font-size: 16px;
  letter-spacing: 3px;
  padding-left: 8px;
}
</style>