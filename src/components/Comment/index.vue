
<template>
  <div class="comment-wrap">
    <!-- 评论框 -->
    <el-input v-model="textarea" type="textarea" :autosize="{ minRows: props.minRows, maxRows: props.maxRows }"
      :placeholder="props.placeholder" @change="textareaChange" />

    <!-- 表情 -->
    <div class="flex mt-16">
      <div class="flex-1">
        <Emoji @emojiChange="emojiChange" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import Emoji from 'components/Emoji/index.vue'

//父组件传参
const props = defineProps({
  minRows: {
    type: Number,
    default: 4
  },
  maxRows: {
    type: Number,
    default: 6
  },
  textarea: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '欢迎小主留言'
  }
})

//事件
const emit = defineEmits(['textareaChange'])

watch(() => props.textarea, (newValue) => {
  textarea.value = newValue
})

let textarea = ref('')

//接收表情信息
const emojiChange = (emojiData: any) => {
  textarea.value += emojiData.unicode
  textareaChange()
}

const textareaChange = () => {
  emit('textareaChange', textarea.value)
}

//子组件给父组件暴露 本身东西
defineExpose({
  textarea
})
</script>

<style lang="scss" scoped>

</style>

