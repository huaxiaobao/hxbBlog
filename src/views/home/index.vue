<template>
<div class="home-box">
  <layer-box class=" fs-18">
    <custom-title title="hi  大家好：" :titleBar="false"/>
    <p class="t-indent">各位小伙伴们，你们好，欢迎做客 <span class="ft-hxb fs-28 color-primary">花小宝</span>  博客空间，感谢你的到来！</p>
    <p class="t-indent">哈哈哈，惊喜总是留给有心人的，整个博客中，隐藏着一些小秘密，各位看官，有兴趣的可以探索，期待有缘人的解密！</p>

    <h4>Life motto: </h4>
    <p class="ft-cus t-indent"> 古希腊哲学家爱比克泰德曾经说过：我们登上并非我们所选择的舞台，演出并非我们所选择的剧本，各位同学有谁是自愿来到这个世界。有谁来到这个世界上，父母征求过你的意见。我们登上并非我们所选择的舞台，各位同学，有谁的人生剧本是你选择的，大家是不是很羡慕别人的剧本，老实说我有的时候也很羡慕别人的剧本。但是没有办法，你的剧本不是你选择的，你只有努力把你的剧本演好。虽然很痛苦但是只要努力的演好你的剧本，在痛苦中，也有精彩。每个人的人生剧本都是独特的，而每个人的人生剧本都是精彩的，不要去羡慕别人。</p>
    
  </layer-box>

    <layer-box class=" fs-18 mt-16">
    <custom-title title="博客技术站栈"/>
    <el-descriptions :column="1">
      <el-descriptions-item label="vue3" label-align="right">    <el-progress :percentage="30" /></el-descriptions-item>
      <el-descriptions-item label="typescript" label-align="right"><el-progress :percentage="20" /></el-descriptions-item>
      <el-descriptions-item label="pinia" label-align="right"><el-progress :percentage="10" /></el-descriptions-item>
      <el-descriptions-item label="vite" label-align="right"><el-progress :percentage="10" /> </el-descriptions-item>
      <el-descriptions-item label="elemnt-plus" label-align="right"><el-progress :percentage="10"  /></el-descriptions-item>
      <el-descriptions-item label="node.js" label-align="right"><el-progress :percentage="20"  /></el-descriptions-item>
    </el-descriptions>
  </layer-box>

  <layer-box class=" fs-18 mt-16 mb-16" id="concat" name="concat">
    <custom-title title="留言" :titleBar="false"/>
     <el-form :model="form" label-width="120px" :rules="rules" ref="remarkForm">
        <el-form-item label="评论：" prop="remark">
          <el-input type="textarea" v-model="form.remark" :rows="6"/>
        </el-form-item>
        <el-form-item label="邮箱地址：" prop="emaile">
          <el-input  v-model="form.emaile" />
        </el-form-item>

        <el-form-item class="clearfix">
          <div class="flex-1"><el-button type="primary" @click="onSubmit" class="fr">提交留言</el-button></div>
          <span>{{count}}</span>
        </el-form-item>
    </el-form>
  </layer-box>
</div>
</template>

<script lang="ts" setup>
import { reactive,ref,computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'

const remarkForm = ref<FormInstance>()
const form = reactive({
  remark: '',
  emaile: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const a = ref(0)
const count = computed(() => {
  return a.value
})
const onSubmit = () => {
  a.value++
}

const rules = reactive<FormRules>({
  	remark: [
		{ required: true, message: '请填写评论', trigger: 'blur' }
	],
  	emaile: [
		{ required: true, message: '请输入邮箱', trigger: 'blur' }
	]
})
</script>

<style lang="scss" scoped>
.t-indent{
  text-indent: 2em;
}
.el-progress{
  width: calc(100% - 200px);
}

</style>