<script setup lang="ts">
import type { CourseModel } from "~/stores/course";
import CourseActionSheet from "~/components/timetable/CourseActionSheet.vue";
import TimetableContent from "~/components/timetable/TimetableContent.vue";

import courses from "~/static/courses";
import UDrawerPage from "~/components/UnoUI/UDrawerPage/UDrawerPage.vue";
import { GetStatus, GetSchedule } from "~/common/api";

const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const { customBarHeight, statusBarHeight, darkMode } = storeToRefs(useAppStore());

const { setDarkMode } = useAppStore();
const { currentWeekIndex, isStart } = storeToRefs(useCourseStore());
const { setCourseList, setStartDay } = useCourseStore();

onShow(async () => {
  // 获取系统状态
  const { data: status } = await GetStatus();

  if (status) {
    setStartDay(status.start_day);
  }
});

setCourseList(courses as CourseModel[]);
const showCourseAction = ref(false);

function handleCreateCourse() {
  uni.navigateTo({
    url: "./detail/detail",
    animationType: "auto",
    animationDuration: 500,
  });
}

const toggleDarkMode = () => setDarkMode(!darkMode.value);

// handle course item click
const showActionSheet = ref(false);
const clickedCourseItem = ref<CourseModel>();
function handleShowActionSheet(courseItem: CourseModel) {
  showActionSheet.value = true;
  clickedCourseItem.value = courseItem;
}
function handleCloseActionSheet() {
  showActionSheet.value = false;
}

const drawer = ref();
const setDrawer = (isOpen: boolean) => {
  isOpen ? drawer.value?.openDrawer() : drawer.value?.closeDrawer();
};

watchEffect(() => {
  uni.setNavigationBarTitle({
    title: `第${currentWeekIndex.value + 1}周${!isStart.value ? "(未开学)" : ""}`,
  });
});

onReady(async () => {
  // 获取用户信息
  const { data: data } = await GetSchedule();
  if (data) {
    console.log(data);
    setCourseList(data as CourseModel[]);
  }
});

onPullDownRefresh(async () => {
  // 获取用户信息
  const { data: data } = await GetSchedule();
  if (data) {
    console.log(data);
    setCourseList(data as CourseModel[]);
  }
  uni.stopPullDownRefresh();
});
</script>

<template>
  <!-- #ifdef MP-WEIXIN -->
  <UDrawerPage :showShadow="false" ref="drawer">
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <UBasePage :showShadow="false">
      <template v-slot:navAction>
        <div class="i-carbon-add text-2xl mr-2" @click="handleCreateCourse" />
        <div
          class="mr-2"
          :class="darkMode ? 'i-carbon-moon' : 'i-carbon-sun'"
          @click="toggleDarkMode"
        />
      </template>
      <!-- #endif -->

      <template v-slot:navContent>
        <div
          class="base flex h-full mx-auto justify-center items-center text-ls"
          @click="showCourseAction = !showCourseAction"
        >
          {{ `第 ${currentWeekIndex + 1} 周${!isStart ? "(未开学)" : ""}` }}
          <div
            class="transition-transform duration-200 text-2xl i-carbon-chevron-down"
            :class="showCourseAction ? 'rotate-to-180' : 'rotate-to-0'"
          />
        </div>
      </template>

      <template v-slot:drawer>
        <div class="base justify-center items-center h-full mx-auto flex flex-col">
          <div class="text-center text-2xl px-auto">Drawer</div>
          <div @click="setDrawer(false)" class="text-center text-2xl px-auto">返回</div>
        </div>
      </template>

      <!-- timetable main content -->
      <TimetableContent
        :show-course-action="showCourseAction"
        @course-item-click="handleShowActionSheet"
      />

      <!-- course card -->
      <CourseActionSheet
        :show-action-sheet="showActionSheet"
        :course-item="clickedCourseItem"
        @cancel="handleCloseActionSheet"
      />

      <div
        v-if="deviceType == 'pc'"
        class="bg-blue-5/90 w-10 h-10 fixed bottom-5% right-5% z-80 rounded-full transition-all duration-300 shadow-sm"
        text="white sm"
        @click="setDrawer(true)"
        hover-class="opacity-50"
      >
        <div class="flex justify-center items-center flex-row">
          <div class="i-carbon-menu text-xl p-1 m-1" />
        </div>
      </div>

      <!-- #ifdef H5 -->
    </UBasePage>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
  </UDrawerPage>
  <!-- #endif -->
</template>

<style scoped>
.rotate-to-180 {
  transform: rotate(180deg);
}

.rotate-to-0 {
  transform: rotate(0deg);
}
</style>
