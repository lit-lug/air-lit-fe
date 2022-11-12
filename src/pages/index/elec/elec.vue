<script setup lang="ts">
import UTab from "~/components/UTab/UTab.vue";
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->

    <template v-slot:navContent>宿舍用电</template>

    <template v-slot:navExtra> </template>

    <UTab></UTab>

    <div class="pt-80rpx">
      <UResult></UResult>
    </div>

    <!-- 内容区 -->
  </UBasePage>
</template>
