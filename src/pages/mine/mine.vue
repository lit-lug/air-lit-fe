<script lang="ts" setup>
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmCarousel from "@/tmui/components/tm-carousel/tm-carousel.vue";

import tmText from "@/tmui/components/tm-text/tm-text.vue";

import TabBar from "@/components/TheTabBar.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import { onChangeDark, IsDark } from "@/common/util";

const listimg = [
  "https://picsum.photos/200/300?id=43335",
  "https://picsum.photos/200/300?id=433",
  "https://picsum.photos/200/300?id=439",
  "https://picsum.photos/200/300?id=459",
];

const test = () => {
  uni.navigateTo({
    url: "/pages/mine/account/account",
  });
};

onShow(async () => {
  // const info = await getUserInfo();

  // console.log(info);

  uni.showToast({
    title: "测试弹窗",
    icon: "none",
    duration: 2000,
    // mask: true,
  });
});

onPullDownRefresh(async () => {
  console.log("下拉刷新");

  uni.stopPullDownRefresh();
});
</script>

<template>
  <tm-app ref="app">
    <tm-navbar title="我的" hideHome blur>
      <template v-slot:left>
        <tm-icon
          @click="onChangeDark"
          :font-size="40"
          :name="IsDark() ? 'tmicon-md-moon' : 'tmicon-ios-sunny'"
        ></tm-icon>
      </template>
    </tm-navbar>

    <!-- <tm-carousel
      autoplay
      :margin="[0, 16]"
      :round="3"
      :width="686"
      :height="300"
      :list="listimg"
      >测试</tm-carousel
    > -->

    <tm-text @click="test" label="test123"> </tm-text>

    <tab-bar :active="2"></tab-bar>
  </tm-app>
</template>

<style lang="less" scoped></style>
