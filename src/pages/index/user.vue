<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "vue";
import { onShow } from "@dcloudio/uni-app";

import tmApp from "../../tmui/components/tm-app/tm-app.vue";

import tmCarousel from "@/tmui/components/tm-carousel/tm-carousel.vue";
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue";
import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
</script>

<template>
  <tm-app>
    <tm-navbar title="2">
      <template v-slot:right>
        <tm-icon name="tmicon-plus"></tm-icon>
      </template>
    </tm-navbar>

    <tm-sheet>
      <tm-text
        :font-size="24"
        _class="font-weight-b"
        label="卡片可以完全通过插槽自定义"
      ></tm-text>
    </tm-sheet>

    <tm-sheet>
      <tm-text label="点击中间+按钮可以体验异步加载动态效果."></tm-text>
    </tm-sheet>
    <tm-tabbar transprent blur :bottom="0" :auto-select="false" :active="2">
      <tm-tabbar-item
        activeColor="primary"
        count="HOT"
        blur
        transprent
        open-type="switchTab"
        url="/pages/index/home"
        text="时刻"
        icon="tmicon-collection-fill"
      ></tm-tabbar-item>
      <tm-tabbar-item
        activeColor="orange"
        url="/pages/index/schedule"
        text="课表"
        blur
        transprent
        open-type="switchTab"
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
        url="/pages/index/user"
        blur
        transprent
        text="图表中心"
        open-type="switchTab"
        unicon="tmicon-account"
        icon="tmicon-userplus-fill"
      ></tm-tabbar-item>
    </tm-tabbar>
  </tm-app>
</template>
