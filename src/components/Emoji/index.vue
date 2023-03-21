<template>
  <!-- 表情组件 -->

  <el-popover placement="right-start" :width="344" trigger="click" popper-class="remark-wrap-popper" style="padding: 0;"
    :teleported="false">
    <template #reference>
      <span class="cuson-p fs-22">😀</span>
      <!-- <el-button style="margin-right: 16px">Click to activate</el-button> -->
    </template>
    <div class="box flex" :class="{
      'isDarkbox': isDark
    }">
      <label>主题：</label>
      <el-radio-group v-model="radio" class="ml-16" @change="radioChange">
        <el-radio :label="1">默认(light)</el-radio>
        <el-radio :label="2">暗黑(dark)</el-radio>
      </el-radio-group>
    </div>
    <VuemojiPicker @emojiClick="handleEmojiClick" class="emoji-wrap" :isDark="isDark" />
  </el-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'
//事件
const emit = defineEmits(['emojiChange'])

//表情
const handleEmojiClick = (detail: EmojiClickEventDetail) => {
  emit('emojiChange', detail)
}
const isDark = ref(false)

//按钮
const radio = ref(1)
const radioChange = (val: any) => {
  isDark.value = val !== 1
}

</script>

<style lang="scss" scoped>
.emoji-wrap {
  ::v-deep emoji-picker {
    height: 280px;
  }
}

.box {
  position: absolute;
  left: 9px;
  top: 11px;
  z-index: 99;
  background-color: #fff;
  width: calc(100% - 48px);
  height: 34px;
  line-height: 34px;
}

.isDarkbox {
  background-color: #222;
  color: #fff;

  .el-radio {
    color: #fff;
  }
}
</style>