<script setup lang="ts">
import { GetCalendar } from "~/common/api";

const { getYearTerm } = useCourseStore();

const imgUrl = ref("");

const previewImg = () => {
  uni.previewImage({
    urls: [imgUrl.value],
  });
};

const yearTerm = getYearTerm();

const year = ref(yearTerm.year);

const term = ref(yearTerm.term);

const subTitle = ref("");

onReady(async () => {
  const { data: calendar } = await GetCalendar();
  if (calendar) {
    subTitle.value = calendar.sub_title;
    imgUrl.value = calendar.img_url;
  }
});

onPullDownRefresh(async () => {
  const { data: calendar } = await GetCalendar();
  if (calendar) {
    subTitle.value = calendar.sub_title;
    imgUrl.value = calendar.img_url;
  }
  uni.stopPullDownRefresh();
});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>校历</template>

    <div
      class="flex flex-col p-2 m-3 pb-6 dark:bg-dark bg-white justify-center items-center rounded-lg shadow-sm"
    >
      <div class="py-2 font-bold">
        {{ year }}-{{ year + 1 }} 学年第{{ term == 0 ? "一" : "二" }}学期
      </div>

      <div class="py-2 text-sm">{{ subTitle }}</div>

      <image
        v-if="imgUrl"
        @click="previewImg"
        class="rounded-lg shadow py-2 transition-all duration-200 ease-in-out hover:shadow-lg"
        :src="imgUrl"
        alt="校历"
        mode="widthFix"
      />
    </div>
  </UBasePage>
</template>
