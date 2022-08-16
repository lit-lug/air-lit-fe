<script lang="ts" setup>
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmGridItem from "@/tmui/components/tm-grid-item/tm-grid-item.vue";
import tmImage from "@/tmui/components/tm-image/tm-image.vue";
import tmGrid from "@/tmui/components/tm-grid/tm-grid.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import { ref } from "vue";

const list2 = ref([
  {
    path:
      "https://gw.alicdn.com/imgextra/i4/O1CN01XCiY1B1px9ivHkDGm_!!6000000005426-2-tps-183-144.png_q90.jpg",
    title: "天猫新品",
    count: "热销",
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i3/O1CN01FgQFp81spmBXqQMtA_!!6000000005816-2-tps-183-144.png_q90.jpg",
    title: "今日爆款",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01tsk5OY1q0MUo5PJga_!!6000000005433-2-tps-183-144.png_q90.jpg",
    title: "天猫国际",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg",
    title: "飞猪旅行",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg",
    title: "天猫超市",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i4/O1CN01VuRfwH1muSbsJFxoM_!!6000000005014-2-tps-183-144.png_q90.jpg_.webp",
    title: "冬奥公益",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg",
    title: "飞猪旅行",
    count: 99,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg",
    title: "天猫超市",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i4/O1CN01VuRfwH1muSbsJFxoM_!!6000000005014-2-tps-183-144.png_q90.jpg_.webp",
    title: "冬奥公益",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i4/O1CN01XCiY1B1px9ivHkDGm_!!6000000005426-2-tps-183-144.png_q90.jpg",
    title: "天猫新品",
    count: 6,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i3/O1CN01FgQFp81spmBXqQMtA_!!6000000005816-2-tps-183-144.png_q90.jpg",
    title: "今日爆款",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01tsk5OY1q0MUo5PJga_!!6000000005433-2-tps-183-144.png_q90.jpg",
    title: "天猫国际",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg",
    title: "飞猪旅行",
    count: 0,
  },
  {
    path:
      "https://gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg",
    title: "天猫超市",
    count: 0,
  },
]);

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
    _class="overflow flex flex-col
          flex-col-center-center"
    :_style="{
      height: props.show ? '140rpx' : '0rpx',
    }"
    blur
  >
    <scroll-view :scroll-x="true" scrollWithAnimation>
      <tm-grid :width="14 * 120" :col="14" transprent>
        <tm-grid-item
          v-for="(item, index) in list2"
          :key="index"
          :height="140"
          :width="100"
          :count="item.count"
        >
          <tm-image :width="100" :height="79" :src="item.path"></tm-image>
          <tm-text :font-size="22" :label="item.title"></tm-text>
        </tm-grid-item>
      </tm-grid>
    </scroll-view>
  </tm-sheet>
</template>
