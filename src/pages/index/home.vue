<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
// import { useStore } from "@/store";
import { getUserInfo } from "@/common/api";

import tmApp from "../../tmui/components/tm-app/tm-app.vue";
import tmButton from "../../tmui/components/tm-button/tm-button.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue";
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";

// const store = useStore();

import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
const Store = useTmpiniaStore();

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
  <!-- 
  <tm-app>
    <tm-button label="按钮" @click="Store.setTmVuetifyDark(true)"></tm-button>
  </tm-app> -->

  <tm-app>
    <tm-navbar title="标题导航栏" color="primary" linear="right" linearDeep="accent">
      <template v-slot:right>
        <tm-icon name="tmicon-plus"></tm-icon>
      </template>
    </tm-navbar>

    <tm-sheet>
      <tm-text label="点击中间+按钮可以体验异步加载动态效果."></tm-text>
    </tm-sheet>
    <tm-tabbar>
      <tm-tabbar-item
        activeColor="orange"
        count="HOT"
        open-type="reLaunch"
        url="/pages/index/index"
        text="首页"
        icon="tmicon-collection-fill"
      ></tm-tabbar-item>
      <tm-tabbar-item
        activeColor="orange"
        url="/pages/form/index"
        text="表单"
        icon="tmicon-cog-fill"
      ></tm-tabbar-item>
      <!-- <tm-tabbar-item
        :shadow="2"
        :data="'中间项'"
        btn-top
        fontColor="white"
        activeColor="white"
        linear="top"
        linearDeep="accent"
        color="yellow"
        icon="tmicon-plus"
      ></tm-tabbar-item> -->
      <!-- <tm-tabbar-item
        activeColor="orange"
        url="/pages/fankui/index"
        text="反馈分类"
        unicon="tmicon-like"
        icon="tmicon-heart-fill"
      ></tm-tabbar-item> -->
      <tm-tabbar-item
        activeColor="orange"
        :count="8"
        url="/pages/chart/index"
        active
        text="图表中心"
        unicon="tmicon-account"
        icon="tmicon-userplus-fill"
      ></tm-tabbar-item>
    </tm-tabbar>
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
