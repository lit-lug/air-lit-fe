<script setup lang="ts">
import UDropdown from "~/components/UDropdown/UDropdown.vue";

const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const filterData = ref([
  {
    name: "首付金额",
    key: "first_amount",
    select: 0,
    submenu: [
      {
        label: "首付金额",
        value: [],
      },
      {
        label: "0首付",
        value: [0, 0],
      },
      {
        label: "0-5000元",
        value: [0, 4999],
      },
      {
        label: "5000-10000元",
        value: [5000, 10000],
      },
    ],
  },
  {
    name: "车价",
    key: "real_price",
    select: 0,
    submenu: [
      {
        label: "车价",
        value: [],
      },
      {
        label: "10万以内",
        value: [0, 99999],
      },
      {
        label: "10-15万",
        value: [100000, 149999],
      },
      {
        label: "15万以上",
        value: [150000, ""],
      },
    ],
  },
]);
const handChange = (e) => {
  console.log(e);
};
</script>

<template>
  <UBasePage :showShadow="false">
    <!-- 标题栏 -->
    <template v-slot:navContent>考试成绩</template>

    <template v-slot:navExtra>
      <UDropdown :filterData="filterData" @change="handChange" v-if="deviceType !== 'pc'">
      </UDropdown>
    </template>

    <UDropdown
      isSticky
      :filterData="filterData"
      @change="handChange"
      v-if="deviceType === 'pc'"
    >
    </UDropdown>

    <!-- 内容 -->

    <div :class="deviceType == 'pc' ? '' : 'pt-80rpx'">
      <!-- 结果页 -->
      <UResult></UResult>

      <UResult></UResult>

      <UResult></UResult>

      <UResult></UResult>

      <UResult></UResult>

      <UResult></UResult>
    </div>

    <!-- 下拉菜单 -->
  </UBasePage>
</template>
