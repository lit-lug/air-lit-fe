<script setup lang="ts">
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

const cellClass = computed(() => {
  return `flex flex-col justify-center dark:bg-dark bg-white rounded-lg shadow shadow-sm ${_class.value}`;
});
</script>

<template>
  <div :class="cellClass" :style="_style">
    <slot />
  </div>
</template>
