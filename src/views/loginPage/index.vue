<script lang="ts" setup>
import { h, ref, onMounted } from 'vue'
import { ElDivider } from 'element-plus'
import loginFromVue from "./loginForm.vue";
import RegFormVue from './RegForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { loginStatus } from '@/type'
let currentBtn = ref(loginStatus.Register)

const currentRoute = useRoute()
const $router = useRouter()

//初始化加载
onMounted(() => {
  const params: loginStatus = currentRoute.params.status as any
  currentBtn.value = params == 0 ? loginStatus.Login : loginStatus.Register
})


const spacer = h(ElDivider, { direction: 'vertical' })



type btnData = {
  text: string,
  status: loginStatus
}


const btnList: Array<btnData> = [
  {
    text: '账号登录',
    status: loginStatus.Login
  },
  {
    text: '账号注册',
    status: loginStatus.Register
  }
]

/* 登录注册切换 */
const btnclick = (params: loginStatus) => {
  console.log(params)
  currentBtn.value = params
}

//首页跳转
const goToHomePage = () => {
  $router.push({
    path: '/home'
  })
}

</script>

<template>
  <div class="login-wrap text-c">
    <div class="login-bg">
      <img src="@/assets/login_bg.png">
    </div>

    <el-card class="login-card">
      <header>
        <img src="@/assets/blog_logo.png" class="blog-img" @click="goToHomePage">
        <span class="ft-hxb color-primary ml-16 text-lgog" @click="goToHomePage">花小宝</span>
      </header>
      <div class=" btn-wrap">
        <el-space :size="10" :spacer="spacer">
          <el-button v-for="(item, index) in btnList" :key="index" link
            :class="{ 'is-active': currentBtn === item.status }" @click="btnclick(item.status)">{{
              item.text
            }}
          </el-button>
        </el-space>
      </div>

      <!-- 登录、注册盒子 -->
      <div class="login-main-box">
        <loginFromVue v-if="currentBtn == loginStatus.Login" @change-form="btnclick" />
        <RegFormVue v-else />
      </div>
    </el-card>
  </div>
</template>



<style lang="scss" scoped>
.login-wrap {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.login-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
  }
}

.login-card {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  margin: auto;
  width: 435px;
  height: 500px;
  box-shadow: 0px 0px 6px #a0cfff;
  border-radius: 16px
}

.blog-img {
  height: 42px;
  background-size: cover;
  vertical-align: -4px;
  cursor: pointer;
}

.text-lgog {
  font-size: 42px;
  cursor: pointer;
}

.btn-wrap {
  margin-top: 64px;

  .el-button {
    font-size: 16px;
    color: #909399;

    &:hover {
      color: #409EFF;
    }

    &.is-active {
      color: #409EFF;
    }
  }
}

.login-main-box {
  width: 360px;
  margin: 28px auto 0;
}
</style>