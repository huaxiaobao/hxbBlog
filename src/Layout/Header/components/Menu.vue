<template>
  <!-- 菜栏导航 -->
  <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="el-menu-navigator"
    :ellipsis="false" router>

    <template v-for="item in navList" :key="item.path">
      <!-- 没有菜单栏 -->
      <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path" :class="[item.menuClassName]">
        <span v-if="!item.linkType">{{ item.title }}</span>
        <a v-if="item.linkType" :href="item.path" target="_blank">{{ item.title }}</a>
      </el-menu-item>

      <!-- 有菜单栏 -->
      <el-sub-menu v-else :index="item.path" :class="[item.menuClassName]">
        <template #title>{{ item.title }}</template>
        <el-menu-item v-for="son in item.children" :index="son.path" :class="[son.menuClassName]">
          <a :href="son.path" target="_blank">{{ son.title }}</a>
        </el-menu-item>
      </el-sub-menu>

    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'


interface MenuItem {
  path: string,
  title: string,
  linkType?: string,
  menuClassName?: string,
  children?: Array<MenuItem>
}

const route = useRoute()

const navList: Array<MenuItem> = [
  {
    path: '/home',
    title: '首页',
    menuClassName: 'home'
  },
  {
    path: '/article',
    title: '技术分享'
  },

  {
    path: '/chartRoom',
    title: '聊天室',
  },
  {
    path: '/musicWorkshop',
    title: '音乐坊'
  },
  {
    path: '/photoAlbum',
    title: '相册'
  },
  {
    path: '/blogTimeStamp',
    title: '时光轴'
  },
  {
    path: '/friendlyChain',
    title: '友情链接'
  },
  // {
  //   path: '/management',
  //   title: '我的空间',
  //   children: [
  //     {
  //       path: '/management/timeLine',
  //       title: '后台管理'
  //     }
  //   ]
  // }
]




const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const activeIndex = computed(() => {
  return route.path
})


</script>

<style lang="scss" scoped>
.el-menu-navigator {
  justify-content: center;
  margin: auto;
  border-bottom: none;
  background-color: transparent;
  user-select: none;

  .el-menu-item,
  .el-menu-item:hover,
  .el-menu-item:focus {
    background-color: transparent;
  }

  .el-menu-item {
    font-size: 18px;
    color: #807dd4;
  }

  ::v-deep .el-sub-menu .el-sub-menu__title {

    font-size: 18px;
    color: #807dd4;


    &:hover,
    &:focus {
      background-color: transparent;
      color: #409eff;
    }
  }

}
</style>