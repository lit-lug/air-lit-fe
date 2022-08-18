<script lang="ts" setup async>
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import { onShow } from "@dcloudio/uni-app";

import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

import tmMessage from "@/tmui/components/tm-message/tm-message.vue";
import { ref } from "vue";
import { WeAppAuth } from "@/common/api";

const appStore = useAppStore();

const { isAuth, userInfo } = storeToRefs(appStore);

const props = defineProps<{
  back: boolean;
}>();

onShow(async () => {});
</script>

<template>
  <tm-app ref="app">
    <tm-navbar title="成绩" blur> </tm-navbar>

    <tm-sheet :v-if="isAuth">
      <tm-text
        :font-size="24"
        _class="font-weight-b"
        :label="userInfo.sec_info?.name"
      ></tm-text>
    </tm-sheet>

    <tm-sheet>
      <tm-text label="点击中间+按钮可以体验异步加载动态效果."></tm-text>
    </tm-sheet>

    <tm-message ref="msg"></tm-message>
  </tm-app>
</template>
