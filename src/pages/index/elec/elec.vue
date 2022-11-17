<script setup lang="ts">
import { GetElecRemain, GetElecDetails, GetElecChargeRecords } from "~/common/api";
import { NavItem } from "~/components/UTab/types";
import UTab from "~/components/UTab/UTab.vue";

const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const tabIndex = ref(0);

const elecRemain = ref<ElecRemainResp | null>(null);

const elecDetails = ref<ElecDetailsResp | null>(null);

const elecChargeRecords = ref<ElecChargeRecordResp | null>(null);

const tabChange = async (index: number) => {
  tabIndex.value = index;
  await refreshData();
};

const isHaveData = computed(() => {
  if (tabIndex.value === 0) {
    return elecRemain.value !== null;
  } else if (tabIndex.value === 1) {
    return elecDetails.value !== null;
  } else if (tabIndex.value === 2) {
    return elecChargeRecords.value !== null;
  }
});

const tabNavItems: Array<NavItem> = [
  {
    type: "0", //状态值
    name: "余额查询",
  },
  {
    type: "1",
    name: "用电详情",
  },
  {
    type: "2",
    name: "充值记录",
  },
];

// 刷新数据
const refreshData = async (force: boolean = false) => {
  if (tabIndex.value === 0 && (force || !elecRemain.value)) {
    const { data: res } = await GetElecRemain();
    elecRemain.value = res;
  } else if (tabIndex.value === 1 && (force || !elecDetails.value)) {
    const { data: res } = await GetElecDetails();
    elecDetails.value = res;
  } else if (tabIndex.value === 2 && (force || !elecChargeRecords.value)) {
    const { data: res } = await GetElecChargeRecords();
    elecChargeRecords.value = res;
  }
};

onReady(async () => {
  try {
    await refreshData();
  } catch (error) {
    console.log(error);
  }
});

onPullDownRefresh(async () => {
  try {
    await refreshData(true);
  } catch (error) {
    console.log(error);
  }
  uni.stopPullDownRefresh();
});
</script>

<template>
  <UBasePage :showShadow="false">
    <!-- 标题栏 -->

    <template v-slot:navContent>宿舍用电</template>

    <template v-slot:navExtra>
      <UTab @change="tabChange" :tabNav="tabNavItems" v-if="deviceType !== 'pc'"></UTab>
    </template>

    <UTab :tabNav="tabNavItems" @change="tabChange" v-if="deviceType == 'pc'"></UTab>

    <!-- 内容 -->

    <div :class="deviceType == 'pc' ? '' : 'pt-80rpx'">
      <div v-if="tabIndex == 0 && elecRemain" v-for="(v, i) in elecRemain" :key="i">
        <div
          class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm"
        >
          <div class="flex flex-row gap-2 items-center mx-1 px-1">
            <div class="bg-blue-5 w-1 h-5 rounded-lg"></div>
            <div class="font-bold">{{ v.name }}</div>
          </div>

          <!-- 分割线 -->
          <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

          <div
            class="flex flex-row justify-between gap-2 items-center mx-2 py-1 text-30rpx"
          >
            <div class="font-bold">绑定楼栋</div>
            <div class="bg-blue-5/20 px-2 text-blue-5 rounded-lg text-28rpx">
              {{ v.build_name }}
            </div>
          </div>

          <div
            class="flex flex-row justify-between gap-2 items-center mx-2 py-1 text-30rpx"
          >
            <div class="font-bold">绑定房间</div>
            <div class="bg-orange-5/20 px-2 text-orange text-sm rounded-lg">
              {{ v.room }}
            </div>
          </div>

          <div
            class="flex flex-row justify-between gap-2 items-center mx-2 py-1 text-30rpx"
          >
            <div class="font-bold">余额</div>
            <div class="bg-green-5/20 px-2 text-green-5 text-sm rounded-lg">
              {{ v.balance }} 元
            </div>
          </div>

          <div
            class="flex flex-row justify-between gap-2 items-center mx-2 py-1 text-30rpx"
          >
            <div class="font-bold">剩余电量</div>
            <div class="bg-green-5/20 px-2 text-green-5 text-sm rounded-lg">
              {{ v.electricity }} 度
            </div>
          </div>
        </div>
      </div>

      <div v-if="tabIndex == 1 && elecDetails" v-for="(v, i) in elecDetails" :key="i">
        <div
          class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm"
        >
          <div class="flex flex-row gap-2 items-center mx-1 px-1">
            <div class="bg-blue-5 w-1 h-5 rounded-lg"></div>
            <div class="font-bold">{{ v.name }}</div>
          </div>

          <!-- 分割线 -->
          <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

          <div v-for="(d, _) in v.details" :key="i">
            <div
              class="flex flex-row justify-between gap-2 items-center mx-2 py-1 text-30rpx"
            >
              <div class="font-bold">
                {{ d.time.split(" ")[0] }}
              </div>

              <div class="bg-red-5/20 px-2 text-red-5 text-sm rounded-lg">
                {{ d.value }} 度
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="tabIndex == 2 && elecChargeRecords"
        v-for="(v, i) in elecChargeRecords"
        :key="i"
      >
        <div
          class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm"
        >
          <div class="flex flex-row gap-2 items-center mx-1 px-1">
            <div class="bg-blue-5 w-1 h-5 rounded-lg"></div>
            <div class="font-bold">{{ v.device }}</div>
          </div>

          <!-- 分割线 -->
          <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

          <div v-for="(d, _) in v.mx" :key="i">
            <div
              class="flex flex-row justify-between gap-2 items-center mx-2 py-1 text-30rpx"
            >
              <div class="flex flex-col justify-center">
                <div class="font-bold">{{ d.accounttime.split(" ")[0] }}</div>
                <div class="text-gray-5 dark:text-gray-3 text-xs">
                  {{ d.accounttime.split(" ")[1] }}
                </div>
              </div>
              <div class="bg-green-5/20 px-2 text-green-5 text-sm rounded-lg">
                {{ d.inmoney }} 元
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 结果页 -->
      <UResult v-if="!isHaveData"></UResult>
    </div>

    <!-- 内容区 -->
  </UBasePage>
</template>
