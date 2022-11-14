<script setup lang="ts">
import { GetScore } from "~/common/api";
import UDropdown from "~/components/UDropdown/UDropdown.vue";

const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const score = ref<ScoreResp | null>(null);

const filterData = ref([
  {
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
    ],
  },
  {
    key: "type",
    select: 0,
    submenu: [
      {
        label: "有效",
        value: [],
      },
      {
        label: "原始",
        value: "raw",
      },
    ],
  },
]);

const handChange = (e) => {
  console.log(e);
};

const refreshData = async (force: boolean = false) => {
  try {
    if (score.value === null || force) {
      const { data: res } = await GetScore();
      score.value = res;
    }
  } catch (error) {
    console.log(error);
  }
};

onReady(async () => {
  console.log("onReady");
  await refreshData();
});
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
    </div>

    <!-- 下拉菜单 -->
  </UBasePage>
</template>
