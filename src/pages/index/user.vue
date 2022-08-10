<script lang="ts" setup>
import tmApp from "../../tmui/components/tm-app/tm-app.vue";

import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import TabBar from "@/components/TheTabBar.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";

import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { ref } from "vue";

const app = ref<InstanceType<typeof tmApp> | null>(null);

const tmStore = useTmpiniaStore();

function onChangeDark() {
  app.value?.setDark();
}
</script>

<template>
  <tm-app ref="app">
    <tm-navbar title="我的" hideHome blur>
      <template v-slot:left>
        <view class="flex flex-center flex-row">
          <tm-icon
            @click="onChangeDark"
            :font-size="36"
            :name="tmStore.tmStore.dark ? 'tmicon-md-moon' : 'tmicon-ios-sunny'"
          ></tm-icon>
        </view>
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

    <tab-bar :active="2"></tab-bar>
  </tm-app>
</template>
