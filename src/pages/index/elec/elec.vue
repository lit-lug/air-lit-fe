<script setup lang="ts">
import UTab from "~/components/UTab/UTab.vue";

const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->

    <template v-slot:navContent>宿舍用电</template>

    <template v-if="deviceType !== 'pc'" v-slot:navExtra>
      <UTab></UTab>
    </template>

    <UTab v-if="deviceType == 'pc'"></UTab>

    <div :class="deviceType == 'pc' ? '' : 'pt-80rpx'">
      <UResult></UResult>
      <UResult></UResult>
      <UResult></UResult>
      <UResult></UResult>
      <UResult></UResult>
    </div>

    <!-- 内容区 -->
  </UBasePage>
</template>
