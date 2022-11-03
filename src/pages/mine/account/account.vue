<script setup lang="ts">
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

const onUsernameInput = (e: any) => {
  usernameInput.value = e.detail.value;
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

const onPasswordInput = (e: any) => {
  passwordInput.value = e.detail.value;
};
</script>

<template>
  <UBasePage>
    <!-- 标题栏 -->
    <template v-slot:navContent>账户管理</template>

    <!-- 内容 -->

    <div
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
          :class="
            usernameInputFocus
              ? 'text-blue-5 dark:text-blue-5'
              : 'text-gray-5 dark:text-gray-3'
          "
          placeholder="请输入学号/手机号(已绑定)"
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
          :class="
            passwordInputFocus
              ? 'text-blue-5 dark:text-blue-5'
              : 'text-gray-5 dark:text-gray-3'
          "
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

      <!-- 按钮 -->

      <div class="py-4 flex flex-row justify-center items-center">
        <UButton type="primary">登录</UButton>
      </div>
    </div>

    <div
      class="h-40 bg-blue-5 text-white flex flex-row justify-between p-2 m-3 rounded-lg items-center shadow-sm"
    >
      <div class="text-sm font-bold">11月1日 星期二</div>
      <div class="text-sm font-bold">第 10 周</div>
    </div>
  </UBasePage>
</template>
