<script setup lang="ts">
import type { UMsgOptions, UMsgType } from "./types";

// const { customBarHeight } = storeToRefs(useAppStore());

const timer = ref<number | undefined>(undefined);
const show = ref(false);
const notifyType = ref<UMsgType>("default");
const message = ref("");

const handleShowMsg = (options: UMsgOptions) => {
  const {
    type = "default",
    message: _message = "Unable to connect to the server.",
    duration = 2000,
  } = options;
  clearTimeout(timer.value);
  show.value = true;
  notifyType.value = type;
  message.value = _message;
  timer.value = (setTimeout(() => {
    show.value = false;
    clearTimeout(timer.value);
    timer.value = undefined;
  }, duration) as unknown) as number;
};

defineExpose({
  handleShowMsg,
});
</script>

<template>
  <div
    class="z-120 fixed w-full h-full flex items-center justify-center bottom-0 left-0 right-0 bg-dark duration-200 bg-opacity-20"
    :class="{ 'opacity-0 pointer-events-none ': !show }"
  >
    <div
      v-if="show"
      class="bg-white dark:bg-dark flex flex-col items-center justify-center bottom-0 left-0 right-0 rounded-6 shadow color-base text-base transform-initial transition-all duration-200"
      :style="{
        width: '300rpx',
        height: '300rpx',
        transform: !show ? 'scale(0,0)' : 'scale(1,1)',
      }"
    >
      <div pt-10>
        <div class="loader absolute"></div>
      </div>
      <div class="pt-10">加载中</div>
    </div>
  </div>
</template>

<style>
.overflowMask {
  position: fixed;
  /* #ifndef APP-NVUE */
  z-index: 1000 !important;
  animation: aniover 0.5s;
  background-color: rgba(0, 0, 0, 0.3);
  transition-duration: 0.5s;
  transition-property: background, transform;
  transition-timing-function: ease;
  transition-delay: 0.3s;
  /* #endif */
  /* #ifdef APP-NVUE */
  background-color: rgba(0, 0, 0, 0);
  /* #endif */
}

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
