<template>
  <div>
    <el-button type="primary" size="default" @click="decrement">-</el-button>
    {{ count }}
    <el-button type="primary" size="default" @click="increment">+</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const count = ref<number>(0)

const decrement = () => {

}

const increment = () => {

}

</script>