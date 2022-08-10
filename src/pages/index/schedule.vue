<script lang="ts" setup>
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import TabBar from "@/components/TheTabBar.vue";

import TimetableHeader from "@/components/timetable/TimetableHeader.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";

import tmWeekbar from "@/tmui/components/tm-weekbar/tm-weekbar.vue";

import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import tmSticky from "@/tmui/components/tm-sticky/tm-sticky.vue";

// import { useCourseStore } from "@/stores/course";
// import { weekTitle } from "@/stores/course";

import { onShow } from "@dcloudio/uni-app";

import { useCourseStore } from "@/store/course";
import { weekTitle } from "@/store/course";

import { useAppStore } from "@/store/app";

const { customBarHeight } = useAppStore();

const courseStore = useCourseStore();
const app = ref<InstanceType<typeof tmApp> | null>(null);

const {
  currentMonth,
  originalWeekIndex,
  currentWeekIndex,
  originalWeekWeekIndex,
  currentWeekDayArray,
} = storeToRefs(useCourseStore());

const tmStore = useTmpiniaStore();

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight as number;
const _barHeight = computed(() => statusBarHeight + 44);

function onChangeDark() {
  app.value?.setDark();
}

onShow(async () => {
  console.log("App Show");

  const someDate = new Date("2022-08-01");
  // ` - 8 * 7 + (someDate.getDay() + 1) % 7` just to fix the current week
  // someDate.getDate();
  courseStore.setStartDay(someDate);

  // const info = await getUserInfo();

  console.log(statusBarHeight, _barHeight);

  // uni.showToast({
  //   title: "测试弹窗",
  //   icon: "none",
  //   duration: 2000,
  //   // mask: true,
  // });
});
</script>

<template>
  <tm-app ref="app">
    <!-- 标题状态栏 -->
    <tm-navbar title="" hideHome blur :shadow="0">
      <template v-slot:left>
        <tm-icon
          @click="onChangeDark"
          :font-size="36"
          :name="tmStore.tmStore.dark ? 'tmicon-md-moon' : 'tmicon-ios-sunny'"
        ></tm-icon>
      </template>
      <template v-slot>
        <view class="flex flex-row flex-row-center-between" @click="onChangeDark">
          <tm-text :font-size="30" _class="text-weight-b text-overflow-1 pl-24 pr-8"
            >第 1 周</tm-text
          >
          <tm-icon
            :font-size="36"
            _class="b-16"
            :name="tmStore.tmStore.dark ? 'tmicon-sort-down' : 'tmicon-sort-up'"
          ></tm-icon>
        </view>
      </template>
    </tm-navbar>

    <!-- 日程表 -->
    <!-- <tm-weekbar></tm-weekbar> -->

    <!-- 表头 -->

    <view
      class="overflow-y relative"
      :style="{ height: `calc(100vh - ${customBarHeight}px)` }"
    >
      <view class="fixed">
        <timetable-header></timetable-header>
      </view>

      <view class="t-10" :style="{ 'padding-top': `${customBarHeight}px` }">
        123
        <tm-sheet :padding="[0, 0]">
          <tm-text
            :font-size="24"
            _class="font-weight-b"
            label="卡片可以完全通过插槽自定义"
          ></tm-text>
        </tm-sheet>
        <tm-sheet>
          <tm-text label="点击中间+按钮可以体验异步加载动态效果."></tm-text>
        </tm-sheet>
      </view>
    </view>

    <!-- 底部状态栏-->
    <tab-bar :active="1"></tab-bar>
  </tm-app>
</template>
