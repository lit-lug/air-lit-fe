<script setup lang="ts">
import { time } from "console";
import { WeAppAuth, GetQrCodeID, GetQrCodeUrl, GetQrCodeStatus } from "~/common/api";
import { useAppStore } from "~/stores/app";
const appStore = useAppStore();

const { isAuth, userInfo } = storeToRefs(appStore);

const qrCodeID = ref("");

const isLoading = ref(false);

// #ifdef MP-WEIXIN

const weAppAuth = async () => {
  // 微信授权
  const res = ((await uni.login({
    provider: "weixin",
  })) as unknown) as UniApp.LoginRes;
  // 成功则获取用户信息
  if (!res.code) {
    return Promise.reject("微信授权失败");
  }
  // 获取用户认证信息
  const { data: authInfo } = await WeAppAuth({ code: res.code });
  if (!authInfo) {
    return Promise.reject("获取用户信息失败");
  }
  appStore.setToken(authInfo.token);
  appStore.setUserInfo(authInfo.user_info);

  return authInfo;
};

// #endif

// #ifdef H5
// const listenQrCodeStatus = async () => {
const listenQrCodeStatusTimer = setInterval(async () => {
  if (qrCodeID.value.length == 0) {
    await refreshQrCode();
  }

  const { data: qrCodeStatus } = await GetQrCodeStatus(qrCodeID.value);

  if (qrCodeStatus) {
    if (qrCodeStatus.is_expired) {
      await refreshQrCode();
      return;
    }

    if (qrCodeStatus.is_auth && qrCodeStatus?.auth_info) {
      appStore.setToken(qrCodeStatus?.auth_info.token);
      appStore.setUserInfo(qrCodeStatus?.auth_info.user_info);
      // setTimeout(() => {

      getCurrentPages().length > 1
        ? uni.navigateBack()
        : uni.reLaunch({ url: "/pages/index/index" });
    }

    console.log(qrCodeStatus);
  } else {
    await refreshQrCode();
  }
}, 3000);
// timer.
// };

const refreshQrCode = async () => {
  const { data: qr } = await GetQrCodeID();
  if (qr) {
    qrCodeID.value = qr.code_id;
  }
  // listenQrCodeStatus();
};

// #endif

onReady(async () => {
  // #ifdef MP-WEIXIN
  isLoading.value = true;
  const authInfo = await weAppAuth();
  if (authInfo) {
    setTimeout(() => {
      getCurrentPages().length > 1
        ? uni.navigateBack()
        : uni.reLaunch({ url: "/pages/index/index" });
    }, 500);
  }
  // #endif

  // #ifdef H5
  await refreshQrCode();
  // #endif
});

onUnload(() => {
  // #ifdef H5
  clearInterval(listenQrCodeStatusTimer);
  // #endif
});

onHide(() => {
  // #ifdef H5
  clearInterval(listenQrCodeStatusTimer);
  // #endif
});
</script>

<template>
  <UBasePage :showNavBar="false">
    <!-- #ifdef H5 -->
    <div
      class="overflow-hidden flex flex-col py-4 px-2 m-3 dark:bg-dark bg-white justify-center items-center rounded-lg shadow-sm"
    >
      <div class="flex flex-col m-2 p-2 justify-center items-center">
        <div class="text-2xl font-bold">授权</div>
        <div class="text-sm text-gray-500">使用微信扫描二维码后进行授权</div>
      </div>

      <img class="flex" :src="GetQrCodeUrl(qrCodeID)" alt="" />
    </div>
    <!-- #endif -->

    <div v-if="isLoading" class="loader absolute top-72vh left-50vw rotate-165deg" />
  </UBasePage>
</template>

<style>
.loader:after,
.loader:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  transform: translate(-50%, -50%);
}

.loader:before {
  animation: before 2s infinite;
}

.loader:after {
  animation: after 2s infinite;
}

@-webkit-keyframes before {
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }

  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
  }

  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
  }

  to {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }
}

@keyframes before {
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }

  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
  }

  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
  }

  to {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }
}

@-webkit-keyframes after {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }

  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
  }

  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
  }

  to {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }
}

@keyframes after {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }

  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
  }

  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
  }

  to {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }
}
</style>
