<script lang="ts" setup>
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmGridItem from "@/tmui/components/tm-grid-item/tm-grid-item.vue";
import tmGrid from "@/tmui/components/tm-grid/tm-grid.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import { storeToRefs } from "pinia";

import { ref, watch } from "vue";
import { useCourseStore } from "@/store/course";
import { useAppStore } from "@/store/app";

import TimeTableHeader from "./TimeTableHeader.vue";

const appStore = useAppStore();

const {
  currentMonth,
  originalWeekIndex,
  currentWeekIndex,
  originalWeekWeekIndex,
  currentWeekDayArray,
} = storeToRefs(useCourseStore());

const { setCurrentWeekIndex } = useCourseStore();

const scrollTo = ref("week0");

const { languageType } = storeToRefs(appStore);

const _width = uni.getSystemInfoSync().windowWidth;

watch(
  () => +props.show + currentWeekIndex.value,
  () => {
    if (props.show) scrollTo.value = `week${currentWeekIndex.value - 1}`;
    else {
      scrollTo.value = "week0";
    }
  }
);

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <tm-sheet :margin="[0, 0]" :padding="[0, 0]" blur>
    <scroll-view
      scroll-x
      scroll-with-animation
      :scroll-into-view="scrollTo"
      :style="{
        transitionProperty: 'height',
        transitionDuration: '200ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'scroll',
        height: props.show ? '125rpx' : '0rpx',
      }"
    >
      <tm-grid :width="100 * 22" :col="20" transprent>
        <tm-grid-item v-for="week in 20" :key="week" :height="120" :width="100">
          <tm-sheet
            :height="120"
            :width="100"
            :margin="[0, 0]"
            :padding="[0, 0]"
            :shadow="0"
            :round="3"
            :id="`week${week + 1}`"
            color="grey-2"
            darkBgColor="#616161"
            _class="flex flex-center "
            :transprent="week !== currentWeekIndex"
          >
            <tm-text :label="'第 ' + week + ' 周'" :font-size="20"></tm-text>

            <!-- 宫格 -->
            <view
              v-for="day in 5"
              :key="day"
              class="flex flex-row flex-row-center-center"
            >
              <view v-for="s in 5" :key="s" class="flex flex-col flex-col-center-center">
                <view class="item-dot ma-1 pa-1"></view>
              </view>
            </view>
          </tm-sheet>
        </tm-grid-item>
      </tm-grid>
    </scroll-view>

    <time-table-header></time-table-header>
  </tm-sheet>
</template>

<style lang="less" scoped>
.item-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background-color: #3fd0a9;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
