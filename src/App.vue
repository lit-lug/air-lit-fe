<script lang="ts" setup>
import { onLaunch, onShow, onHide, onThemeChange } from "@dcloudio/uni-app";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";

const tmStore = useTmpiniaStore();

const systemInfo: any = uni.getSystemInfoSync();

onLaunch(() => {
  // 隐藏原生标题栏
  uni.hideTabBar({});

  // #ifdef H5

  // 页面大小改变刷新页面
  window.addEventListener("resize", () => {
    window.location.reload();
  });

  // 夜间模式监听
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  tmStore.setTmVuetifyDark(colorScheme.matches);
  colorScheme.addEventListener("change", (e: MediaQueryListEvent) =>
    tmStore.setTmVuetifyDark(e.matches)
  );
  // #endif

  /**
   * 设置主题，用户配置优先
   */
  if (["light", "dark"].includes(uni.getStorageSync("theme"))) {
    tmStore.setTmVuetifyDark(uni.getStorageSync("theme") === "dark");
  } else if (["light", "dark"].includes(systemInfo.theme as string)) {
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
