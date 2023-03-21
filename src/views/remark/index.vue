<template>
  <!-- 表情组件 -->
  <div class="remark-wrap">
    <layer-box>
      <CustomTitle title="留言" />
      <p class="mb-16">欢迎小主 前来留言！</p>
      <Comment @textareaChange="textareaChange" ref="remarkComment" :textarea="textarea">
        <el-button type="primary" class="btn" @click="remarkSubmit">提交留言</el-button>
      </Comment>
    </layer-box>

    <layer-box class="mt-16 mb-16">
      <CustomTitle title="评论" />
      <RemarkVue ref="remarkData" />
    </layer-box>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { userInfoStore } from '@/store/user';
import { ElMessage } from 'element-plus';
import { remarkAdd } from 'api/remark'
import Comment from 'components/Comment/index.vue'
import RemarkVue from './components/Remark.vue';
const store = userInfoStore()
//留言框
let textarea = ref('')
const remarkComment = ref<InstanceType<typeof Comment> | null>(null)
const remarkData = ref<InstanceType<typeof RemarkVue> | null>(null)
const textareaChange = (val: any) => {
  textarea.value = val
}
//提交评论
const remarkSubmit = () => {
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
//新增留言
const addRemark = () => {
  remarkAdd({
    remark: textarea.value,
    createTime: new Date().toLocaleString()
  })
    .then((res: any) => {
      ElMessage({
        type: 'success',
        message: res.Msg
      })
      textarea.value = ''
      // remarkComment.value.textarea = ''
      remarkComment.value.textarea = ''

      //加载留言信息
      remarkData.value?.getRemarkListData()
    })
    .catch((err) => { })
}

//获取留言信息






</script>

<style lang="scss" scoped>
.btn {
  width: 88px;
}
</style>