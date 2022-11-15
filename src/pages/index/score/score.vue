<script setup lang="ts">
import { GetScore } from "~/common/api";
import UDropdown from "~/components/UDropdown/UDropdown.vue";

const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const scoreData = ref<ScoreResp | null>(null);

const yearSubMenus = ref<FilterSubMenu[]>([]);

const termSubMenus = ref<FilterSubMenu[]>([]);

const filterData = ref<FilterDataItem[]>([
  {
    key: "year",
    select: 0,
    submenu: yearSubMenus.value,
  },
  {
    key: "term",
    select: 0,
    submenu: termSubMenus.value,
  },
  {
    key: "type",
    select: 0,
    submenu: [
      {
        label: "有效",
        value: "all",
      },
      {
        label: "原始",
        value: "raw",
      },
    ],
  },
]);

const selectType = computed(() => {
  return filterData.value[2].submenu[filterData.value[2].select].value;
});

const selectYear = computed(() => {
  return filterData.value[0].submenu[filterData.value[0].select].value;
});

const selectTerm = computed(() => {
  return filterData.value[1].submenu[filterData.value[1].select].value;
});

const selectScore = computed(() => {
  try {
    const score = scoreData.value?.[selectType.value][selectYear.value][selectTerm.value];
    return score;
  } catch (error) {
    return null;
  }
});

const handChange = (e: FilterChangeData[]) => {
  for (const item of e) {
    if (item.label === "term") {
      refreshTermSubMenus();
    }
  }
};

const refreshYearSubMenus = async () => {
  if (scoreData.value) {
    for (const year in scoreData.value[selectType.value]) {
      yearSubMenus.value.push({
        label: year,
        value: year,
      });
    }
  }
};

const refreshTermSubMenus = () => {
  if (scoreData.value) {
    // clear
    // termSubMenus.value = []; 不能这样 回丢失响应
    termSubMenus.value.length = 0;
    for (const term in scoreData.value[selectType.value][selectYear.value]) {
      termSubMenus.value.push({
        label: term === "0" ? "第一学期" : "第二学期",
        value: term,
      });
    }
  }
};

const refreshSubMenus = () => {
  refreshYearSubMenus();
  refreshTermSubMenus();
};

const refreshData = async (force: boolean = false) => {
  try {
    if (scoreData.value === null || force) {
      const { data: res } = await GetScore();
      if (res) {
        scoreData.value = res;
        refreshSubMenus();
      }
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
      <UDropdown
        :filterData="filterData"
        @change="handChange"
        v-if="deviceType !== 'pc' && scoreData"
      >
      </UDropdown>
    </template>

    <UDropdown
      isSticky
      :filterData="filterData"
      @change="handChange"
      v-if="deviceType === 'pc' && scoreData"
    >
    </UDropdown>

    <!-- 内容 -->

    <div :class="deviceType == 'pc' ? '' : 'pt-80rpx'">
      <!-- 结果页 -->

      <div>{{ selectScore }}</div>

      <UResult></UResult>
    </div>

    <!-- 下拉菜单 -->
  </UBasePage>
</template>
