<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { computed } from "vue";

const props = defineProps({
  url: {
    type: String,
    required: false,
    default: "https://mp.weixin.qq.com/s/7E8epgm4YFf2yZCsI5_ZPA",
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
});
</script>

<template>
  <web-view :src="props.url"></web-view>
</template>
