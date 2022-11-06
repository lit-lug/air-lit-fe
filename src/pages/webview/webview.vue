<script lang="ts" setup>
const props = defineProps({
  url: {
    type: String,
    required: false,
    default:
      "https://mp.weixin.qq.com/s?__biz=Mzg3NDg1OTAxMQ==&mid=2247483861&idx=1&sn=714197dd2a15d1b49ee379e72c934db0&source=41#wechat_redirect",
  },
});
const realUrl = computed(() => {
  return decodeURIComponent(props.url);
});
onLoad(() => {
  // #ifdef H5
  window.open(realUrl.value, "_blank");
  uni.navigateBack({});
  // #endif

  uni.setNavigationBarTitle({
    title: "详情",
  });
});
</script>

<template>
  <UBasePage>
    <web-view :src="props.url"></web-view>
  </UBasePage>
</template>
