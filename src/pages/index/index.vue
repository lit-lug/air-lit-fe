<template>
  <view
    class="index bg-white dark:bg-black h-screen pl-7.5"
    :class="{ 'text-[50px]': true }"
  >
    <hello />
    <text class="text-red-400 dark:text-green-400">{{ title }}</text>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import hello from "@/components/Hello.vue";
// import { CSwiper } from "@/components/c-swiper/c-swiper.vue"; // 导入组件

let title = ref("Hello world!");

onShow(async () => {
  console.log("App Show");

  uni.showToast({
    title: "测试弹窗",
    icon: "none",
    duration: 2000,
    // mask: true,
  });
});
</script>

<style lang="pcss">
.index {
  @apply pt-[45vh];
}
</style>
