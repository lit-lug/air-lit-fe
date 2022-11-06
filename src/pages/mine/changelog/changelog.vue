<script setup lang="ts">
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html.vue";

import changelog from "~/static/changelog.md?raw";

onLaunch(() => {});

const html = ref(changelog);
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>更新日志</template>

    <div
      class="overflow-hidden flex flex-col pt-2 pb-4 px-2 m-3 dark:bg-dark bg-white justify-center items-start rounded-lg shadow-sm"
    >
      <mpHtml
        :content="html"
        markdown
        selectable
        container-style="white-space:nowrap;padding-left:30rpx;padding-right:30rpx;padding-top:30rpx;overflow:hidden;"
        >加载中...</mpHtml
      >
    </div>
  </UBasePage>
</template>
