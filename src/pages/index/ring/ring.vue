<script setup lang="ts">
import { GetRing } from "~/common/api";

onReady(async () => {
  const { data: res } = await GetRing();
  console.log(res);
});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>实践环节</template>
  </UBasePage>
</template>
