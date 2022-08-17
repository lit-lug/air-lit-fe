<script lang="ts" setup>
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
</script>

<template>
  <tm-app ref="app">
    <tm-navbar title="账户管理" blur> </tm-navbar>

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
  </tm-app>
</template>
