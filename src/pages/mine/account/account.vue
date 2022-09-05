<script lang="ts" setup async>
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";
import { onShow } from "@dcloudio/uni-app";

import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

import tmMessage from "@/tmui/components/tm-message/tm-message.vue";
import { WeAppAuth } from "@/common/api";

const appStore = useAppStore();

const { isAuth, userInfo } = storeToRefs(appStore);

const props = defineProps({
  back: {
    type: Boolean,
    default: false,
  },
});

// #ifdef MP-WEIXIN
const weAppAuth = async () => {
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
  }
};
// #endif

onShow(async () => {
  // #ifdef MP-WEIXIN
  weAppAuth();
  // #endif

  if (props.back) {
    uni.navigateBack({});
  }
});
</script>

<template>
  <tm-app ref="app">
    <tm-navbar title="账户管理" blur> </tm-navbar>

    <tm-sheet :v-if="isAuth">
      <tm-text
        :font-size="24"
        _class="font-weight-b"
        :label="userInfo.sec_info?.name"
      ></tm-text>
    </tm-sheet>

    <tm-sheet>
      <tm-text label="点击中间+按钮可以体验异步加载动态效果."></tm-text>
    </tm-sheet>

    <tm-message ref="msg"></tm-message>
  </tm-app>
</template>
