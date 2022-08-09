<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
// import { useStore } from "@/store";
import { getUserInfo } from "@/common/api";

import tmApp from "../../tmui/components/tm-app/tm-app.vue";

import tmCarousel from "@/tmui/components/tm-carousel/tm-carousel.vue";
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";
import TabBar from "@/components/TheTabBar.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";

// const store = useStore();

import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
const Store = useTmpiniaStore();

const listimg = [
  "https://picsum.photos/200/300?id=43335",
  "https://picsum.photos/200/300?id=433",
  "https://picsum.photos/200/300?id=439",
  "https://picsum.photos/200/300?id=459",
];

onShow(async () => {
  console.log("App Show");

  const info = await getUserInfo();

  Store.setTmVuetifyDark(false);

  console.log(info);

  uni.showToast({
    title: "测试弹窗",
    icon: "none",
    duration: 2000,
    // mask: true,
  });
});
</script>

<template>
  <!-- <page-meta :page-style="pageStyle" />

  <the-nav-bar title="时刻" :back="false" :filter="false" :bg="true"> </the-nav-bar> -->
  <!-- 
  <tm-app>
    <tm-button label="按钮" @click="Store.setTmVuetifyDark(true)"></tm-button>
  </tm-app> -->

  <tm-app>
    <tm-navbar title="标题导航栏">
      <template v-slot:right>
        <tm-icon name="tmicon-plus"></tm-icon>
      </template>
    </tm-navbar>

    <tm-carousel
      autoplay
      :margin="[0, 16]"
      :round="3"
      :width="686"
      :height="300"
      :list="listimg"
      >测试</tm-carousel
    >

    <tm-sheet>
      <tm-text
        :font-size="24"
        _class="font-weight-b"
        label="卡片可以完全通过插槽自定义"
      ></tm-text>
    </tm-sheet>

    <tab-bar :active="0"></tab-bar>
  </tm-app>

  <!-- <view class="home fixed-top fixed-bottom">
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
  </view> -->
</template>

<style lang="less" scoped></style>
