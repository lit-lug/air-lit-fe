<script setup lang="ts">
const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};

const props = withDefaults(
  defineProps<{
    title?: string;
    titleBarColor?: string;
    subTitle?: string;
    showIcon?: boolean;
  }>(),
  {
    title: "test",
    titleBarColor: "blue",
    subTitle: "90",
    showIcon: true,
  }
);
</script>

<template>
  <div
    class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm gap-2"
  >
    <!-- 标题 -->
    <div
      class="flex flex-row justify-between align-center items-center px-1 mx-1 gap-2 flex-nowrap"
      @click="toggle"
    >
      <div class="flex flex-row justify-center items-center gap-2 text-28rpx">
        <div
          class="bg-blue-5 w-1 h-5 rounded-lg"
          :style="{ backgroundColor: titleBarColor }"
        ></div>
        <div>{{ title }}</div>
      </div>
      <div
        class="flex flex-row justify-center items-center text-28rpx font-bold text-30rpx"
      >
        <div>{{ subTitle }}</div>
        <div
          class="i-carbon-chevron-down text-xl transition-transform transition-ease-in-out duration-300"
          :class="open ? 'rotate-to-180' : 'rotate-to-0'"
        ></div>
      </div>
    </div>

    <!-- 展开内容 -->

    <div v-show="open">
      <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-1"></div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.rotate-to-180 {
  transform: rotate(180deg);
}

.rotate-to-0 {
  transform: rotate(0deg);
}
</style>
