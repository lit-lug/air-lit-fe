<script setup lang="ts">
const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const defaultSubMsg = deviceType.value !== "pc" ? "下拉刷新" : "双击标题栏刷新";

withDefaults(
  defineProps<{
    type?: "default" | "error" | "loading";
    msg?: string;
    subMsg?: string;
  }>(),
  {
    type: () => "default",
  }
);
</script>

<template>
  <div class="flex flex-col pt-20 justify-center items-center">
    <div class="flex bg-blue-5/20 w-30 h-30 rounded-full justify-center items-center">
      <text class="text-5xl text-blue-6 airIcon-shiliangzhinengduixiang-"></text>
    </div>
    <text class="font-bold p-4"> {{ msg ? msg : "暂无数据" }}</text>
    <text class="text-sm text-gray-5 dark:text-gray-3">{{
      subMsg ? subMsg : defaultSubMsg
    }}</text>
  </div>
</template>
