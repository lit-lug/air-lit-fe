<script lang="ts" setup>
import { onLaunch, onShow, onHide, onThemeChange } from "@dcloudio/uni-app";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
const tmStore = useTmpiniaStore();

// const mainStore = useMainStore();

const systemInfo: any = uni.getSystemInfoSync();

onLaunch(() => {
  // #ifdef H5
  uni.hideTabBar({});
  // #endif

  /**
   * 设置主题，用户配置优先
   */
  if (["light", "dark"].includes(uni.getStorageSync("theme"))) {
    tmStore.setTmVuetifyDark(uni.getStorageSync("theme") === "dark");
  } else if (["light", "dark"].includes(systemInfo.theme)) {
    tmStore.setTmVuetifyDark(systemInfo.theme === "dark");
  } else {
    tmStore.setTmVuetifyDark(false);
  }
});

onThemeChange((res: any) => {
  if (["light", "dark"].includes(res.theme)) {
    tmStore.setTmVuetifyDark(res.theme === "dark");
  }
});

onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="css">
/* #ifdef APP-NVUE */
@import "./tmui/scss/nvue.css";
/* #endif */
/* #ifndef APP-NVUE */
@import "./tmui/scss/noNvue.css";
/* #endif */
</style>
