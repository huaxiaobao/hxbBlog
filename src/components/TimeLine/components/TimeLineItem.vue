<template>
  <div class="time-line-item">
    <!-- 主题日期展示 -->
    <slot name="time-header">
      <div class="time-wrap" :style="bordeStyle" @click="toggleClick">{{ timeObj.timeYearMoth }}</div>
    </slot>

    <!-- 月份细节展示  -->


    <transition :enter-active-class="transitionEnter" leave-active-class="animate__animated animate__bounceOut">
      <ul class=" time-details-wrap " v-show="isShowDetails">
        <li v-for="(item, index) in timeObj.children" :key="index">
          <div class="time-stamp">
            {{ item.timestamp }}
          </div>
          <div class="content">
            <slot>{{ item.content }}</slot>
          </div>

        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
type ChildrenItems = {
  content?: string,
  timestamp: string
}

type Items = {
  timeYearMoth: string,
  isExpand?: Boolean,
  color?: string,
  num: number,
  children?: Array<ChildrenItems>
}

interface Props {
  timeObj: Items
}


const props = withDefaults(defineProps<Props>(), {

  timeObj: () => {
    return {
      timeYearMoth: '2023-01',
      timestamp: '2023-01-14',
      color: '#E6A23C',
      num: 0
    }
  }
})

const bordeStyle = computed(() => {
  return {
    borderColor: props.timeObj.color
  }
})

const transitionEnter = computed(() => {
  const className = props.timeObj.num % 2 === 0 ? 'animate__bounceInRight' : 'animate__bounceInLeft'
  return `animate__animated ${className}`
})

const isShowDetails = ref(false)
const toggleClick = () => {
  isShowDetails.value = !isShowDetails.value
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>