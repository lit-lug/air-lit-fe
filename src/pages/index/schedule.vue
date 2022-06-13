<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "vue";
import TheNavBar from "@/components/TheNavBar.vue";

const store = useStore();
const pageStyle = computed(() => store.getPageMetaStyle);
</script>

<template>
  <page-meta :page-style="pageStyle" />

  <the-nav-bar title="课表" :back="false" :filter="false" :bg="true" />
</template>
