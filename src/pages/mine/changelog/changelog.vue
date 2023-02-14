<script setup lang="ts">
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html.vue";

import changelog from "~/static/changelog.md?raw";

onLaunch(() => {});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>更新日志</template>

    <!-- <div
      class="overflow-hidden flex flex-col pt-2 pb-4 px-2 m-3 dark:bg-dark bg-white justify-center items-start rounded-lg shadow-sm"
    > -->
    <mpHtml
      :content="changelog"
      class="text-sm"
      markdown
      selectable
      container-style="white-space:wrap;padding:30rpx;overflow:hidden;"
      >加载中...</mpHtml
    >
    <!-- </div> -->
  </UBasePage>
</template>
