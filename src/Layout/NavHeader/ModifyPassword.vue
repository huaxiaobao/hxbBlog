<template>
  <!-- 修改密码 -->
  <el-dialog v-model="visible" title="修改密码" width="30%" @closed="CancelDialog" :close-on-click-modal="false">
    <EditPasswordVue @success="CancelDialog" />
  </el-dialog>

</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import EditPasswordVue from './EditPassword.vue';
//props
const props = defineProps({
  isShow: Boolean
})

const emit = defineEmits(['update:isShow'])
const visible = ref(false)
watch(() => props.isShow, (newValue) => {
  visible.value = newValue
}, { immediate: true })



//弹窗
const CancelDialog = () => {
  emit('update:isShow', false)
}

//修改 密码成功
// const success = () => {
//     emit('update:isShow', false)
// }
</script>

<style lang="scss" scoped>
</style>