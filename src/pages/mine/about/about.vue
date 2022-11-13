<script setup lang="ts">
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html.vue";

import about from "~/static/about.md?raw";

onLaunch(() => {});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>关于我们</template>

    <div
      class="overflow-hidden flex flex-col pt-2 pb-4 px-2 m-3 dark:bg-dark bg-white justify-center items-start rounded-lg shadow-sm"
    >
      <mpHtml
        :content="about"
        class="text-sm"
        markdown
        selectable
        container-style="white-space:wrap;padding:30rpx;overflow:hidden;"
        >加载中...</mpHtml
      >
    </div>

    <!-- Copyright  -->

    <div class="fixed bottom-0 left-0 items-center w-full pb-2">
      <div
        class="flex justify-center items-center text-24rpx text-gray-5 dark:text-warmGray"
      >
        Copyright @ 2021 - {{ new Date().getFullYear() }} AIR LIT (云小洛)
      </div>
    </div>
  </UBasePage>
</template>
