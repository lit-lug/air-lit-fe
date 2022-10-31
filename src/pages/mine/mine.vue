<script setup lang="ts">
const { showNotify, showToast, showMsg } = usePageStore();
const gologin = () => {
  uni.navigateTo({ url: "/pages/login/login" });
};

onReady(() => {});

onShow(() => {});

onPullDownRefresh(() => {
  showMsg({ type: "success", message: "success" });

  //
  uni.stopPullDownRefresh();
});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>我的</template>

    <div class="p-6" flex="~ col gap2" justify-center>
      <UButton
        type="error"
        class="w-full"
        @click="showNotify({ type: 'error', message: 'error' })"
      >
        Show Error Notify
      </UButton>
      <UButton
        type="primary"
        class="w-full"
        @click="showNotify({ type: 'primary', message: 'primary' })"
      >
        Show Primary Notify
      </UButton>
      <UButton bg="bg-orange" class="w-full" icon="i-carbon-notification">
        Custom Button
      </UButton>
      <!-- 跳转登陆页 -->
      <UButton type="primary" class="w-full" @click="gologin"> 登陆 </UButton>
    </div>
    <div class="bg-base-second m-6 rounded-lg p-6 border-base">
      <div class="text-center">
        abcdefghijklmnopqrstuvwxyz
        <div class="color-base-second" text="red right" p-2>1234567890</div>
      </div>
    </div>
    <div class="p-6">
      <UButton type="default" @click="showToast({ type: 'default', message: 'error' })">
        Show Toast
      </UButton>
    </div>
  </UBasePage>
</template>

<style scoped></style>
