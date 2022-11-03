<script setup lang="ts">
import { GetIdenticonUrl } from "~/common/api";

import UCellGroup from "~/components/mine/UCellGroup/UCellGroup.vue";
import UCellItem from "~/components/mine/UCellItem/UCellItem.vue";

const { showNotify, showToast, showMsg } = usePageStore();

const getIdenticonUrl = () => {
  return GetIdenticonUrl("tesqwtasas");
};

onReady(() => {});

onShow(() => {});

onPullDownRefresh(() => {
  showMsg({ type: "loading", message: "success" });

  setTimeout(() => {
    showMsg({ type: "hide", message: "" });
    uni.stopPullDownRefresh();
  }, 1000);
});

// 待抽离

const toAccountPage = () => {
  uni.navigateTo({
    url: "/pages/mine/account/account",
  });
};

const toSettingPage = () => {
  uni.navigateTo({
    url: "/pages/mine/setting/setting",
  });
};

const toChangelogPage = () => {
  uni.navigateTo({
    url: "/pages/mine/changelog/changelog",
  });
};

const toAboutPage = () => {
  uni.navigateTo({
    url: "/pages/mine/about/about",
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
          class="ml-10 flex flex-row justify-center items-center gap-1 px-2 py-1 rounded-lg bg-gray-1 dark:bg-gray-6"
        >
          <div class="text-sm font-medium text-gray-5 dark:text-gray-3">状态正常</div>
        </div>
      </div>
    </div>

    <!-- 选项 todo: 抽离成 cell 组件 -->
    <UCellGroup _class="p-2 m-3">
      <UCellItem _class="p-2 my-2" @click="toAccountPage">
        <div class="flex flex-row items-center gap-2">
          <div class="i-carbon:account text-xl"></div>
          <div>账户管理</div>
        </div>
        <div class="i-carbon-chevron-right"></div>
      </UCellItem>

      <UCellItem _class="p-2 my-2" @click="toSettingPage">
        <div class="flex flex-row items-center gap-2">
          <div class="i-carbon:settings text-xl"></div>
          <div>公众号配置</div>
        </div>

        <div class="i-carbon-chevron-right"></div>
      </UCellItem>

      <UCellItem _class="p-2 my-2" @click="toChangelogPage">
        <div class="flex flex-row items-center gap-2 mr-22">
          <div class="i-carbon:catalog text-xl"></div>
          <div>更新日志</div>
        </div>

        <div class="flex flex-row justify-center items-center gap-2">
          <div class="text-gray-5 dark:text-gray-3 text-sm px-1">V2.1</div>
          <div class="i-carbon-chevron-right"></div>
        </div>
      </UCellItem>

      <UCellItem _class="p-2 my-2" @click="toAboutPage">
        <div class="flex flex-row items-center gap-2">
          <div class="i-carbon:information text-xl"></div>
          <div>关于我们</div>
        </div>

        <div class="flex flex-row justify-center items-center gap-2">
          <div
            class="text-green justify-center items-center text-sm bg-green-5/10 rounded-lg px-2"
          >
            as you wish ~
          </div>
          <div class="i-carbon-chevron-right"></div>
        </div>
      </UCellItem>
    </UCellGroup>
  </UBasePage>
</template>

<style></style>
