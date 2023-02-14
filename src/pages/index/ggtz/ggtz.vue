<script setup lang="ts">
import { GetGGTZList } from "~/common/api";

const postList = ref<GetGGTZListResp>();

onReady(async () => {
  const { data: res } = await GetGGTZList({
    page_path: "",
  });

  postList.value = res;

  console.log(postList.value);
});

onPullDownRefresh(async () => {
  const { data: res } = await GetGGTZList({
    page_path: "",
  });

  postList.value = res;

  console.log(postList.value);

  uni.stopPullDownRefresh();
});

const goToDetail = (path: string) => {
  uni.navigateTo({
    url: `/pages/index/ggtz/detail/detail?path=${path}`,
  });
};
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>公告通知</template>

    <!-- 内容 -->

    <div class="flex flex-col">
      <div
        v-for="item in postList?.posts"
        :key="item.title"
        class="flex flex-col p-3 m-3 rounded-lg shadow-sm"
        @click="goToDetail(item.url)"
      >
        <div class="flex flex-row justify-between">
          <div class="font-bold mx-2">{{ item.title }}</div>

          <div class="text-sm text-gray-500 mx-2">{{ item.date }}</div>
        </div>
      </div>
    </div>
  </UBasePage>
</template>
