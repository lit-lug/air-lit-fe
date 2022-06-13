<template>
  <view
    class="index bg-white dark:bg-black h-screen pl-7.5"
    :class="{ 'text-[50px]': true }"
  >
    <the-swiper :swiperItems="swiperItems"> </the-swiper>
    <text class="text-red-400 dark:text-green-400">{{ title }}</text>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import TheSwiper, { SwiperItems } from "@/components/TheSwiper.vue";
// import { CSwiper } from "@/components/c-swiper/c-swiper.vue"; // 导入组件

let title = ref("Hello world!");

const swiperItems: SwiperItems = [
  {
    img: "https://z3.ax1x.com/2021/11/13/Iy3E9J.jpg",
    title: "欢迎关注云小洛公众号",
    subTitle: "更多好玩有趣的功能都在这里熬~",
    url: "https://mp.weixin.qq.com/s/7E8epgm4YFf2yZCsI5_ZPA",
  },
  {
    img:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn11%2F440%2Fw744h496%2F20181030%2F97c2-hnaivxq7344712.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914829&t=52a970d21d4898c8e7ca21b8b5aa9312",
    title: "旺旺",
    subTitle: "xxx",
    tip: "限时",
    url: "111",
  },
  {
    img:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11780621658%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619914935&t=7d98cfe6b5a2634598fc7bda871aa7c9",
    title: "喵喵喵",
    subTitle: "123132",
    tip: "进口",
    url: "111",
  },
];

onShow(async () => {
  console.log("App Show");

  uni.showToast({
    title: "测试弹窗",
    icon: "none",
    duration: 2000,
    // mask: true,
  });
});
</script>

<style lang="pcss">
.index {
  @apply pt-[45vh];
}
</style>
