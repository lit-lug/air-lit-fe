<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { computed } from "vue";
import TheNavBar from "@/components/TheNavBar.vue";
import TheSwiper, { SwiperItems } from "@/components/TheSwiper.vue";
import { useStore } from "@/store";

const store = useStore();
const pageStyle = computed(() => store.getPageMetaStyle);

// const title = ref("夜间模式");

const themeDark = computed(() => store.themeConfig.theme === "dark");

function themeChange(e: any) {
  console.log(e);
  if (e.detail.value) {
    store.setTheme("dark");
  } else {
    store.setTheme("light");
  }
}

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

<template>
  <page-meta :page-style="pageStyle" />

  <the-nav-bar title="时刻" :back="false" :filter="false" :bg="true"> </the-nav-bar>

  <view class="home fixed-top fixed-bottom">
    <view class="home-banner">
      <the-swiper :swiperItems="swiperItems"> </the-swiper
    ></view>

    <view class="title">夜间模式</view>
    <switch
      class="setting-switch-btn"
      color="#3e8cd7"
      @change="themeChange"
      :checked="themeDark"
    />
  </view>
</template>

<style lang="less" scoped>
.home {
  // 两边距
  --page-spacing: 32rpx;
  width: 100%;
  min-height: calc(100vh - var(--window-bottom));
  background: var(--theme-background-color);
  overflow: hidden;

  .home-banner {
    background: linear-gradient(
      var(--theme-background-color-card),
      var(--theme-background-color-card)
    );
    overflow: hidden;
  }

  .title {
    width: 100%;
    height: 96rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--theme-text-title-color);
  }
}
</style>
