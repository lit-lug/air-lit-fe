<script setup lang="ts">
import type { UNotifyOptions } from "../UNotify/types";
import type { UToastOptions } from "../UToast/types";
import type { UMsgOptions } from "../UMsg/types";
import pages from "~/pages.json";

const pageStore = usePageStore();

const { deviceType } = storeToRefs(pageStore);

const props = withDefaults(
  defineProps<{
    showNavBar?: boolean;
    pageTitle?: string;
    showShadow?: boolean;
  }>(),
  {
    showNavBar: true,
    pageTitle: "",
    showShadow: true,
  }
);

const { darkMode, customBarHeight, statusBarHeight } = storeToRefs(useAppStore());

const { NavBarColorReset, setDarkMode } = useAppStore();

const { notifyRef: _notifyRef, toastRef: _toastRef, msgRef: _msgRef } = storeToRefs(
  usePageStore()
);

const handleNavigateBack = () => uni.navigateBack({});

const handleNavigateHome = () => uni.reLaunch({ url: "/pages/index/index" });

const toggleDarkMode = () => setDarkMode(!darkMode.value);

const notifyRef = ref<{ handleShowNotify: (options: UNotifyOptions) => {} }>();
const toastRef = ref<{ handleShowToast: (options: UToastOptions) => {} }>();
const msgRef = ref<{ handleShowMsg: (options: UMsgOptions) => {} }>();

const showBackAction = ref(false);

const showHomeAction = ref(false);

const showNavBar = computed(() => {
  return props.showNavBar && deviceType.value !== "pc";
});

const initPage = () => {
  // 修复 PC 导航栏
  // if (deviceType.value === "pc") {
  //  showNavBar = false;
  // }

  NavBarColorReset();

  _notifyRef.value = notifyRef.value;
  _toastRef.value = toastRef.value;
  _msgRef.value = msgRef.value;

  const isTabPage = pages.tabBar.list.some(
    (item) => item.pagePath === getCurrentPages().pop()?.route
  );

  if (isTabPage) {
    return;
  }

  if (getCurrentPages().length === 1) {
    showHomeAction.value = true;
  }

  if (getCurrentPages().length > 1) {
    showBackAction.value = true;
  }
};

onMounted(() => {
  initPage();
});

onReady(() => {
  initPage();
});

onShow(() => {
  initPage();
});
</script>

<template>
  <div :class="darkMode ? 'dark' : ''">
    <div class="bg-base color-base text-base relative">
      <!-- custom navigation bar -->
      <div
        v-if="showNavBar"
        class="w-full top-0 z-90 fixed font-bold bg-white dark:bg-dark"
        :class="showShadow ? 'shadow-sm ' : ''"
        :style="{
          height: `${customBarHeight}px`,
        }"
      >
        <div
          :style="{
            'padding-top': `${statusBarHeight}px`,
            height: `${customBarHeight - statusBarHeight}px`,
          }"
          class="z-100"
        >
          <div class="h-full text-center px-6 relative">
            <div class="flex h-full text-xl left-3 absolute justify-center items-center">
              <slot name="navAction">
                <div
                  v-if="showHomeAction"
                  class="i-carbon-home text-xl mr-2"
                  @click="handleNavigateHome"
                />
                <div
                  v-if="showBackAction"
                  class="i-carbon-chevron-left text-2xl mr-2"
                  @click="handleNavigateBack"
                />
                <div
                  :class="darkMode ? 'i-carbon-moon' : 'i-carbon-sun'"
                  @click="toggleDarkMode"
                ></div>
              </slot>
            </div>
            <div class="flex flex-row h-full text-lg justify-center items-center">
              <slot name="navContent">
                <div class="text-center">
                  {{ pageTitle }}
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <UNotify ref="notifyRef" />
      <UToast ref="toastRef" />
      <UMsg ref="msgRef" />
      <!-- page container -->
      <div
        class="overflow-auto dark:bg-black"
        :style="{
          height: `calc(100vh - ${customBarHeight}px)`,
          'padding-top': `${customBarHeight}px`,
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
