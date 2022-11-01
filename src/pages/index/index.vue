<script setup lang="ts">
import { USwiperItem } from "~/components/USwiper/types";
import USwiper from "~/components/USwiper/USwiper.vue";

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

onReady(() => {});

const test = ref(false);

onShow(() => {
  // uni.setTabBarBadge({
  //   index: 0,
  //   text: "+",
  // });
  // showMsg({ type: "success" });
});

onReady(() => {
  // showMsg({ type: "success" });
});

function btnClick() {
  // showToast({ type: "success", message: "error" });

  showMsg({ type: "loading" });

  uni.hideTabBar({
    animation: true,
  });

  setTimeout(() => {
    showMsg({ type: "hide" });

    showMsg({ type: "error", duration: 2000, message: "失败xxxxxxxxxxx" });

    uni.showTabBar({
      animation: true,
    });

    showToast({ type: "error", message: "失败" });
  }, 3000);
}
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>时刻</template>

    <!-- 主体内容 -->

    <USwiper :swiperItems="swiperItems"></USwiper>

    <div
      class="flex flex-row justify-between p-2 m-3 dark:bg-dark bg-white rounded-lg shadow items-center shadow-sm"
    >
      <div class="text-sm font-bold">11月1日 星期二</div>
      <div class="text-sm font-bold">第 10 周</div>
    </div>

    <!-- 今日课程 -->

    <div class="flex flex-col p-2 m-3 bg-white dark:bg-dark rounded-lg shadow-sm">
      <div class="flex flex-row justify-between items-center">
        <div class="text-sm font-bold">今日课程</div>
        <div class="text-sm text-gray dark:text-gray-2">共 2 门</div>
      </div>

      <!-- 分割线 -->

      <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

      <!-- 课程列表 -->
      <div>
        <div class="p-2 m-2 bg-gray-100 dark:bg-gray-6 rounded-lg text-sm">| 课程一</div>
        <div class="p-2 m-2 bg-gray-100 dark:bg-gray-6 rounded-lg text-sm">| 课程二</div>
      </div>
    </div>

    <!-- grid -->

    <div class="flex flex-col p-2 m-3 bg-white dark:bg-dark rounded-lg shadow-sm">
      <div class="flex flex-row justify-between items-center">
        <div class="text-sm font-bold">功能列表</div>
        <!-- <div class="text-sm justify-end items-end">共 3 门</div> -->
      </div>

      <!-- 分割线 -->

      <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

      <div class="grid grid-cols-3 grid-rows-2 text-center gap-2">
        <div
          class="p-2 m-2 text-center flex flex-col justify-center items-center text-green-500"
          hover-class="opacity-50"
          :hover-stay-time="150"
        >
          <div class="i-carbon-chart-stepper text-2xl font-bold"></div>
          <div class="text-24rpx">考试成绩</div>
        </div>
        <div class="p-2 m-2">等级成绩</div>
        <div class="p-2 m-2">宿舍用电</div>
        <div class="p-2 m-2">4</div>
        <div class="p-2 m-2">5</div>
        <div class="p-2 m-2">6</div>
      </div>
    </div>

    <!-- <div class="m-3">
      <UButton type="error" class="w-full" @click="btnClick"> Show Error Notify </UButton>
    </div> -->
  </UBasePage>
</template>
