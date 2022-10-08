<script lang="ts" setup>
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmGridItem from "@/tmui/components/tm-grid-item/tm-grid-item.vue";
import tmImage from "@/tmui/components/tm-image/tm-image.vue";
import tmGrid from "@/tmui/components/tm-grid/tm-grid.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import { ref } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <tm-sheet
    v-show="props.show"
    :padding="[0, 0]"
    :margin="[0, 0]"
    color="grey-3"
    blur
  >
    <scroll-view scroll-x scrollWithAnimation class="week-nav">
      <!-- <template :key="week" class="week-item"> -->
      <tm-grid :width="100 * 22" :col="20" transprent>
        <tm-grid-item v-for="week in 20" :key="week" :height="120" :width="100">
          <view class="flex flex-col flex-col-center-center ma-2">
            <tm-text :label="'第 ' + week + ' 周'" :font-size="20"></tm-text>

            <!-- 宫格 -->
            <view
              v-for="day in 5"
              :key="day"
              class="flex flex-row flex-row-center-center"
            >
              <view
                v-for="s in 5"
                :key="s"
                class="flex flex-col flex-col-center-center"
              >
                <view class="item-dot ma-1 pa-1"></view>
              </view>
            </view>
          </view>
        </tm-grid-item>
      </tm-grid>
    </scroll-view>
  </tm-sheet>
</template>

<style lang="less" scoped>
.item-main {
  width: 96rpx;
  border-radius: 10rpx;
  margin: 0 auto;
  // padding: 8rpx 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

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
