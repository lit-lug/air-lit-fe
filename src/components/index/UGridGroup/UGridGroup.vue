<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // col?: number;
    // row?: number;
    // gap?: number;
    _class?: string;
    _style?: string;
  }>(),
  {
    // col: 3,
    // row: 3,
    // gap: 0,
    _class: "",
    _style: "",
  }
);
</script>

<template>
  <div :grid="`~ cols-3 rows-2`" :class="_class" :style="_style">
    <slot />
  </div>
</template>
