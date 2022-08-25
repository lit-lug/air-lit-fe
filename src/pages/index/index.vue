<script lang="ts" setup>
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmCarousel from "@/tmui/components/tm-carousel/tm-carousel.vue";

import TabBar from "@/components/TheTabBar.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
// import { GetStatus, GetUserInfo, WeAppAuth } from "@/common/api";

import { onChangeDark, isDark } from "@/common/util";

import { language } from "@/tmui/tool/lib/language";

const appStore = useAppStore();

const { isAuth } = storeToRefs(appStore);

const listimg = [
  "https://picsum.photos/200/300?id=43335",
  "https://picsum.photos/200/300?id=433",
  "https://picsum.photos/200/300?id=439",
  "https://picsum.photos/200/300?id=459",
];

onShow(async () => {
  console.log("App Show");

  // const info = await getUserInfo();

  uni.showToast({
    title: language("message.load.text"),
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
  <!-- <page-meta :page-style="pageStyle" />

  <the-nav-bar title="时刻" :back="false" :filter="false" :bg="true"> </the-nav-bar> -->
  <!-- 
  <tm-app>
    <tm-button label="按钮" @click="Store.setTmVuetifyDark(true)"></tm-button>
  </tm-app> -->

  <tm-app ref="app">
    <tm-navbar :title="language('index.nav.title')" hideHome blur>
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

    <tm-sheet>
      <tm-text
        :font-size="24"
        _class="font-weight-b"
        :label="language('message.load.text')"
      ></tm-text>
    </tm-sheet>

    <tm-carousel
      autoplay
      :margin="[0, 16]"
      :round="3"
      :width="686"
      :height="300"
      :list="listimg"
    ></tm-carousel>

    <tm-carousel
      autoplay
      :margin="[0, 16]"
      :round="3"
      :width="686"
      :height="300"
      :list="listimg"
      >测试</tm-carousel
    >

    <tm-carousel
      autoplay
      :margin="[0, 16]"
      :round="3"
      :width="686"
      :height="300"
      :list="listimg"
      >测试</tm-carousel
    >

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
