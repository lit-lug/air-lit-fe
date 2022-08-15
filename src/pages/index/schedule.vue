<script lang="ts" setup>
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import TabBar from "@/components/TheTabBar.vue";

import TimetableHeader from "@/components/timetable/TimetableHeader.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";

import { courseTimeList } from "@/store/course";

import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import tmSticky from "@/tmui/components/tm-sticky/tm-sticky.vue";

import { colorArrayList } from "@/store/course";

import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";

// import { useCourseStore } from "@/stores/course";
// import { weekTitle } from "@/stores/course";

import { onShow } from "@dcloudio/uni-app";

import { useCourseStore } from "@/store/course";
import { weekTitle } from "@/store/course";

import tmGridItem from "@/tmui/components/tm-grid-item/tm-grid-item.vue";
import tmGrid from "@/tmui/components/tm-grid/tm-grid.vue";

import { useAppStore } from "@/store/app";
import { getWindow } from "@/tmui/tool/function/util";

import tmScrollx from "../../tmui/components/tm-scrollx/tm-scrollx.vue";

const { customBarHeight } = useAppStore();

const courseStore = useCourseStore();

const app = ref<InstanceType<tmApp> | null>(null);

const {
  currentMonth,
  originalWeekIndex,
  currentWeekIndex,
  originalWeekWeekIndex,
  currentWeekDayArray,
} = storeToRefs(useCourseStore());

import tmImage from "../../tmui/components/tm-image/tm-image.vue";
import tmActionMenu from "@/tmui/components/tm-action-menu/tm-action-menu.vue";
import tmTranslate from "@/tmui/components/tm-translate/tm-translate.vue";

const show = ref(false);
const showTimeTableAction = ref(false);

const list = ref([
  { text: "苹果", id: "1" },
  { text: "菠萝", id: "2" },
  { text: "香蕉", id: "3" },
]);

const list2 = ref([
  {
    path:
      "https://gw.alicdn.com/imgextra/i4/O1CN01XCiY1B1px9ivHkDGm_!!6000000005426-2-tps-183-144.png_q90.jpg",
    title: "天猫新品",
    count: "热销",
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i3/O1CN01FgQFp81spmBXqQMtA_!!6000000005816-2-tps-183-144.png_q90.jpg",
    title: "今日爆款",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01tsk5OY1q0MUo5PJga_!!6000000005433-2-tps-183-144.png_q90.jpg",
    title: "天猫国际",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg",
    title: "飞猪旅行",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg",
    title: "天猫超市",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i4/O1CN01VuRfwH1muSbsJFxoM_!!6000000005014-2-tps-183-144.png_q90.jpg_.webp",
    title: "冬奥公益",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg",
    title: "飞猪旅行",
    count: 99,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg",
    title: "天猫超市",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i4/O1CN01VuRfwH1muSbsJFxoM_!!6000000005014-2-tps-183-144.png_q90.jpg_.webp",
    title: "冬奥公益",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i4/O1CN01XCiY1B1px9ivHkDGm_!!6000000005426-2-tps-183-144.png_q90.jpg",
    title: "天猫新品",
    count: 6,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i3/O1CN01FgQFp81spmBXqQMtA_!!6000000005816-2-tps-183-144.png_q90.jpg",
    title: "今日爆款",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01tsk5OY1q0MUo5PJga_!!6000000005433-2-tps-183-144.png_q90.jpg",
    title: "天猫国际",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg",
    title: "飞猪旅行",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg",
    title: "天猫超市",
    count: 0,
  },
]);

const tmStore = useTmpiniaStore();

const _width = uni.getSystemInfoSync().windowWidth;

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight as number;
const _barHeight = computed(() => statusBarHeight + 44);

function onChangeDark() {
  app.value?.setDark();
}
// const offset = ref(0);
// #ifdef H5
// offset.value = 68;
// #endif

const left = ref(0);

const onScroll = (e: CustomEvent) => {
  let sL = e.detail.scrollLeft;
  let sT = e.detail.scrollWidth;
  let maxLeft = Math.abs(sT - uni.upx2px(50));
  let nowLeft = (sL / maxLeft) * uni.upx2px(120);
  if (sL <= 0) nowLeft = 0;
  if (Math.abs(sL) >= maxLeft) {
    nowLeft = uni.upx2px(120);
  }
  left.value = nowLeft;
};

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
    <!-- 标题状态栏 -->

    <tm-sticky :offset="0">
      <template v-slot:sticky>
        <tm-navbar
          title=""
          hideHome
          blur
          :padding="[0, 0]"
          :margin="[0, 0]"
          :shadow="0"
          :isFixed="false"
        >
          <template v-slot:left>
            <view class="flex flex-row flex-row-center-center">
              <tm-icon
                @click="onChangeDark"
                :font-size="40"
                _class="pr-20"
                :name="tmStore.tmStore.dark ? 'tmicon-md-moon' : 'tmicon-ios-sunny'"
              ></tm-icon>
              <tm-icon
                :font-size="32"
                _class="pl-20"
                @click="show = true"
                name="tmicon-cog-fill"
              ></tm-icon
            ></view>
          </template>
          <template v-slot>
            <view
              class="flex flex-row flex-row-center-between"
              @click="showTimeTableAction = !showTimeTableAction"
            >
              <tm-text :font-size="30" _class="text-weight-b text-overflow-1 pl-24 pr-8"
                >第 1 周</tm-text
              >
              <tm-icon
                :font-size="36"
                _class="b-16"
                :name="showTimeTableAction ? 'tmicon-sort-down' : 'tmicon-sort-up'"
              ></tm-icon>
            </view>
          </template>
        </tm-navbar>

        <tm-sheet
          :padding="[0, 0]"
          :margin="[0, 0]"
          color="grey-3"
          _class="overflow flex flex-col
          flex-col-center-center"
          :_style="{
            height: showTimeTableAction ? '140rpx' : '0rpx',
          }"
          blur
        >
          <scroll-view :scroll-x="true" scrollWithAnimation @scroll="onScroll">
            <tm-grid :width="14 * 120" :col="14" transprent>
              <tm-grid-item
                v-for="(item, index) in list2"
                :key="index"
                :height="140"
                :width="100"
                :count="item.count"
              >
                <tm-image :width="100" :height="79" :src="item.path"></tm-image>
                <tm-text :font-size="24" :label="item.title"></tm-text>
              </tm-grid-item>
            </tm-grid>
          </scroll-view>
          <view>
            <tm-sheet
              no-level
              :round="6"
              :width="100"
              :height="8"
              :margin="[0, 0]"
              :padding="[0, 0]"
              color="grey-2"
            >
              <view
                class="bar"
                :style="{
                  transform: `translateX(${left}px)`,
                }"
              >
                <tm-sheet
                  :round="6"
                  :width="50"
                  :height="8"
                  color="primary"
                  :margin="[0, 0]"
                  :padding="[0, 0]"
                ></tm-sheet>
              </view>
            </tm-sheet>
          </view>
        </tm-sheet>

        <timetable-header></timetable-header>
      </template>
      <view
        class="flex"
        :style="{
          width: '100%',
          height: `100vh`,
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
                height: '7.25vh',
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
              <template v-for="(_, tIndex) in [1, 2, 3, 4, 5, 6, 7]" :key="tIndex">
                <view
                  class="absolute"
                  :style="
                    'width:13vw;' +
                    'margin-left:' +
                    tIndex * 13.0 +
                    'vw;margin-top:' +
                    dIndex * 14.5 +
                    'vh;'
                  "
                >
                  <tm-translate name="fade" autoPlay :duration="500">
                    <view
                      class="flex"
                      :style="{
                        backgroundColor:
                          colorArrayList[0][
                            Math.floor(Math.random() * (7 - tIndex + 1) + 0)
                          ],
                        height: '14vh',
                        marginLeft: '0.5vw',
                        marginRight: '0.5vw',
                        borderRadius: '10rpx',
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }"
                    >
                      <tm-text color="white">凡哥@C1-409</tm-text>
                    </view>
                  </tm-translate>
                </view>
              </template>
            </view>
          </template>
        </view>
      </view>
    </tm-sticky>

    <tm-action-menu v-model="show" :list="list"></tm-action-menu>

    <!-- 底部状态栏-->
    <tab-bar :active="1"></tab-bar>

    <!-- 日程表 -->
    <!-- <tm-weekbar></tm-weekbar> -->

    <!-- 表头 -->
  </tm-app>
</template>

<style scoped>
.bar {
  transition-property: transform;
  transition-delay: 0;
  transition-duration: 0.05s;
  transition-timing-function: linear;
  transform: translateX(0px);
}
</style>
