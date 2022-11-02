<script setup lang="ts">
import { GetIdenticonUrl } from "~/common/api";

const { showNotify, showToast, showMsg } = usePageStore();

const getIdenticonUrl = () => {
  return GetIdenticonUrl("tesqwtasas");
};

onReady(() => {});

onShow(() => {});

onPullDownRefresh(() => {
  showMsg({ type: "loading", message: "success" });

  //
  uni.stopPullDownRefresh();
});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>我的</template>

    <!-- 用户信息 -->

    <div
      class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm"
    >
      <div class="p-2 flex flex-row justify-between items-center gap-1">
        <!-- 头像 -->
        <image
          class="w-15 h-15 rounded-full bg-gray-3 dark:bg-gray-6 bg-opacity-30"
          mode="scaleToFill"
          :userInteractionEnabled="false"
          :src="getIdenticonUrl()"
        ></image>

        <!-- 学号姓名 -->
        <div class="mr-10 flex flex-col justify-center items-start gap-1">
          <div class="text-lg font-bold">李跃萌</div>
          <div class="text-sm font-medium text-gray-500">ID: B19071121</div>
        </div>

        <!-- 账号状态 -->
        <div
          class="ml-10 flex flex-row justify-center items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-6"
        >
          <div class="text-sm font-medium text-gray-5 dark:text-gray-3">状态正常</div>
        </div>
      </div>
    </div>
    <!-- 选项 -->

    <div
      class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm"
    >
      <div
        class="flex flex-row justify-between items-center p-2"
        hover-class="opacity-50"
      >
        <div>选项1</div>
        <!-- 箭头 -->
        <div class="i-carbon-chevron-right"></div>
      </div>
      <!-- <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div> -->
      <div
        class="flex flex-row justify-between items-center p-2"
        hover-class="opacity-50"
      >
        <div class="flex flex-row justify-start items-center gap-1">
          <div class="i-carbon:settings"></div>
          <div>选项1</div>
        </div>
        <!-- 箭头 -->
        <div class="i-carbon-chevron-right"></div>
      </div>
      <!-- <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div> -->
      <div
        class="flex flex-row justify-between items-center p-2"
        hover-class="opacity-50"
      >
        <div>选项3</div>
        <!-- 箭头 -->
        <div class="i-carbon-chevron-right"></div>
      </div>
    </div>
  </UBasePage>
</template>

<style scoped></style>
