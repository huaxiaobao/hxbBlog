<template>
  <div class="blog-picture-header" :style="{
    background: backGroundUrl
  }">
    <h1 class="title-bg">花小宝@hxb</h1>
    <h2 class="title-motto">
      motto:{{`宝儿,别着急，所有的东西都会有你想要的答案！`}}
    </h2>
  </div>
</template>

<script lang="ts" setup>
const backGroundUrl = 'url(https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302) center center / cover no-repeat #222'
</script>

<style lang="scss" scoped>
.blog-picture-header {
  height: 40vh;
  max-height: 40vh;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 10vh;
  margin-bottom: 1rem;
  box-shadow: 0 1px 12px rgb(150 150 150 / 70%);
  text-align: center;

  .title-bg {
    margin: 10px 0 10px 0;
    color: #F5F7FA;
    text-shadow: 0 3px 6px rgb(0 0 0 / 30%);
    letter-spacing: -1px;
    font-weight: 700;
    font-size: 3rem;
    font-family: Playball, cursive;
    animation: fade-in-down 1s both;
    animation-delay: .5s;
  }

  .title-motto {
    overflow: hidden;
    margin: 0;
    margin-top: 10px;
    color: #E6E8EB;
    // color: #67C23A;
    text-shadow: 0 3px 6px rgb(0 0 0 / 50%);
    letter-spacing: .01rem;
    font-weight: 400;
    font-size: 20px;
    font-family: Playball, cursive;
    line-height: 1.5em;
    -webkit-animation: fade-in-down .9s;
    animation: fade-in-down .9s both;
    -webkit-animation-delay: .1s;
    animation-delay: .3s;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
  }
}
</style>