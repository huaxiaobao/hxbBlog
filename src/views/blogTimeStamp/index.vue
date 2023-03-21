<template>
  <div class="blog-timestamp-wrap">
    <Card title="Blog 小脚丫">
      <template #icon>
        <svg-icon name="timestamp"></svg-icon>
      </template>
      <template #content>
        <TimeLine>
          <TimeLineItem v-for="(t, index) in activities" :key="index" :timeObj="{ ...t, num: index }" />
        </TimeLine>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import TimeLine from '@/components/TimeLine/index.vue'
import TimeLineItem from '@/components/TimeLine/components/TimeLineItem.vue'
type ChildrenItems = {
  content?: string,
  timestamp: string,

}

type Items = {
  timeYearMoth: string,
  isExpand?: Boolean,
  color?: string,
  children?: Array<ChildrenItems>
}



const activities: Array<Items> = [
  {
    timeYearMoth: '2023-01',
    children: [
      {
        content: ' 哈哈，经过两天下午的努力，搞好了时光轴以及动画效果!',
        timestamp: '2023-01-14'
      }
    ]
  },
  {
    timeYearMoth: '2022-12',
    children: [
      {
        content: '在12月份期间，发现了一些有趣的事情，所以特意加了一些功能，如聊天室，音乐坊，相册，勇敢的做一些尝试，也丰富博客的内容，吸引更多有趣的灵魂吧！',
        timestamp: '2022-12-29'
      },
      {
        content: '12月末，冬天，都不愿出门，无意间翻到了一个博客主的桌面，瞬间就下头了，我一定要改造我的 blog,所以就动起手来改造了界面的风格和动画效果！',
        timestamp: '2022-12-20'
      },
      {
        content: '10月，11月，12月中旬，基本没想动过，一是因为出差，二是非常嫌弃这丑丑的界面风格，完全不想去看他！',
        timestamp: '2022-12-15'
      }
    ]

  },


  {
    timeYearMoth: '2022-09',
    children: [
      {
        content: '终于在某一天的下午，看到了一个心动的登录界面，开启登录注册界面的改造',
        timestamp: '2022-09-15'
      },
      {
        content: '开始的博客界面很丑，一直在寻找一套ui设计风格',
        timestamp: '2022-09-05',
      }
    ]


  },

  {

    timeYearMoth: '2022-08',
    children: [{
      content: '初步完成博客的基本功能！',
      timestamp: '2022-08-10',
    }]
  },
  {

    color: '#0bbd87',
    timeYearMoth: '2022-06',
    children: [
      {
        content: '开始前后端一把梭的代码之旅',
        timestamp: '2022-06-24',
      },
      {
        content: '博客界面后台搭建',
        timestamp: '2022-06-20',
      },
      {
        content: '初步完成博客界面布局 + 项目基本东西处理',
        timestamp: '2022-06-15',
      },
      {
        content: '开启博客之旅 ',
        timestamp: '2022-06-08',
      }
    ]
  }


]
</script>

<style lang="scss" scoped>

</style>