<script setup lang="ts">
import type { UNotifyOptions } from "../UNotify/types";
import type { UToastOptions } from "../UToast/types";

const { darkMode, customBarHeight, statusBarHeight } = storeToRefs(
  useAppStore()
);

const { NavBarColorReset, setDarkMode } = useAppStore();

const { pageReset } = usePageStore();

const {
  showNavBar,
  showBackAction,
  showCustomAction,
  pageTitle,
  notifyRef: _notifyRef,
  toastRef: _toastRef,
} = storeToRefs(usePageStore());

const handleNavigateBack = () => uni.navigateBack({});

const toggleDarkMode = () => setDarkMode(!darkMode.value);

const notifyRef = ref<{ handleShowNotify: (options: UNotifyOptions) => {} }>();
const toastRef = ref<{ handleShowToast: (options: UToastOptions) => {} }>();

onMounted(() => {
  _notifyRef.value = notifyRef.value;
  _toastRef.value = toastRef.value;
  NavBarColorReset();
});

onShow(() => {
  _notifyRef.value = notifyRef.value;
  _toastRef.value = toastRef.value;
  NavBarColorReset();
});

onUnmounted(() => pageReset());

// onHide(() => pageReset());
</script>

<template>
  <div :class="darkMode ? 'dark' : ''">
    <div class="bg-base color-base text-base relative">
      <!-- custom navigation bar -->
      <div
        v-if="showNavBar"
        class="w-full top-0 z-200 fixed font-bold shadow-sm"
        :class="darkMode ? 'bg-black' : 'bg-white'"
        :style="{ height: `${customBarHeight}px` }"
      >
        <div
          :style="{
            'padding-top': `${statusBarHeight}px`,
            height: `${customBarHeight - statusBarHeight}px`,
          }"
        >
          <div class="h-full text-center px-6 relative">
            <div
              class="flex h-full text-xl left-4 absolute justify-center items-center"
            >
              <slot name="navAction">
                <div
                  v-if="showBackAction && !showCustomAction"
                  class="i-carbon-chevron-left pr-2 text-2xl"
                  @click="handleNavigateBack"
                />
                <div
                  :class="darkMode ? 'i-carbon-moon' : 'i-carbon-sun'"
                  class="transition-all z-20 duration-300"
                  @click="toggleDarkMode"
                ></div>
              </slot>
            </div>
            <div
              class="flex flex-row h-full text-lg justify-center items-center transition-all z-20 duration-300"
            >
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
      <!-- page container -->
      <div
        class="overflow-auto"
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
