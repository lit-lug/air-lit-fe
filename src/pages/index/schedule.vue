<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "vue";
import { onShow } from "@dcloudio/uni-app";

import tmApp from "../../tmui/components/tm-app/tm-app.vue";

import tmCarousel from "@/tmui/components/tm-carousel/tm-carousel.vue";
import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import TabBar from "@/components/TheTabBar.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
</script>

<template>
  <tm-app>
    <tm-navbar title="1">
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
    <tab-bar :active="1"></tab-bar>
  </tm-app>
</template>
