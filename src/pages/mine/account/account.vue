<script lang="ts" setup async>
import tmApp from "@/tmui/components/tm-app/tm-app.vue";

import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";

import tmText from "@/tmui/components/tm-text/tm-text.vue";

import tmNavbar from "@/tmui/components/tm-navbar/tm-navbar.vue";

import tmResult from "@/tmui/components/tm-result/tm-result.vue";

import tmInput from "@/tmui/components/tm-input/tm-input.vue";

import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";

import tmButton from "@/tmui/components/tm-button/tm-button.vue";

import { onShow } from "@dcloudio/uni-app";

import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

import tmMessage from "@/tmui/components/tm-message/tm-message.vue";
import { WeAppAuth } from "@/common/api";
import { UpdateBaseInfo } from "@/common/util";

const appStore = useAppStore();

const { isAuth, userInfo } = storeToRefs(appStore);

const props = defineProps({
  back: {
    type: Boolean,
    default: false,
  },
});

const isNetworkError = ref(false);

const bindSecBtnLabel = ref("绑定");
const bindSecBtnLoading = ref(false);

const inputUsername = ref("");
const inputPassword = ref("");

const bindSecBtnDisabled = computed(() => {
  return inputUsername.value.length === 0 || inputPassword.value.length === 0;
});

// #ifdef MP-WEIXIN
const weAppAuth = async () => {
  // 微信授权
  const res = ((await uni.login({
    provider: "weixin",
  })) as unknown) as UniApp.LoginRes;

  // 成功则获取用户信息
  if (!res.code) {
    uni.showToast({
      title: "请检查网络后, 点击重试",
      icon: "error",
    });

    isNetworkError.value = true;
    return;
  }

  // 获取用户认证信息
  const { data: authInfo } = await WeAppAuth({ code: res.code });
  if (!authInfo) {
    isNetworkError.value = true;
    return;
  }

  isNetworkError.value = false;

  // 同步用户信息
  appStore.setToken(authInfo.token);
  appStore.setUserInfo(authInfo.user_info);
};
// #endif

onShow(async () => {
  // #ifdef MP-WEIXIN
  if (!isAuth.value) {
    await weAppAuth();
  } else {
    await UpdateBaseInfo();
  }
  // #endif

  if (props.back && isAuth.value) {
    console.log("back");
    uni.navigateBack({});
  }
});

onPullDownRefresh(async () => {
  if (!isAuth.value) {
    await weAppAuth();
  } else {
    await UpdateBaseInfo(true);
  }

  uni.stopPullDownRefresh();
});

//
const networkErrorBtnClick = async () => {
  await weAppAuth();

  // if (isAuth.value) {
  await UpdateBaseInfo();
  // }
};

const navBarbeforeBack = async (): Promise<boolean> => {
  if (isNetworkError.value) {
    uni.showToast({
      title: "请检查网络后, 点击重试",
      icon: "none",
    });
    return false;
  }

  return true;
};

const bindSecBtnClick = async () => {
  bindSecBtnLabel.value = "";

  bindSecBtnLoading.value = true;

  // #ifdef MP-WEIXIN
  await weAppAuth();
  // #endif

  bindSecBtnLoading.value = false;

  bindSecBtnLabel.value = "绑定";

  console.log("bindSecBtnClick", inputPassword.value, inputUsername.value);
};
</script>

<template>
  <tm-app ref="app">
    <tm-navbar title="账户管理" blur :beforeBack="navBarbeforeBack"> </tm-navbar>

    <view>
      <tm-sheet :round="4" :margin="[32, 24]" :padding="[15, 24]">
        <view class="flex flex-around pb-10 pt=10">
          <tm-text :font-size="36" _class="text-weight-b" label="智慧门户"></tm-text>
        </view>

        <tm-divider :margin="[24, 34]"></tm-divider>

        <tm-input
          :margin="[12, 24]"
          :padding="[12, 0]"
          prefix="tmicon-user-fill"
          showClear
          focus
          placeholder="请输入学号 / 手机号 (已绑定)"
          v-model="inputUsername"
          holdKeyboard
          confirmType="done"
          confirmHold
        ></tm-input>
        <tm-input
          :margin="[12, 24]"
          :padding="[12, 0]"
          password
          placeholder="请输入密码"
          prefix="tmicon-lock-fill"
          holdKeyboard
          v-model="inputPassword"
          confirmType="done"
          confirmHold
          showClear
        ></tm-input>

        <view class="flex flex-around">
          <tm-button
            @click="bindSecBtnClick"
            :margin="[50, 24]"
            :round="4"
            size="normal"
            :label="bindSecBtnLabel"
            :loading="bindSecBtnLoading"
            :disabled="bindSecBtnDisabled"
          ></tm-button>
        </view>
      </tm-sheet>
    </view>

    <view v-if="isNetworkError">
      <tm-result
        showBtn
        color="red"
        status="network"
        btnText="重试"
        @click="networkErrorBtnClick"
      ></tm-result>
    </view>
    <view v-else>
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
    </view>
  </tm-app>
</template>
