<script setup lang="ts">
const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};
</script>

<template>
  <div
    class="flex flex-col justify-center p-2 m-3 dark:bg-dark bg-white rounded-lg shadow shadow-sm gap-2"
  >
    <!-- 标题 -->
    <div class="flex flex-row justify-between items-center px-1 mx-1" @click="toggle">
      <div class="font-bold flex flex-row justify-center items-center gap-2">
        <div
          class="bg-blue-5 w-1 h-5 rounded-lg"
          :style="{ backgroundColor: 'blue' }"
        ></div>
        <div>测试</div>
      </div>
      <div class="font-bold flex flex-row justify-center items-center">
        <div>90</div>
        <div
          class="i-carbon-chevron-down text-xl transition-transform duration-200"
          :class="open ? 'rotate-to-180' : 'rotate-to-0'"
        ></div>
      </div>
    </div>

    <!-- 展开内容 -->

    <div v-if="open" class="transition-all duration-300 ease-in-out">
      <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-1"></div>

      <div
        class="flex flex-row justify-between items-center px-1 mx-1 text-gray-5 dark:text-gray-3"
      >
        <div>xxx</div>
        <div>xxx</div>
      </div>
    </div>
  </div>
</template>
