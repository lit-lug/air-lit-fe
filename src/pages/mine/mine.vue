<script setup lang="ts">
const { showNotify, showToast, showMsg } = usePageStore();
const gologin = () => {
  uni.navigateTo({ url: "/pages/login/login" });
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

    <!-- 内容 -->
    <div flex="~ col" justify-center>
      <div
        class="flex flex-row justify-between p-2 m-3 dark:bg-dark bg-white rounded-lg shadow items-center shadow-sm"
      >
        <div>头像 | 用户信息</div>
      </div>

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
    </div>
  </UBasePage>
</template>

<style scoped></style>
