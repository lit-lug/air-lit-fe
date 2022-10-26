isDark
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
import { storeToRefs } from "pinia";

import tmActionMenu from "@/tmui/components/tm-action-menu/tm-action-menu.vue";

import tmMessage from "@/tmui/components/tm-message/tm-message.vue";

import timeTableAction from "@/components/timetable/TimeTableAction.vue";

import timeTableContent from "@/components/timetable/TimeTableContent.vue";

import { isDark, FixNavigationBarColor, UpdateBaseInfo } from "@/common/util";
import { useAppStore } from "@/store/app";

const app = ref<InstanceType<typeof tmApp> | null>(null);

const msg = ref<InstanceType<typeof tmMessage> | null>(null);

const appStore = useAppStore();

const { languageType } = storeToRefs(appStore);

const { currentWeekIndex } = storeToRefs(useCourseStore());

const show = ref(false);
const showTimeTableAction = ref(false);

const list = ref([
  { text: "苹果", id: "1" },
  { text: "菠萝", id: "2" },
  { text: "香蕉", id: "3" },
]);

const courseStore = useCourseStore();

onShow(async () => {
  // 修复小程序tab切换状态栏颜色跟随
  FixNavigationBarColor();
  console.log(showTimeTableAction.value);
});

onPullDownRefresh(async () => {
  await UpdateBaseInfo(msg);

  uni.stopPullDownRefresh();
});

const onChangeDark = () => {
  app.value?.setDark();
};
</script>

<template>
  <tm-app ref="app" color="white">
    <!-- 标题状态栏 -->
    <tm-sticky :offset="0">
      <template v-slot:sticky>
        <tm-navbar
          title=""
          hideHome
          hideBack
          blur
          :padding="[0, 0]"
          :margin="[0, 0]"
          :shadow="0"
          :isFixed="false"
        >
          <template v-slot:left>
            <view class="flex flex-row flex-row-center-start">
              <tm-icon
                @click="onChangeDark"
                :font-size="32"
                _class="pr-20 pl-20"
                :_style="{
                  transform: isDark() ? 'rotate(360deg)' : 'rotate(0deg)',
                  transitionDuration: '200ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }"
                :name="isDark() ? 'tmicon-md-moon' : 'tmicon-ios-sunny'"
              ></tm-icon>
              <tm-icon
                :font-size="32"
                _class="pl-20"
                @click="show = true"
                :_style="{
                  transitionDuration: '200ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }"
                name="tmicon-cog-fill"
              ></tm-icon
            ></view>
          </template>
          <template v-slot>
            <view
              class="flex flex-row flex-row-center-between"
              @click="showTimeTableAction = !showTimeTableAction"
            >
              <!-- 标题 -->
              <view v-if="languageType == 'en'">
                <tm-text
                  :font-size="30"
                  _class="text-weight-b text-overflow-1 pl-24 pr-8"
                  :label="`Week ${currentWeekIndex}`"
                ></tm-text>
              </view>
              <view v-else>
                <tm-text
                  :font-size="30"
                  _class="text-weight-b text-overflow-1 pl-24 pr-8"
                  :label="`第 ${currentWeekIndex} 周`"
                ></tm-text>
              </view>

              <tm-icon
                :font-size="36"
                _class="b-16"
                :_style="{
                  transform: showTimeTableAction ? 'rotate(180deg)' : 'rotate(0deg)',
                  transitionDuration: '200ms',
                }"
                name="tmicon-sort-down"
              ></tm-icon>
            </view>
          </template>
        </tm-navbar>

        <time-table-action :show="showTimeTableAction" :list="list"></time-table-action>
      </template>
      <time-table-content></time-table-content>
    </tm-sticky>

    <!-- 设置菜单 -->
    <tm-action-menu v-model="show" :list="list"></tm-action-menu>

    <tm-message ref="msg" mask></tm-message>

    <!-- 底部状态栏-->
    <tab-bar :active="1"></tab-bar>
  </tm-app>
</template>
