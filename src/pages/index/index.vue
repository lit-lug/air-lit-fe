<script setup lang="ts">
import { USwiperItem } from "~/components/index/USwiper/types";
import USwiper from "~/components/index/USwiper/USwiper.vue";
import UGridGroup from "~/components/index/UGridGroup/UGridGroup.vue";
import UGridItem from "~/components/index/UGridItem/UGridItem.vue";

import { GetUserInfo, AuthQrCode, GetStatus, GetSwiper } from "~/common/api";

const { currentWeekIndex, isStart } = storeToRefs(useCourseStore());

const { setStartDay } = useCourseStore();

const { darkMode } = storeToRefs(useAppStore());

const { setDarkMode } = useAppStore();

const appStore = useAppStore();
const { showNotify } = usePageStore();

const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const { userInfo } = storeToRefs(appStore);

const swiperItems = ref<Array<USwiperItem>>([
  {
    title: "标题1",
    subTitle: "副标题1",
    img: "https://img.yzcdn.cn/vant/apple-1.jpg",
  },
]);

type UGridItem = {
  title: string;
  icon: string;
  url: string;
  isNeedBindSec: boolean;
};

const gridItems = ref<Array<UGridItem>>([
  {
    icon: "i-carbon-calendar",
    title: "校历",
    url: "/pages/index/calendar/calendar",
    isNeedBindSec: false,
  },
  {
    icon: "i-carbon-chart-stepper",
    title: "考试成绩",
    url: "/pages/index/score/score",
    isNeedBindSec: true,
  },
  {
    icon: "i-carbon-navaid-civil",
    title: "实践环节",
    url: "/pages/index/ring/ring",
    isNeedBindSec: true,
  },
  {
    icon: "i-carbon-skill-level",
    title: "等级成绩",
    url: "/pages/index/level/level",
    isNeedBindSec: true,
  },
  {
    icon: "i-carbon-lightning",
    title: "宿舍用电",
    url: "/pages/index/elec/elec",
    isNeedBindSec: true,
  },
  {
    icon: "i-carbon-overflow-menu-horizontal",
    title: "更多",
    url: "",
    isNeedBindSec: true,
  },
]);

const onGridItemClick = (item: UGridItem) => {
  if (item.isNeedBindSec && !userInfo.value?.is_bind_sec) {
    showNotify({ type: "primary", message: "请先绑定门户再进行操作!" });
    return;
  }

  if (item.url) {
    uni.navigateTo({
      url: item.url,
    });
  } else {
    showNotify({ message: "暂未开放" });
  }
};

const toggleDarkMode = () => {
  setDarkMode(!darkMode.value);
};

const authQrCode = () => {
  uni.scanCode({
    onlyFromCamera: true,
    scanType: ["qrCode"],
    success: async (res) => {
      console.log(res.result);
      await AuthQrCode({ code_id: res.result });
    },
  });
};

const swiperClick = (item: USwiperItem) => {
  console.log(item);

  if (item.url) {
    uni.navigateTo({
      url: "/pages/webview/webview?url=" + encodeURIComponent(item.url),
    });
  }
};

onLaunch(async () => {
  // 更新轮播图
  const { data: swiperData } = await GetSwiper();
  if (swiperData) {
    swiperItems.value = swiperData;
  }
});

onReady(async () => {
  // 获取系统状态
  const { data: status } = await GetStatus();

  if (status) {
    setStartDay(status.start_day);
  }

  // 更新用户信息
  const { data: authInfo } = await GetUserInfo({ tip: false, load: false });
  if (authInfo) {
    // 同步用户信息
    appStore.setUserInfo(authInfo);
  }
});

onShow(async () => {
  // 更新用户信息
  const { data: authInfo } = await GetUserInfo({
    tip: false,
    load: false,
    failTip: false,
  });
  if (authInfo) {
    // 同步用户信息
    appStore.setUserInfo(authInfo);
  }

  // 更新轮播图
  const { data: swiperData } = await GetSwiper();
  if (swiperData) {
    swiperItems.value = swiperData;
  }
});

onPullDownRefresh(async () => {
  const { data: authInfo } = await GetUserInfo({ tip: true, load: true });
  if (authInfo) {
    // 同步用户信息
    appStore.setUserInfo(authInfo);
  }

  // 更新轮播图
  const { data: swiperData } = await GetSwiper();
  if (swiperData) {
    swiperItems.value = swiperData;
  }
  uni.stopPullDownRefresh();
});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>时刻</template>

    <template v-slot:navAction>
      <!-- #ifdef MP-WEIXIN -->
      <div
        class="i-carbon-center-square text-xl mr-2"
        hover-class="opacity-50"
        @click="authQrCode"
      />
      <!-- #endif -->
      <div
        class="mr-2"
        :class="darkMode ? 'i-carbon-moon' : 'i-carbon-sun'"
        @click="toggleDarkMode"
      />
    </template>

    <!-- 主体内容 -->

    <USwiper :swiperItems="swiperItems" @click="swiperClick"></USwiper>

    <!-- 今日课程 -->

    <div class="flex flex-col p-2 m-3 bg-white dark:bg-dark rounded-lg shadow-sm">
      <div class="flex flex-row justify-between items-center">
        <div class="text-sm font-bold flex flex-row gap-2 justify-center">
          <div class="bg-blue-5/80 w-1 h-5 rounded-lg"></div>
          <div>今日课程</div>
        </div>
        <div class="text-sm text-gray dark:text-gray-2 text-24rpx">
          第 {{ currentWeekIndex + 1 }} 周 | 共 2 门
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
          | 课程二 {{ deviceType }}
        </div>
      </div>
    </div>

    <!-- grid -->

    <div class="flex flex-col p-2 m-3 bg-white dark:bg-dark rounded-lg shadow-sm">
      <div class="flex flex-row justify-between items-center">
        <div class="text-sm font-bold flex flex-row gap-2 justify-center">
          <div class="bg-blue-5/80 w-1 h-5 rounded-lg"></div>
          <div>功能列表</div>
        </div>
        <div class="i-carbon-grid text-gray dark:text-gray-2"></div>
      </div>

      <!-- 分割线 -->

      <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

      <UGridGroup>
        <UGridItem @click="() => onGridItemClick(v)" v-for="(v, i) in gridItems" :key="i">
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
