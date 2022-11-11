<script setup lang="ts">
import UTab from "~/components/UTab/UTab.vue";
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <UTab></UTab>

    <template v-slot:navContent :scroll="false" :tabs="['全部', '进行中', '已完成']"
      >宿舍用电</template
    >

    <UResult></UResult>
  </UBasePage>
</template>
