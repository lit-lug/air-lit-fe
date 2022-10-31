<script setup lang="ts">
import type { CourseModel } from "~/stores/course";
import { weekTitle } from "~/stores/course";
const props = withDefaults(
  defineProps<{ showActionSheet: boolean; courseItem: CourseModel }>(),
  {
    showActionSheet: false,
    courseItem: undefined,
  }
);
const emit = defineEmits(["cancel"]);
const courseStore = useCourseStore();
const courseList = computed(() => courseStore.getConflictCourse(props.courseItem));
const courseTime = computed(() => getCourseTime(courseList.value[0]));
function getCourseTime(item: CourseModel) {
  const { week, start, duration } = item;
  return `星期${weekTitle[week - 1]} 第${start}-${start + duration - 1}节`;
}
function navigateToDetail(courseItem: CourseModel) {
  closeActionSheet();
  uni.navigateTo({
    url: `./detail/detail?course=${courseItem.title}`,
  });
}
function closeActionSheet() {
  console.log("closeActionSheet");
  emit("cancel");
}

const bottom = ref("0rpx");

// #ifdef H5
bottom.value = "6%";
// #endif
</script>

<template>
  <div @touchmove.prevent class="z-200">
    <div
      class="bg-base w-full min-h-10 z-220 fixed"
      transition="all duration-200 ease-in-out"
      :style="{
        bottom: showActionSheet && courseList?.length ? bottom : '-100%',
      }"
    >
      <div class="py-6" flex="~ col gap6">
        <div v-if="courseList?.length" class="font-medium text-xl px-4">
          {{ courseTime }}
        </div>
        <template v-for="(courseItem, index) of courseList" :key="index">
          <div class="px-4" flex="~ col gap-2" @click="navigateToDetail(courseItem)">
            <div class="flex mb-1 w-full gap-2 justify-start items-center relative">
              <div
                class="rounded-full h-5 w-1 inline-block"
                :style="`background-color:${courseItem.color}`"
              />
              <div class="font-medium text-lg">
                {{ courseItem.title }}
              </div>
              <div
                class="text-xl top-0 right-4 bottom-0 z-20 absolute"
                :class="index ? 'i-carbon-up-to-top' : ''"
                @click.stop="courseStore.setCourseItemTop(courseItem)"
              />
            </div>
            <div class="flex gap-1 justify-start items-center">
              <div class="i-carbon-location" />
              {{ courseItem.location }}
            </div>
            <div class="flex gap-1 justify-start items-center">
              <div class="i-carbon-alarm" />
              {{ getCourseTime(courseItem) }}
            </div>
          </div>
        </template>
      </div>
      <div
        class="flex pb-safe h-10"
        text="center lg "
        b="t-4 gray-200 "
        justify-center
        items-center
        hover-class="bg-gray-200 bg-opacity-50"
        :hover-stay-time="150"
        @click="closeActionSheet"
      >
        关闭
      </div>
    </div>

    <UOverlay @close="closeActionSheet" :show="showActionSheet"> </UOverlay>
  </div>
</template>
