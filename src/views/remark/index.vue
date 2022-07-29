<template>
  <!-- 表情组件 -->
  <div class="remark-wrap">
    <layer-box>
      <CustomTitle title="留言" />
      <p class="mb-16">欢迎小主 前来留言！</p>
      <el-input v-model="textarea" type="textarea" placeholder="欢迎留言" :autosize="{ minRows: 10, maxRows: 50 }" />

      <div class="flex mt-16">
        <div class="flex-1">
          <Emoji @emojiChange="emojiChange" />
        </div>
        <el-button type="primary" class="btn" @click="remarkSubmit">提交留言</el-button>
      </div>
    </layer-box>

  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
import Emoji from 'components/Emoji/index.vue'
import { userInfoStore } from '@/store/user';
import { ElMessage } from 'element-plus';
import { remarkAdd } from 'api/remark'
const store = userInfoStore()
//留言框
const textarea = ref('')

//接收表情信息
const emojiChange = (emojiData: any) => {
  console.log(emojiData)
  textarea.value += emojiData.unicode
}

//提交评论
const remarkSubmit = () => {
  console.log(store.avatar, store.id)
  if (!textarea.value.trim()) {
    ElMessage({
      type: 'error',
      message: '请填写评论，在提交！'
    })
    return
  }
  if (!store.id) {
    ElMessage({
      type: 'error',
      message: '小主，请先登录再留言哦！'
    })
    return
  }

  //新增评论
  addRemark()
}

const addRemark = () => {
  remarkAdd({
    data: textarea.value
  })
    .then((res: any) => {
      ElMessage({
        type: 'success',
        message: res.Msg
      })

      textarea.value = ''
    })
    .catch()
}

</script>

<style lang="scss" scoped>
.btn {
  width: 88px;
}
</style>