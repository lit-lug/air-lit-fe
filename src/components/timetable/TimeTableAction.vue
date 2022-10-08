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
    :padding="[0, 0]"
    :margin="[0, 0]"
    color="grey-3"
    _class="overflow flex flex-row flex-row-center-start"
    :_style="{
      height: props.show ? '140rpx' : '0rpx',
    }"
    blur
  >
    <scroll-view scroll-x scrollWithAnimation class="week-nav">
      <!-- <template :key="week" class="week-item"> -->
      <tm-grid :width="96 * 22" :col="20" transprent>
        <tm-grid-item v-for="week in 20" :key="week" :height="100" :width="96">
          <view class="item-main">
            <tm-text :label="'第 ' + week + ' 周'" :font-size="20"></tm-text>

            <tm-grid
              v-for="day in 5"
              :key="day"
              :width="90"
              :height="100"
              :row="5"
              :col="5"
              transprent
            >
              <tm-grid-item v-for="s in 5" :key="s" :height="10" :width="10">
                <view class="item-dot"></view>
              </tm-grid-item>
            </tm-grid>

            <!-- <block v-for="day in 5" :key="day" grid="~ flow-col cols-5 rows-5">
              <block v-for="s in 5" :key="s">
                
              </block>
            </block> -->
          </view>
        </tm-grid-item>
      </tm-grid>
      <!-- </template> -->
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
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background-color: #3fd0a9;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
