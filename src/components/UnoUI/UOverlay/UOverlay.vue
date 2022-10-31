<script setup lang="ts">
withDefaults(
  defineProps<{
    show?: boolean;
    align?: "start" | "center" | "end";
    opacity?: number;
  }>(),
  {
    show: () => false,
    align: () => "center",
    opacity: () => 30,
  }
);

const emits = defineEmits(["close", "click"]);

const OverlayClass = {
  start: "flex justify-center items-start",
  center: "flex justify-center items-center",
  end: "flex justify-center items-end",
};

const handleClose = (e: Event) => {
  emits("close", e);
};
const handleMove = (e: Event) => {
  e.stopPropagation();
};
</script>

<template>
  <div
    v-if="show"
    :class="
      'z-100 fixed top-0 bottom-0 left-0 right-0 bg-dark-100 ' +
      OverlayClass[align] +
      ' bg-opacity-' +
      opacity
    "
    @touchmove.stop.prevent="handleMove"
    @click="handleClose"
  >
    <slot />
  </div>
</template>
