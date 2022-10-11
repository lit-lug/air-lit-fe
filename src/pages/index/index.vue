<script lang="ts" setup>
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmCarousel from "@/tmui/components/tm-carousel/tm-carousel.vue";

import TabBar from "@/components/TheTabBar.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import { onChangeDark, isDark, FixNavigationBarColor } from "@/common/util";

import { language } from "@/tmui/tool/lib/language";
import { ref } from "vue";

const listimg = [
  "https://picsum.photos/200/300?id=43335",
  "https://picsum.photos/200/300?id=433",
  "https://picsum.photos/200/300?id=439",
  "https://picsum.photos/200/300?id=459",
];

// 修复小程序tab切换状态栏颜色跟随
const currentThemeIsDark = ref(isDark());

const fixNavigationBar = async () => {
  const themeIsDark = isDark();
  if (currentThemeIsDark.value !== themeIsDark) {
    FixNavigationBarColor();
    currentThemeIsDark.value = themeIsDark;
  }
};

onShow(async () => {
  // 修复小程序tab切换状态栏颜色跟随
  FixNavigationBarColor();
});

onPullDownRefresh(async () => {
  console.log("下拉刷新");

  uni.stopPullDownRefresh();
});
</script>

<template>
  <tm-app ref="app">
    <tm-navbar :title="language('index.nav.title')" hideHome hideBack blur>
      <template v-slot:left>
        <tm-icon
          _class="pl-20"
          @click="onChangeDark"
          :font-size="32"
          :name="isDark() ? 'tmicon-md-moon' : 'tmicon-ios-sunny'"
        ></tm-icon>
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

    <tab-bar :active="0"></tab-bar>
  </tm-app>
</template>
