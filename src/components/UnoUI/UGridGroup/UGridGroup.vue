<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    colNum?: number;
    rowNum?: number;
    gap?: number;
    _class?: string;
    _style?: string;
  }>(),
  {
    colNum: 3,
    rowNum: 3,
    gap: 0,
    _class: "",
    _style: "",
  }
);

const { colNum, rowNum, gap, _class, _style } = toRefs(props);

const gridClass = computed(() => {
  return `grid grid-cols-${colNum.value} grid-rows-${rowNum.value} gap-${gap.value} ${_class.value}`;
});
</script>

<template>
  <div :class="gridClass" :style="_style">
    <slot />
  </div>
</template>
