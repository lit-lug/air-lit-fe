<script setup lang="ts">
const { isAuth, userInfo } = storeToRefs(useAppStore());
const { showNotify, showToast, showMsg } = usePageStore();

onLaunch(() => {});

// 用户名输入相关
const usernameInput = ref("");

const usernameInputFocus = ref(false);

const onUsernameInputFocus = () => {
  usernameInputFocus.value = true;
};

const onUsernameInputBlur = () => {
  usernameInputFocus.value = false;
};

// 密码输入相关
const passwordInput = ref("");

const passwordInputFocus = ref(false);

const showPassword = ref(true);

const onPasswordInputFocus = () => {
  passwordInputFocus.value = true;
};

const onPasswordInputBlur = () => {
  passwordInputFocus.value = false;
};

const isAgree = ref(false);

const bindSec = () => {
  // 验证数据
  if (usernameInput.value.length === 0) {
    showToast({ message: "请输入学号/手机号" });
    return;
  }
  if (passwordInput.value.length === 0) {
    showToast({ message: "请输入密码" });
    return;
  }
  if (!isAgree.value) {
    showToast({ message: "请同意用户协议" });
    return;
  }

  // 发送请求
};

onReady(() => {
  console.log(userInfo.value);
});
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>账户管理</template>

    <!-- 内容 -->
    <div
      v-if="userInfo.is_bind_sec"
      class="flex flex-col pt-2 pb-4 px-2 m-3 dark:bg-dark bg-white justify-center rounded-lg shadow-sm"
    >
      <div class="text-lg font-bold flex justify-center">用户信息</div>

      <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

      <div class="px-2 m-1 flex flex-row justify-between">
        <div class="text-32rpx font-bold">姓名</div>
        <div class="text-gray-5 dark:text-gray-3 text-32rpx">
          {{ userInfo.sec_info?.name }}
        </div>
      </div>

      <div class="px-2 m-1 flex flex-row justify-between">
        <div class="text-32rpx font-bold">学号</div>
        <div class="text-gray-5 dark:text-gray-3 text-32rpx">
          {{ userInfo.sec_info?.card_id }}
        </div>
      </div>

      <div class="px-2 m-1 flex flex-row justify-between">
        <div class="text-32rpx font-bold">年级</div>
        <div class="text-gray-5 dark:text-gray-3 text-32rpx">
          {{ userInfo.sec_info?.grade }}
        </div>
      </div>

      <div class="px-2 m-1 flex flex-row justify-between">
        <div class="text-32rpx font-bold">学院</div>
        <div class="text-gray-5 dark:text-gray-3 text-32rpx">
          {{ userInfo.sec_info?.faculty }}
        </div>
      </div>

      <div class="px-2 m-1 flex flex-row justify-between">
        <div class="text-32rpx font-bold">专业</div>
        <div class="text-gray-5 dark:text-gray-3 text-32rpx">
          {{ userInfo.sec_info?.major }}
        </div>
      </div>

      <div class="px-2 m-1 flex flex-row justify-between">
        <div class="text-32rpx font-bold">班级</div>
        <div class="text-gray-5 dark:text-gray-3 text-32rpx">
          {{ userInfo.sec_info?.class }}
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col p-2 m-3 dark:bg-dark bg-white justify-center rounded-lg shadow-sm"
    >
      <div class="text-lg font-bold flex justify-center">智慧门户</div>

      <div class="w-full h-0.2 bg-gray-200 dark:bg-dark-200 my-2"></div>

      <!-- 输入框 -->

      <div
        class="p-2 m-2 flex flex-row items-center gap-2 justify-start bg-gray-1 dark:bg-gray-7 rounded-lg text-sm font-bold"
        :class="usernameInputFocus ? 'bg-blue-5 bg-opacity-10 border border-blue-5' : ''"
      >
        <div
          class="i-carbon-user text-xl"
          :class="usernameInputFocus ? 'text-blue-5' : ''"
        ></div>

        <input
          class="w-60 h-6 bg-transparent"
          :class="usernameInputFocus ? 'text-blue-5 dark:text-blue-5' : ''"
          placeholder="请输入学号 / 手机号 (已绑定)"
          :placeholder-class="[
            usernameInputFocus
              ? 'text-blue-5 dark:text-blue-5'
              : 'text-gray-5 dark:text-gray-3',
          ]"
          @focus="onUsernameInputFocus"
          @blur="onUsernameInputBlur"
          v-model="usernameInput"
        />

        <div
          v-if="usernameInput.length > 0"
          class="i-carbon-close-outline text-xl"
          :class="usernameInputFocus ? 'text-blue-5' : ''"
          hover-class="opacity-50"
          @click="usernameInput = ''"
        ></div>
      </div>

      <div
        class="p-2 m-2 flex flex-row items-center justify-start gap-2 bg-gray-1 dark:bg-gray-7 rounded-lg text-sm font-bold"
        :class="passwordInputFocus ? 'bg-blue-5 bg-opacity-10 border border-blue-5' : ''"
      >
        <div
          class="i-carbon-locked text-xl"
          :class="passwordInputFocus ? 'text-blue-5' : ''"
        ></div>

        <input
          class="w-52 h-6 bg-transparent"
          placeholder="请输入密码"
          :class="passwordInputFocus ? 'text-blue-5 dark:text-blue-5' : ''"
          :placeholder-class="[
            passwordInputFocus
              ? 'text-blue-5 dark:text-blue-5'
              : 'text-gray-5 dark:text-gray-3',
          ]"
          :password="showPassword"
          @focus="onPasswordInputFocus"
          @blur="onPasswordInputBlur"
          v-model="passwordInput"
        />

        <div
          v-if="passwordInput.length > 0"
          class="i-carbon-close-outline text-xl"
          :class="passwordInputFocus ? 'text-blue-5' : ''"
          hover-class="opacity-50"
          @click="passwordInput = ''"
        ></div>

        <div
          v-if="passwordInput.length > 0"
          class="text-xl"
          :class="[
            passwordInputFocus ? 'text-blue-5' : '',
            !showPassword ? 'i-mdi-eye-outline' : 'i-mdi-eye-off-outline',
          ]"
          hover-class="opacity-50"
          @click="showPassword = !showPassword"
        ></div>
      </div>

      <div class="p-2 flex flex-row justify-between items-center">
        <div class="flex flex-row justify-between items-center text-blue-5">
          <div
            class="pr-1 mr-1 text-32rpx"
            :class="!isAgree ? 'i-carbon-radio-button' : 'i-carbon-radio-button-checked'"
            @click="isAgree = !isAgree"
            hover-class="opacity-50"
          ></div>
          <div class="font-bold text-sm" hover-class="opacity-50">同意用户条款</div>
        </div>
        <div class="text-blue-5 text-base font-bold text-sm" hover-class="opacity-50">
          忘记密码?
        </div>
      </div>
    </div>

    <!-- 按钮 -->

    <div class="flex flex-row justify-center items-center">
      <div class="w-20" v-if="!userInfo.is_bind_sec">
        <button
          class="rounded-lg text-white text-base flex justify-center items-center shadow-sm py-2 bg-blue-5"
          hover-class="grayscale-20"
          :hover-stay-time="150"
          @tap="bindSec"
        >
          绑定
        </button>
      </div>
      <div class="w-20" v-else>
        <button
          class="rounded-lg text-white text-base flex justify-center items-center shadow-sm py-2 bg-red-5"
          hover-class="grayscale-20"
          :hover-stay-time="150"
          @tap="bindSec"
        >
          解绑
        </button>
      </div>
    </div>

    <!-- 
    <div
      class="h-40 bg-blue-5 text-white flex flex-row justify-between p-2 m-3 rounded-lg items-center shadow-sm"
    >
      <div class="text-sm font-bold">11月1日 星期二</div>
      <div class="text-sm font-bold">第 10 周</div>
    </div> -->
  </UBasePage>
</template>
