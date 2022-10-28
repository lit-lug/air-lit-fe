<script setup lang="ts">
import type { CourseModel } from "~/stores/course";
import CourseActionSheet from "~/components/timetable/CourseActionSheet.vue";
import TimetableContent from "~/components/timetable/TimetableContent.vue";
import courses from "~/static/courses";
const { customBarHeight, statusBarHeight, darkMode } = storeToRefs(useAppStore());

const { setDarkMode } = useAppStore();

const { setPageConfig } = usePageStore();
const { currentWeekIndex, isStart } = storeToRefs(useCourseStore());
const { setCourseList, setStartDay } = useCourseStore();
onShow(() => {
  setPageConfig({ showNavBar: true });
});
setCourseList(courses as CourseModel[]);
const showCourseAction = ref(false);
// set the start date
const someDate = new Date();
someDate.setDate(someDate.getDate() + -1 * 7);
setStartDay(someDate);
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
</script>

<template>
  <UBasePage>
    <template v-slot:navAction>
      <div class="i-carbon-add text-2xl" @click="handleCreateCourse" />
      <div :class="darkMode ? 'i-carbon-moon' : 'i-carbon-sun'" @click="toggleDarkMode" />
    </template>

    <template v-slot:navContent>
      <div
        class="base flex h-full mx-auto justify-center items-center inline-block text-lg"
        @click="showCourseAction = !showCourseAction"
      >
        {{ `第 ${currentWeekIndex + 1} 周${!isStart ? "(未开学)" : ""}` }}
        <div
          class="transition-transform duration-300 text-2xl i-carbon-chevron-up"
          :class="showCourseAction ? 'rotate-180' : 'rotate-0'"
        />
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
  </UBasePage>
</template>

<style scoped></style>
