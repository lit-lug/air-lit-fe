<script setup lang="ts">
const appStore = useAppStore();
const { isAuth, userInfo } = storeToRefs(appStore);

const checked = ref(false);

const checked2 = ref(true);

const subOA = () => {
  uni.navigateTo({
    url: "/pages/webview/webview",
  });
};

onLaunch(() => {});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>公众号配置</template>

    <div
      v-if="userInfo.is_sub_oa"
      class="overflow-hidden flex flex-col p-2 m-3 dark:bg-dark bg-white rounded-lg shadow-sm"
    >
      <div class="flex flex-row justify-between p-2 items-center">
        <div class="flex flex-col justify-center items-start">
          <div>每日课表推送</div>
          <div class="text-sm text-gray-5">xxxxx</div>
        </div>
        <div>
          <ASwitch size="small" type="info" v-model="checked"></ASwitch>
        </div>
      </div>
      <div class="flex flex-row justify-between p-2 items-center">
        <div class="flex flex-col justify-center items-start">
          <div>每日电费推送</div>
          <div class="text-sm text-gray-5">xxxxx</div>
        </div>

        <div>
          <ASwitch size="small" type="info" v-model="checked2"></ASwitch>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col w-full h-60 justify-center items-center">
      <div class="flex flex-row gap-2 text-gray-5 p-2 pb-5 mb-5 items-center">
        请关注
        <div text="blue-5 xl" font="bold">云小洛</div>
        同名
        <div text="blue-5 xl" font="bold">公众号</div>
        后再进行配置
      </div>
      <div
        class="bg-blue-5/10 dark:bg-blue-5/20 p-2 m-2 rounded-lg text-blue-5 text-30rpx"
        hover-class="opacity-50"
        @click="subOA"
      >
        点我关注
      </div>
    </div>
  </UBasePage>
</template>
