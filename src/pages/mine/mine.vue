<script lang="ts" setup>
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmText from "@/tmui/components/tm-text/tm-text.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";

import TabBar from "@/components/TheTabBar.vue";

import tmCell from "@/tmui/components/tm-cell/tm-cell.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import { onChangeDark, IsDark } from "@/common/util";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

import { language } from "@/tmui/tool/lib/language";
import { GetUserInfo } from "@/common/api";

const appStore = useAppStore();

const { token, userInfo } = storeToRefs(appStore);

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
  // 更新用户认证信息
  const { data: authInfo } = await GetUserInfo();
  if (!authInfo) {
    return;
  }
  // 同步用户信息
  appStore.setUserInfo(authInfo);
});

onPullDownRefresh(async () => {
  console.log("下拉刷新");

  // 更新用户认证信息
  const { data: authInfo } = await GetUserInfo(true);
  if (!authInfo) {
    return;
  }
  // 同步用户信息
  appStore.setUserInfo(authInfo);

  uni.stopPullDownRefresh();
});
</script>

<template>
  <tm-app ref="app">
    <tm-navbar :title="language('mine.nav.title')" hideHome blur>
      <template v-slot:left>
        <tm-icon
          @click="onChangeDark"
          :font-size="40"
          :name="IsDark() ? 'tmicon-md-moon' : 'tmicon-ios-sunny'"
        ></tm-icon>
      </template>
    </tm-navbar>

    <tm-sheet :round="4" :margin="[32, 16]" :padding="[0, 15]">
      <tm-cell
        showAvatar
        avatar="https://picsum.photos/200"
        rightText="ID: B19071121"
        rightIcon=""
        :margin="[0, 0]"
        :titleFontSize="32"
        :rightTextSize="30"
        :avatarSize="100"
        :avatarRound="20"
        title="游客"
      >
      </tm-cell>
    </tm-sheet>

    <tm-sheet :round="4" :margin="[32, 16]" :padding="[0, 15]">
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="账户管理"> </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="公众号设置"> </tm-cell>
    </tm-sheet>

    <tm-sheet :round="4" :margin="[32, 16]" :padding="[0, 15]">
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="语言切换"> </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="更新日志"> </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="关于我们"> </tm-cell>
    </tm-sheet>

    <!-- <view class="pt-30 mb-32 mx-32 round-6">
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="头像 Avatar"> </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="徽标 Badge"> </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="卡片 Card"> </tm-cell>
    </view> -->

    <!-- <tm-carousel
      autoplay
      :margin="[0, 16]"
      :round="3"
      :width="686"
      :height="300"
      :list="listimg"
      >测试</tm-carousel
    > -->

    <!-- <tm-text @click="test" :label="token"> </tm-text> -->

    <tab-bar :active="2"></tab-bar>
  </tm-app>
</template>

<style lang="less" scoped></style>
