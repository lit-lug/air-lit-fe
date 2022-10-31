<script setup lang="ts">
import type { UNotifyOptions } from "../UNotify/types";
import type { UToastOptions } from "../UToast/types";
import pages from "~/pages.json";

const props = withDefaults(
  defineProps<{
    showNavBar?: boolean;
    pageTitle?: string;
    showShadow?: boolean;
    drawerOpen?: boolean;
  }>(),
  {
    showNavBar: true,
    pageTitle: "",
    showShadow: true,
    drawerOpen: false,
  }
);

const emit = defineEmits(["open"]);

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

const drawerWidth = ref(100);
const draWidth = ref(60);

const isOpen = computed(() => {
  return page.value > 0;
});

const page = ref(0);

const pageStyle = computed(() => {
  return {
    left: page.value + "%",
    transform:
      "translate(" +
      page.value / 2 +
      "rpx" +
      // (isOpen() ? ",5%" : "") +
      ")" +
      (isOpen.value ? " scale(0.9, 0.9)" : ""),
    borderRadius: page.value + "rpx",
  };
});

const drawerStyle = computed(() => {
  // :style="'right:' + drawerWidth + '%; width:' + draWidth + '%;'"

  return {
    right: drawerWidth.value + "%",
    width: draWidth.value + "%",
    transform: "translate(" + drawerWidth.value / 2 + "rpx" + ")",
    // bottom: `${statusBarHeight}px`,
  };
});

const openDrawer = () => {
  drawerWidth.value = 100 - draWidth.value;
  page.value = draWidth.value - 30;
  emit("open", true);
};

const closeDrawer = () => {
  drawerWidth.value = 100;
  page.value = 0;
  emit("open", false);
};

const startX = ref(0);

const lastX = ref(0);

const handleTouchmove = (e: TouchEvent) => {
  const currentX = Math.floor(e.changedTouches[0].clientX - lastX.value);

  if (currentX < -2 && page.value > 0) {
    if (page.value < 0) {
      closeDrawer();
    } else {
      page.value = page.value - 3 < 0 ? 0 : page.value - 3;
      drawerWidth.value = drawerWidth.value + 3 > 100 ? 100 : drawerWidth.value + 3;
    }
  }

  if (currentX > 2 && page.value < 30) {
    if (page.value > 30) {
      openDrawer();
    } else {
      page.value = page.value + 3 > 30 ? 30 : page.value + 3;
      drawerWidth.value = drawerWidth.value - 3 < 70 ? 70 : drawerWidth.value - 3;
    }
  }
};

const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.changedTouches[0].clientX;
  lastX.value = e.changedTouches[0].clientX;
};
const handleTouchEnd = (e: TouchEvent) => {
  if (page.value > 15) {
    openDrawer();
  } else {
    closeDrawer();
  }
};

if (props.drawerOpen) {
  openDrawer();
} else {
  closeDrawer();
}

defineExpose({
  openDrawer,
  closeDrawer,
});
</script>

<template>
  <div
    :class="darkMode ? 'dark' : ''"
    class="relative w-full bg-blueGray color-base text-base overflow-hidden top-none"
    :style="{
      height: `100vh`,
    }"
  >
    <div
      @touchmove="handleTouchmove"
      @touchstart.start="handleTouchStart"
      @touchend.end="handleTouchEnd"
      class="drawer z-100 top-0 absolute overflow-hidden right-full color-base text-white duration-200 transition-ease-in-out"
      :style="drawerStyle"
    >
      <slot name="drawer"> </slot>
    </div>

    <view
      class="z-100 top-0 right-0 absolute overflow-hidden h-full w-full duration-200 transition-ease-in-out shadow-sm"
      :style="pageStyle"
    >
      <!-- custom navigation bar -->
      <div
        @touchmove="handleTouchmove"
        @touchstart.start="handleTouchStart"
        @touchend.end="handleTouchEnd"
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
                  :class="isOpen ? 'rotate-90' : 'rotate-0'"
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
          @touchmove="handleTouchmove"
          @touchstart.start="handleTouchStart"
          @touchend.end="handleTouchEnd"
          class="transition-all transition-ease-in-out bg-dark duration-200 transition-all top-0 right-0 bottom-0 left-0 z-100 fixed"
          :class="isOpen ? 'opacity-10 visible' : 'opacity-0 invisible'"
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
