<script setup lang="ts">
const { showNotify } = usePageStore();

onReady(() => {});

onShow(() => {});

function btnClick() {
  uni.navigateTo({
    url: "/pages/pl/pl",
    animationType: "auto",
    animationDuration: 500,
  });
}
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>时刻</template>

    <div>主页</div>
    <UButton type="error" class="w-full" @click="btnClick"> Show Error Notify </UButton>
  </UBasePage>
</template>
