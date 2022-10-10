<script lang="ts" setup>
import { onLaunch, onShow, onHide, onThemeChange } from "@dcloudio/uni-app";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { storeToRefs } from "pinia";
import { useAppStore } from "./store/app";
import { GetStatus, GetUserInfo } from "./common/api";
import { useCourseStore } from "./store/course";

const courseStore = useCourseStore();

const tmStore = useTmpiniaStore();

const systemInfo = uni.getSystemInfoSync();

const appStore = useAppStore();

const { isAuth } = storeToRefs(appStore);
const { startDate } = storeToRefs(courseStore);

onLaunch(async (res) => {
  // 初始化时间
  courseStore.setStartDay(startDate.value);

  uni.hideTabBar({
    animation: true,
  });

  // #ifdef H5
  // 隐藏原生标题栏

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

  // 设置开学时间
  const { data: status } = await GetStatus();
  if (status) {
    courseStore.setStartDay(status.time);
  }

  // #ifdef MP-WEIXIN

  if (!isAuth.value) {
    if (res.path != "pages/mine/account/account") {
      uni.navigateTo({
        url: "/pages/mine/account/account?back=true",
      });
    }
    return;
  }

  // 更新用户认证信息
  const { data: authInfo } = await GetUserInfo();
  if (authInfo) {
    // 同步用户信息
    appStore.setUserInfo(authInfo);
  }

  // #endif
});

onThemeChange((res) => {
  if (["light", "dark"].includes(res.theme)) {
    tmStore.setTmVuetifyDark(res.theme === "dark");
  }
});

onShow(async () => {});
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
