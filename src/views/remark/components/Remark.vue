<template>
  <el-tree :data="datalist" :props="defaultProps" @node-click="handleNodeClick" highlight-current class="tree-box"
    :expand-on-click-node="false" :icon="title" empty-text=" 暂无数据">
    <template #default="{ node, data }">
      <div class="custom-tree-node flex mb-16 flex-1">
        <el-avatar :src="baseUrl + data.author.picture" />
        <div class="ml-8 flex-1" v-clickOutside="() => {
          data.showText = false
        }">
          <div class="name-box">
            <span>{{ data.author.username }}</span>
            <span class="ml-32 mr-32">{{ data.createTime }}</span>
            <!-- <span>{{ data.IPAddress }}</span> -->
          </div>

          <div class=" remark-box mt-8 mb-8">
            <span v-if="node.level === 2" class="mr-8">{{ `回复${data.replyUser.username}：` }}</span>
            {{ data.remark }}
          </div>
          <div class="btn-group">
            <el-button text type="primary" link @click="replyCLick(data, node)">
              <el-icon class="mr-6">
                <ChatLineRound v-if="!data.showText" />
                <CircleCloseFilled v-else />
              </el-icon>
              {{ data.showText ? '取消' : '回复' }}
            </el-button>
            <el-button text link type="primary" @click="likesClick(data, node)">
              <svg-icon :name="isActiveLike(data) ? 'remarkActivelike' : 'remarkNoActivelike'" class="collect-icon " />

            </el-button>
            <span class="ml-8">{{ data.likes.length }}</span>
          </div>
          <div>
            <Comment v-if="data.showText" @textareaChange="textareaChange" :placeholder="`@${data.author.username}`">
              <el-button type="primary" size="small" @click="remarkClick(data, node)">评论</el-button>
            </Comment>
          </div>
        </div>
      </div>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import title from './TreeStatusTitle.vue'
import Comment from 'components/Comment/index.vue'
import { userInfoStore } from "@/store/user"
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'
import { getRemarkData, remarkAddSon, remarkLikes } from 'api/remark'
import { isReactive, onMounted, reactive, ref } from "vue"
//基础路径
import { baseUrl } from '@/utils/custom'
//获取用户信息
const store = userInfoStore()
interface Tree {
  author: object,
  children?: Tree[],
  class?: string,
  createTime: string,
  // IPAddress: string,
  remark: string,
  likes: Array<any>,
  showText: boolean
}

let datalist = ref([])

const defaultProps = {
  children: 'children',
  label: 'label',
}

let textarea = ref('')

const handleNodeClick = (data: Tree, node: any) => {
  console.log(node)
}

//评论框点击事件
const handOutClick = () => {
  // data.showText = false
  // textarea.value = ''
  // console.log('111')
}

//加载初始评论
onMounted(() => {
  getRemarkListData()
})

/* 获取评论数据*/
const getRemarkListData = () => {
  getRemarkData({})
    .then(((res: any) => {
      res.data.forEach((element: any) => {
        element.showText = false
        if (element.children) {
          element.children.forEach((item: any) => {
            item.showText = false
          })
        }
      })
      datalist.value = res.data
    }))
    .catch()
}


//登录校验
const loginValidate = (): boolean => {
  if (!store.id) {
    ElMessage({
      type: 'error',
      message: '小主，你还没有登录呢！'
    })
    return !!store.id
  }
  return true
}

//回复
const replyCLick = (data: any, node: any) => {
  const bool = loginValidate()
  if (!bool) return
  data.showText = !data.showText
  console.log(data)
}

/**评论 */
//评论文字变化
const textareaChange = (data: any) => {
  textarea.value = data
}

const remarkClick = (data: any, node: any) => {
  if (!textarea.value.trim()) {
    ElMessage({
      type: 'error',
      message: '请填写评论，在提交！'
    })
    return
  }
  let id = ""
  if (node.level === 1) {
    id = data._id
  } else if (node.level === 2) {
    id = node.parent.data._id
  }
  remarkSubmit(data, id)
}

//提交评论
const remarkSubmit = (data: any, id: string) => {

  remarkAddSon({
    remark: textarea.value,
    createTime: new Date().toLocaleString(),
    replyUser: data.author._id,
    id: id
  })
    .then((res: any) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: res.Msg
        })

        //查询留言数据
        getRemarkListData()
      }
    })
    .catch()
}

/* 点赞 */
//点赞图片显示
const isActiveLike = (data: any) => {
  return data.likes.indexOf(store.id) !== -1
}

const likesClick = (data: any, node: any) => {
  const bool = loginValidate()
  if (!bool) return

  console.log(node)
  //调点赞接口
  const remarkId = node.level === 1 ? data._id : node.parent.data._id
  remarkLikes({
    nodeLevel: node.level,
    remarkId,
    id: data._id
  }).then((res: any) => {
    //查询留言数据
    getRemarkListData()
  }).catch((res: any) => {

  })
}

defineExpose({
  getRemarkListData
})

</script>

<style lang="scss" scoped>
.tree-box:deep {
  &.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: transparent;
  }

  .el-tree-node {
    white-space: normal !important;

    &:focus>.el-tree-node__content {
      /*设置选中的样式 */
      background-color: transparent;
    }

    .el-tree-node__content {
      height: auto !important;
      // flex-direction: row-reverse;
      position: relative;

      &:hover {
        background-color: transparent;
      }

      .custom-tree-node {
        padding-right: 52px;
      }

      .el-icon.el-tree-node__expand-icon {
        width: 48px;
        position: absolute;
        right: 0;
        top: 0;
        transform: none;

        .title-expanded {
          display: none;
        }

        .title-noexpanded {
          display: block;
        }
      }

      .el-tree-node__expand-icon.expanded {
        .title-expanded {
          display: block;
        }

        .title-noexpanded {
          display: none;
        }
      }
    }
  }

  .btn-group {
    text-align: right;
  }

}
</style>



