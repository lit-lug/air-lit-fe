<script setup lang="ts">
const { setPageConfig, showNotify, showToast } = usePageStore();

onReady(() => {
  setPageConfig({
    pageTitle: "主页",
  });
});

onShow(() => {
  setPageConfig({
    pageTitle: "主页",
  });
});
</script>

<template>
  <UBasePage>
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
