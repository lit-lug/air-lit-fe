<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    _class?: string;
    _style?: string;
  }>(),
  {
    _class: "",
    _style: "",
  }
);

const { _class, _style } = toRefs(props);

const gridClass = computed(() => {
  return `p-2 m-2 text-center flex flex-col justify-center items-center ${_class.value}`;
});
</script>

<template>
  <div :class="gridClass" :style="_style" hover-class="opacity-50" :hover-stay-time="150">
    <slot />
  </div>
</template>
