<script lang="ts" setup>
import { onLaunch, onShow, onHide, onThemeChange } from "@dcloudio/uni-app";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { useAppStore } from "./store/app";
import { storeToRefs } from "pinia";

const tmStore = useTmpiniaStore();

const { statusBarHeight, menuButtonBounding } = storeToRefs(useAppStore());

const systemInfo: any = uni.getSystemInfoSync();

onLaunch(() => {
  // #ifdef MP-WEIXIN || MP-QQ
  // the systemInfo.theme is only support dark mode in WeChat and QQ
  statusBarHeight.value = systemInfo!.statusBarHeight || 44;
  menuButtonBounding.value = uni.getMenuButtonBoundingClientRect();
  // uni.onThemeChange(
  //   (res: UniApp.OnThemeChangeCallbackResult) => (darkMode.value = res.theme === "dark")
  // );
  // #endif

  // #ifdef H5

  // 隐藏原生标题栏
  uni.hideTabBar({});

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
  // The data is obtained from iPhone13 miniprogram but statusBarHeight, top and bottom values are subtracted from the statusBarHeight value
  statusBarHeight.value = 0;
  menuButtonBounding.value = {
    width: 87,
    height: 32,
    left: 281,
    top: 4,
    right: 368,
    bottom: 56,
  };
  // #endif

  console.log(statusBarHeight.value, menuButtonBounding.value);

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
