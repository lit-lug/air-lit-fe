<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import TheNavBar from "@/components/TheNavBar.vue";

onShow(() => store.setTheme("raw"));

const store = useStore();
const pageStyle = computed(() => store.getPageMetaStyle);
</script>

<template>
  <page-meta :page-style="pageStyle" />

  <the-nav-bar title="我的" :back="false" :filter="false" :bg="true" />
</template>
