<script setup lang="ts">
import { useCourseStore, weekTitle } from "@/store/course";
import { storeToRefs } from "pinia";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import theme from "@/tmui/tool/theme/theme";

const _width = uni.getSystemInfoSync().windowWidth;
const {
  currentMonth,
  originalWeekIndex,
  currentWeekIndex,
  originalWeekWeekIndex,
  currentWeekDayArray,
} = storeToRefs(useCourseStore());
</script>

<template>
  <tm-sheet
    _class="flex flex-row flex-around"
    blur
    :width="_width"
    :_style="{
      width: _width + 'px',
    }"
    :margin="[0, 0]"
    :padding="[0, 12]"
    :height="80"
    :shadow="0"
    unit="rpx"
  >
    <view
      class="flex flex-col flex-col-center-center"
      :style="{
        width: '9vw',
      }"
    >
      <tm-text :font-size="30" _class="font-weight-b" :label="currentMonth"> </tm-text>
      <tm-text :font-size="26" _class="font-weight-s" label="月"> </tm-text>
    </view>

    <view
      class="flex flex-row flex-row-center flex-around"
      :style="{
        width: '91vw',
      }"
    >
      <view
        v-for="(item, index) in currentWeekDayArray"
        :key="index"
        class="flex flex-col flex-col-center-center pr-10 pl-10"
        :style="
          originalWeekWeekIndex === index
            ? {
                borderBottomStyle: 'solid',
                borderBottomWidth: '3px',
                borderBottomColor: theme.getColor('primary').csscolor,
                borderBottomLeftRadius: '1px',
                borderBottomRightRadius: '1px',
              }
            : {}
        "
      >
        <tm-text
          :color="originalWeekWeekIndex === index ? 'primary' : ''"
          :font-size="30"
          _class="font-weight-b text-align-center"
        >
          {{ weekTitle[index] }}</tm-text
        >
        <tm-text
          :font-size="26"
          :color="originalWeekWeekIndex === index ? 'primary' : ''"
          _class="font-weight-n text-align-center"
          :label="item"
          :border="5"
          border-direction="bottom"
        ></tm-text>
      </view>
    </view>
  </tm-sheet>
</template>
