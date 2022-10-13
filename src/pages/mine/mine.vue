<script lang="ts" setup>
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";

import TabBar from "@/components/TheTabBar.vue";

import tmCell from "@/tmui/components/tm-cell/tm-cell.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";

import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import { onChangeDark, isDark, FixNavigationBarColor } from "@/common/util";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

import { language } from "@/tmui/tool/lib/language";
import { GetUserInfo, GetIdenticonUrl } from "@/common/api";
import { ref } from "vue";

const appStore = useAppStore();

const { token, isAuth, userInfo, languageType } = storeToRefs(appStore);

onShow(async () => {
  // 修复小程序tab切换状态栏颜色跟随
  FixNavigationBarColor();

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

const switchLanguage = () => {
  appStore.setLanguageType(languageType.value == "zh-Hans" ? "en" : "zh");
};
</script>

<template>
  <tm-app ref="app">
    <tm-navbar :title="language('mine.nav.title')" hideHome hideBack blur>
      <template v-slot:left>
        <tm-icon
          _class="pl-20"
          @click="onChangeDark"
          :font-size="32"
          :_style="{
            transform: isDark() ? 'rotate(360deg)' : 'rotate(0deg)',
            transitionDuration: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }"
          :name="isDark() ? 'tmicon-md-moon' : 'tmicon-ios-sunny'"
        ></tm-icon>
      </template>
    </tm-navbar>

    <tm-sheet :round="4" :margin="[32, 16]" :padding="[12, 15]">
      <tm-cell
        showAvatar
        :avatar="GetIdenticonUrl(userInfo.is_bind_sec ? userInfo.sec_info?.card_id as string : 'dear')"
        :rightText="
          userInfo.is_bind_sec
            ? 'ID: ' + userInfo.sec_info?.card_id
            : language('mine.tab.needBind')
        "
        rightIcon=""
        :margin="[0, 0]"
        :titleFontSize="34"
        :rightTextSize="30"
        :avatarSize="120"
        :avatarRound="20"
        :title="
          userInfo.is_bind_sec ? userInfo.sec_info?.name : language('mine.cell.guest')
        "
      >
      </tm-cell>
    </tm-sheet>

    <tm-sheet :round="4" :margin="[32, 16]" :padding="[12, 15]">
      <tm-cell
        :margin="[0, 0]"
        :titleFontSize="30"
        :title="language('mine.cell.account')"
        url="/pages/mine/account/account"
      >
      </tm-cell>

      <tm-cell :margin="[0, 0]" :titleFontSize="30">
        <template v-slot:title>
          <view class="flex flex-row flex-row-center-start">
            <tm-icon
              transprent
              _class="pr-10"
              :font-size="34"
              name="tmicon-md-heart-empty"
            ></tm-icon>
            <tm-text _class="pl-10" :label="language('mine.cell.setting')"> </tm-text>
          </view>
        </template>
      </tm-cell>
    </tm-sheet>

    <tm-sheet :round="4" :margin="[32, 16]" :padding="[12, 15]">
      <tm-cell
        :margin="[0, 0]"
        :titleFontSize="30"
        :title="language('mine.cell.lang')"
        @click="switchLanguage"
        :rightText="language('language')"
        rightIcon=""
      >
      </tm-cell>

      <tm-cell
        :margin="[0, 0]"
        :titleFontSize="30"
        :title="language('mine.cell.changelog')"
      >
      </tm-cell>

      <tm-cell :margin="[0, 0]" :titleFontSize="30" :title="language('mine.cell.about')">
      </tm-cell>
    </tm-sheet>

    <tab-bar :active="2"></tab-bar>
  </tm-app>
</template>
