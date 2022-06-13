<script lang="ts" setup>
import { onLaunch, onShow, onHide, onThemeChange } from "@dcloudio/uni-app";
import { useStore as useMainStore } from "@/store";

const mainStore = useMainStore();

const systemInfo: any = uni.getSystemInfoSync();

onLaunch(() => {
  /**
   * 设置主题，用户配置优先
   */
  if (["light", "dark"].includes(uni.getStorageSync("theme"))) {
    mainStore.setTheme(uni.getStorageSync("theme"));
  } else if (["light", "dark"].includes(systemInfo.theme)) {
    mainStore.setTheme(systemInfo.theme);
  } else {
    mainStore.setTheme("light");
  }
});

onThemeChange((res: any) => {
  if (["light", "dark"].includes(res.theme)) {
    mainStore.setTheme(res.theme);
  }
});

onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="less">
page,
html,
body {
  // 自定义导航栏高度
  --nav-tab-height-custom: 70rpx;

  // tabbar高度
  --tabbar-height-custom: 50px;
  // --tabbar-height-custom: 0;

  // 播放器高度
  // --player-height-custom: 54px;

  font-family: open sans, Helvetica, Arial, sans-serif;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  page,
  html,
  body {
    background: #0e0e0e;
  }
}

.uni-app--showtabbar uni-page-wrapper::after {
  display: none;
}

::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

// 文字省略 单行
.text-ellipsis-single {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 文字省略 多行
.text-ellipsis-multi {
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.fixed-top {
  padding-top: calc(var(--status-bar-height) + var(--nav-tab-height-custom));
  box-sizing: border-box;
}

/* #ifdef H5 */
.fixed-bottom {
  // 底部占位
  padding-bottom: calc(var(--window-bottom) + var(--player-height-custom));
  box-sizing: border-box;
}
/* #endif */

/* #ifndef H5 */
.fixed-bottom {
  padding-bottom: calc(
    var(--window-bottom) + var(--player-height-custom) + constant(safe-area-inset-bottom)
  );
  padding-bottom: calc(
    var(--window-bottom) + var(--player-height-custom) + env(safe-area-inset-bottom)
  );
  box-sizing: border-box;
}
/* #endif */

.fixed-placeholder {
  width: 100%;
  background-color: transparent;
  height: calc(constant(safe-area-inset-bottom));
  height: calc(env(safe-area-inset-bottom));
}

// 隐形占位，用于observerAPI
.observer-placeholder {
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
}
</style>
