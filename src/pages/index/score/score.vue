<script setup lang="ts">
import { GetScore } from "~/common/api";
import UCollapse from "~/components/score/UCollapse/UCollapse.vue";

const { getCourseColor } = useCourseStore();
const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const scoreData = ref<ScoreResp | null>(null);

const yearSubMenus = ref<FilterSubMenu[]>([]);

const termSubMenus = ref<FilterSubMenu[]>([]);

const colorMap = new Map<string, string>();

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

const selectScore = computed<ScoreInfo[] | RawScoreInfo[]>(() => {
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

// const getCourseColor = (class_name: string): string => {
//   const colorArray = colorList[0];
//   if (!colorMap.has(class_name))
//     colorMap.set(class_name, colorArray[colorMap.size % colorArray.length]);
//   return colorMap.get(class_name) || "bg-white";
// };

const getScoreColor = (score: string): string => {
  const scoreNum = Number(score);

  if (isNaN(scoreNum)) {
    if (score === "优秀") {
      return "bg-green-5 bg-opacity-20 text-green-5";
    } else if (score === "良好") {
      return "bg-blue-5 bg-opacity-20 text-blue-5";
    } else if (score === "中等") {
      return "bg-yellow-5 bg-opacity-20 text-yellow-5";
    } else if (score === "及格") {
      return "bg-orange-5 bg-opacity-20 text-orange-5";
    } else if (score === "不及格") {
      return "bg-red-5 bg-opacity-20 text-red-5";
    } else {
      return "";
    }
  } else {
    if (scoreNum >= 90) {
      return "bg-green-5 bg-opacity-20 text-green-5";
    } else if (scoreNum >= 80) {
      return "bg-blue-5 bg-opacity-20 text-blue-5";
    } else if (scoreNum >= 70) {
      return "bg-yellow-5 bg-opacity-20 text-yellow-5";
    } else if (scoreNum >= 60) {
      return "bg-orange-5 bg-opacity-20 text-orange-5";
    } else {
      return "bg-red-5 bg-opacity-20 text-red-5";
    }
  }
};

const refreshYearSubMenus = async () => {
  if (scoreData.value) {
    yearSubMenus.value.length = 0;
    for (const year in scoreData.value[selectType.value]) {
      yearSubMenus.value.push({
        label: year + " 学年",
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
      let { data: res } = await GetScore();
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

onPullDownRefresh(async () => {
  await refreshData(true);
  uni.stopPullDownRefresh();
});
</script>

<template>
  <UBasePage :showShadow="false">
    <template v-slot:navContent>考试成绩</template>

    <!-- <template v-slot:navExtra>
      <UDropdown
        :filterData="filterData"
        @change="handChange"
        v-if="scoreData"
      >
      </UDropdown>
    </template> -->


    <!-- <div :class="deviceType == 'pc' ? '' : 'pt-80rpx'"> -->

      <div v-for="(v, i) in selectScore" :key="i">
        <UCollapse :title="v.class_name" :title-bar-color="getCourseColor(v.class_name)">
          <template v-slot:right>
            <div
              class="flex bg-green-5/20 justify-center items-center px-1 text-green-5 rounded-lg`"
              :class="getScoreColor(v.score)"
              :style="{
                whiteSpace: 'nowrap',
              }"
            >
              {{ v.score }}
            </div>
          </template>

          <div
            v-if="v.code"
            class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
          >
            <div class="font-bold">课程代码</div>
            <div>#{{ v.code }}</div>
          </div>

          <div
            v-if="v.type"
            class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
          >
            <div class="font-bold">类别</div>
            <div>{{ v.type }}</div>
          </div>

          <div
            v-if="v.set_credit"
            class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
          >
            <div class="font-bold">学分</div>
            <div>{{ v.set_credit }}</div>
          </div>

          <div
            v-if="v.assess_type"
            class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
          >
            <div class="font-bold">考核方式</div>
            <div>{{ v.assess_type }}</div>
          </div>

          <div
            v-if="v.score"
            class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
          >
            <div class="font-bold">成绩</div>
            <div>{{ v.score }}</div>
          </div>

          <div v-if="(v as RawScoreInfo).raw_score">
            <div
              v-if="(v as RawScoreInfo).raw_score.usual != ' ' && (v as RawScoreInfo).raw_score.usual"
              class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
            >
              <div class="font-bold">平时</div>
              <div>{{ (v as RawScoreInfo).raw_score.usual }}</div>
            </div>

            <div
              v-if="(v as RawScoreInfo).raw_score.midterm != ' ' && (v as RawScoreInfo).raw_score.midterm"
              class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
            >
              <div class="font-bold">中考</div>
              <div>{{ (v as RawScoreInfo).raw_score.midterm }}</div>
            </div>

            <div
              v-if="(v as RawScoreInfo).raw_score.final_exam != ' ' && (v as RawScoreInfo).raw_score.final_exam"
              class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
            >
              <div class="font-bold">末考</div>
              <div>{{ (v as RawScoreInfo).raw_score.final_exam }}</div>
            </div>

            <div
              v-if="(v as RawScoreInfo).raw_score.skill != ' ' && (v as RawScoreInfo).raw_score.skill"
              class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
            >
              <div class="font-bold">技能</div>
              <div>{{ (v as RawScoreInfo).raw_score.skill }}</div>
            </div>

            <div
              v-if="(v as RawScoreInfo).raw_score.general != ' ' && (v as RawScoreInfo).raw_score.general"
              class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
            >
              <div class="font-bold">综合</div>
              <div>{{ (v as RawScoreInfo).raw_score.general }}</div>
            </div>
          </div>

          <div
            v-if="(v as ScoreInfo).credit"
            class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
          >
            <div class="font-bold">取得学分</div>
            <div>{{ (v as ScoreInfo).credit }}</div>
          </div>

          <div
            v-if="(v as ScoreInfo).gpa"
            class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
          >
            <div class="font-bold">绩点</div>
            <div>{{ (v as ScoreInfo).gpa }}</div>
          </div>

          <div
            v-if="(v as ScoreInfo).credit_gpa"
            class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
          >
            <div class="font-bold">学分*绩点</div>
            <div>{{ (v as ScoreInfo).credit_gpa }}</div>
          </div>

          <div
            v-if="(v as ScoreInfo).info != ' ' && (v as ScoreInfo).info"
            class="flex flex-row justify-between items-center p-1 m-1 text-gray-5 dark:text-gray-3 text-28rpx"
          >
            <div class="font-bold">备注</div>
            <div>{{ (v as ScoreInfo).info }}</div>
          </div>
        </UCollapse>
      </div>

      <UResult v-if="!selectScore"></UResult>
    <!-- </div> -->

  </UBasePage>
</template>
