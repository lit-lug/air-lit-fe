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

const emits = defineEmits<{
  (e: "click"): void;
}>();

const { _class, _style } = toRefs(props);

const cellClass = computed(() => {
  return `flex flex-row justify-between items-center ${_class.value}`;
});
</script>

<template>
  <div
    @click="emits('click')"
    :class="cellClass"
    :style="_style"
    hover-class="opacity-50"
  >
    <slot />
  </div>
</template>
