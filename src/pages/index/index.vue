<template>
  <view
    class="index bg-white dark:bg-black h-screen pl-7.5"
    :class="{ 'text-[50px]': true }"
  >
    <text class="text-red-400 dark:text-green-400">{{ title }}</text>
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
const title = ref("Hello world!");

onShow(async () => {
  console.log("App Show");
});
</script>

<style lang="pcss">
.index {
  @apply pt-[45vh];
}
</style>
