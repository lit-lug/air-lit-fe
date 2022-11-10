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
    <template v-slot:navContent>宿舍用电</template>

    <UResult></UResult>
  </UBasePage>
</template>
