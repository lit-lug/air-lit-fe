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

const toAccountPage = () => {
  uni.navigateTo({
    url: "/pages/mine/account/account",
  });
};
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
          <div class="text-sm font-medium text-gray-5 dark:text-gray-4">
            ID: B19071121
          </div>
        </div>

        <!-- 账号状态 -->
        <div
          class="ml-10 flex flex-row justify-center items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-6"
        >
          <div class="text-sm font-medium text-gray-5 dark:text-gray-3">状态正常</div>
        </div>
      </div>
    </div>

    <!-- 选项 todo: 抽离成 cell 组件 -->

    <div
      class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm"
    >
      <div
        class="flex flex-row justify-between items-center p-2 my-2"
        hover-class="opacity-50"
        @click="toAccountPage"
      >
        <div class="flex flex-row items-center gap-2">
          <div class="i-carbon:account text-xl"></div>
          <div>账户管理</div>
        </div>

        <div class="i-carbon-chevron-right"></div>
      </div>

      <div
        class="flex flex-row justify-between items-center p-2 my-2"
        hover-class="opacity-50"
      >
        <div class="flex flex-row items-center gap-2">
          <div class="i-carbon:settings text-xl"></div>
          <div>公众号配置</div>
        </div>

        <div class="i-carbon-chevron-right"></div>
      </div>

      <div
        class="flex flex-row justify-between items-center p-2 my-2"
        hover-class="opacity-50"
      >
        <div class="flex flex-row items-center gap-2 mr-20">
          <div class="i-carbon:catalog text-xl"></div>
          <div>更新日志</div>
        </div>

        <div class="text-sm text-gray-5 dark:text-gray-4 ml-20">V2.1</div>

        <div class="i-carbon-chevron-right"></div>
      </div>

      <div
        class="flex flex-row justify-between items-center p-2 my-2"
        hover-class="opacity-50"
      >
        <div class="flex flex-row items-center gap-2">
          <div class="i-carbon:information text-xl"></div>
          <div>关于我们</div>
        </div>

        <div class="i-carbon-chevron-right"></div>
      </div>
    </div>
  </UBasePage>
</template>

<style scoped></style>
