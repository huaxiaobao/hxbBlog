<template>
  <div class="tt">
    <section class="mb-48">
      <CustomTitle title="文章重传" />
      <UploadFile v-bind:fileUrl="fileData.fileUrl" :id="fileData._id" :autoUpload="true" :showFileList="false"
        actionType="editor" @fileUploadSuccess="fileUploadSuccess" />
    </section>

    <CustomTitle title="文章预览" />
    <article id="test-editormd-view" v-if="showFile"></article>
  </div>
</template>

<script lang="ts">
declare const $: any
declare const editormd: any
</script>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { getArticleDataById } from '@/api/Article';
import UploadFile from './UploadFile.vue'
import { baseUrl } from '@/utils/custom'
const emit = defineEmits(['hanldeSuccess'])

let showFile = ref(true)
let props = defineProps({
  id: {
    type: String,
    reqired: true
  }
})
let fileData = ref({
  fileUrl: ref(''),
  _id: ''
})

onMounted(async () => {

  const { data } = await getArticleDataById({ id: props.id })
  fileData.value = data
  getPreview(data)
})


const fileUploadSuccess = (data: any) => {
  showFile.value = false
  setTimeout(() => {
    fileData.value.fileUrl = data
    getPreview(fileData.value)
    emit('hanldeSuccess')
  })
}

//渲染文章
const getPreview = (data: any) => {
  showFile.value = true
  $(function () {
    $.get(baseUrl + `${data.fileUrl}`, function (markdown: any) {
      editormd.markdownToHTML("test-editormd-view", {
        markdown: markdown,//+ "\r\n" + $("#append-test").text(),
        emoji: true
      })
    })


  })
}

</script>

<style lang="scss" scoped>
#test-editormd-view {
  box-sizing: border-box;
}
</style>