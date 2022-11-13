<script setup lang="ts">
import { NavItem } from "~/components/UTab/types";
import UTab from "~/components/UTab/UTab.vue";

const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const tabIndex = ref(0);

const tabChange = (index: number) => {
  tabIndex.value = index;
};

const tabNavItems: Array<NavItem> = [
  {
    type: "0", //状态值
    name: "余额查询",
  },
  {
    type: "1",
    name: "历史消费",
  },
  {
    type: "2",
    name: "充值记录",
  },
];
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->

    <template v-slot:navContent>宿舍用电</template>

    <template v-slot:navExtra>
      <UTab @change="tabChange" :tabNav="tabNavItems" v-if="deviceType !== 'pc'"></UTab>
    </template>

    <UTab :tabNav="tabNavItems" @change="tabChange" v-if="deviceType == 'pc'"></UTab>

    <!-- 内容 -->

    <div :class="deviceType == 'pc' ? '' : 'pt-80rpx'">
      <div v-if="tabIndex == 0">
        <div
          class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm"
        >
          余额查询
        </div>
      </div>

      <div v-if="tabIndex == 1">
        <div
          class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm"
        >
          历史消费
        </div>
      </div>

      <div v-if="tabIndex == 2">
        <div
          class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm"
        >
          充值记录
        </div>
      </div>

      <UResult></UResult>
    </div>

    <!-- 内容区 -->
  </UBasePage>
</template>
