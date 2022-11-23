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
  const { day, start, duration } = item;
  return `星期${weekTitle[day - 1]} 第${start}-${start + duration - 1}节`;
}
function navigateToDetail(courseItem: CourseModel) {
  closeActionSheet();
  uni.navigateTo({
    url: `./detail/detail?course=${courseItem.title}`,
  });
}
function closeActionSheet() {
  // console.log("closeActionSheet");
  emit("cancel");
}

/**
 * transform weeks to string eg: [1, 2, 3, 5, 6, 8] to '1-3,5-6,8'
 * @param weeks week list
 */
function tArray2String(weeks: number[]): string {
  let weeksString = "";
  for (let i = 0; i < weeks.length; i++) {
    if (i === 0) {
      weeksString += weeks[i];
    } else {
      if (weeks[i] !== weeks[i - 1] + 1) {
        const last = weeksString.split(",")[weeksString.split(",").length - 1];
        if (Number.parseInt(last) !== weeks[i - 1]) weeksString += `-${weeks[i - 1]}`;
        weeksString += `,${weeks[i]}`;
      } else {
        if (i === weeks.length - 1) weeksString += `-${weeks[i]}`;
      }
    }
  }
  return weeksString;
}

const bottom = ref("0rpx");

// #ifdef H5
bottom.value = "6%";
// #endif
</script>

<template>
  <div @touchmove.prevent class="z-200">
    <div
      class="bg-base w-full dark:bg-dark min-h-10 z-220 fixed rounded-t-lg"
      transition="all duration-200 ease-in-out"
      :style="{
        bottom: showActionSheet && courseList?.length ? bottom : '-100%',
      }"
    >
      <scroll-view
        scroll-y
        scroll-into-view="scrollIntoView"
        scroll-with-animation
        class="h-64 overflow-y-scroll"
      >
        <div class="py-6" flex="~ col gap6">
          <div v-if="courseList?.length" class="font-medium text-xl px-4">
            {{ courseTime }}
          </div>
          <template v-for="(courseItem, index) of courseList" :key="index">
            <div
              class="px-4 pb-8"
              flex="~ col gap-2"
              @click="navigateToDetail(courseItem)"
            >
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
                <div v-if="courseItem.location" class="i-carbon-location" />
                {{ courseItem.location }}
              </div>
              <div
                v-if="courseItem.teacher"
                class="flex gap-1 justify-start items-center"
              >
                <div class="i-carbon-user" />
                {{ courseItem.teacher }}
              </div>
              <div v-if="courseItem.credit" class="flex gap-1 justify-start items-center">
                <div class="i-carbon-star" />
                {{ courseItem.credit }} 学分
              </div>
              <div class="flex gap-1 justify-start items-center">
                <div class="i-carbon-alarm" />
                {{
                  courseItem.time && courseItem.type == "jw"
                    ? courseItem.time
                    : `${getCourseTime(courseItem)} [${tArray2String(
                        courseItem.weeks
                      )}周]`
                }}
              </div>
            </div>
          </template>
        </div>
      </scroll-view>

      <!-- 滚动视图 -->

      <!-- <div
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
      </div> -->
    </div>

    <div
      class="bg-dark-100 bg-opacity-50 transition-all top-0 right-0 bottom-0 left-0 z-90 fixed"
      :class="
        showActionSheet && courseList?.length
          ? 'opacity-100 visible'
          : 'opacity-0 invisible'
      "
      @click="closeActionSheet"
    />
  </div>
</template>
