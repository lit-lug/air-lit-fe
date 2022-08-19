<script lang="ts" setup>
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import tmText from "@/tmui/components/tm-text/tm-text.vue";

import TabBar from "@/components/TheTabBar.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";

import { ref } from "vue";

import tmSticky from "@/tmui/components/tm-sticky/tm-sticky.vue";

import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";

import { useCourseStore } from "@/store/course";

import tmActionMenu from "@/tmui/components/tm-action-menu/tm-action-menu.vue";
import timeTableHeader from "@/components/timetable/TimeTableHeader.vue";
import timeTableAction from "@/components/timetable/TimeTableAction.vue";
import timeTableContent from "@/components/timetable/TimeTableContent.vue";

import { onChangeDark, IsDark } from "@/common/util";

import { language } from "@/tmui/tool/lib/language";

const show = ref(false);
const showTimeTableAction = ref(false);

const list = ref([
  { text: "苹果", id: "1" },
  { text: "菠萝", id: "2" },
  { text: "香蕉", id: "3" },
]);

const courseStore = useCourseStore();

onShow(async () => {
  console.log("App Show");
  const someDate = new Date("2022-08-01");
  courseStore.setStartDay(someDate);
});

onPullDownRefresh(async () => {
  console.log("下拉刷新");

  uni.stopPullDownRefresh();
});
</script>

<template>
  <tm-app ref="app" color="white">
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
                :name="IsDark() ? 'tmicon-md-moon' : 'tmicon-ios-sunny'"
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

        <time-table-action
          :show="showTimeTableAction"
          :list="list"
          @click="showTimeTableAction = false"
        ></time-table-action>

        <time-table-header></time-table-header>
      </template>
      <time-table-content></time-table-content>
    </tm-sticky>

    <!-- 设置菜单 -->
    <tm-action-menu v-model="show" :list="list"></tm-action-menu>

    <!-- 底部状态栏-->
    <tab-bar :active="1"></tab-bar>
  </tm-app>
</template>

<style scoped></style>
