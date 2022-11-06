<script setup lang="ts">
import type { UMsgOptions, UMsgType } from "./types";

// const { customBarHeight } = storeToRefs(useAppStore());

const timer = ref<number | undefined>(undefined);
const show = ref(false);
const msgType = ref<UMsgType>("loading");
const message = ref("");

const handleShowMsg = (options: UMsgOptions) => {
  const { type = "loading", message: _message = "", duration = 0 } = options;

  show.value = true;
  msgType.value = type;
  message.value = _message;

  //   console.log("handleShowMsg", options);

  if (duration > 0) {
    clearTimeout(timer.value);
    timer.value = (setTimeout(() => {
      show.value = false;
      clearTimeout(timer.value);
      timer.value = undefined;
    }, duration) as unknown) as number;
  }

  if (type == "hide") {
    show.value = false;
    clearTimeout(timer.value);
    timer.value = undefined;
  }
};

const msgTypeClass = {
  success: " bg-green-5 i-carbon-checkmark-outline",
  error: "bg-red-5 i-carbon-close-outline",
  warning: "bg-orange-5 i-carbon-warning",
};

const msgTypeMsg = {
  success: "成功",
  error: "错误",
  warning: "警告",
  loading: "加载中",
};

onHide(() => {
  show.value = false;
});

defineExpose({
  handleShowMsg,
});
</script>

<template>
  <div
    class="z-120 fixed w-full opacity-0 h-full flex items-center justify-center bottom-0 left-0 right-0 bg-dark duration-200 bg-opacity-20"
    :class="!show ? 'opacity-0 invisible' : 'opacity-100 visible'"
  >
    <div
      v-if="show"
      class="bg-white dark:bg-dark bg-opacity-90 dark:bg-opacity-90 bottom-0 left-0 right-0 rounded-6 shadow color-base text-base transform-initial transition-all duration-200 backdrop-filter backdrop-blur-sm"
      :style="{
        width: '300rpx',
        height: '300rpx',
        transform: !show ? 'scale(0,0)' : 'scale(1,1)',
      }"
    >
      <div v-if="msgType === 'loading'" class="text-center">
        <div class="loader"></div>
        <div class="pt-24">
          {{ message.length > 0 ? message : msgTypeMsg["loading"] }}
        </div>
      </div>
      <div v-else class="text-center flex flex-col p-8 items-center justify-center">
        <div class="text-5xl" :class="msgTypeClass[msgType]"></div>
        <div class="pt-3">
          {{ message.length > 0 ? message : msgTypeMsg[msgType] }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.loader:after,
.loader:before {
  content: "";
  position: absolute;
  top: 40%;
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
