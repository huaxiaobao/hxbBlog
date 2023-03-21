<template>
  <div :style="{ height: height + 'px', zIndex: zIndex }" ref="stickyRef">
    <div :class="[
      className,
      { 'sticky-active': isSticky }
    ]"
      :style="{ top: (isSticky ? stickyTop + 'px' : ''), zIndex: zIndex, width: width, height: height + 'px', position: position }">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue'

const stickyRef = ref<HTMLDivElement>()

//定义props
const props = defineProps({
  stickyTop: {
    type: Number,
    default: 0
  },
  zIndex: {
    type: Number,
    default: 1
  },
  className: {
    type: String,
    default: ''
  },
  stickyTopOffset: {
    type: Number,
    default: 0
  }
})


enum Postions {
  fixed = 'fixed'
}

let active = ref(false)
let position = ref<Postions | undefined>()
let width = ref('')
let height = ref('')
let isSticky = ref(false)


onMounted(() => {
  height.value = stickyRef.value!.getBoundingClientRect().height + ''
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})

const activated = () => {
  handleScroll()
}


const sticky = () => {
  if (active.value) {
    return
  }
  position.value = Postions.fixed
  active.value = true
  width.value = width.value + 'px'
  isSticky.value = true
}

const handleReset = () => {
  if (!active.value) {
    return
  }
  reset()
}


const reset = () => {
  position.value = undefined
  width.value = 'auto'
  active.value = false
  isSticky.value = false
}

const handleScroll = () => {
  if (!stickyRef.value) return
  let widths = stickyRef.value.getBoundingClientRect().width + ''
  width.value = widths || 'auto'
  const offsetTop = stickyRef.value.getBoundingClientRect().top
  if (offsetTop < props.stickyTop + props.stickyTopOffset) {
    sticky()
    return
  }
  handleReset()
}



const handleResize = () => {
  if (isSticky.value && stickyRef.value) {
    width.value = stickyRef.value.getBoundingClientRect().width + 'px'
  }
}
</script>
