<script lang="ts" setup>
withDefaults(
  defineProps<{
    showShadow?: boolean;
  }>(),
  {
    showShadow: true,
  }
);
</script>

<template>
  <div
    class="rounded-lg text-white text-base flex justify-center items-center shadow py-2"
    :class="showShadow ? 'shadow' : ''"
  >
    <slot />

    112312 asdads
  </div>
</template>

<style></style>
