<script setup lang="ts">
import { USwiperItem } from "~/components/index/USwiper/types";
import USwiper from "~/components/index/USwiper/USwiper.vue";
import UGridGroup from "~/components/index/UGridGroup/UGridGroup.vue";
import UGridItem from "~/components/index/UGridItem/UGridItem.vue";

import { GetUserInfo } from "~/common/api";

const appStore = useAppStore();
const { showNotify, showToast, showMsg } = usePageStore();

const swiperItems = ref<Array<USwiperItem>>([
  {
    title: "标题1",
    subTitle: "副标题1",
    img: "https://img.yzcdn.cn/vant/apple-1.jpg",
  },
  {
    title: "标题2",
    img: "https://img.yzcdn.cn/vant/apple-2.jpg",
  },
  {
    title: "标题3",
    subTitle: "副标题3",
    img: "https://img.yzcdn.cn/vant/apple-3.jpg",
  },
]);

type UGridItem = {
  title: string;
  icon: string;
  url: string;
};

const gridItems = ref<Array<UGridItem>>([
  {
    icon: "i-carbon-calendar",
    title: "校历",
    url: "",
  },
  {
    icon: "i-carbon-chart-stepper",
    title: "考试成绩",
    url: "",
  },
  {
    icon: "i-carbon-navaid-civil",
    title: "环节",
    url: "",
  },
  {
    icon: "i-carbon-skill-level",
    title: "等级成绩",
    url: "",
  },
  {
    icon: "i-carbon-lightning",
    title: "宿舍用电",
    url: "",
  },
  {
    icon: "i-carbon-overflow-menu-horizontal",
    title: "更多",
    url: "",
  },
]);

onReady(async () => {
  // 更新用户信息
  const { data: authInfo } = await GetUserInfo({ tip: false });
  if (authInfo) {
    // 同步用户信息
    appStore.setUserInfo(authInfo);
  }
});

onShow(async () => {
  // 更新用户信息
  const { data: authInfo } = await GetUserInfo({ tip: false });
  if (authInfo) {
    // 同步用户信息
    appStore.setUserInfo(authInfo);
  }
});

onPullDownRefresh(async () => {
  const { data: authInfo } = await GetUserInfo({ tip: true, load: true });
  if (authInfo) {
    // 同步用户信息
    appStore.setUserInfo(authInfo);
  }
  uni.stopPullDownRefresh();
});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>时刻</template>

    <!-- 主体内容 -->

    <USwiper :swiperItems="swiperItems"></USwiper>

    <!-- 今日课程 -->

    <div class="flex flex-col p-2 m-3 bg-white dark:bg-dark rounded-lg shadow-sm">
      <div class="flex flex-row justify-between items-center">
        <div class="text-sm font-bold">今日课程</div>
        <div class="text-sm text-gray dark:text-gray-2 text-24rpx">
          第 10 周 | 共 2 门
        </div>
      </div>

      <!-- 分割线 -->

      <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

      <!-- 课程列表 -->
      <div>
        <div
          class="p-2 m-2 bg-gray-1 dark:bg-gray-6 rounded-lg text-sm text-gray-5 dark:text-gray-3"
        >
          | 课程一
        </div>
        <div
          class="p-2 m-2 bg-gray-1 dark:bg-gray-6 rounded-lg text-sm text-gray-5 dark:text-gray-3"
        >
          | 课程二
        </div>
      </div>
    </div>

    <!-- grid -->

    <div class="flex flex-col p-2 m-3 bg-white dark:bg-dark rounded-lg shadow-sm">
      <div class="flex flex-row justify-between items-center">
        <div class="text-sm font-bold">功能列表</div>
        <div class="i-carbon-grid text-gray dark:text-gray-2"></div>
      </div>

      <!-- 分割线 -->

      <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

      <UGridGroup>
        <UGridItem v-for="(v, i) in gridItems" :key="i">
          <div class="rounded-50 bg-blue-5 bg-opacity-10 p-2 m-1">
            <div class="text-2xl font-bold text-blue-5" :class="v.icon"></div>
          </div>
          <div class="text-24rpx text-gray-5 dark:text-gray-3">
            {{ v.title }}
          </div>
        </UGridItem>
      </UGridGroup>
    </div>
  </UBasePage>
</template>
