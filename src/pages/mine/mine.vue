<script setup lang="ts">
import { GetIdenticonUrl, GetUserInfo } from "~/common/api";

import UCellGroup from "~/components/mine/UCellGroup/UCellGroup.vue";
import UCellItem from "~/components/mine/UCellItem/UCellItem.vue";

import version from "~/static/version";

import { useAppStore } from "~/stores/app";
const appStore = useAppStore();

const { isAuth, userInfo } = storeToRefs(appStore);

const getIdenticonUrl = () => {
  if (userInfo.value.sec_info && userInfo.value.is_bind_sec) {
    return GetIdenticonUrl(userInfo.value.sec_info?.card_id);
  }
  return GetIdenticonUrl("Guest");
};

const cardId = computed(() => {
  if (userInfo.value.sec_info && userInfo.value.is_bind_sec) {
    return userInfo.value.sec_info?.card_id;
  }
  return "Guest";
});

const name = computed(() => {
  if (userInfo.value.sec_info && userInfo.value.is_bind_sec) {
    return userInfo.value.sec_info?.name;
  }
  return "游客";
});

onReady(async () => {
  // 更新用户信息
  const { data: authInfo } = await GetUserInfo({ tip: false });
  if (authInfo) {
    // 同步用户信息
    appStore.setUserInfo(authInfo);
  }
});

// onShow(async () => {
//   // 更新用户信息
//   const { data: authInfo } = await GetUserInfo({ tip: false });
//   if (authInfo) {
//     // 同步用户信息
//     appStore.setUserInfo(authInfo);
//   }
// });

onPullDownRefresh(async () => {
  const { data: authInfo } = await GetUserInfo({ tip: true, load: true });
  if (authInfo) {
    // 同步用户信息
    appStore.setUserInfo(authInfo);
  }
  uni.stopPullDownRefresh();
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
          class="w-15 h-15 rounded-full bg-gray-1 dark:bg-gray-1 bg-opacity-30"
          mode="scaleToFill"
          :userInteractionEnabled="false"
          :src="getIdenticonUrl()"
        ></image>

        <!-- 学号姓名 -->
        <div class="mr-10 flex flex-col justify-center items-start gap-1">
          <div class="text-lg font-bold">{{ name }}</div>
          <div class="text-sm font-medium text-gray-5 dark:text-gray-4">
            ID: {{ cardId }}
          </div>
        </div>

        <!-- 账号状态 -->
        <div
          @click="toAccountPage"
          class="ml-10 flex flex-row justify-center items-center gap-1 px-2 py-1 rounded-lg"
          :class="{
            'bg-blue-1/80 dark:bg-blue-5/10': userInfo.is_bind_sec,
            'bg-gray-1/80 dark:bg-gray-5/10': !userInfo.is_bind_sec,
          }"
        >
          <div
            class="text-sm font-medium"
            :class="{
              'text-blue-5': userInfo.is_bind_sec,
              'text-gray-5': !userInfo.is_bind_sec,
            }"
          >
            {{ userInfo.is_bind_sec ? "状态正常" : "未绑定" }}
          </div>
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
          <div class="text-gray-5 dark:text-gray-3 text-sm px-1">
            {{ version }}
          </div>
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
