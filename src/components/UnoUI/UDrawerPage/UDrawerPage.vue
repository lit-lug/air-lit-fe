<script setup lang="ts">
import type { UNotifyOptions } from "../UNotify/types";
import type { UToastOptions } from "../UToast/types";
import pages from "~/pages.json";

withDefaults(
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

const { notifyRef: _notifyRef, toastRef: _toastRef } = storeToRefs(usePageStore());

const handleNavigateBack = () => uni.navigateBack({});

const handleNavigateHome = () => uni.reLaunch({ url: "/pages/index/index" });

const toggleDarkMode = () => setDarkMode(!darkMode.value);

const notifyRef = ref<{ handleShowNotify: (options: UNotifyOptions) => {} }>();
const toastRef = ref<{ handleShowToast: (options: UToastOptions) => {} }>();

const showBackAction = ref(false);

const showHomeAction = ref(false);

const initPage = () => {
  NavBarColorReset();

  _notifyRef.value = notifyRef.value;
  _toastRef.value = toastRef.value;

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

const DrawerWidth = ref(100);
const DraWidth = ref(60);

const Page = ref(0);

const openDrawer = () => {
  //   if (!Open.value) return;
  DrawerWidth.value = 100 - DraWidth.value;
  Page.value = DraWidth.value - 15;
  //   emit("IsOpen", true);
};

const closeDrawer = () => {
  DrawerWidth.value = 100;
  Page.value = 0;
  //   emit("IsOpen", false);
};
</script>

<template>
  <div
    :class="darkMode ? 'dark' : ''"
    class="relative w-full h-full bg-base color-base text-base overflow-hidden top-none"
    :style="{
      'padding-top': `${customBarHeight}px`,
      height: `calc(100vh - ${customBarHeight}px)`,
    }"
  >
    <div
      class="drawer z-100 top-0 absolute overflow-hidden right-full bg-base duration-200 transition-ease-in-out"
      :style="'right:' + DrawerWidth + '%; width:' + DraWidth + '%;'"
    >
      <slot name="drawer">
        <button @click="openDrawer">Open</button>
        <button @click="closeDrawer">Close</button>
      </slot>
    </div>

    <view
      class="z-100 top-0 right-0 absolute overflow-hidden h-full w-full duration-200 transition-ease-in-out"
      :style="
        'left :' +
        Page +
        '%;transform: translate(' +
        Page / 2 +
        'rpx);border-radius:' +
        Page +
        'rpx;'
      "
    >
      <!-- custom navigation bar -->
      <div
        v-if="showNavBar"
        class="w-full top-0 z-90 fixed font-bold bg-white dark:bg-dark"
        :class="showShadow ? 'shadow-sm' : ''"
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
          <div class="h-full text-center px-6 relative color-base text-base">
            <div
              class="flex h-full text-xl left-2 absolute justify-center items-center dark:text-white"
            >
              <slot name="navAction">
                <div
                  class="i-carbon-menu text-xl mr-2 transition-transform transition-ease-in-out duration-200"
                  :class="Page > 0 ? 'rotate-90' : 'rotate-0'"
                  @click="openDrawer"
                />
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

      <div
        class="overflow-auto w-full h-full bg-base color-base text-base dark:bg-black"
        :style="{
          'padding-top': `${customBarHeight}px`,
          height: `calc(100vh - ${customBarHeight}px)`,
        }"
      >
        <slot />

        <div
          class="transition-all transition-ease-in-out duration-200 bg-dark-100 bg-opacity-30 transition-all top-0 right-0 bottom-0 left-0 z-100 fixed"
          :class="Page !== 0 ? 'opacity-100 visible' : 'opacity-0 invisible'"
          @click="closeDrawer"
        />
      </div>
    </view>
  </div>
</template>

<style scoped>
.drawer {
  width: 60%;
  height: 100%;
  padding-top: 100rpx;
  padding-right: 15%;
}
</style>
