<script lang="ts" setup>
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import TabBar from "@/components/TheTabBar.vue";

import TimetableHeader from "@/components/timetable/TimetableHeader.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";

import tmWeekbar from "@/tmui/components/tm-weekbar/tm-weekbar.vue";

import { courseTimeList } from "@/store/course";

import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import tmSticky from "@/tmui/components/tm-sticky/tm-sticky.vue";

import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";

// import { useCourseStore } from "@/stores/course";
// import { weekTitle } from "@/stores/course";

import { onShow } from "@dcloudio/uni-app";

import { useCourseStore } from "@/store/course";
import { weekTitle } from "@/store/course";

import tmGridItem from "@/tmui/components/tm-grid-item/tm-grid-item.vue";
import tmGrid from "@/tmui/components/tm-grid/tm-grid.vue";

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

const _width = uni.getSystemInfoSync().windowWidth;

function onChangeDark() {
  app.value?.setDark();
}
// const offset = ref(0);
// #ifdef H5
// offset.value = 68;
// #endif

onShow(async () => {
  console.log("App Show");

  const someDate = new Date("2022-08-01");
  // ` - 8 * 7 + (someDate.getDay() + 1) % 7` just to fix the current week
  // someDate.getDate();
  courseStore.setStartDay(someDate);

  console.log(statusBarHeight, _barHeight);
});
</script>

<template>
  <tm-app ref="app">
    <tm-sticky>
      <template v-slot:sticky>
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
        <timetable-header></timetable-header>
      </template>
      <view
        class="flex"
        :style="{
          width: '100%',
          height: `calc(100vh - ${customBarHeight}px`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }"
      >
        <view
          class="flex flex-col flex-col-center"
          :style="{
            width: '9vw',
          }"
        >
          <template
            v-for="(courseTime, courseIndex) in courseTimeList"
            :key="courseIndex"
          >
            <view
              class="flex flex-col"
              :style="{
                paddingBottom: '3vh',
                height: '7vh',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }"
            >
              <tm-text
                _class="font-weight-b"
                :font-size="24"
                :label="courseIndex + 1"
              ></tm-text>
              <tm-text _class="font-weight-s" :font-size="20">{{ courseTime.s }}</tm-text>
              <tm-text _class="font-weight-s" :font-size="20">{{ courseTime.e }}</tm-text>
            </view>
          </template>
        </view>
        <!-- 课表主体 -->
        <view
          class="flex"
          :style="{
            width: '91vw',
          }"
        >
          <!--- 循环七次 -->
          <template v-for="(_, dIndex) in [1, 2, 3, 4, 5]" :key="dIndex">
            <view>
              <template v-for="(_, weekIndex) in [1, 2, 3, 4, 5, 6, 7]" :key="weekIndex">
                <view
                  class="absolute"
                  :style="
                    'width:13vw;' +
                    'margin-left:' +
                    weekIndex * 13.0 +
                    'vw;margin-top:' +
                    dIndex * 20 +
                    'vh;'
                  "
                >
                  <view
                    class="flex"
                    :style="{
                      backgroundColor: '#fff087',
                      height: '19vh',
                      marginBottom: '1vh',
                      marginLeft: '0.5vw',
                      marginRight: '0.5vw',
                      borderRadius: '10rpx',
                      position: 'relative',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }"
                  >
                    test
                  </view>
                </view>
              </template>
            </view>
          </template>
        </view>
      </view>
    </tm-sticky>

    <!-- 底部状态栏-->
    <tab-bar :active="1"></tab-bar>

    <!-- 日程表 -->
    <!-- <tm-weekbar></tm-weekbar> -->

    <!-- 表头 -->
  </tm-app>
</template>
