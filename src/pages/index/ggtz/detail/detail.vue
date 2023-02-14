<script setup lang="ts">
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html.vue";
import { GetGGTZDetail } from "~/common/api";

// 页面参数
const props = defineProps({
  path: {
    type: String,
    required: false,
    default: "/",
  },
  title: {
    type: String,
    required: false,
    default: "详情",
  },
});

const content = ref("加载中...");

const onLoadError = (e: any) => {
  console.log(e);
  content.value = `啊哦~ 渲染失败了\n\n尝试手动点击链接复制至浏览器查看: [链接](https://https://www.lit.edu.cn/jwc/${props.path})`;
};

const bindready = (e: any) => {
  console.log(e);
};

onReady(async () => {
  const { data: res } = await GetGGTZDetail({
    post_path: props.path,
  });

  console.log(res);

  content.value = res.content;
});

onPullDownRefresh(async () => {
  const { data: res } = await GetGGTZDetail({
    post_path: props.path,
  });

  console.log(res);

  content.value = res.content;

  uni.stopPullDownRefresh();
});

onLaunch(() => {});

// 渲染层错误处理
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>{{ props.title }}</template>

    <mpHtml
      :content="content"
      class="text-sm"
      markdown
      selectable
      @ready="bindready"
      container-style="white-space:wrap;padding:30rpx;overflow:hidden;"
      >加载中...</mpHtml
    >
  </UBasePage>
</template>
