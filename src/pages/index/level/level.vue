<script setup lang="ts">
import { GetLevelScore } from "~/common/api";

onReady(async () => {
  const { data: res } = await GetLevelScore();
  console.log(res);
});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>等级成绩</template>
  </UBasePage>
</template>
