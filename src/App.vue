<script lang="ts" setup>
import { onLaunch, onShow, onHide, onThemeChange } from "@dcloudio/uni-app";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { storeToRefs } from "pinia";
import { useAppStore } from "./store/app";
import { getUserInfo, WeAppAuth } from "./common/api";

const tmStore = useTmpiniaStore();

const systemInfo = uni.getSystemInfoSync();

const appStore = useAppStore();

const { isAuth } = storeToRefs(appStore);

onLaunch(async () => {
  console.log(isAuth.value);

  // #ifdef H5
  // 隐藏原生标题栏
  uni.hideTabBar({});

  // 夜间模式监听
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  tmStore.setTmVuetifyDark(colorScheme.matches);
  colorScheme.addEventListener("change", (e: MediaQueryListEvent) =>
    tmStore.setTmVuetifyDark(e.matches)
  );

  // 页面大小改变刷新页面
  window.addEventListener("resize", () => {
    window.location.reload();
  });

  // #endif

  /**
   * 设置主题，用户配置优先
   */
  // #ifdef MP-WEIXIN
  if (["light", "dark"].includes(uni.getStorageSync("theme"))) {
    tmStore.setTmVuetifyDark(uni.getStorageSync("theme") === "dark");
  } else if (["light", "dark"].includes(systemInfo.theme as string)) {
    tmStore.setTmVuetifyDark(systemInfo.theme === "dark");
  } else {
    tmStore.setTmVuetifyDark(false);
  }
  // #endif
});

onThemeChange((res) => {
  if (["light", "dark"].includes(res.theme)) {
    tmStore.setTmVuetifyDark(res.theme === "dark");
  }
});

onShow(async () => {
  if (!isAuth.value) {
    // 微信授权
    const res = ((await uni.login({
      provider: "weixin",
    })) as unknown) as UniApp.LoginRes;

    // 成功则获取用户信息
    if (!res.code) {
      return;
    }

    // 获取用户认证信息
    const { data: authInfo } = await WeAppAuth({ code: res.code });
    if (!authInfo) {
      return;
    }

    // 同步用户信息
    appStore.setToken(authInfo.token);
    appStore.setUserInfo(authInfo.user_info);

    return;
  }

  // 更新用户认证信息
  const { data: authInfo } = await getUserInfo();
  if (!authInfo) {
    return;
  }
  // 同步用户信息
  appStore.setUserInfo(authInfo);
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
