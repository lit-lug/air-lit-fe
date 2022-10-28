<script setup lang="ts">
import { USwiperItem } from "~/components/USwiper/types";
import USwiper from "~/components/USwiper/USwiper.vue";

const { showNotify } = usePageStore();

const swiperItems = ref<Array<USwiperItem>>([
  {
    title: "标题1",
    subTitle: "副标题1",
    img: "https://img.yzcdn.cn/vant/apple-1.jpg",
  },
  {
    title: "标题2",
    img: "https://img.yzcdn.cn/vant/apple-2.jpg",
  },
  {
    title: "标题3",
    subTitle: "副标题3",
    img: "https://img.yzcdn.cn/vant/apple-3.jpg",
  },
]);

onReady(() => {});

onShow(() => {});

function btnClick() {
  uni.navigateTo({
    url: "/pages/pl/pl",
    animationType: "auto",
    animationDuration: 500,
  });
}
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>时刻</template>

    <!-- 主体内容 -->
    <div>
      <USwiper :swiperItems="swiperItems"></USwiper>
    </div>

    <div class="px-5 mt-10">
      <UButton type="error" class="w-full" @click="btnClick"> Show Error Notify </UButton>
    </div>
  </UBasePage>
</template>
