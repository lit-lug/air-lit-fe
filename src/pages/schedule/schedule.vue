<script setup lang="ts">
import type { CourseModel } from "~/stores/course";
import CourseActionSheet from "~/components/timetable/CourseActionSheet.vue";
import TimetableContent from "~/components/timetable/TimetableContent.vue";
import courses from "~/static/courses";
import UDrawerPage from "~/components/UnoUI/UDrawerPage/UDrawerPage.vue";
import { GetUserInfo, AuthQrCode, GetStatus } from "~/common/api";

const { customBarHeight, statusBarHeight, darkMode } = storeToRefs(useAppStore());

const { setDarkMode } = useAppStore();

// const { setPageConfig } = usePageStore();
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
// set the start date
// const someDate = new Date();
// someDate.setDate(someDate.getDate() + -1 * 7);
// setStartDay(someDate);
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

// onLaunch((option: any) => {
//   console.log("onLaunch", option);
// });
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
            class="transition-transform duration-200 text-2xl i-carbon-chevron-up"
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
