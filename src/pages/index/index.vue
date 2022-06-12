<template>
  <view
    class="index bg-white dark:bg-black h-screen pl-7.5"
    :class="{ 'text-[50px]': true }"
  >
    <text :class="['font-bold']">{{ title }}</text>
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const title = ref("Hello world!");

onShow(async () => {
  // const data = await uni.request({
  //   url: "https://api.github.com/repos/dcloudio/uni-app/commits/master",
  //   dataType: "json"
  // });

  console.log("App Show");
});

// if (window.matchMedia("(prefers-color-scheme: dark)").matches)
//   document.documentElement.classList.add("dark");
// else document.documentElement.classList.add("light");
</script>

<style lang="pcss">
.index {
  @apply pt-[45vh];
}
</style>
