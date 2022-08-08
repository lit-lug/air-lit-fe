<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
// import { useStore } from "@/store";
import { getUserInfo } from "@/common/api";

import tmApp from "../../tmui/components/tm-app/tm-app.vue";
import tmButton from "../../tmui/components/tm-button/tm-button.vue";

import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
const Store = useTmpiniaStore();

// const store = useStore();

onShow(async () => {
  console.log("App Show");

  const info = await getUserInfo();

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

  <tm-app>
    <tm-button label="按钮" @click="Store.setTmVuetifyDark(true)"></tm-button>
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
