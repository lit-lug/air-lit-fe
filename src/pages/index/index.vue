<script setup lang="ts">
const { setPageConfig, showNotify, showToast } = usePageStore();

onReady(() => {});

onShow(() => {});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>时刻</template>

    <div>主页</div>
    <UButton
      type="error"
      class="w-full"
      @click="showNotify({ type: 'error', message: 'error' })"
    >
      Show Error Notify
    </UButton>
  </UBasePage>
</template>
