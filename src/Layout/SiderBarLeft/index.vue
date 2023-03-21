<template>
  <div class="left-sidebar-wrap">

  </div>
</template>

<script lang="ts" setup>
// import { MoreFilled } from '@element-plus/icons-vue'

const activities = [
  {
    content: '12月末，冬天，都不愿出门，无意间翻到了一个博客主的桌面，瞬间就下头了，我一定要改造我的 blog,所以就动起手来改造了界面的风格和动画效果！',
    timestamp: '2022-12-25',
    hollow: true,
    type: 'primary'
  },
  {
    content: '10月，11月，12月中旬，基本没想动过，一是因为出差，二是非常嫌弃这丑丑的界面风格，完全不想去看他！',
    timestamp: '2022-12-15',
    hollow: true,
    type: 'primary'
  },
  {
    content: '终于在某一天的下午，看到了一个心动的登录界面，开启登录注册界面的改造',
    timestamp: '2022-09-15',
    hollow: true,
    type: 'primary'
  },
  {
    content: '开始的博客界面很丑，一直在寻找一套ui设计风格',
    timestamp: '2022-09-05',
    type: 'primary',
    hollow: true
  },
  {
    content: '初步完成博客的基本功能！',
    timestamp: '2022-08-10',
    type: 'primary'
  },
  {
    content: '开始前后端一把梭的代码之旅',
    timestamp: '2022-06-24',
    color: '#0bbd87',
    // type: 'primary',
    hollow: true
  },
  {
    content: '博客界面后台搭建',
    timestamp: '2022-06-20',
    type: 'primary',
    hollow: true
  },
  {
    content: '初步完成博客界面布局 + 项目基本东西处理',
    timestamp: '2022-06-15',
    type: 'primary',
    hollow: true,
  },
  {
    content: '开启博客之旅 ',
    timestamp: '2022-06-08',
    type: 'primary',
    hollow: true,
  },
]
</script>

<style lang="scss" scoped>
.box-white-shadow {
  overflow: auto;
  max-height: 400px;



  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    opacity: 0.2;
    background: #409eff, ;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    background: fade(#409eff, 30%);
  }
}
</style>